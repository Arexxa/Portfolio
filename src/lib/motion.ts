import type { Variants } from 'motion/react'
import { DURATION, EASE } from '@/lib/constants'

/**
 * Shared Motion variants. Only transform and opacity are animated. Reduced motion is
 * handled globally by <MotionConfig reducedMotion="user"> (transforms are skipped).
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE.outExpo } },
}

export const staggerParent = (gap = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap } },
})

export const dockSlide: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE.outExpo } },
  exit: { opacity: 0, y: 24, transition: { duration: DURATION.fast } },
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
}
