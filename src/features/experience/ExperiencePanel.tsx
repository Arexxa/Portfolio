import { Stagger } from '@/components/motion/Stagger'
import { experience } from '@/data/experience'
import { ExperienceItemCard } from '@/features/experience/ExperienceItemCard'

/** Experience panel: reverse-chronological timeline. */
export default function ExperiencePanel() {
  return (
    <Stagger as="ol" className="flex flex-col gap-8" gap={0.09}>
      {experience.map((item) => (
        <ExperienceItemCard key={item.id} item={item} />
      ))}
    </Stagger>
  )
}
