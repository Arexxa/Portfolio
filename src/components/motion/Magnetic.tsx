import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(useGSAP)

interface MagneticProps {
  children: ReactNode
  /** Fraction of the pointer offset the element follows. */
  strength?: number
}

/** Pulls its child toward the cursor. Disabled on touch devices and for reduced motion. */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const { isTouch } = useDeviceTier()

  useGSAP(
    () => {
      const el = ref.current
      if (!el || reduced || isTouch) return
      const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
      const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })
      const onMove = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect()
        x((event.clientX - (rect.left + rect.width / 2)) * strength)
        y((event.clientY - (rect.top + rect.height / 2)) * strength)
      }
      const onLeave = () => {
        x(0)
        y(0)
      }
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)
      return () => {
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: ref, dependencies: [reduced, isTouch, strength] },
  )

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  )
}
