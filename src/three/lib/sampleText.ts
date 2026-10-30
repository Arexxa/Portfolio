export interface TextPoints {
  /** x,y pairs in world units centered on the origin. */
  points: Float32Array
  width: number
}

const CANVAS_WIDTH = 1800
const LINE_HEIGHT = 300
const FONT_SIZE = 250
const SAMPLE_STRIDE = 3

/** Rasterises text to an offscreen canvas and returns `count` random filled-pixel positions. */
export function sampleText(
  lines: readonly string[],
  count: number,
  fontFamily: string,
  fontWeight: number,
  worldWidth: number,
): TextPoints {
  const canvas = document.createElement('canvas')
  canvas.width = CANVAS_WIDTH
  canvas.height = LINE_HEIGHT * lines.length
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return { points: new Float32Array(0), width: worldWidth }

  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `${fontWeight} ${FONT_SIZE}px ${fontFamily}`
  const longest = Math.max(...lines.map((line) => ctx.measureText(line).width))
  const fit = Math.min(1, (CANVAS_WIDTH * 0.96) / longest)
  ctx.font = `${fontWeight} ${FONT_SIZE * fit}px ${fontFamily}`
  lines.forEach((line, i) => ctx.fillText(line, CANVAS_WIDTH / 2, LINE_HEIGHT * (i + 0.5)))

  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const filled: number[] = []
  for (let y = 0; y < height; y += SAMPLE_STRIDE) {
    for (let x = 0; x < width; x += SAMPLE_STRIDE) {
      if ((data[(y * width + x) * 4 + 3] ?? 0) > 128) filled.push(x, y)
    }
  }

  const total = filled.length / 2
  const take = Math.min(count, total)
  const unit = worldWidth / (longest * fit)
  const points = new Float32Array(take * 2)
  for (let i = 0; i < take; i++) {
    const pick = (Math.random() * total) | 0
    points[i * 2] = ((filled[pick * 2] ?? 0) - width / 2) * unit
    points[i * 2 + 1] = -((filled[pick * 2 + 1] ?? 0) - height / 2) * unit
  }
  return { points, width: worldWidth }
}
