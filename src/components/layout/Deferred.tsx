import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

interface DeferredProps {
  /** Usually a React.lazy component: its chunk is only requested once this mounts. */
  children: ReactNode
  /** Placeholder shown until visible and while loading; reserve the final height to avoid layout shift. */
  fallback: ReactNode
  errorFallback: ReactNode
  /** How early to start loading, before the placeholder scrolls into view. */
  rootMargin?: string
}

/** Mounts heavy, below-the-fold content only when it approaches the viewport. */
export function Deferred({
  children,
  fallback,
  errorFallback,
  rootMargin = '800px',
}: DeferredProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return
    const observer = new IntersectionObserver(
      ([entry]) => entry?.isIntersecting && setVisible(true),
      {
        rootMargin,
      },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible, rootMargin])

  return (
    <div ref={ref}>
      {visible ? (
        <ErrorBoundary fallback={errorFallback}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      ) : (
        fallback
      )}
    </div>
  )
}
