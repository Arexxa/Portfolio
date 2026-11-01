import { useState, type KeyboardEvent } from 'react'
import { COMMAND_NAMES, findCommand } from '@/features/terminal/commands'
import { completions } from '@/features/terminal/suggest'
import { useTerminal } from '@/features/terminal/useTerminal'

/** Longest shared prefix, so Tab completes as far as it unambiguously can. */
function commonPrefix(values: string[]): string {
  return values.reduce((prefix, value) => {
    let i = 0
    while (i < prefix.length && prefix[i] === value[i]) i++
    return prefix.slice(0, i)
  })
}

/**
 * Controlled input state for a terminal view: Enter runs, Up/Down walks history,
 * Tab completes command names then arguments, Ctrl+L clears.
 */
export function useTerminalInput() {
  const { run, history, clear } = useTerminal()
  const [value, setValue] = useState('')
  const [cursor, setCursor] = useState<number | null>(null)
  const [options, setOptions] = useState<string[]>([])

  const complete = () => {
    const [name = '', ...rest] = value.trimStart().split(/\s+/)
    const completingArg = rest.length > 0
    const candidates = completingArg
      ? (findCommand(name.toLowerCase())?.complete?.(rest.at(-1) ?? '') ?? [])
      : completions(name, COMMAND_NAMES)
    if (candidates.length === 0) return setOptions([])
    const head = completingArg ? `${name} ` : ''
    const done = candidates.length === 1
    setValue(`${head}${done ? candidates[0] : commonPrefix(candidates)}${done ? ' ' : ''}`)
    setOptions(done ? [] : candidates)
  }

  const walkHistory = (direction: -1 | 1) => {
    if (history.length === 0) return
    const start = cursor ?? history.length
    const next = Math.min(history.length, Math.max(0, start + direction))
    setCursor(next === history.length ? null : next)
    setValue(history[next] ?? '')
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Shift+Tab and Tab on an empty prompt keep their normal focus behaviour (no keyboard trap).
    if (event.key === 'Tab' && !event.shiftKey && value.trim()) {
      event.preventDefault()
      complete()
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      walkHistory(event.key === 'ArrowUp' ? -1 : 1)
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault()
      clear()
    }
  }

  const submit = () => {
    run(value)
    setValue('')
    setCursor(null)
    setOptions([])
  }

  const onChange = (next: string) => {
    setValue(next)
    setOptions([])
  }

  return { value, onChange, onKeyDown, submit, options }
}
