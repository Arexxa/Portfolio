import { createContext, useContext } from 'react'
import type { Settings, ThemeId } from '@/types/settings'

export interface SettingsContextValue extends Settings {
  setTheme: (theme: ThemeId) => void
  setCrt: (enabled: boolean) => void
}

export const SettingsContext = createContext<SettingsContextValue | null>(null)

/** Theme palette and CRT overlay preferences (persisted). */
export function useSettings(): SettingsContextValue {
  const value = useContext(SettingsContext)
  if (!value) throw new Error('useSettings must be used inside <SettingsProvider>')
  return value
}
