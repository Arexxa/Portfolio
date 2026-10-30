import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export const LenisContext = createContext<Lenis | null>(null)

/** The shared Lenis instance, or null when smooth scrolling is disabled (reduced motion). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext)
}
