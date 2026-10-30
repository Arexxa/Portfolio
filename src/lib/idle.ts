/** Run `callback` when the browser is idle (falls back to a timeout). Returns a canceller. */
export function scheduleIdle(callback: () => void, timeout = 1500): () => void {
  if (typeof window.requestIdleCallback === 'function') {
    const handle = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback(handle)
  }
  const handle = globalThis.setTimeout(callback, 200)
  return () => globalThis.clearTimeout(handle)
}

const INTERACTION_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const

/** Run `callback` on the first user interaction, or after `fallbackMs`. Returns a canceller. */
export function onFirstInteraction(callback: () => void, fallbackMs: number): () => void {
  let done = false
  const cleanup = () => {
    INTERACTION_EVENTS.forEach((name) => window.removeEventListener(name, run))
    globalThis.clearTimeout(timer)
  }
  function run() {
    if (done) return
    done = true
    cleanup()
    callback()
  }
  INTERACTION_EVENTS.forEach((name) =>
    window.addEventListener(name, run, { passive: true, once: true }),
  )
  const timer = globalThis.setTimeout(run, fallbackMs)
  return cleanup
}
