import { useEffect, useRef, type ReactNode } from 'react'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import { useLenis } from '@/hooks/useLenis'
import { cn } from '@/lib/cn'

interface ModalProps {
  open: boolean
  onClose: () => void
  /** id of the element that labels the dialog. */
  labelledBy: string
  children: ReactNode
  className?: string
}

/** Accessible glass dialog: focus trap, Escape, backdrop click, scroll lock, focus restore. */
export function Modal({ open, onClose, labelledBy, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  useFocusTrap(dialogRef, open, onClose)

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      document.body.style.overflow = previous
    }
  }, [open, lenis])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-void/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          'glass relative outline-none max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-glass p-6 sm:max-h-[86svh] sm:rounded-glass sm:p-10',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}
