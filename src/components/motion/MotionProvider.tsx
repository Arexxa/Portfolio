import type { ReactNode } from 'react'
import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'

interface MotionProviderProps {
  children: ReactNode
}

/**
 * Loads only the lightweight `domAnimation` feature set up front (`m.*` components).
 * Drag features are loaded lazily by the projects desktop. `reducedMotion="user"` makes
 * every Motion animation respect prefers-reduced-motion.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
