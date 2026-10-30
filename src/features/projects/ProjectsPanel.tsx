import { useMemo, useState } from 'react'
import { Stagger } from '@/components/motion/Stagger'
import { projects } from '@/data/projects'
import { ProjectDetail } from '@/features/projects/ProjectDetail'
import { ProjectFilters } from '@/features/projects/ProjectFilters'
import { ProjectGrid } from '@/features/projects/ProjectGrid'
import { filterProjects, getFilterTags } from '@/features/projects/projectUtils'
import type { Project } from '@/types/content'

interface ProjectsPanelProps {
  /** Project to open straight away (when a moon was clicked in 3D). */
  initialProjectId?: string | null
}

const FILTER_TAGS = getFilterTags(projects)

/** Projects panel: filterable grid that drills into a project detail view. */
export default function ProjectsPanel({ initialProjectId = null }: ProjectsPanelProps) {
  const [tag, setTag] = useState<string | null>(null)
  const [selected, setSelected] = useState<Project | null>(
    () => projects.find((project) => project.id === initialProjectId) ?? null,
  )
  const visible = useMemo(() => filterProjects(projects, tag), [tag])

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelected(null)} />
  return (
    <Stagger className="flex flex-col gap-6">
      <ProjectFilters tags={FILTER_TAGS} selected={tag} onSelect={setTag} />
      <ProjectGrid projects={visible} onSelect={setSelected} />
    </Stagger>
  )
}
