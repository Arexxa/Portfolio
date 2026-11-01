import { ProjectWindow } from '@/features/projects/ProjectWindow'
import type { Project } from '@/types/content'

interface ProjectStackProps {
  projects: readonly Project[]
  onOpen: (id: string) => void
}

/** Phones and tablets: windows stacked in a simple grid (no dragging, which would fight scrolling). */
export function ProjectStack({ projects, onOpen }: ProjectStackProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.id} className="flex">
          <ProjectWindow project={project} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}
