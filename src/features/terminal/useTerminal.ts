import { createContext, useContext } from 'react'
import type { TerminalLine } from '@/features/terminal/types'

export interface TerminalContextValue {
  lines: readonly TerminalLine[]
  /** Previously submitted inputs, oldest first. */
  history: readonly string[]
  /** Run raw input: echo it, execute it, append the output. */
  run: (input: string) => void
  clear: () => void
  /** Whether the floating dock is open (only used while the hero terminal is off-screen). */
  dockOpen: boolean
  setDockOpen: (open: boolean) => void
  /** Focus the hero terminal if visible, otherwise toggle the dock. */
  toggleTerminal: () => void
  heroVisible: boolean
  setHeroVisible: (visible: boolean) => void
}

export const TerminalContext = createContext<TerminalContextValue | null>(null)

/** Shared terminal session (one history for the hero terminal and the dock). */
export function useTerminal(): TerminalContextValue {
  const value = useContext(TerminalContext)
  if (!value) throw new Error('useTerminal must be used inside <TerminalProvider>')
  return value
}

export const terminalInputId = (variant: 'hero' | 'dock') => `terminal-input-${variant}`
