import { Badge } from '@/components/ui/Badge'
import { shortHash } from '@/lib/format'
import { cn } from '@/lib/cn'
import type { ExperienceItem } from '@/types/content'

interface ExperienceEntryProps {
  item: ExperienceItem
  /** The newest entry is marked as HEAD. */
  head: boolean
}

/** One job rendered like a `git log` commit. */
export function ExperienceEntry({ item, head }: ExperienceEntryProps) {
  return (
    <li className="relative grid gap-2 pb-10 pl-6 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-8 md:pl-0">
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-2 size-2 md:left-[11rem] md:-translate-x-[calc(50%+0.5px)] md:ml-4',
          head ? 'bg-primary' : 'border border-line-strong bg-bg',
        )}
      />
      <div className="text-xs md:text-right">
        <p className="text-accent">
          <span aria-hidden="true">commit </span>
          {shortHash(item.id)}
        </p>
        <p className="mt-1 text-ink-muted">{item.period}</p>
        {head && <p className="mt-1 text-primary">HEAD -&gt; current</p>}
      </div>
      <div>
        <h3 className="text-xl font-semibold">
          {item.role} <span className="text-ink-muted">@ {item.company}</span>
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-secondary">{item.scope}</p>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span aria-hidden="true" className="text-primary">
                +
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {item.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </li>
  )
}
