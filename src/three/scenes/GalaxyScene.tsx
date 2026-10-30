import { lazy, Suspense } from 'react'
import { useThree } from '@react-three/fiber'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { COLORS, PLANETS } from '@/lib/constants'
import { projects } from '@/data/projects'
import { useMouseParallax } from '@/three/hooks/useMouseParallax'
import { useScrollProgress } from '@/three/hooks/useScrollProgress'
import { CameraRig } from '@/three/objects/CameraRig'
import { NameParticles } from '@/three/objects/NameParticles'
import { OrbitingMoons } from '@/three/objects/OrbitingMoons'
import { Planet } from '@/three/objects/Planet'
import { Starfield } from '@/three/objects/Starfield'
import type { GalaxyHandlers } from '@/three/scenes/types'

const Effects = lazy(() => import('@/three/objects/Effects'))

/** Composition of the whole galaxy. Pure composition: all logic lives in hooks/objects. */
export function GalaxyScene({
  onSelectPlanet,
  onSelectProject,
  onHoverProject,
  onReady,
}: GalaxyHandlers) {
  const { preset, reducedMotion, isTouch } = useDeviceTier()
  const aspect = useThree((state) => state.size.width / state.size.height)
  const dpr = useThree((state) => state.viewport.dpr)
  const animate = !reducedMotion

  useScrollProgress()
  useMouseParallax(animate && !isTouch)

  return (
    <>
      <color attach="background" args={[COLORS.void]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 6, 8]} intensity={1.4} />
      <Starfield count={preset.stars} pixelRatio={dpr} animate={animate} />
      <NameParticles
        count={preset.nameParticles}
        animate={animate}
        pixelRatio={dpr}
        onReady={onReady}
      />
      {PLANETS.map((config, index) => (
        <Planet
          key={config.id}
          config={config}
          segments={preset.planetSegments}
          animate={animate}
          stop={(index + 1) / PLANETS.length}
          onSelect={onSelectPlanet}
        >
          {config.id === 'projects' && (
            <OrbitingMoons
              projects={projects}
              planetRadius={config.radius}
              animate={animate}
              onHover={onHoverProject}
              onSelect={onSelectProject}
            />
          )}
        </Planet>
      ))}
      <CameraRig narrow={aspect < 1} animate={animate} />
      {preset.bloom && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </>
  )
}
