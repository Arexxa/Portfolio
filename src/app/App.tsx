import { useCallback, useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { SkipLink } from '@/components/layout/SkipLink'
import { sections } from '@/data/sections'
import { Hero } from '@/features/hero/Hero'
import { GalaxyLayer } from '@/features/galaxy-nav/GalaxyLayer'
import { PanelHost } from '@/features/galaxy-nav/PanelHost'
import { PlanetSection } from '@/features/galaxy-nav/PlanetSection'
import { useActiveSection } from '@/features/galaxy-nav/useActiveSection'
import { usePanelNavigation } from '@/features/galaxy-nav/usePanelNavigation'
import { ProjectPreviewCard } from '@/features/projects/ProjectPreviewCard'
import type { Project } from '@/types/content'

interface HoverState {
  project: Project
  point: { x: number; y: number } | null
}

/** App shell: wires the 3D layer events to the DOM layer (sections, panels, preview card). */
export function App() {
  const { active, open, close, flyTo } = usePanelNavigation()
  const activeSection = useActiveSection()
  const [sceneReady, setSceneReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  const [hover, setHover] = useState<HoverState | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const handleReady = useCallback(() => setSceneReady(true), [])
  const handleFallback = useCallback(() => {
    setFallback(true)
    setSceneReady(false)
  }, [])
  const handleHover = useCallback((project: Project | null, point?: { x: number; y: number }) => {
    setHover(project ? { project, point: point ?? null } : null)
  }, [])
  const handleSelectProject = useCallback(
    (project: Project) => {
      setHover(null)
      setProjectId(project.id)
      open('projects')
    },
    [open],
  )
  const handleClose = useCallback(() => {
    setProjectId(null)
    close()
  }, [close])

  return (
    <>
      <SkipLink />
      <GalaxyLayer
        onFallback={handleFallback}
        onReady={handleReady}
        onSelectPlanet={open}
        onSelectProject={handleSelectProject}
        onHoverProject={handleHover}
      />
      <Navbar active={activeSection} onNavigate={flyTo} />
      <div className="relative z-10">
        <main id="main" tabIndex={-1} className="pointer-events-none outline-none">
          <Hero sceneReady={sceneReady} onExplore={() => flyTo('about')} />
          {sections.map((section, index) => (
            <PlanetSection
              key={section.id}
              section={section}
              index={index}
              showOrb={fallback}
              onOpen={open}
            />
          ))}
        </main>
        <Footer />
      </div>
      <PanelHost active={active} projectId={projectId} onClose={handleClose} />
      <ProjectPreviewCard project={hover?.project ?? null} point={hover?.point ?? null} />
    </>
  )
}
