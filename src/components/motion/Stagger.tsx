import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { DURATION, EASE } from '@/lib/constants'

gsap.registerPlugin(useGSAP)

interface StaggerProps {
  children: ReactNode
  as?: ElementType
  className?: string
  /** Seconds between each direct child. */
  gap?: number
  /** Re-run when this key changes (e.g. when a panel opens). */
  runKey?: string
}

/** Staggers the entrance of its direct children on mount. No-op under reduced motion. */
export function Stagger({
  children,
  as: Tag = 'div',
  className,
  gap = 0.07,
  runKey,
}: StaggerProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      gsap.from(ref.current.children, {
        opacity: 0,
        y: 20,
        duration: DURATION.base + 0.2,
        stagger: gap,
        ease: EASE.outExpo,
      })
    },
    { scope: ref, dependencies: [reduced, gap, runKey] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
