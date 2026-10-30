import { Bloom, EffectComposer } from '@react-three/postprocessing'

/** Optional bloom pass (high tier only). Loaded lazily so it never costs low-tier users. */
export default function Effects() {
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <Bloom mipmapBlur luminanceThreshold={0.55} luminanceSmoothing={0.25} intensity={0.85} />
    </EffectComposer>
  )
}
