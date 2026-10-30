import { lazy, Suspense, type ComponentType } from 'react'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { Modal } from '@/components/ui/Modal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { sectionById } from '@/data/sections'
import type { PlanetId } from '@/types/content'

interface ProjectsPanelProps {
  initialProjectId?: string | null
}

/** Panels are code-split: each one only downloads when first opened. */
const PANELS: Record<PlanetId, ComponentType<ProjectsPanelProps>> = {
  about: lazy(() => import('@/features/about/AboutPanel')),
  experience: lazy(() => import('@/features/experience/ExperiencePanel')),
  skills: lazy(() => import('@/features/skills/SkillsPanel')),
  projects: lazy(() => import('@/features/projects/ProjectsPanel')),
  contact: lazy(() => import('@/features/contact/ContactPanel')),
}

interface PanelHostProps {
  active: PlanetId | null
  projectId: string | null
  onClose: () => void
}

const TITLE_ID = 'panel-title'

/** Glass dialog that hosts the active planet's content. */
export function PanelHost({ active, projectId, onClose }: PanelHostProps) {
  const section = active ? sectionById[active] : null
  const Panel = active ? PANELS[active] : null

  return (
    <Modal open={!!active} onClose={onClose} labelledBy={TITLE_ID}>
      {section && Panel && (
        <div className="flex flex-col gap-8">
          <div className="flex items-start justify-between gap-4">
            <SectionHeading id={TITLE_ID} eyebrow={section.eyebrow} title={section.title} as="h2" />
            <button
              type="button"
              onClick={onClose}
              aria-label={`Close ${section.title} panel`}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl transition-colors hover:border-cyan-glow hover:text-cyan-glow"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <ErrorBoundary
            fallback={
              <p className="text-ember">
                This panel failed to load. Please close it and try again.
              </p>
            }
          >
            <Suspense fallback={<p className="text-ink-muted">Loading...</p>}>
              <Panel initialProjectId={projectId} />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
    </Modal>
  )
}
