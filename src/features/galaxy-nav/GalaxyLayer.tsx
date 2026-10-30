import { lazy, Suspense, useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { onFirstInteraction, scheduleIdle } from '@/lib/idle'
import type { GalaxyHandlers } from '@/three/scenes/types'

const MEDIUM_TIER_DELAY_MS = 6000
const GalaxyCanvas = lazy(() => import('@/three/scenes/GalaxyCanvas'))

function StaticSky() {
  return <div aria-hidden="true" className="static-sky fixed inset-0 z-0" />
}

interface GalaxyLayerProps extends Omit<GalaxyHandlers, 'onError'> {
  onFallback: () => void
}

/**
 * Background layer. Always paints the CSS sky first; the heavy WebGL chunk is loaded
 * after first paint (idle) and only on tiers that support it.
 */
export function GalaxyLayer({ onFallback, ...handlers }: GalaxyLayerProps) {
  const { preset, name } = useDeviceTier()
  const [mount, setMount] = useState(false)

  useEffect(() => {
    if (!preset.webgl) {
      onFallback()
      return
    }
    const start = () => setMount(true)
    // High tier boots when idle; medium (phones/low-power) waits for intent to protect first-load performance.
    return name === 'high' ? scheduleIdle(start) : onFirstInteraction(start, MEDIUM_TIER_DELAY_MS)
  }, [preset.webgl, name, onFallback])

  if (!mount) return <StaticSky />
  return (
    <ErrorBoundary fallback={<StaticSky />} onError={onFallback}>
      <StaticSky />
      <Suspense fallback={null}>
        <GalaxyCanvas {...handlers} onError={onFallback} />
      </Suspense>
    </ErrorBoundary>
  )
}
