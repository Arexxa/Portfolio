import { AnimatePresence, m, type Variants } from 'motion/react'
import { site } from '@/data/site'
import { BOOT } from '@/lib/constants'
import type { BootState } from '@/features/boot/useBootSequence'

const GLITCH_S = BOOT.glitchMs / 1000

/** Exit = glitch-out: the log tears into horizontal slices and jitters before vanishing. */
const overlay: Variants = {
  visible: { opacity: 1, x: 0, clipPath: 'inset(0% 0% 0% 0%)' },
  exit: {
    opacity: [1, 1, 1, 0],
    x: [0, -10, 8, 0],
    clipPath: [
      'inset(0% 0% 0% 0%)',
      'inset(18% 0% 34% 0%)',
      'inset(56% 0% 8% 0%)',
      'inset(50% 0% 50% 0%)',
    ],
    transition: { duration: GLITCH_S, ease: 'linear' },
  },
}

/** Colour-split bars that flash during the exit. */
const tear = (offset: number): Variants => ({
  visible: { opacity: 0, x: 0 },
  exit: { opacity: [0, 0.9, 0], x: [0, offset, 0], transition: { duration: GLITCH_S } },
})

function BootOverlay({ lines, progress, skip }: Omit<BootState, 'done'>) {
  return (
    <m.div
      variants={overlay}
      initial={false}
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-(--z-boot) flex flex-col bg-bg px-6 py-8 sm:px-12 sm:py-12"
    >
      <m.div
        variants={tear(-14)}
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 h-8 bg-accent mix-blend-screen"
      />
      <m.div
        variants={tear(16)}
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 h-4 bg-secondary mix-blend-screen"
      />

      <p className="sr-only" role="status">
        Loading portfolio. Press any key to skip.
      </p>
      <div
        aria-hidden="true"
        className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{site.osName}</p>
        <ol className="space-y-1 text-sm text-ink-muted sm:text-base">
          {lines.map((line, index) => (
            <li key={index} className="flex justify-between gap-4">
              <span className={index === 0 ? 'text-ink' : undefined}>
                {line.text}
                {!line.complete && <span className="caret ml-0.5" />}
              </span>
              {line.complete && line.status && (
                <span className="text-primary">[ {line.status} ]</span>
              )}
            </li>
          ))}
        </ol>
        <div className="h-px w-full bg-line">
          <div
            className="h-px origin-left bg-primary transition-transform duration-100"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
      <button
        type="button"
        // eslint-disable-next-line jsx-a11y/no-autofocus -- the overlay covers the page; focus must start here
        autoFocus
        onClick={skip}
        className="mx-auto mt-6 text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-primary"
      >
        Skip boot <span aria-hidden="true">[any key]</span>
      </button>
    </m.div>
  )
}

interface BootSequenceProps {
  state: BootState
}

/** First-visit boot overlay. Renders nothing once booted (or under reduced motion). */
export function BootSequence({ state }: BootSequenceProps) {
  const { done, ...rest } = state
  return <AnimatePresence>{!done && <BootOverlay {...rest} />}</AnimatePresence>
}
