import { Badge } from '@/components/ui/Badge'
import type { ExperienceItem } from '@/types/content'

interface ExperienceItemCardProps {
  item: ExperienceItem
}

/** One timeline entry. */
export function ExperienceItemCard({ item }: ExperienceItemCardProps) {
  return (
    <li className="relative border-l border-violet-glow/40 pb-2 pl-6 last:border-transparent">
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-violet-glow shadow-glow-violet"
      />
      <p className="font-mono text-xs uppercase tracking-widest text-ember">{item.period}</p>
      <h3 className="mt-1 text-xl font-semibold">
        {item.role} <span className="text-ink-muted">@ {item.company}</span>
      </h3>
      <p className="text-sm text-cyan-glow">{item.scope}</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink marker:text-violet-glow">
        {item.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
        {item.stack.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>
    </li>
  )
}
