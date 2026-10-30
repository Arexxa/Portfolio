import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Project } from '@/types/content'

interface ProjectDetailProps {
  project: Project
  onBack: () => void
}

/** Full project view with screenshots, highlights and links. */
export function ProjectDetail({ project, onBack }: ProjectDetailProps) {
  return (
    <article className="flex flex-col gap-5" aria-labelledby="project-title">
      <Button variant="ghost" size="sm" onClick={onBack} className="self-start">
        &larr; All projects
      </Button>
      <header>
        <p className="font-mono text-xs uppercase tracking-widest text-ember">
          {project.role}
          {project.period && ` · ${project.period}`}
        </p>
        <h3 id="project-title" className="mt-1 text-3xl font-bold">
          {project.title}
        </h3>
        <p className="mt-2 text-lg text-ink-muted">{project.summary}</p>
      </header>
      {project.images.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {project.images.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              width={image.width}
              height={image.height}
              loading="lazy"
              decoding="async"
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full rounded-md border border-white/10 bg-navy-700"
            />
          ))}
        </div>
      )}
      <ul className="list-disc space-y-1.5 pl-5 marker:text-cyan-glow">
        {project.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-2" aria-label="Tags">
        {project.tags.map((tag) => (
          <li key={tag}>
            <Badge tone="cyan">{tag}</Badge>
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
              {link.label} &#8599;
            </Button>
          ))}
        </div>
      )}
    </article>
  )
}
