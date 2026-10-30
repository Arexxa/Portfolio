import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { sectionDomId } from '@/features/galaxy-nav/usePanelNavigation'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'

interface HeroProps {
  /** True once the 3D name is on screen; the DOM h1 then becomes screen-reader-only. */
  sceneReady: boolean
  onExplore: () => void
}

/** Intro stop. The visible name is rendered in 3D; the h1 keeps it accessible and indexable. */
export function Hero({ sceneReady, onExplore }: HeroProps) {
  return (
    <Section
      id={sectionDomId('hero')}
      labelledBy="hero-title"
      className="justify-end pb-24 sm:pb-20"
    >
      <Container className="flex flex-col items-center gap-6 text-center">
        <div className="h-8 sm:h-10">
          <h1
            id="hero-title"
            className={cn(
              'text-gradient text-2xl font-bold leading-none tracking-tight sm:text-4xl',
              sceneReady && 'sr-only',
            )}
          >
            {site.name}
          </h1>
        </div>
        <p className="font-mono text-sm uppercase tracking-[0.35em] text-cyan-glow sm:text-base">
          {site.role}
        </p>
        <p className="max-w-xl text-lg text-ink-muted">{site.tagline}</p>
        <div className="pointer-events-auto flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button onClick={onExplore} size="lg">
              Begin the flight
            </Button>
          </Magnetic>
          <Magnetic>
            <Button href={site.resumePath} download variant="outline" size="lg">
              Download resume
            </Button>
          </Magnetic>
        </div>
        <p className="pt-2 text-xs text-ink-muted" aria-hidden="true">
          Scroll to travel
        </p>
      </Container>
    </Section>
  )
}
