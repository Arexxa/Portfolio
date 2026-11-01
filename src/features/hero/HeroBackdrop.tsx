import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { onFirstInteraction, scheduleIdle } from '@/lib/idle'
import { cn } from '@/lib/cn'
import { CssGridFallback } from '@/features/hero/CssGridFallback'

const HeroCanvas = lazy(() => import('@/three/scenes/HeroCanvas'))

/** Medium-tier devices wait for intent (or this long) before downloading Three.js. */
const MEDIUM_TIER_DELAY_MS = 6000

interface HeroBackdropProps {
  /** False while the boot overlay is up, so the 3D chunk never competes with it. */
  enabled: boolean
}

/**
 * Hero background. Always paints the CSS grid first; on capable tiers the WebGL scene is
 * lazy-loaded after boot when the browser is idle, then cross-fades in. Any WebGL failure
 * (no context, lost context, render error) keeps the CSS grid.
 */
export function HeroBackdrop({ enabled }: HeroBackdropProps) {
  const { preset, name } = useDeviceTier()
  const [mount, setMount] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!enabled || !preset.webgl) return
    const start = () => setMount(true)
    return name === 'high' ? scheduleIdle(start) : onFirstInteraction(start, MEDIUM_TIER_DELAY_MS)
  }, [enabled, preset.webgl, name])

  const handleReady = useCallback(() => setReady(true), [])
  const handleError = useCallback(() => setFailed(true), [])
  const showCanvas = mount && !failed

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          showCanvas && ready && 'opacity-0',
        )}
      >
        <CssGridFallback />
      </div>
      {showCanvas && (
        <ErrorBoundary fallback={null} onError={handleError}>
          <Suspense fallback={null}>
            <div
              className={cn(
                'absolute inset-0 transition-opacity duration-700',
                ready ? 'opacity-100' : 'opacity-0',
              )}
            >
              <HeroCanvas onReady={handleReady} onError={handleError} />
            </div>
          </Suspense>
        </ErrorBoundary>
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-bg" />
    </div>
  )
}
