import type { DeviceTierName, QualityPreset } from '@/types/device'
import type { ThemeId, ThemeOption } from '@/types/settings'

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

export const MEDIA = {
  narrow: `(max-width: ${BREAKPOINTS.md - 1}px)`,
  desktop: `(min-width: ${BREAKPOINTS.lg}px)`,
  reducedMotion: '(prefers-reduced-motion: reduce)',
  coarsePointer: '(pointer: coarse)',
} as const

export const STORAGE_KEYS = {
  theme: 'shahrul-os:theme',
  crt: 'shahrul-os:crt',
  booted: 'shahrul-os:booted',
} as const

/** CUSTOMIZE: available palettes. Colours themselves live in src/styles/tokens.css. */
export const THEMES: readonly ThemeOption[] = [
  { id: 'matrix', label: 'Matrix', description: 'neon green, the default' },
  { id: 'synthwave', label: 'Synthwave', description: 'magenta-led' },
  { id: 'ice', label: 'Ice', description: 'electric blue-led' },
]

export const DEFAULT_THEME: ThemeId = 'matrix'

export const isThemeId = (value: unknown): value is ThemeId =>
  THEMES.some((theme) => theme.id === value)

/** Seconds, for Motion. */
export const DURATION = {
  fast: 0.14,
  base: 0.28,
  slow: 0.6,
} as const

/** Cubic-bezier easing curves for Motion (mirror --ease-out-expo in tokens.css). */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const

/** CUSTOMIZE: boot sequence timing. */
export const BOOT = {
  /** Typing speed and the pause after each line. */
  charMs: 8,
  linePauseMs: 80,
  /** How often the typed text is updated (several characters per tick). */
  tickMs: 32,
  /** Hold on the finished log before the glitch-out. */
  holdMs: 220,
  /** Hard cap: the boot never runs longer than this, whatever the line count. */
  maxMs: 2400,
  glitchMs: 380,
} as const

/** Milliseconds a section frame stays highlighted after navigation. */
export const FLASH_MS = 700

export const TERMINAL = {
  maxLines: 200,
  maxHistory: 50,
  maxInputLength: 200,
  /** Max edit distance for "did you mean" suggestions. */
  suggestDistance: 2,
} as const

/** CUSTOMIZE: project window layout on the draggable desktop (pixels). */
export const WINDOW = {
  width: 300,
  /** Approximate height used for layout; real height is content-driven (~420-470). */
  height: 470,
  columns: 3,
  gapX: 24,
  /** Each column starts a little lower than the previous, for a staggered desktop look. */
  offsetY: 32,
  /** Rows never overlap, so no window hides another's content until the user drags it. */
  rowStep: 494,
  padding: 24,
  nudge: 16,
  nudgeLarge: 64,
} as const

/** CUSTOMIZE: 3D scene. */
export const CAMERA = {
  fov: 60,
  near: 0.1,
  far: 120,
  position: [0, 1.6, 6] as const,
  /** Looking slightly up pushes the horizon below the hero copy. */
  lookAt: [0, 3.3, -10] as const,
  /** How far the camera drifts toward the pointer (world units). */
  parallax: 0.45,
  damping: 2.5,
} as const

export const GRID = {
  size: 160,
  /** World units between grid lines. */
  cell: 1.6,
  /** Units per second the floor scrolls toward the camera. */
  speed: 2.2,
  lineWidth: 1.15,
} as const

export const TERRAIN = {
  width: 160,
  depth: 40,
  z: -48,
  /** Half-width of the flat valley kept open in the centre. */
  valley: 9,
  height: 5.5,
  noiseScale: 0.09,
} as const

export const FOG = { near: 12, far: 70 } as const

export const PARTICLES = {
  spreadX: 40,
  spreadY: 10,
  depth: 50,
  size: 26,
  speed: 0.35,
} as const

export const BLOOM = { intensity: 0.6, threshold: 0.15, smoothing: 0.25 } as const

/** CUSTOMIZE: quality presets per device tier. */
export const QUALITY_PRESETS: Record<DeviceTierName, QualityPreset> = {
  high: {
    webgl: true,
    maxDpr: 1.5,
    antialias: true,
    particles: 900,
    terrainSegments: 64,
    bloom: true,
  },
  medium: {
    webgl: true,
    maxDpr: 1.25,
    antialias: false,
    particles: 350,
    terrainSegments: 40,
    bloom: false,
  },
  low: {
    webgl: false,
    maxDpr: 1,
    antialias: false,
    particles: 0,
    terrainSegments: 0,
    bloom: false,
  },
}
