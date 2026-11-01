/** Deterministic hash -> 0..1 for integer lattice points. */
function hash(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return s - Math.floor(s)
}

const smooth = (t: number) => t * t * (3 - 2 * t)

/** 2D value noise in 0..1. */
export function valueNoise(x: number, y: number): number {
  const ix = Math.floor(x)
  const iy = Math.floor(y)
  const fx = smooth(x - ix)
  const fy = smooth(y - iy)
  const a = hash(ix, iy)
  const b = hash(ix + 1, iy)
  const c = hash(ix, iy + 1)
  const d = hash(ix + 1, iy + 1)
  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy
}

/** Fractal noise (3 octaves) in roughly 0..1, used once to sculpt the horizon terrain. */
export function fbm(x: number, y: number): number {
  let value = 0
  let amplitude = 0.55
  let frequency = 1
  for (let octave = 0; octave < 3; octave++) {
    value += valueNoise(x * frequency, y * frequency) * amplitude
    frequency *= 2.1
    amplitude *= 0.5
  }
  return value
}
