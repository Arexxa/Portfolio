/** Selector of the first form field (targeted by the terminal `contact` command). */
export const CONTACT_FIELD_ID = 'contact-name'

let pending = false

/**
 * Focus the first contact field now, or as soon as the lazily loaded form mounts.
 * Returns the selector so callers can pass it to navigation.
 */
export function requestContactFocus(): string {
  pending = !document.getElementById(CONTACT_FIELD_ID)
  return `#${CONTACT_FIELD_ID}`
}

/** Called by ContactForm on mount: true once if a focus request is waiting. */
export function consumeContactFocus(): boolean {
  const value = pending
  pending = false
  return value
}
