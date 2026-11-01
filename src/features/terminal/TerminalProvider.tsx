import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { site } from '@/data/site'
import { terminalCopy } from '@/data/terminal'
import { useSettings } from '@/hooks/useSettings'
import { MEDIA, TERMINAL } from '@/lib/constants'
import { triggerDownload } from '@/lib/download'
import { useSectionNavigation } from '@/features/navigation/useSectionNavigation'
import { projectStore } from '@/features/projects/projectStore'
import { runCommand } from '@/features/terminal/commands'
import { parseInput } from '@/features/terminal/parseInput'
import type { CommandContext, TerminalLine, TerminalOutput } from '@/features/terminal/types'
import {
  terminalInputId,
  TerminalContext,
  type TerminalContextValue,
} from '@/features/terminal/useTerminal'

const BANNER: TerminalOutput[] = [
  ...terminalCopy.banner.map((text) => ({ kind: 'text' as const, text })),
  { kind: 'text', text: terminalCopy.hint, tone: 'muted' },
]

interface TerminalProviderProps {
  children: ReactNode
}

/** Owns the terminal session and wires commands to navigation, settings and projects. */
export function TerminalProvider({ children }: TerminalProviderProps) {
  const nextId = useRef(0)
  const withIds = useCallback(
    (outputs: TerminalOutput[]): TerminalLine[] =>
      outputs.map((output) => ({ ...output, id: nextId.current++ })),
    [],
  )
  const [lines, setLines] = useState<TerminalLine[]>(() => withIds(BANNER))
  const [history, setHistory] = useState<string[]>([])
  const [dockOpen, setDockOpen] = useState(false)
  const [heroVisible, setHeroVisible] = useState(true)
  const navigateTo = useSectionNavigation()
  const { theme, setTheme, crt, setCrt } = useSettings()

  const clear = useCallback(() => setLines(withIds(BANNER)), [withIds])

  const ctx = useMemo<CommandContext>(
    () => ({
      navigate: (id, focusSelector) => {
        // On phones the dock would cover the section we just scrolled to.
        if (window.matchMedia(MEDIA.narrow).matches) setDockOpen(false)
        navigateTo(id, focusSelector)
      },
      theme,
      setTheme,
      crt,
      setCrt,
      filterProjects: projectStore.setTag,
      openProject: projectStore.open,
      downloadResume: () => triggerDownload(site.resumePath, site.resumeFileName),
      clear,
    }),
    [navigateTo, theme, setTheme, crt, setCrt, clear],
  )

  const run = useCallback(
    (input: string) => {
      const { name, args, raw } = parseInput(input)
      const echo = withIds([{ kind: 'input', text: raw }])
      if (!name) return setLines((current) => [...current, ...echo])
      setHistory((current) => [...current, raw].slice(-TERMINAL.maxHistory))
      if (name === 'clear') return clear()
      // Commands run after the echo is queued so their own state updates batch with it.
      const output = withIds(runCommand(name, args, ctx))
      setLines((current) => [...current, ...echo, ...output].slice(-TERMINAL.maxLines))
    },
    [ctx, clear, withIds],
  )

  const toggleTerminal = useCallback(() => {
    if (heroVisible) document.getElementById(terminalInputId('hero'))?.focus()
    else setDockOpen((open) => !open)
  }, [heroVisible])

  // The dock never shows on top of the visible hero terminal.
  const dockVisible = dockOpen && !heroVisible

  const value = useMemo<TerminalContextValue>(
    () => ({
      lines,
      history,
      run,
      clear,
      dockOpen: dockVisible,
      setDockOpen,
      toggleTerminal,
      heroVisible,
      setHeroVisible,
    }),
    [lines, history, run, clear, dockVisible, toggleTerminal, heroVisible],
  )
  return <TerminalContext.Provider value={value}>{children}</TerminalContext.Provider>
}
