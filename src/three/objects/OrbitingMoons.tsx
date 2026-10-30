import { useEffect, useMemo, useRef } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import { Color, MathUtils, SphereGeometry, type Group, type Mesh } from 'three'
import { MOON } from '@/lib/constants'
import type { Project } from '@/types/content'

interface OrbitingMoonsProps {
  projects: readonly Project[]
  planetRadius: number
  animate: boolean
  onHover: (project: Project | null, point?: { x: number; y: number }) => void
  onSelect: (project: Project) => void
}

interface MoonProps {
  project: Project
  index: number
  planetRadius: number
  animate: boolean
  geometry: SphereGeometry
  onHover: OrbitingMoonsProps['onHover']
  onSelect: OrbitingMoonsProps['onSelect']
}

function Moon({ project, index, planetRadius, animate, geometry, onHover, onSelect }: MoonProps) {
  const pivot = useRef<Group>(null)
  const mesh = useRef<Mesh>(null)
  const state = useRef({ hovered: false, scale: 1 })
  const orbit = planetRadius + MOON.orbitBase + index * MOON.orbitStep
  const tilt = useMemo(() => MathUtils.degToRad(((index * 37) % 50) - 25), [index])
  const phase = useMemo(() => index * 1.9, [index])
  const color = useMemo(() => new Color(project.color), [project.color])

  useFrame((_, delta) => {
    const s = state.current
    if (pivot.current && animate && !s.hovered) {
      pivot.current.rotation.y += (delta * MOON.speedBase) / (1 + index * 0.35)
    }
    s.scale = MathUtils.damp(s.scale, s.hovered ? 1.7 : 1, 8, delta)
    mesh.current?.scale.setScalar(s.scale)
  })

  const hover = (event: ThreeEvent<PointerEvent>, value: boolean) => {
    event.stopPropagation()
    state.current.hovered = value
    document.body.style.cursor = value ? 'pointer' : ''
    onHover(value ? project : null, { x: event.clientX, y: event.clientY })
  }

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={pivot} rotation={[0, phase, 0]}>
        <mesh
          ref={mesh}
          geometry={geometry}
          position={[orbit, 0, 0]}
          onPointerOver={(event) => hover(event, true)}
          onPointerOut={(event) => hover(event, false)}
          onClick={(event) => {
            event.stopPropagation()
            onSelect(project)
          }}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.55}
            roughness={0.5}
          />
        </mesh>
      </group>
    </group>
  )
}

/** Projects as moons orbiting a planet. Hover pauses a moon and previews its project. */
export function OrbitingMoons({
  projects,
  planetRadius,
  animate,
  onHover,
  onSelect,
}: OrbitingMoonsProps) {
  const geometry = useMemo(() => new SphereGeometry(MOON.radius, 24, 24), [])
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <group>
      {projects.slice(0, MOON.maxOrbiting).map((project, index) => (
        <Moon
          key={project.id}
          project={project}
          index={index}
          planetRadius={planetRadius}
          animate={animate}
          geometry={geometry}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
    </group>
  )
}
