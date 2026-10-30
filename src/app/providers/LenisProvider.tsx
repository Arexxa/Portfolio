import { useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LenisContext } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface LenisProviderProps {
  children: ReactNode
}

gsap.registerPlugin(ScrollTrigger)

/**
 * Creates the single Lenis instance and drives it from the GSAP ticker, so Lenis,
 * ScrollTrigger and tweens share one requestAnimationFrame loop.
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const reduced = useReducedMotion()
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9 })
    const onTick = (time: number) => instance.raf(time * 1000)
    instance.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    setLenis(instance)
    return () => {
      gsap.ticker.remove(onTick)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
