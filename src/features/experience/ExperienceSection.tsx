import { Section } from '@/components/layout/Section'
import { experience } from '@/data/experience'
import { sectionById } from '@/data/sections'
import { ExperienceEntry } from '@/features/experience/ExperienceEntry'

/** `git log` style timeline of roles, newest first. */
export function ExperienceSection() {
  return (
    <Section meta={sectionById.experience}>
      <ol className="relative before:absolute before:inset-y-2 before:left-1 before:w-px before:bg-line md:before:left-[calc(11rem+1rem)]">
        {experience.map((item, index) => (
          <ExperienceEntry key={item.id} item={item} head={index === 0} />
        ))}
      </ol>
    </Section>
  )
}
