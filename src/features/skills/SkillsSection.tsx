import { Section } from '@/components/layout/Section'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { Card } from '@/components/ui/Card'
import { sectionById } from '@/data/sections'
import { skillGroups } from '@/data/skills'

/** Skill groups listed like installed module directories (no fake proficiency bars). */
export function SkillsSection() {
  return (
    <Section meta={sectionById.skills}>
      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <StaggerItem as="li" key={group.id}>
            <Card className="h-full">
              <h3 className="flex items-baseline justify-between gap-3 font-mono text-sm">
                <span className="text-primary">{group.id}/</span>
                <span className="text-xs font-normal text-ink-muted">
                  {group.skills.length} modules
                </span>
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-muted">
                {group.label}
              </p>
              <ul className="mt-4 flex flex-col gap-1.5 text-sm">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex gap-3">
                    <span aria-hidden="true" className="text-secondary">
                      -
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
