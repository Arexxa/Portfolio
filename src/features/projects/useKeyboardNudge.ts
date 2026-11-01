import type { KeyboardEvent, RefObject } from 'react'
import type { MotionValue } from 'motion/react'
import { WINDOW } from '@/lib/constants'

const DIRECTIONS: Record<string, readonly [number, number]> = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

const clamp = (value: number, max: number) => Math.min(Math.max(0, value), Math.max(0, max))

/**
 * Keyboard alternative to dragging: arrow keys move the window (Shift = larger steps),
 * clamped to the desktop bounds. Writes motion values directly (no React re-render).
 */
export function useKeyboardNudge(
  x: MotionValue<number>,
  y: MotionValue<number>,
  windowRef: RefObject<HTMLElement | null>,
  desktopRef: RefObject<HTMLElement | null>,
) {
  return (event: KeyboardEvent) => {
    const direction = DIRECTIONS[event.key]
    const win = windowRef.current
    const desktop = desktopRef.current
    if (!direction || !win || !desktop) return
    event.preventDefault()
    const step = event.shiftKey ? WINDOW.nudgeLarge : WINDOW.nudge
    x.set(clamp(x.get() + direction[0] * step, desktop.clientWidth - win.offsetWidth))
    y.set(clamp(y.get() + direction[1] * step, desktop.clientHeight - win.offsetHeight))
  }
}
