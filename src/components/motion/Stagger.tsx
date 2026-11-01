import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { fadeUp, staggerParent } from '@/lib/motion'

interface StaggerProps {
  children: ReactNode
  className?: string
  /** Seconds between each child. */
  gap?: number
  /** Render as a list (children must be <StaggerItem as="li">). */
  as?: 'div' | 'ul' | 'ol'
}

/** Staggers the entrance of its <StaggerItem> children when scrolled into view. */
export function Stagger({ children, className, gap = 0.06, as = 'div' }: StaggerProps) {
  const Tag = m[as]
  return (
    <Tag
      className={className}
      variants={staggerParent(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Tag>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}

/** Child of <Stagger>; inherits the parent's animation timing. */
export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const Tag = m[as]
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  )
}
