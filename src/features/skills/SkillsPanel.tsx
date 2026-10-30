import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Stagger } from '@/components/motion/Stagger'
import { skillGroups } from '@/data/skills'

const TONES = ['cyan', 'violet', 'ember', 'cyan', 'violet'] as const

/** Skills panel: grouped badges. */
export default function SkillsPanel() {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {skillGroups.map((group, index) => (
        <Card key={group.id} tone="outline" className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">{group.label}</h3>
          <ul className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <li key={skill}>
                <Badge tone={TONES[index % TONES.length]}>{skill}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </Stagger>
  )
}
