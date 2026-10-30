import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AmbientDrone } from '@/features/audio/ambientDrone'
import { AudioStateContext } from '@/features/audio/useAudio'

interface AudioProviderProps {
  children: ReactNode
}

/** Owns the single drone instance. Never autoplays: only starts from the toggle. */
export function AudioProvider({ children }: AudioProviderProps) {
  const [enabled, setEnabled] = useState(false)
  const drone = useRef<AmbientDrone | null>(null)

  const toggle = useCallback(() => {
    drone.current ??= new AmbientDrone()
    const next = !enabled
    setEnabled(next)
    void (next ? drone.current.start() : drone.current.stop())
  }, [enabled])

  useEffect(() => {
    const onVisibility = () => {
      if (!enabled || !drone.current) return
      void (document.hidden ? drone.current.stop() : drone.current.start())
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [enabled])

  useEffect(
    () => () => {
      drone.current?.dispose()
      drone.current = null
    },
    [],
  )

  const value = useMemo(() => ({ enabled, toggle }), [enabled, toggle])
  return <AudioStateContext.Provider value={value}>{children}</AudioStateContext.Provider>
}
