import { useCallback, useEffect, useMemo, type ReactNode } from 'react'
import { SettingsContext, type SettingsContextValue } from '@/hooks/useSettings'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { DEFAULT_THEME, isThemeId, STORAGE_KEYS } from '@/lib/constants'
import type { ThemeId } from '@/types/settings'

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'
const root = () => document.documentElement

interface SettingsProviderProps {
  children: ReactNode
}

/**
 * Owns theme + CRT preferences and mirrors them onto <html data-theme data-crt>, which is
 * what the CSS tokens key off. index.html applies the stored values before first paint.
 * The theme attribute is written synchronously in the setter so components that read
 * computed CSS variables during render (the 3D scene) see the new palette immediately.
 */
export function SettingsProvider({ children }: SettingsProviderProps) {
  const [theme, storeTheme] = useLocalStorage(STORAGE_KEYS.theme, DEFAULT_THEME, isThemeId)
  const [crt, setCrt] = useLocalStorage(STORAGE_KEYS.crt, true, isBoolean)

  const setTheme = useCallback(
    (next: ThemeId) => {
      root().dataset.theme = next
      storeTheme(next)
    },
    [storeTheme],
  )

  useEffect(() => {
    root().dataset.theme = theme
  }, [theme])

  useEffect(() => {
    root().dataset.crt = String(crt)
  }, [crt])

  const value = useMemo<SettingsContextValue>(
    () => ({ theme, crt, setTheme, setCrt }),
    [theme, crt, setTheme, setCrt],
  )
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
