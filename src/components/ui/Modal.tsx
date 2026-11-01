import { useEffect, useRef, type ReactNode } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { cn } from '@/lib/cn'
import { dockSlide, fade } from '@/lib/motion'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the element that labels the dialog. */
  labelledBy: string
  /** Path-like label shown in the dialog title bar. */
  title: string
  children: ReactNode
  className?: string
}

function ModalDialog({
  onClose,
  labelledBy,
  title,
  children,
  className,
}: Omit<ModalProps, 'open'>) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useFocusTrap(dialogRef, true, onClose)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [])

  return (
    <div className="fixed inset-0 z-(--z-modal) flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        variants={fade}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="absolute inset-0 bg-bg/80"
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        variants={dockSlide}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          'notch relative flex max-h-[92svh] w-full max-w-4xl flex-col border border-line-strong bg-surface shadow-window outline-none sm:max-h-[86svh]',
          className,
        )}
      >
        <div className="flex min-h-11 items-center justify-between gap-3 border-b border-line bg-surface-2 pl-4 pr-1 text-[0.6875rem] uppercase tracking-[0.18em] text-ink-muted">
          <span className="truncate">{title}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="mr-3 inline-flex size-9 items-center justify-center text-ink-muted transition-colors hover:text-primary"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="overflow-y-auto overscroll-contain p-5 sm:p-8">{children}</div>
      </m.div>
    </div>
  )
}

/** Accessible dialog: focus trap, Escape, backdrop click, scroll lock, focus restore. */
export function Modal({ open, ...props }: ModalProps) {
  return <AnimatePresence>{open && <ModalDialog {...props} />}</AnimatePresence>
}
