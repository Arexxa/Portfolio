import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { CAMERA } from '@/lib/constants'
import { useIsVisible } from '@/three/hooks/useIsVisible'
import { GalaxyScene } from '@/three/scenes/GalaxyScene'
import type { GalaxyHandlers } from '@/three/scenes/types'

/**
 * Fixed full-screen canvas. Rendering pauses (frameloop="never") when the tab is hidden
 * or the container leaves the viewport; DPR is capped by the quality preset.
 */
export default function GalaxyCanvas(props: GalaxyHandlers) {
  const container = useRef<HTMLDivElement>(null)
  const visible = useIsVisible(container)
  const { preset } = useDeviceTier()

  return (
    <div ref={container} className="fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, preset.maxDpr]}
        camera={{
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
          position: [...CAMERA.heroPosition],
        }}
        gl={{ antialias: preset.antialias, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault()
            props.onError?.()
          })
        }}
      >
        <GalaxyScene {...props} />
      </Canvas>
    </div>
  )
}
