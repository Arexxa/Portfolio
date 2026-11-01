import { useEffect, useMemo, type ReactNode } from 'react'
import { SettingsContext, type SettingsContextValue } from '@/hooks/useSettings'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { DEFAULT_THEME, isThemeId, STORAGE_KEYS } from '@/lib/constants'

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean'

interface SettingsProviderProps {
  children: ReactNode
}

/**
 * Owns theme + CRT preferences and mirrors them onto <html data-theme data-crt>, which is
 * what the CSS tokens key off. index.html applies the stored values before first paint.
 */
export function SettingsProvider({ children }: SettingsProviderProps) {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, DEFAULT_THEME, isThemeId)
  const [crt, setCrt] = useLocalStorage(STORAGE_KEYS.crt, true, isBoolean)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    document.documentElement.dataset.crt = String(crt)
  }, [crt])

  const value = useMemo<SettingsContextValue>(
    () => ({ theme, crt, setTheme, setCrt }),
    [theme, crt, setTheme, setCrt],
  )
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
