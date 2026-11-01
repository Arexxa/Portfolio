import { useEffect, useLayoutEffect, useRef } from 'react'

/** True when the event comes from a text field, where single-key shortcuts must not fire. */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT'
  )
}

/**
 * Calls `handler` when `key` is pressed outside text fields and without modifiers.
 * The latest handler is kept in a ref so callers don't need to memoise it.
 */
export function useHotkey(key: string, handler: (event: KeyboardEvent) => void, enabled = true) {
  const handlerRef = useRef(handler)
  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== key || event.ctrlKey || event.metaKey || event.altKey) return
      if (isTypingTarget(event.target)) return
      event.preventDefault()
      handlerRef.current(event)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key, enabled])
}
