import { FLASH_MS } from '@/lib/constants'
import type { SectionId } from '@/types/content'

export interface ScrollOptions {
  reducedMotion: boolean
  /** CSS selector to focus instead of the section heading (e.g. a form field). */
  focusSelector?: string
}

const flashTimers = new WeakMap<HTMLElement, number>()

function flash(section: HTMLElement, reducedMotion: boolean) {
  if (reducedMotion) return
  window.clearTimeout(flashTimers.get(section))
  section.dataset.flash = 'false'
  // Force a style flush so re-triggering the same section restarts the CSS animation.
  void section.offsetWidth
  section.dataset.flash = 'true'
  flashTimers.set(
    section,
    window.setTimeout(() => {
      section.dataset.flash = 'false'
    }, FLASH_MS),
  )
}

/**
 * Scrolls to a section, moves focus to its heading (so keyboard and screen-reader users
 * land in the right place), updates the URL hash and pulses the window frame.
 */
export function scrollToSection(id: SectionId, { reducedMotion, focusSelector }: ScrollOptions) {
  const section = document.getElementById(id)
  if (!section) return
  section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  const target =
    (focusSelector && document.querySelector<HTMLElement>(focusSelector)) ||
    document.getElementById(`${id}-title`)
  target?.focus({ preventScroll: true })
  window.history.replaceState(null, '', id === 'hero' ? window.location.pathname : `#${id}`)
  flash(section, reducedMotion)
}
