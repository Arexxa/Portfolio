import { useEffect } from 'react'
import { galaxyState } from '@/three/state'

/** Writes page scroll progress (0..1) into galaxyState without re-rendering. */
export function useScrollProgress(): void {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      galaxyState.progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
}
