import { isThemeId, THEMES } from '@/lib/constants'
import { completions } from '@/features/terminal/suggest'
import type { Command } from '@/features/terminal/types'

const THEME_IDS = THEMES.map((theme) => theme.id)

/** Commands that change the OS itself rather than jumping to content. */
export const systemCommands: Command[] = [
  {
    name: 'theme',
    usage: 'theme [name]',
    summary: 'List or switch colour palettes',
    complete: (partial) => completions(partial, THEME_IDS),
    run: ([name], ctx) => {
      if (!name) {
        return [
          {
            kind: 'table',
            rows: THEMES.map(
              (theme) =>
                [`${theme.id === ctx.theme ? '*' : ' '} ${theme.id}`, theme.description] as const,
            ),
          },
          { kind: 'text', text: 'usage: theme <name>', tone: 'muted' },
        ]
      }
      const id = name.toLowerCase()
      if (!isThemeId(id)) {
        return [
          {
            kind: 'text',
            text: `unknown theme "${name}". try: ${THEME_IDS.join(', ')}`,
            tone: 'error',
          },
        ]
      }
      ctx.setTheme(id)
      return [{ kind: 'text', text: `theme set to ${id}`, tone: 'success' }]
    },
  },
  {
    name: 'crt',
    usage: 'crt [on|off]',
    summary: 'Toggle the scanline overlay',
    complete: (partial) => completions(partial, ['on', 'off']),
    run: ([value], ctx) => {
      if (!value) return [{ kind: 'text', text: `crt overlay is ${ctx.crt ? 'on' : 'off'}` }]
      const next = value.toLowerCase()
      if (next !== 'on' && next !== 'off') {
        return [{ kind: 'text', text: 'usage: crt [on|off]', tone: 'error' }]
      }
      ctx.setCrt(next === 'on')
      return [{ kind: 'text', text: `crt overlay ${next}`, tone: 'success' }]
    },
  },
  {
    name: 'clear',
    usage: 'clear',
    summary: 'Clear the screen (Ctrl+L)',
    run: (_, ctx) => {
      ctx.clear()
      return []
    },
  },
]
