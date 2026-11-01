/**
 * Mutable per-frame state shared between DOM events and the render loop.
 * Mutating this object never triggers React renders (by design).
 */
export interface HeroState {
  /** Normalised pointer position, -1..1. */
  pointer: { x: number; y: number }
}

export const heroState: HeroState = {
  pointer: { x: 0, y: 0 },
}
