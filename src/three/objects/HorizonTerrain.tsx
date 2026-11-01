import { useEffect, useMemo } from 'react'
import { MathUtils, PlaneGeometry, type Color } from 'three'
import { TERRAIN } from '@/lib/constants'
import { fbm } from '@/three/lib/noise'

interface HorizonTerrainProps {
  color: Color
  segments: number
}

/** Sculpts a flat plane into mountains on both sides, keeping a valley open in the centre. */
function buildTerrain(segments: number): PlaneGeometry {
  const geometry = new PlaneGeometry(TERRAIN.width, TERRAIN.depth, segments * 2, segments / 2)
  geometry.rotateX(-Math.PI / 2)
  const position = geometry.attributes.position!
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i)
    const z = position.getZ(i)
    const valley = MathUtils.smoothstep(Math.abs(x), TERRAIN.valley, TERRAIN.valley * 3)
    const back = MathUtils.smoothstep(-z, -TERRAIN.depth / 2, TERRAIN.depth / 2)
    const height = fbm(x * TERRAIN.noiseScale, z * TERRAIN.noiseScale) * TERRAIN.height
    position.setY(i, height * valley * (0.35 + back * 0.65))
  }
  geometry.computeBoundingSphere()
  return geometry
}

/** Low-poly wireframe mountains on the horizon. Geometry is built once and never animated. */
export function HorizonTerrain({ color, segments }: HorizonTerrainProps) {
  const geometry = useMemo(() => buildTerrain(segments), [segments])
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry} position-z={TERRAIN.z}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  )
}
