import { WINDOW } from '@/lib/constants'

export interface WindowPosition {
  x: number
  y: number
}

export interface DesktopLayout {
  positions: WindowPosition[]
  height: number
}

/**
 * Initial cascade for `count` windows in a desktop `width` px wide: columns spread across
 * the width, each column offset down a little and rows overlapping, like tiled OS windows.
 * Pure function so it can be recomputed on resize, filter change or "Tile windows".
 */
export function windowLayout(count: number, width: number): DesktopLayout {
  const usable = Math.max(0, width - WINDOW.padding * 2)
  const fit = Math.floor((usable + WINDOW.gapX) / (WINDOW.width + WINDOW.gapX))
  const columns = Math.min(WINDOW.columns, Math.max(1, fit))
  const spread = columns > 1 ? (usable - WINDOW.width) / (columns - 1) : 0
  const rows = Math.ceil(count / columns)

  const positions = Array.from({ length: count }, (_, i) => {
    const column = i % columns
    const row = Math.floor(i / columns)
    return {
      x: WINDOW.padding + column * spread,
      y: WINDOW.padding + row * WINDOW.rowStep + column * WINDOW.offsetY,
    }
  })

  const height =
    count === 0
      ? 0
      : WINDOW.padding * 2 +
        (rows - 1) * WINDOW.rowStep +
        (columns - 1) * WINDOW.offsetY +
        WINDOW.height
  return { positions, height }
}
