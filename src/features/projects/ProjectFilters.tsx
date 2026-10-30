import { cn } from '@/lib/cn'

interface ProjectFiltersProps {
  tags: readonly string[]
  selected: string | null
  onSelect: (tag: string | null) => void
}

/** Tag filter chips. `aria-pressed` conveys the current filter. */
export function ProjectFilters({ tags, selected, onSelect }: ProjectFiltersProps) {
  const options: (string | null)[] = [null, ...tags]
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filter projects by technology">
      {options.map((tag) => (
        <li key={tag ?? 'all'}>
          <button
            type="button"
            aria-pressed={selected === tag}
            onClick={() => onSelect(tag)}
            className={cn(
              'rounded-full border px-4 py-1.5 font-mono text-xs transition-colors',
              selected === tag
                ? 'border-cyan-glow bg-cyan-glow/15 text-cyan-glow'
                : 'border-white/15 text-ink-muted hover:text-ink',
            )}
          >
            {tag ?? 'All'}
          </button>
        </li>
      ))}
    </ul>
  )
}
