import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import type { Project } from '@/types/content'

interface ProjectDetailProps {
  project: Project
  titleId: string
}

/** Full project view with screenshots, highlights, stack and links. Default export for lazy loading. */
export default function ProjectDetail({ project, titleId }: ProjectDetailProps) {
  return (
    <article className="flex flex-col gap-6" aria-labelledby={titleId}>
      <header>
        <p className="text-xs uppercase tracking-[0.18em] text-secondary">
          {project.role}
          {project.period && ` · ${project.period}`}
        </p>
        <h2 id={titleId} className="mt-2 text-3xl font-bold sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl text-ink-muted">{project.summary}</p>
      </header>

      {project.images.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2" aria-label="Screenshots">
          {project.images.map((image, index) => (
            <li key={image.src}>
              <ResponsiveImage
                image={image}
                alt={`${project.title} screenshot ${index + 1}`}
                sizes="(min-width: 640px) 440px, 100vw"
                className="border border-line"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="border border-dashed border-line p-6 text-center text-sm text-ink-muted">
          No public captures for this project.
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span aria-hidden="true" className="text-primary">
              +
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="flex flex-wrap gap-1.5" aria-label="Tech stack">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge tone={project.accent}>{tag}</Badge>
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              variant="outline"
            >
              {link.label}
              <Icon name="external" className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </Button>
          ))}
        </div>
      )}
    </article>
  )
}
