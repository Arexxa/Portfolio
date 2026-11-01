import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { CAMERA } from '@/lib/constants'
import { heroState } from '@/three/state'

const LOOK_AT = new Vector3(...CAMERA.lookAt)

/** Eases the camera toward the pointer (frame-rate independent damping). Mount only when motion is allowed. */
export function CameraRig() {
  useFrame(({ camera }, delta) => {
    const k = 1 - Math.exp(-CAMERA.damping * delta)
    const targetX = CAMERA.position[0] + heroState.pointer.x * CAMERA.parallax
    const targetY = CAMERA.position[1] + heroState.pointer.y * CAMERA.parallax * 0.5
    camera.position.x += (targetX - camera.position.x) * k
    camera.position.y += (targetY - camera.position.y) * k
    camera.lookAt(LOOK_AT)
  })
  return null
}
