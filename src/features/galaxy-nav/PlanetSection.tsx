import { Section } from '@/components/layout/Section'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/motion/Reveal'
import { PlanetOrb } from '@/features/galaxy-nav/PlanetOrb'
import { sectionDomId } from '@/features/galaxy-nav/usePanelNavigation'
import { cn } from '@/lib/cn'
import type { SectionMeta } from '@/types/content'

interface PlanetSectionProps {
  section: SectionMeta
  /** Even indexes put the planet on the right, so copy sits on the left (and vice versa). */
  index: number
  showOrb: boolean
  onOpen: (id: SectionMeta['id']) => void
}

/** Flight stop for one planet: teaser copy plus the button that opens its panel. */
export function PlanetSection({ section, index, showOrb, onOpen }: PlanetSectionProps) {
  const headingId = `heading-${section.id}`
  const copyOnRight = index % 2 === 1

  return (
    <Section
      id={sectionDomId(section.id)}
      labelledBy={headingId}
      className="justify-end pb-28 lg:justify-center lg:pb-0"
    >
      <Container className={cn('relative', showOrb && 'lg:min-h-96')}>
        {showOrb && <PlanetOrb id={section.id} />}
        <Reveal
          className={cn(
            'flex max-w-md flex-col gap-4 text-center lg:text-left',
            copyOnRight && 'lg:ml-auto lg:text-right lg:items-end',
            !copyOnRight && 'items-center lg:items-start',
          )}
        >
          <p className="font-mono text-sm text-ember">{section.number}</p>
          <SectionHeading id={headingId} eyebrow={section.eyebrow} title={section.title} />
          <p className="text-lg text-ink-muted">{section.blurb}</p>
          <Button className="pointer-events-auto" onClick={() => onOpen(section.id)}>
            {section.cta}
          </Button>
        </Reveal>
      </Container>
    </Section>
  )
}
