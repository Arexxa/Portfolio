import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/types/content'

interface ProjectPreviewCardProps {
  project: Project | null
  /** Initial pointer position from the 3D hover event. */
  point: { x: number; y: number } | null
}

const OFFSET = 18

/** Floating card that follows the pointer while a moon is hovered. Position is written via ref. */
export function ProjectPreviewCard({ project, point }: ProjectPreviewCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const place = (x: number, y: number) => {
      const el = ref.current
      if (!el) return
      const left = Math.min(x + OFFSET, window.innerWidth - el.offsetWidth - 12)
      const top = Math.min(y + OFFSET, window.innerHeight - el.offsetHeight - 12)
      el.style.transform = `translate3d(${Math.max(12, left)}px, ${Math.max(12, top)}px, 0)`
    }
    if (point) place(point.x, point.y)
    const onMove = (event: PointerEvent) => place(event.clientX, event.clientY)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [project, point])

  if (!project) return null
  const cover = project.images[0]
  return (
    <div
      ref={ref}
      role="status"
      className="glass pointer-events-none fixed left-0 top-0 z-30 w-64 overflow-hidden rounded-md"
    >
      {cover && (
        <img
          src={cover.src}
          width={cover.width}
          height={cover.height}
          alt=""
          className="aspect-[2/1] w-full object-cover object-top"
        />
      )}
      <div className="flex flex-col gap-2 p-3">
        <p className="font-semibold" style={{ color: project.color }}>
          {project.title}
        </p>
        <p className="text-xs text-ink-muted">{project.summary}</p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <p className="text-xs text-cyan-glow">Click to open</p>
      </div>
    </div>
  )
}
