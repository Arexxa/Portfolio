export type DeviceTierName = 'high' | 'medium' | 'low'

export interface QualityPreset {
  /** Number of star particles in the starfield. */
  stars: number
  /** Sphere segments for planets. */
  planetSegments: number
  /** Max devicePixelRatio. */
  maxDpr: number
  antialias: boolean
  bloom: boolean
  nebula: boolean
  nameParticles: number
  /** Whether to mount the WebGL canvas at all. */
  webgl: boolean
}

export interface DeviceTier {
  name: DeviceTierName
  preset: QualityPreset
  reducedMotion: boolean
  isTouch: boolean
}
