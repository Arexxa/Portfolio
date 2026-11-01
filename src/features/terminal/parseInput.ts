import { TERMINAL } from '@/lib/constants'

export interface ParsedInput {
  /** Lower-cased command name ('' for blank input). */
  name: string
  args: string[]
  /** Trimmed, length-capped original text (for echo and history). */
  raw: string
}

/** Split terminal input into a command name and whitespace-separated arguments. */
export function parseInput(input: string): ParsedInput {
  const raw = input.slice(0, TERMINAL.maxInputLength).trim()
  const [name = '', ...args] = raw.split(/\s+/).filter(Boolean)
  return { name: name.toLowerCase(), args, raw }
}
