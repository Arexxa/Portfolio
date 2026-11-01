import { memo } from 'react'
import { terminalCopy } from '@/data/terminal'
import { cn } from '@/lib/cn'
import type { LineTone, TerminalLine } from '@/features/terminal/types'

const TONES: Record<LineTone, string> = {
  default: 'text-ink',
  muted: 'text-ink-muted',
  primary: 'text-primary',
  success: 'text-success',
  error: 'text-danger',
  warning: 'text-warning',
}

/** One output line. Memoised: the log re-renders on every command but old lines never change. */
export const TerminalOutputLine = memo(function TerminalOutputLine({
  line,
}: {
  line: TerminalLine
}) {
  switch (line.kind) {
    case 'input':
      return (
        <p className="break-words">
          <span className="text-primary">{terminalCopy.prompt}</span> {line.text}
        </p>
      )
    case 'text':
      return (
        <p className={cn('whitespace-pre-wrap break-words', TONES[line.tone ?? 'default'])}>
          {line.text}
        </p>
      )
    case 'link':
      return (
        <p>
          <a
            href={line.href}
            download={line.download}
            target={line.external ? '_blank' : undefined}
            rel={line.external ? 'noreferrer noopener' : undefined}
            className="text-secondary underline decoration-dotted underline-offset-4 hover:text-primary"
          >
            {line.label}
          </a>
        </p>
      )
    case 'table':
      return (
        <dl className="grid grid-cols-[minmax(0,max-content)_1fr] gap-x-4">
          {line.rows.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="whitespace-pre text-secondary">{key}</dt>
              <dd className="min-w-0 break-words text-ink-muted">{value}</dd>
            </div>
          ))}
        </dl>
      )
  }
})
