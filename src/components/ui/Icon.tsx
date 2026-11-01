import type { IconName } from '@/types/content'
import { cn } from '@/lib/cn'

/** 24x24 stroke paths, drawn on a pixel-ish grid to match the terminal aesthetic. */
const PATHS: Record<IconName, string> = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1',
  log: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
  chip: 'M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  download: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  terminal: 'M3 5h18v14H3zM7 10l3 2-3 2M12 15h5',
  crt: 'M3 5h18v12H3zM8 21h8M12 17v4M6 9h12M6 12h12',
  close: 'M6 6l12 12M18 6 6 18',
  external: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
}

interface IconProps {
  name: IconName
  className?: string
  /** Accessible label. Omit for decorative icons next to visible text. */
  label?: string
}

/** Inline SVG icon (no icon library). Decorative by default. */
export function Icon({ name, className, label }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={cn('size-5 shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  )
}
