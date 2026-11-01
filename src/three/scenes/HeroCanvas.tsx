import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { CAMERA } from '@/lib/constants'
import { useIsVisible } from '@/three/hooks/useIsVisible'
import { HeroScene } from '@/three/scenes/HeroScene'

export interface HeroCanvasProps {
  /** Called once the WebGL context exists and the first frame is queued. */
  onReady: () => void
  /** Called when the context is lost; the caller swaps in the CSS fallback. */
  onError: () => void
}

/**
 * Hero WebGL canvas (lazy chunk). Fills its positioned parent; rendering stops entirely
 * (frameloop="never") when scrolled out of view or the tab is hidden, and renders on
 * demand only (a still frame) under reduced motion. DPR is capped by the quality preset.
 */
export default function HeroCanvas({ onReady, onError }: HeroCanvasProps) {
  const container = useRef<HTMLDivElement>(null)
  const visible = useIsVisible(container)
  const reduced = useReducedMotion()
  const { preset, isTouch } = useDeviceTier()
  const frameloop = !visible ? 'never' : reduced ? 'demand' : 'always'

  return (
    <div ref={container} className="absolute inset-0" aria-hidden="true">
      <Canvas
        flat
        frameloop={frameloop}
        dpr={[1, preset.maxDpr]}
        camera={{
          fov: CAMERA.fov,
          near: CAMERA.near,
          far: CAMERA.far,
          position: [...CAMERA.position],
        }}
        gl={{ antialias: preset.antialias, powerPreference: 'high-performance', alpha: false }}
        onCreated={({ gl, camera }) => {
          camera.lookAt(...CAMERA.lookAt)
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault()
            onError()
          })
          onReady()
        }}
      >
        <HeroScene preset={preset} parallax={!reduced && !isTouch} />
      </Canvas>
    </div>
  )
}
