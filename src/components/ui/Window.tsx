import type { ElementType, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface WindowProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Path-like label in the title bar (e.g. `~/about.md`), or a custom node such as a drag handle. */
  title: ReactNode
  /** Short index shown before the title (e.g. `01`). */
  index?: string
  /** Status label shown at the right of the title bar (e.g. `RO`). */
  status?: string
  /** Real controls rendered at the right of the title bar. Never pass decorative buttons. */
  actions?: ReactNode
  as?: ElementType
  bodyClassName?: string
}

/**
 * The OS window frame used by sections, the terminal and project windows: a hairline frame
 * with a chamfered corner, a title bar and a content body.
 */
export function Window({
  title,
  index,
  status,
  actions,
  as: Tag = 'div',
  className,
  bodyClassName,
  children,
  ...props
}: WindowProps) {
  return (
    <Tag
      className={cn('notch flex flex-col border border-line bg-surface shadow-window', className)}
      {...props}
    >
      <div className="flex min-h-9 items-center justify-between gap-3 border-b border-line bg-surface-2 px-3 text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {index && <span className="text-primary">{index}</span>}
          <span className="min-w-0 flex-1 truncate">{title}</span>
        </div>
        {(status || actions) && (
          <div className="flex shrink-0 items-center gap-2 pr-2">
            {status && <span aria-hidden="true">[{status}]</span>}
            {actions}
          </div>
        )}
      </div>
      <div className={cn('min-h-0 flex-1 p-5 sm:p-8', bodyClassName)}>{children}</div>
    </Tag>
  )
}
