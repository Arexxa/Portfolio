import type { ReactNode } from 'react'
import { Container } from '@/components/layout/Container'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Window } from '@/components/ui/Window'
import { cn } from '@/lib/cn'
import type { SectionMeta } from '@/types/content'

interface SectionProps {
  meta: SectionMeta
  children: ReactNode
  /** Extra classes for the window body (e.g. to remove padding for the projects desktop). */
  bodyClassName?: string
}

export const sectionTitleId = (id: string) => `${id}-title`

/**
 * A content section rendered as an OS window. `id` is the scroll/hash target; navigation
 * toggles `data-flash` on it to pulse the frame and glitch the heading.
 */
export function Section({ meta, children, bodyClassName }: SectionProps) {
  const titleId = sectionTitleId(meta.id)
  return (
    <section id={meta.id} aria-labelledby={titleId} className="py-16 md:py-24">
      <Container>
        <Reveal>
          <Window
            title={`~/${meta.file}`}
            index={meta.number}
            status={meta.status}
            className="flash-frame"
            bodyClassName={cn('flex flex-col gap-10', bodyClassName)}
          >
            <SectionHeading
              id={titleId}
              eyebrow={`${meta.number} // ${meta.id}`}
              title={meta.title}
              blurb={meta.blurb}
            />
            {children}
          </Window>
        </Reveal>
      </Container>
    </section>
  )
}
