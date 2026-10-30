import { MEDIA, QUALITY_PRESETS } from '@/lib/constants'
import type { DeviceTier, DeviceTierName } from '@/types/device'

interface NavigatorHints extends Navigator {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

const SOFTWARE_RENDERER = /swiftshader|llvmpipe|software|basic render/i

function probeWebGL(): { supported: boolean; software: boolean } {
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ??
      canvas.getContext('webgl')) as WebGLRenderingContext | null
    if (!gl) return { supported: false, software: false }
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ''
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return { supported: true, software: SOFTWARE_RENDERER.test(renderer) }
  } catch {
    return { supported: false, software: false }
  }
}

function readOverride(): DeviceTierName | null {
  const value = new URLSearchParams(window.location.search).get('tier')
  return value === 'high' || value === 'medium' || value === 'low' ? value : null
}

/** Score hardware hints into a quality tier. `?tier=low|medium|high` forces one (for testing). */
export function detectDeviceTier(): DeviceTier {
  const nav = navigator as NavigatorHints
  const reducedMotion = window.matchMedia(MEDIA.reducedMotion).matches
  const isTouch = window.matchMedia(MEDIA.coarsePointer).matches
  const { supported, software } = probeWebGL()

  let name: DeviceTierName
  const override = readOverride()
  if (override) name = override
  else if (!supported || software || nav.connection?.saveData) name = 'low'
  else {
    let score = 0
    if ((nav.hardwareConcurrency ?? 8) <= 4) score -= 1
    if ((nav.deviceMemory ?? 8) <= 4) score -= 1
    if (window.innerWidth < 768) score -= 1
    if (isTouch) score -= 1
    if (reducedMotion) score -= 1
    name = score >= 0 ? 'high' : score >= -3 ? 'medium' : 'low'
  }

  return { name, preset: QUALITY_PRESETS[name], reducedMotion, isTouch }
}
