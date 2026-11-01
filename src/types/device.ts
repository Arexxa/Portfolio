export type DeviceTierName = 'high' | 'medium' | 'low'

export interface QualityPreset {
  /** Whether to mount the WebGL canvas at all (false = CSS grid fallback). */
  webgl: boolean
  /** Max devicePixelRatio. */
  maxDpr: number
  antialias: boolean
  /** Floating data particles. */
  particles: number
  /** Horizon terrain grid resolution (segments per side). */
  terrainSegments: number
  /** Bloom post-processing. */
  bloom: boolean
}

export interface DeviceTier {
  name: DeviceTierName
  preset: QualityPreset
  reducedMotion: boolean
  isTouch: boolean
}
