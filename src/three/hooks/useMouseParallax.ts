import { useEffect } from 'react'
import { galaxyState } from '@/three/state'

/** Tracks the pointer (-1..1) into galaxyState.pointer for subtle parallax. */
export function useMouseParallax(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return
    const onMove = (event: PointerEvent) => {
      galaxyState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      galaxyState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])
}
