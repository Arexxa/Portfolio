import { useEffect, useRef } from 'react'
import { sections } from '@/data/sections'
import type { NavigateFn } from '@/features/navigation/useSectionNavigation'

/** Once the boot is over, honour a `#section` in the URL (e.g. shared links to #projects). */
export function useDeepLink(ready: boolean, navigate: NavigateFn) {
  const handled = useRef(false)
  useEffect(() => {
    if (!ready || handled.current) return
    handled.current = true
    const id = window.location.hash.slice(1)
    const section = sections.find((item) => item.id === id)
    if (section) navigate(section.id)
  }, [ready, navigate])
}
