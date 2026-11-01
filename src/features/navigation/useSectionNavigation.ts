import { useCallback } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { scrollToSection } from '@/features/navigation/scrollToSection'
import type { SectionId } from '@/types/content'

export type NavigateFn = (id: SectionId, focusSelector?: string) => void

/** Returns a stable `navigate(id)` that scrolls, focuses and flashes a section. */
export function useSectionNavigation(): NavigateFn {
  const reducedMotion = useReducedMotion()
  return useCallback(
    (id, focusSelector) => scrollToSection(id, { reducedMotion, focusSelector }),
    [reducedMotion],
  )
}
