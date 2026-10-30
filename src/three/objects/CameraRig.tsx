import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { CatmullRomCurve3, MathUtils, Vector3 } from 'three'
import { CAMERA, PLANETS } from '@/lib/constants'
import { galaxyState } from '@/three/state'

interface CameraRigProps {
  narrow: boolean
  animate: boolean
}

const NARROW_Y_SHIFT = 3.2
const HERO_TARGET = new Vector3(0, 0, 0)
const HERO_POSITION = new Vector3(...CAMERA.heroPosition)

function buildCurves(narrow: boolean) {
  const positions = [HERO_POSITION.clone()]
  const targets = [HERO_TARGET.clone()]
  for (const planet of PLANETS) {
    const [px, py, pz] = planet.position
    const x = px * (narrow ? CAMERA.stopOffsetXNarrow : CAMERA.stopOffsetX)
    const y = py - (narrow ? NARROW_Y_SHIFT : 0)
    positions.push(new Vector3(x, y, pz + CAMERA.stopDistance))
    targets.push(new Vector3(x, y, pz))
  }
  return {
    position: new CatmullRomCurve3(positions, false, 'catmullrom', 0.4),
    target: new CatmullRomCurve3(targets, false, 'catmullrom', 0.4),
  }
}

/**
 * Moves the camera along a smooth spline driven by scroll progress, and eases toward the
 * focused planet while a panel is open. Everything is ref/uniform mutation: no React renders.
 */
export function CameraRig({ narrow, animate }: CameraRigProps) {
  const curves = useMemo(() => buildCurves(narrow), [narrow])
  const wantPos = useMemo(() => new Vector3(), [])
  const wantTarget = useMemo(() => new Vector3(), [])
  const lookAt = useMemo(() => HERO_TARGET.clone(), [])
  const front = useMemo(() => new Vector3(), [])

  useFrame(({ camera }, delta) => {
    const { progress, focus, focusIndex, pointer } = galaxyState
    curves.position.getPoint(progress, wantPos)
    curves.target.getPoint(progress, wantTarget)

    const planet = PLANETS[focusIndex]
    if (planet && focus > 0) {
      const [px, py, pz] = planet.position
      front.set(px * 0.5, py, pz + planet.radius * 3 + 3)
      wantPos.lerp(front, focus)
      wantTarget.lerp(front.set(px, py, pz), focus)
    }

    if (animate) {
      wantPos.x += pointer.x * CAMERA.parallax
      wantPos.y += pointer.y * CAMERA.parallax * 0.6
    }

    const lambda = animate ? CAMERA.damping : 1000
    camera.position.x = MathUtils.damp(camera.position.x, wantPos.x, lambda, delta)
    camera.position.y = MathUtils.damp(camera.position.y, wantPos.y, lambda, delta)
    camera.position.z = MathUtils.damp(camera.position.z, wantPos.z, lambda, delta)
    lookAt.x = MathUtils.damp(lookAt.x, wantTarget.x, lambda, delta)
    lookAt.y = MathUtils.damp(lookAt.y, wantTarget.y, lambda, delta)
    lookAt.z = MathUtils.damp(lookAt.z, wantTarget.z, lambda, delta)
    camera.lookAt(lookAt)
  })

  return null
}
