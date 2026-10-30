import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: string
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** Eyebrow + gradient heading pair used by sections and panels. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  as: Tag = 'h2',
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-glow">{eyebrow}</p>
      )}
      <Tag id={id} className="text-gradient text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </Tag>
    </div>
  )
}
