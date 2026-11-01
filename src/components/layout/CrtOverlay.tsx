import { useSettings } from '@/hooks/useSettings'

/** Scanline + vignette overlay. Purely visual, never intercepts input, toggled in settings. */
export function CrtOverlay() {
  const { crt } = useSettings()
  if (!crt) return null
  return <div aria-hidden="true" className="crt" />
}
