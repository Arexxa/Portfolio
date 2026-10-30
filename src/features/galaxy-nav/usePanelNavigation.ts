import { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { isPlanetId } from '@/data/sections'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CAMERA, DURATION, EASE, PLANETS } from '@/lib/constants'
import { galaxyState } from '@/three/state'
import type { PlanetId, SectionId } from '@/types/content'

const SCROLL_SECONDS = 1.2
const SECTION_PREFIX = 'section-'

function readHash(): PlanetId | null {
  const id = window.location.hash.slice(1)
  return isPlanetId(id) ? id : null
}

export interface PanelNavigation {
  active: PlanetId | null
  /** Fly the camera to a planet, then open its panel. */
  open: (id: PlanetId) => void
  close: () => void
  /** Fly to a section without opening a panel. */
  flyTo: (id: SectionId) => void
}

/**
 * Coordinates scroll flight, camera zoom (galaxyState.focus) and the open panel, and keeps
 * the panel in sync with the URL hash so deep links and the back button work.
 */
export function usePanelNavigation(): PanelNavigation {
  const lenis = useLenis()
  const reduced = useReducedMotion()
  const [active, setActive] = useState<PlanetId | null>(readHash)
  const timeline = useRef<gsap.core.Tween | null>(null)

  const focusOn = useCallback(
    (id: PlanetId | null, onComplete?: () => void) => {
      timeline.current?.kill()
      if (id) galaxyState.focusIndex = PLANETS.findIndex((planet) => planet.id === id)
      const focus = id ? CAMERA.focusAmount : 0
      if (reduced) {
        galaxyState.focus = focus
        onComplete?.()
        return
      }
      timeline.current = gsap.to(galaxyState, {
        focus,
        duration: DURATION.cameraFocus,
        ease: EASE.inOut,
        onComplete,
      })
    },
    [reduced],
  )

  const flyTo = useCallback(
    (id: SectionId) => {
      const element = document.getElementById(`${SECTION_PREFIX}${id}`)
      if (!element) return
      if (lenis) lenis.scrollTo(element, { duration: SCROLL_SECONDS })
      else element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    },
    [lenis, reduced],
  )

  const open = useCallback(
    (id: PlanetId) => {
      flyTo(id)
      focusOn(id, () => {
        window.history.pushState({ panel: true }, '', `#${id}`)
        setActive(id)
      })
    },
    [flyTo, focusOn],
  )

  const close = useCallback(() => {
    setActive(null)
    focusOn(null)
    if (window.history.state?.panel) window.history.back()
    else window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }, [focusOn])

  useEffect(() => {
    const initial = readHash()
    if (!initial) return
    galaxyState.focusIndex = PLANETS.findIndex((planet) => planet.id === initial)
    galaxyState.focus = CAMERA.focusAmount
    document.getElementById(`${SECTION_PREFIX}${initial}`)?.scrollIntoView()
  }, [])

  useEffect(() => {
    const onPopState = () => {
      const id = readHash()
      setActive(id)
      focusOn(id)
    }
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('popstate', onPopState)
      timeline.current?.kill()
    }
  }, [focusOn])

  return { active, open, close, flyTo }
}

export const sectionDomId = (id: SectionId): string => `${SECTION_PREFIX}${id}`
