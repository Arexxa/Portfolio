import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Pixels of vertical travel across the viewport. Negative moves against scroll. */
  distance?: number
}

/** Scroll-scrubbed vertical drift (transform only). No-op under reduced motion. */
export function Parallax({ children, className, distance = -60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !ref.current) return
      gsap.to(ref.current, {
        y: distance,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: ref, dependencies: [reduced, distance] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
