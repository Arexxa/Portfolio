import { useEffect, useRef, type ReactNode } from 'react'
import { Window } from '@/components/ui/Window'
import { terminalCopy } from '@/data/terminal'
import { cn } from '@/lib/cn'
import { TERMINAL } from '@/lib/constants'
import { TerminalOutputLine } from '@/features/terminal/TerminalOutput'
import { terminalInputId, useTerminal } from '@/features/terminal/useTerminal'
import { useTerminalInput } from '@/features/terminal/useTerminalInput'

interface TerminalProps {
  variant: 'hero' | 'dock'
  className?: string
  /** Extra title-bar controls (e.g. the dock's close button). */
  actions?: ReactNode
}

/**
 * Interactive terminal window. Output is a polite live region; the input is a labelled
 * text field. Clicking empty space in the log focuses the prompt (mouse convenience only).
 */
export function Terminal({ variant, className, actions }: TerminalProps) {
  const { lines } = useTerminal()
  const { value, onChange, onKeyDown, submit, options } = useTerminalInput()
  const logRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = terminalInputId(variant)

  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [lines, options])

  useEffect(() => {
    const log = logRef.current
    if (!log) return
    const onPointerUp = (event: PointerEvent) => {
      const selecting = !!window.getSelection()?.toString()
      if (!selecting && !(event.target as HTMLElement).closest('a')) inputRef.current?.focus()
    }
    log.addEventListener('pointerup', onPointerUp)
    return () => log.removeEventListener('pointerup', onPointerUp)
  }, [])

  return (
    <Window
      title="~/bin/terminal"
      status="TTY1"
      actions={actions}
      className={cn('h-[22rem] sm:h-[26rem]', className)}
      bodyClassName="flex flex-col p-0 sm:p-0"
    >
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-3 text-[0.8125rem] leading-6"
      >
        {lines.map((line) => (
          <TerminalOutputLine key={line.id} line={line} />
        ))}
        {options.length > 0 && <p className="text-ink-muted">{options.join('   ')}</p>}
      </div>
      <form
        className="flex items-center gap-2 border-t border-line px-4 py-2.5 text-[0.8125rem] focus-within:bg-surface-2 focus-within:outline-1 focus-within:-outline-offset-1 focus-within:outline-primary focus-within:outline"
        onSubmit={(event) => {
          event.preventDefault()
          submit()
        }}
      >
        <label htmlFor={inputId} className="shrink-0 text-primary">
          <span aria-hidden="true" className="hidden sm:inline">
            {terminalCopy.prompt}
          </span>
          <span aria-hidden="true" className="sm:hidden">
            $
          </span>
          <span className="sr-only">Terminal command</span>
        </label>
        <input
          ref={inputRef}
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          maxLength={TERMINAL.maxInputLength}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="send"
          aria-describedby={`${inputId}-hint`}
          className="min-w-0 flex-1 bg-transparent text-ink caret-primary outline-none placeholder:text-ink-muted/60"
          placeholder="type help"
        />
        <span id={`${inputId}-hint`} className="sr-only">
          Type a command and press Enter. Type help to list commands.
        </span>
      </form>
    </Window>
  )
}
