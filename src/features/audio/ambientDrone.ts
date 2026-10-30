import { AUDIO } from '@/lib/constants'

/**
 * Procedural space ambience (no audio assets): a soft detuned sine chord with a slow
 * filter sweep plus a touch of low-passed noise. Created lazily from a user gesture.
 */
export class AmbientDrone {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private sources: AudioScheduledSourceNode[] = []

  private build(): void {
    const ctx = new AudioContext()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420
    filter.connect(master)

    const sweep = ctx.createOscillator()
    const sweepDepth = ctx.createGain()
    sweep.frequency.value = 0.04
    sweepDepth.gain.value = 160
    sweep.connect(sweepDepth).connect(filter.frequency)

    const oscillators = AUDIO.frequencies.flatMap((frequency, index) =>
      [-4, 4].map((detune) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = index % 2 ? 'triangle' : 'sine'
        osc.frequency.value = frequency
        osc.detune.value = detune
        gain.gain.value = 0.16 / (index + 1)
        osc.connect(gain).connect(filter)
        return osc
      }),
    )

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate)
    const data = noiseBuffer.getChannelData(0)
    let last = 0
    for (let i = 0; i < data.length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02
      data[i] = last * 3.5
    }
    const noise = ctx.createBufferSource()
    const noiseGain = ctx.createGain()
    noise.buffer = noiseBuffer
    noise.loop = true
    noiseGain.gain.value = 0.35
    noise.connect(noiseGain).connect(filter)

    this.sources = [sweep, noise, ...oscillators]
    this.sources.forEach((source) => source.start())
    this.ctx = ctx
    this.master = master
  }

  async start(): Promise<void> {
    if (!this.ctx) this.build()
    const { ctx, master } = this
    if (!ctx || !master) return
    await ctx.resume()
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(AUDIO.masterGain, ctx.currentTime + AUDIO.fadeSeconds)
  }

  async stop(): Promise<void> {
    const { ctx, master } = this
    if (!ctx || !master) return
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + AUDIO.fadeSeconds)
    await new Promise((resolve) => setTimeout(resolve, AUDIO.fadeSeconds * 1000))
    if (this.master?.gain.value === 0) await ctx.suspend()
  }

  /** Release all audio resources. */
  dispose(): void {
    this.sources.forEach((source) => source.stop())
    void this.ctx?.close()
    this.sources = []
    this.ctx = null
    this.master = null
  }
}
