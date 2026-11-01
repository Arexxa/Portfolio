import { GlitchText } from '@/components/ui/GlitchText'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  id: string
  title: string
  /** Mono label above the heading, e.g. `01 // about`. */
  eyebrow?: string
  blurb?: string
  className?: string
}

/**
 * Section h2 with the glitch hover effect. It is focusable (tabIndex -1) so navigation can
 * move focus here after scrolling, which keeps keyboard and screen-reader users in place.
 */
export function SectionHeading({ id, title, eyebrow, blurb, className }: SectionHeadingProps) {
  return (
    <header className={cn('flex flex-col gap-3', className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      )}
      <h2
        id={id}
        tabIndex={-1}
        className="glitch-trigger w-fit text-4xl font-bold text-ink outline-offset-8 sm:text-5xl"
      >
        <GlitchText text={title} />
      </h2>
      {blurb && <p className="max-w-2xl text-ink-muted">{blurb}</p>}
    </header>
  )
}
