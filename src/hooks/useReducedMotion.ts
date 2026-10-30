import { MEDIA } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/** True when the user prefers reduced motion. Every animation wrapper must honour this. */
export function useReducedMotion(): boolean {
  return useMediaQuery(MEDIA.reducedMotion)
}
