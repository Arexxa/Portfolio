import type { PlanetId, Project } from '@/types/content'

/** Events the 3D layer emits to the UI layer. The 3D code never imports UI code. */
export interface GalaxyHandlers {
  onSelectPlanet: (id: PlanetId) => void
  onSelectProject: (project: Project) => void
  onHoverProject: (project: Project | null, point?: { x: number; y: number }) => void
  /** Called once the name particles are built. */
  onReady?: () => void
  /** Called when WebGL fails (context lost). */
  onError?: () => void
}
