import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { LazyMotion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { DraggableProjectWindow } from '@/features/projects/DraggableProjectWindow'
import { useWindowStack } from '@/features/projects/useWindowStack'
import { windowLayout } from '@/features/projects/windowLayout'
import type { Project } from '@/types/content'

const loadDragFeatures = () =>
  import('@/features/projects/motionFeatures').then((mod) => mod.default)
const RESIZE_DEBOUNCE_MS = 150

interface ProjectDesktopProps {
  projects: readonly Project[]
  onOpen: (id: string) => void
}

/** Tracks the desktop's width (debounced) so the cascade can be re-tiled on resize. */
function useWidth(ref: RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    let timer = 0
    setWidth(element.clientWidth)
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setWidth(element.clientWidth), RESIZE_DEBOUNCE_MS)
    })
    observer.observe(element)
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
    }
  }, [ref])
  return width
}

/** Draggable window desktop (>= lg). Drag features are fetched lazily on mount. */
export function ProjectDesktop({ projects, onOpen }: ProjectDesktopProps) {
  const desktopRef = useRef<HTMLDivElement>(null)
  const width = useWidth(desktopRef)
  const [tiles, setTiles] = useState(0)
  const ids = useMemo(() => projects.map((project) => project.id), [projects])
  const { bringToFront, reset, zIndexOf } = useWindowStack(ids)
  const layout = useMemo(() => windowLayout(projects.length, width), [projects.length, width])
  // Remount windows (resetting their dragged offsets) whenever the layout is recomputed.
  const layoutKey = `${tiles}-${width}-${ids.join()}`

  const tile = () => {
    reset()
    setTiles((count) => count + 1)
  }

  return (
    <LazyMotion features={loadDragFeatures}>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4 text-xs text-ink-muted">
          <p>Drag windows by their title bar, or focus it and use the arrow keys.</p>
          <Button variant="ghost" size="sm" onClick={tile}>
            Tile windows
          </Button>
        </div>
        <div
          ref={desktopRef}
          className="relative border border-dashed border-line bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:24px_24px]"
          style={{ height: layout.height }}
        >
          {width > 0 &&
            projects.map((project, index) => (
              <DraggableProjectWindow
                key={`${project.id}-${layoutKey}`}
                project={project}
                position={layout.positions[index] ?? { x: 0, y: 0 }}
                zIndex={zIndexOf(project.id)}
                desktopRef={desktopRef}
                onFocus={bringToFront}
                onOpen={onOpen}
              />
            ))}
        </div>
      </div>
    </LazyMotion>
  )
}
