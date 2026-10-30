import type { PlanetId } from '@/types/content'
import type { DeviceTierName, QualityPreset } from '@/types/device'

/** Keep in sync with src/styles/tokens.css. CUSTOMIZE: palette used by the 3D scene. */
export const COLORS = {
  void: '#04060d',
  navy: '#0b1226',
  cyan: '#22d3ee',
  violet: '#8b5cf6',
  ember: '#ff8a3d',
  ink: '#e8ecf8',
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export const MEDIA = {
  narrow: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  coarsePointer: '(pointer: coarse)',
} as const

export const DURATION = {
  fast: 0.18,
  base: 0.45,
  slow: 0.9,
  cameraFocus: 1.4,
  nameAssemble: 3.2,
} as const

export const EASE = {
  outExpo: 'expo.out',
  inOut: 'power3.inOut',
  out: 'power3.out',
} as const

/** CUSTOMIZE: quality presets per device tier (particle counts, post-processing...). */
export const QUALITY_PRESETS: Record<DeviceTierName, QualityPreset> = {
  high: {
    stars: 16000,
    planetSegments: 96,
    maxDpr: 1.5,
    antialias: true,
    bloom: true,
    nebula: true,
    nameParticles: 7000,
    webgl: true,
  },
  medium: {
    stars: 6000,
    planetSegments: 48,
    maxDpr: 1.25,
    antialias: false,
    bloom: false,
    nebula: false,
    nameParticles: 3500,
    webgl: true,
  },
  low: {
    stars: 0,
    planetSegments: 0,
    maxDpr: 1,
    antialias: false,
    bloom: false,
    nebula: false,
    nameParticles: 0,
    webgl: false,
  },
}

export interface PlanetConfig {
  id: PlanetId
  position: readonly [number, number, number]
  radius: number
  /** Surface gradient low/high colors and atmosphere rim color. */
  base: string
  accent: string
  atmosphere: string
  ring: boolean
  spin: number
}

/**
 * CUSTOMIZE: planet layout along the flight path (z decreases as you scroll).
 * Odd planets sit right, even planets left, so DOM copy can sit on the opposite side.
 */
export const PLANETS: readonly PlanetConfig[] = [
  {
    id: 'about',
    position: [6, 1, -30],
    radius: 3,
    base: '#0b4a63',
    accent: '#22d3ee',
    atmosphere: '#22d3ee',
    ring: false,
    spin: 0.06,
  },
  {
    id: 'experience',
    position: [-7, -1, -62],
    radius: 3.4,
    base: '#3b1a8a',
    accent: '#8b5cf6',
    atmosphere: '#a78bfa',
    ring: true,
    spin: 0.05,
  },
  {
    id: 'skills',
    position: [7, 2, -94],
    radius: 2.8,
    base: '#7a2a0a',
    accent: '#ff8a3d',
    atmosphere: '#ff8a3d',
    ring: false,
    spin: 0.08,
  },
  {
    id: 'projects',
    position: [-5, 0, -128],
    radius: 3.8,
    base: '#1e1b6b',
    accent: '#7dd3fc',
    atmosphere: '#22d3ee',
    ring: false,
    spin: 0.04,
  },
  {
    id: 'contact',
    position: [5, -1, -162],
    radius: 3,
    base: '#6b1d5c',
    accent: '#fb923c',
    atmosphere: '#ff8a3d',
    ring: true,
    spin: 0.07,
  },
]

export const CAMERA = {
  fov: 50,
  near: 0.1,
  far: 400,
  heroPosition: [0, 0, 14] as const,
  /** Distance in front of a planet where the camera rests (desktop / narrow). */
  stopDistance: 15,
  /** Camera x as a fraction of planet x so the planet sits off-center. */
  stopOffsetX: 0.35,
  stopOffsetXNarrow: 0.08,
  /** 0..1 how far toward the planet the camera moves while a panel is open. */
  focusAmount: 0.55,
  damping: 3.2,
  parallax: 0.6,
}

export const STARFIELD = {
  spreadX: 140,
  spreadY: 90,
  zNear: 40,
  zFar: -210,
  parallax: 0.025,
}

export const MOON = {
  maxOrbiting: 6,
  radius: 0.28,
  orbitBase: 1.3,
  orbitStep: 0.42,
  speedBase: 0.35,
}

export const NAME_ASSEMBLY = {
  text: 'SHAHRULNIZAM',
  fontFamily: '"Space Grotesk Variable", sans-serif',
  fontWeight: 700,
  /** World units of text width at scale 1. */
  worldWidth: 15,
  pointSize: 2.4,
  scatterRadius: 40,
}

export const AUDIO = {
  masterGain: 0.12,
  fadeSeconds: 1.8,
  /** Drone chord (Hz): a soft open fifth with an octave. */
  frequencies: [55, 82.41, 110, 164.81],
}
