import type { ContentSectionId, SectionId } from '@/types/content'
import type { ThemeId } from '@/types/settings'

export type LineTone = 'default' | 'muted' | 'primary' | 'success' | 'error' | 'warning'

/** Structured output: rendered as React nodes, never as HTML strings. */
export type TerminalOutput =
  | { kind: 'input'; text: string }
  | { kind: 'text'; text: string; tone?: LineTone }
  | { kind: 'link'; label: string; href: string; download?: string; external?: boolean }
  | { kind: 'table'; rows: readonly (readonly [string, string])[] }

export type TerminalLine = TerminalOutput & { id: number }

/** Side effects a command may perform. Built by the provider from app state. */
export interface CommandContext {
  navigate: (id: SectionId, focusSelector?: string) => void
  theme: ThemeId
  setTheme: (theme: ThemeId) => void
  crt: boolean
  setCrt: (enabled: boolean) => void
  filterProjects: (tag: string | null) => void
  openProject: (id: string) => void
  downloadResume: () => void
  clear: () => void
}

export interface Command {
  name: string
  /** e.g. `theme [name]` */
  usage: string
  summary: string
  /** Section this command jumps to, for the desktop icons and help grouping. */
  section?: ContentSectionId
  run: (args: string[], ctx: CommandContext) => TerminalOutput[]
  /** Suggestions for the first argument, for Tab completion. */
  complete?: (partial: string) => string[]
}
