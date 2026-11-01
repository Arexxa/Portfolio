import { cn } from '@/lib/cn'

interface ProjectFiltersProps {
  tags: readonly string[]
  selected: string | null
  onSelect: (tag: string | null) => void
}

/** Tech filter chips. `aria-pressed` conveys the active filter. */
export function ProjectFilters({ tags, selected, onSelect }: ProjectFiltersProps) {
  // A tag chosen from the terminal may not be one of the top chips; show it anyway.
  const options: (string | null)[] = [
    null,
    ...tags,
    ...(selected && !tags.includes(selected) ? [selected] : []),
  ]
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Filter projects by technology">
      {options.map((tag) => (
        <li key={tag ?? 'all'}>
          <button
            type="button"
            aria-pressed={selected === tag}
            onClick={() => onSelect(tag)}
            className={cn(
              'min-h-9 border px-3 text-xs transition-colors',
              selected === tag
                ? 'border-primary bg-primary text-bg'
                : 'border-line-strong text-ink-muted hover:border-primary hover:text-primary',
            )}
          >
            {tag ? `#${tag}` : 'all'}
          </button>
        </li>
      ))}
    </ul>
  )
}
