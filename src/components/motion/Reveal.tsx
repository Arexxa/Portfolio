import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { fadeUp } from '@/lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
}

/**
 * Fades and lifts content in once when it scrolls into view. Under reduced motion,
 * MotionConfig skips the transform so content simply appears.
 */
export function Reveal({ children, className }: RevealProps) {
  return (
    <m.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </m.div>
  )
}
