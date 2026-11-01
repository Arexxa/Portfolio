import { useEffect } from 'react'
import { heroState } from '@/three/state'

/** Tracks the pointer (-1..1) into heroState.pointer for camera parallax. No re-renders. */
export function useMouseParallax(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return
    const onMove = (event: PointerEvent) => {
      heroState.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      heroState.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      heroState.pointer.x = 0
      heroState.pointer.y = 0
    }
  }, [enabled])
}
