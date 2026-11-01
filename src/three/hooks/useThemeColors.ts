import { useMemo } from 'react'
import { Color } from 'three'
import { useSettings } from '@/hooks/useSettings'

export interface ThemeColors {
  primary: Color
  secondary: Color
  accent: Color
  bg: Color
}

const FALLBACK = { primary: '#39ff88', secondary: '#2de2ff', accent: '#ff2bd6', bg: '#050507' }

function readVar(styles: CSSStyleDeclaration, name: keyof typeof FALLBACK): Color {
  const value = styles.getPropertyValue(`--${name}`).trim()
  return new Color(value || FALLBACK[name])
}

/**
 * Current palette as THREE.Color, read from the CSS tokens so the scene always matches the
 * DOM theme. Recomputed only when the theme changes.
 */
export function useThemeColors(): ThemeColors {
  const { theme } = useSettings()
  // `theme` is the cache key: the values come from the CSS variables it switches.
  return useMemo(() => {
    const styles = getComputedStyle(document.documentElement)
    return {
      primary: readVar(styles, 'primary'),
      secondary: readVar(styles, 'secondary'),
      accent: readVar(styles, 'accent'),
      bg: readVar(styles, 'bg'),
    }
  }, [theme])
}
