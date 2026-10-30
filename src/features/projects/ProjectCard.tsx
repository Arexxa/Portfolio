import { memo } from 'react'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/types/content'

interface ProjectCardProps {
  project: Project
  onSelect: (project: Project) => void
}

/** Grid item. Memoised: the grid re-renders on every filter change. */
export const ProjectCard = memo(function ProjectCard({ project, onSelect }: ProjectCardProps) {
  const cover = project.images[0]
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(project)}
        className="group flex h-full w-full flex-col overflow-hidden rounded-glass border border-white/10 bg-navy-800 text-left transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-cyan-glow/60"
      >
        {cover ? (
          <img
            src={cover.src}
            width={cover.width}
            height={cover.height}
            loading="lazy"
            decoding="async"
            alt={`${project.title} preview`}
            className="aspect-[2/1] w-full bg-navy-700 object-cover object-top"
          />
        ) : (
          <div
            aria-hidden="true"
            className="aspect-[2/1] w-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${project.color}55, transparent 70%), #0b1226`,
            }}
          />
        )}
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-ink-muted">{project.summary}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-2" aria-label="Tags">
            {project.tags.slice(0, 3).map((tag) => (
              <li key={tag}>
                <Badge>{tag}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </button>
    </li>
  )
})
