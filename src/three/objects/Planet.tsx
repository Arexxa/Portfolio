import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useFrame, type ThreeEvent } from '@react-three/fiber'
import type { Group } from 'three'
import {
  AdditiveBlending,
  BackSide,
  Color,
  DoubleSide,
  MathUtils,
  ShaderMaterial,
  Vector3,
  type Mesh,
} from 'three'
import type { PlanetConfig } from '@/lib/constants'
import { galaxyState } from '@/three/state'
import atmosphereFrag from '@/three/shaders/atmosphere.frag?raw'
import atmosphereVert from '@/three/shaders/atmosphere.vert?raw'
import planetFrag from '@/three/shaders/planet.frag?raw'
import planetVert from '@/three/shaders/planet.vert?raw'
import ringFrag from '@/three/shaders/ring.frag?raw'
import ringVert from '@/three/shaders/ring.vert?raw'

interface PlanetProps {
  config: PlanetConfig
  segments: number
  animate: boolean
  /** Scroll progress (0..1) at which the camera rests at this planet. */
  stop: number
  onSelect: (id: PlanetConfig['id']) => void
  children?: ReactNode
}

const LIGHT_DIR = new Vector3(-0.5, 0.6, 0.7).normalize()
const ATMOSPHERE_BASE = 2.2
const ATMOSPHERE_SCALE = 1.2
/** Planets grow in as the camera approaches and shrink away after passing (progress distance). */
const PRESENCE_NEAR = 0.08
const PRESENCE_FAR = 0.18
const RING_RADII = { inner: 1.35, outer: 2.2 }
const RING_INNER = RING_RADII.inner / RING_RADII.outer

/** Shader planet: procedural surface, fresnel atmosphere, slow spin, optional ring. */
export function Planet({ config, segments, animate, stop, onSelect, children }: PlanetProps) {
  const body = useRef<Mesh>(null)
  const root = useRef<Group>(null)
  const hover = useRef({ target: 0 })

  const [surface, atmosphere, ring] = useMemo(() => {
    const surfaceMaterial = new ShaderMaterial({
      vertexShader: planetVert,
      fragmentShader: planetFrag,
      uniforms: {
        uBase: { value: new Color(config.base) },
        uAccent: { value: new Color(config.accent) },
        uRim: { value: new Color(config.atmosphere) },
        uLightDir: { value: LIGHT_DIR },
        uTime: { value: 0 },
        uHover: { value: 0 },
      },
    })
    const atmosphereMaterial = new ShaderMaterial({
      vertexShader: atmosphereVert,
      fragmentShader: atmosphereFrag,
      transparent: true,
      depthWrite: false,
      side: BackSide,
      blending: AdditiveBlending,
      uniforms: {
        uColor: { value: new Color(config.atmosphere) },
        uIntensity: { value: ATMOSPHERE_BASE },
      },
    })
    const ringMaterial = new ShaderMaterial({
      vertexShader: ringVert,
      fragmentShader: ringFrag,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
      uniforms: { uColor: { value: new Color(config.accent) }, uInner: { value: RING_INNER } },
    })
    return [surfaceMaterial, atmosphereMaterial, ringMaterial]
  }, [config])

  useEffect(
    () => () => {
      surface.dispose()
      atmosphere.dispose()
      ring.dispose()
    },
    [surface, atmosphere, ring],
  )

  useFrame((state, delta) => {
    surface.uniforms.uTime!.value = state.clock.elapsedTime
    const uHover = surface.uniforms.uHover!
    uHover.value = MathUtils.damp(uHover.value as number, hover.current.target, 6, delta)
    atmosphere.uniforms.uIntensity!.value = ATMOSPHERE_BASE + (uHover.value as number) * 1.0
    if (body.current && animate) body.current.rotation.y += delta * config.spin
    if (root.current) {
      const presence =
        1 - MathUtils.smoothstep(Math.abs(galaxyState.progress - stop), PRESENCE_NEAR, PRESENCE_FAR)
      root.current.visible = presence > 0.01
      root.current.scale.setScalar(presence * (1 + (uHover.value as number) * 0.03))
    }
  })

  const setHover = (value: number) => {
    hover.current.target = value
    document.body.style.cursor = value ? 'pointer' : ''
  }
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onSelect(config.id)
  }

  return (
    <group position={config.position as [number, number, number]}>
      <group
        ref={root}
        onClick={handleClick}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHover(1)
        }}
        onPointerOut={() => setHover(0)}
      >
        <mesh ref={body} material={surface}>
          <sphereGeometry args={[config.radius, segments, segments]} />
        </mesh>
        <mesh scale={ATMOSPHERE_SCALE} material={atmosphere}>
          <sphereGeometry
            args={[config.radius, Math.max(24, segments / 2), Math.max(24, segments / 2)]}
          />
        </mesh>
        {config.ring && (
          <mesh rotation={[Math.PI / 2.4, 0.2, 0.3]} material={ring}>
            <ringGeometry
              args={[config.radius * RING_RADII.inner, config.radius * RING_RADII.outer, 96]}
            />
          </mesh>
        )}
      </group>
      {children}
    </group>
  )
}
