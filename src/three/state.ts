/**
 * Mutable per-frame state shared between DOM events and the render loop.
 * Mutating this object never triggers React renders (by design).
 */
export interface GalaxyState {
  /** 0..1 scroll progress along the flight path. */
  progress: number
  /** 0..1 zoom amount while a panel is open (animated by GSAP). */
  focus: number
  /** Index into PLANETS the camera is zooming toward, or -1. */
  focusIndex: number
  /** Normalized pointer position, -1..1. */
  pointer: { x: number; y: number }
}

export const galaxyState: GalaxyState = {
  progress: 0,
  focus: 0,
  focusIndex: -1,
  pointer: { x: 0, y: 0 },
}
