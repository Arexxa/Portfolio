import { useCallback, useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'motion/react'
import { Icon } from '@/components/ui/Icon'
import { dockSlide } from '@/lib/motion'
import { Terminal } from '@/features/terminal/Terminal'
import { terminalInputId, useTerminal } from '@/features/terminal/useTerminal'

function DockPanel({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const panel = ref.current
    const previous = document.activeElement as HTMLElement | null
    document.getElementById(terminalInputId('dock'))?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && panel?.contains(document.activeElement)) onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // Restore focus only if it was inside the dock (don't steal it after navigation).
      if (panel?.contains(document.activeElement) || document.activeElement === document.body) {
        previous?.focus({ preventScroll: true })
      }
    }
  }, [onClose])

  return (
    <m.section
      ref={ref}
      id="terminal-dock"
      aria-label="Terminal"
      variants={dockSlide}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-x-0 bottom-0 z-(--z-dock) sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[34rem]"
    >
      <Terminal
        variant="dock"
        className="h-[min(60svh,26rem)] sm:h-[26rem]"
        actions={
          <button
            type="button"
            onClick={onClose}
            aria-label="Close terminal"
            className="-mr-2 inline-flex size-8 items-center justify-center hover:text-primary"
          >
            <Icon name="close" className="size-4" />
          </button>
        }
      />
    </m.section>
  )
}

/** Floating terminal (bottom sheet on phones) available once the hero terminal is off-screen. */
export function TerminalDock() {
  const { dockOpen, setDockOpen } = useTerminal()
  const close = useCallback(() => setDockOpen(false), [setDockOpen])
  return <AnimatePresence>{dockOpen && <DockPanel onClose={close} />}</AnimatePresence>
}
