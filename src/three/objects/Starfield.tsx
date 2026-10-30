import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from 'three'
import { COLORS, STARFIELD } from '@/lib/constants'
import fragmentShader from '@/three/shaders/stars.frag?raw'
import vertexShader from '@/three/shaders/stars.vert?raw'
import { galaxyState } from '@/three/state'

interface StarfieldProps {
  count: number
  pixelRatio: number
  animate: boolean
}

const TINTS = [COLORS.ink, COLORS.cyan, COLORS.violet, COLORS.ember].map((hex) => new Color(hex))

function buildGeometry(count: number): BufferGeometry {
  const position = new Float32Array(count * 3)
  const color = new Float32Array(count * 3)
  const size = new Float32Array(count)
  const seed = new Float32Array(count)
  const tint = new Color()
  for (let i = 0; i < count; i++) {
    position[i * 3] = (Math.random() - 0.5) * STARFIELD.spreadX * 2
    position[i * 3 + 1] = (Math.random() - 0.5) * STARFIELD.spreadY * 2
    position[i * 3 + 2] = STARFIELD.zFar + Math.random() * (STARFIELD.zNear - STARFIELD.zFar)
    const roll = Math.random()
    tint.copy(TINTS[roll < 0.72 ? 0 : roll < 0.86 ? 1 : roll < 0.95 ? 2 : 3] ?? TINTS[0]!)
    tint.toArray(color, i * 3)
    size[i] = 0.6 + Math.random() ** 3 * 2.6
    seed[i] = Math.random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aColor', new BufferAttribute(color, 3))
  geometry.setAttribute('aSize', new BufferAttribute(size, 1))
  geometry.setAttribute('aSeed', new BufferAttribute(seed, 1))
  return geometry
}

/** Thousands of stars in one draw call, with a subtle mouse-parallax tilt. */
export function Starfield({ count, pixelRatio, animate }: StarfieldProps) {
  const group = useRef<Group>(null)
  const geometry = useMemo(() => buildGeometry(count), [count])
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPixelRatio: { value: pixelRatio } },
      }),
    [pixelRatio],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((state, delta) => {
    material.uniforms.uTime!.value = animate ? state.clock.elapsedTime : 0
    const g = group.current
    if (!g || !animate) return
    const damp = 1 - Math.exp(-2 * delta)
    g.rotation.y += (galaxyState.pointer.x * STARFIELD.parallax - g.rotation.y) * damp
    g.rotation.x += (-galaxyState.pointer.y * STARFIELD.parallax - g.rotation.x) * damp
  })

  return (
    <group ref={group}>
      <points geometry={geometry} material={material} frustumCulled={false} />
    </group>
  )
}
