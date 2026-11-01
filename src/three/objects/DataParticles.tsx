import { useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  ShaderMaterial,
  type Color,
} from 'three'
import { PARTICLES } from '@/lib/constants'
import particlesFrag from '@/three/shaders/particles.frag?raw'
import particlesVert from '@/three/shaders/particles.vert?raw'

interface DataParticlesProps {
  count: number
  color: Color
}

function buildGeometry(count: number): BufferGeometry {
  const positions = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * PARTICLES.spreadX
    positions[i * 3 + 1] = Math.random() * PARTICLES.spreadY
    positions[i * 3 + 2] = -Math.random() * PARTICLES.depth
    seeds[i] = Math.random()
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1))
  return geometry
}

/** Sparse rising data points. One Points draw call; motion runs in the vertex shader. */
export function DataParticles({ count, color }: DataParticlesProps) {
  const dpr = useThree((state) => state.viewport.dpr)
  const geometry = useMemo(() => buildGeometry(count), [count])
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: particlesVert,
        fragmentShader: particlesFrag,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uSpeed: { value: PARTICLES.speed },
          uHeight: { value: PARTICLES.spreadY },
          uSize: { value: PARTICLES.size },
          uPixelRatio: { value: 1 },
          uColor: { value: color.clone() },
        },
      }),
    // Created once; colour and DPR are synced into uniforms below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    material.uniforms.uColor!.value.copy(color)
    material.uniforms.uPixelRatio!.value = dpr
  }, [material, color, dpr])

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((_, delta) => {
    material.uniforms.uTime!.value += delta
  })

  return <points geometry={geometry} material={material} />
}
