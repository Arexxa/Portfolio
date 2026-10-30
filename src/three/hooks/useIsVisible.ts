import { useEffect, useState, type RefObject } from 'react'

/** True while the element intersects the viewport (with margin) and the tab is visible. */
export function useIsVisible(ref: RefObject<Element | null>, rootMargin = '200px'): boolean {
  const [intersecting, setIntersecting] = useState(true)
  const [tabVisible, setTabVisible] = useState(!document.hidden)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(!!entry?.isIntersecting),
      {
        rootMargin,
      },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, rootMargin])

  useEffect(() => {
    const onChange = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return intersecting && tabVisible
}
