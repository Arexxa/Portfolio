import { ProjectCard } from '@/features/projects/ProjectCard'
import type { Project } from '@/types/content'

interface ProjectGridProps {
  projects: readonly Project[]
  onSelect: (project: Project) => void
}

/** Responsive grid with an empty state. */
export function ProjectGrid({ projects, onSelect }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="py-10 text-center text-ink-muted">No projects match this filter yet.</p>
  }
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onSelect={onSelect} />
      ))}
    </ul>
  )
}
