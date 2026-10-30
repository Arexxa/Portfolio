import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** id of the heading that labels the section (a11y). */
  labelledBy: string
}

/** One viewport-tall flight stop. Ignores pointer events so the 3D canvas stays clickable. */
export function Section({ labelledBy, className, ...props }: SectionProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn('pointer-events-none relative flex min-h-svh flex-col', className)}
      {...props}
    />
  )
}
