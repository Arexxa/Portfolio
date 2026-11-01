import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { BLOOM } from '@/lib/constants'

/** High-tier only bloom. Default export so it can be lazy-loaded as its own chunk. */
export default function Effects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        mipmapBlur
        intensity={BLOOM.intensity}
        luminanceThreshold={BLOOM.threshold}
        luminanceSmoothing={BLOOM.smoothing}
      />
    </EffectComposer>
  )
}
