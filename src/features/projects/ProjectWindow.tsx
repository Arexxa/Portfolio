import { memo, type ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Window } from '@/components/ui/Window'
import { cn } from '@/lib/cn'
import type { AccentToken, Project } from '@/types/content'

const ACCENT_TEXT: Record<AccentToken, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
}

const MAX_TAGS = 4

interface ProjectWindowProps {
  project: Project
  onOpen: (id: string) => void
  /** Replaces the title-bar label, e.g. with a drag handle. */
  handle?: ReactNode
  className?: string
}

/** A project rendered as an OS window: capture, summary, stack tags and an Open action. */
export const ProjectWindow = memo(function ProjectWindow({
  project,
  onOpen,
  handle,
  className,
}: ProjectWindowProps) {
  const cover = project.images[0]
  const titleId = `project-${project.id}-name`
  const extraTags = project.tags.length - MAX_TAGS

  return (
    <Window
      as="article"
      aria-labelledby={titleId}
      title={handle ?? `~/projects/${project.id}`}
      status="RUN"
      className={cn('w-full', className)}
      bodyClassName="flex flex-col p-0 sm:p-0"
    >
      {cover ? (
        <ResponsiveImage
          image={cover}
          alt={`${project.title} screenshot`}
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[2/1] border-b border-line"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex aspect-[2/1] items-center justify-center border-b border-line bg-surface-2 text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted"
        >
          no capture // {project.tags[0]}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 id={titleId} className={cn('text-lg font-semibold', ACCENT_TEXT[project.accent])}>
            {project.title}
          </h3>
          <p className="text-xs text-ink-muted">
            {project.role}
            {project.period && ` · ${project.period}`}
          </p>
        </div>
        <p className="line-clamp-3 text-sm">{project.summary}</p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tags.slice(0, MAX_TAGS).map((tag) => (
            <li key={tag}>
              <Badge tone={project.accent}>{tag}</Badge>
            </li>
          ))}
          {extraTags > 0 && <li className="self-center text-xs text-ink-muted">+{extraTags}</li>}
        </ul>
        <Button
          variant="outline"
          size="sm"
          className="mt-auto self-start"
          onClick={() => onOpen(project.id)}
        >
          Open<span className="sr-only"> {project.title} details</span>
        </Button>
      </div>
    </Window>
  )
})
