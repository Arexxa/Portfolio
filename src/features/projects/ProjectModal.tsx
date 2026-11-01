import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Modal } from '@/components/ui/Modal'
import { projects } from '@/data/projects'
import { findProject } from '@/features/projects/projectUtils'
import { projectStore, useProjectView } from '@/features/projects/projectStore'

const ProjectDetail = lazy(() => import('@/features/projects/ProjectDetail'))
const TITLE_ID = 'project-dialog-title'

/** Detail dialog for the project in `projectStore.openId`. Content is a lazy chunk. */
export function ProjectModal() {
  const { openId } = useProjectView()
  const project = openId ? findProject(projects, openId) : undefined

  return (
    <Modal
      open={!!project}
      onClose={projectStore.close}
      labelledBy={TITLE_ID}
      title={`~/projects/${project?.id ?? ''}`}
    >
      {project && (
        <ErrorBoundary
          fallback={
            <p className="text-danger">Could not load this project. Close and try again.</p>
          }
        >
          <Suspense fallback={<p className="text-ink-muted">loading {project.id}...</p>}>
            <ProjectDetail project={project} titleId={TITLE_ID} />
          </Suspense>
        </ErrorBoundary>
      )}
    </Modal>
  )
}
