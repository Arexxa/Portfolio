import { useMemo } from 'react'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/projects'
import { sectionById } from '@/data/sections'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { MEDIA } from '@/lib/constants'
import { ProjectDesktop } from '@/features/projects/ProjectDesktop'
import { ProjectFilters } from '@/features/projects/ProjectFilters'
import { ProjectStack } from '@/features/projects/ProjectStack'
import { projectStore, useProjectView } from '@/features/projects/projectStore'
import { filterProjects, getFilterTags } from '@/features/projects/projectUtils'

const FILTER_TAGS = getFilterTags(projects)

/** Projects: tech filter, then draggable windows on desktop or a stacked list on smaller screens. */
export function ProjectsSection() {
  const { tag } = useProjectView()
  const desktop = useMediaQuery(MEDIA.desktop)
  const visible = useMemo(() => filterProjects(projects, tag), [tag])

  return (
    <Section meta={sectionById.projects}>
      <div className="flex flex-col gap-6">
        <ProjectFilters tags={FILTER_TAGS} selected={tag} onSelect={projectStore.setTag} />
        <p className="sr-only" role="status">
          {visible.length} projects shown
        </p>
        {visible.length === 0 ? (
          <div className="flex flex-col items-start gap-3 border border-dashed border-line p-6">
            <p className="text-ink-muted">No windows match #{tag}.</p>
            <Button variant="outline" size="sm" onClick={() => projectStore.setTag(null)}>
              Show all
            </Button>
          </div>
        ) : desktop ? (
          <ProjectDesktop projects={visible} onOpen={projectStore.open} />
        ) : (
          <ProjectStack projects={visible} onOpen={projectStore.open} />
        )}
      </div>
    </Section>
  )
}
