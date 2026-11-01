import { useEffect, useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { GlitchText } from '@/components/ui/GlitchText'
import { site } from '@/data/site'
import { DesktopIcons } from '@/features/hero/DesktopIcons'
import { HeroBackdrop } from '@/features/hero/HeroBackdrop'
import { Terminal } from '@/features/terminal/Terminal'
import { useTerminal } from '@/features/terminal/useTerminal'
import type { SectionId } from '@/types/content'

interface HeroProps {
  booted: boolean
  onNavigate: (id: SectionId) => void
}

/** Reports whether the hero terminal is on screen, so the dock only appears once it isn't. */
function useTrackHeroTerminal() {
  const ref = useRef<HTMLDivElement>(null)
  const { setHeroVisible } = useTerminal()
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(!!entry?.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [setHeroVisible])
  return ref
}

/** The "desktop": identity, shortcuts and the live terminal over the 3D grid. */
export function Hero({ booted, onNavigate }: HeroProps) {
  const terminalRef = useTrackHeroTerminal()
  const [first, ...rest] = site.name.split(' ')

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-3rem)] items-center overflow-hidden"
    >
      <HeroBackdrop enabled={booted} />
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
        <div className="flex flex-col gap-7">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            {site.osName} <span className="text-ink-muted">// session active</span>
          </p>
          <div className="flex flex-col gap-3">
            <h1
              id="hero-title"
              tabIndex={-1}
              className="glitch-trigger w-fit text-[clamp(2.5rem,6.5vw,4.75rem)] font-bold text-ink outline-offset-8"
            >
              <GlitchText text={first ?? site.name} />{' '}
              <span className="mt-1 block text-[0.5em] font-medium text-ink-muted">
                {rest.join(' ')}
              </span>
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-secondary">{site.role}</p>
          </div>
          <p className="max-w-lg text-ink-muted">{site.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Button href={site.resumePath} download={site.resumeFileName} size="lg">
              Download resume
            </Button>
            <Button variant="outline" size="lg" onClick={() => onNavigate('contact')}>
              Contact me
            </Button>
          </div>
          <DesktopIcons onOpen={onNavigate} />
        </div>
        <div ref={terminalRef}>
          <Terminal variant="hero" />
        </div>
      </Container>
    </section>
  )
}
