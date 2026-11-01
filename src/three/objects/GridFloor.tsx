import { useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { ShaderMaterial, type Color } from 'three'
import { FOG, GRID } from '@/lib/constants'
import gridFrag from '@/three/shaders/grid.frag?raw'
import gridVert from '@/three/shaders/grid.vert?raw'

interface GridFloorProps {
  color: Color
  fogColor: Color
}

/** Infinite-looking neon floor. Per-frame work is a single uniform increment. */
export function GridFloor({ color, fogColor }: GridFloorProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: gridVert,
        fragmentShader: gridFrag,
        uniforms: {
          uTime: { value: 0 },
          uCell: { value: GRID.cell },
          uSpeed: { value: GRID.speed },
          uLineWidth: { value: GRID.lineWidth },
          uColor: { value: color.clone() },
          uFogColor: { value: fogColor.clone() },
          uFogNear: { value: FOG.near },
          uFogFar: { value: FOG.far },
        },
      }),
    // Created once; colour changes are applied to the uniforms below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    material.uniforms.uColor!.value.copy(color)
    material.uniforms.uFogColor!.value.copy(fogColor)
  }, [material, color, fogColor])

  useEffect(() => () => material.dispose(), [material])

  useFrame((_, delta) => {
    material.uniforms.uTime!.value += delta
  })

  return (
    <mesh rotation-x={-Math.PI / 2} material={material}>
      <planeGeometry args={[GRID.size, GRID.size]} />
    </mesh>
  )
}
