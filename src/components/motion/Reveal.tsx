import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { DURATION, EASE } from '@/lib/constants'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
  y?: number
}

/** Fades and lifts content in when it scrolls into view. No-op under reduced motion. */
export function Reveal({ children, as: Tag = 'div', className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      gsap.from(ref.current, {
        opacity: 0,
        y,
        delay,
        duration: DURATION.slow,
        ease: EASE.outExpo,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      })
    },
    { scope: ref, dependencies: [reduced, y, delay] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
