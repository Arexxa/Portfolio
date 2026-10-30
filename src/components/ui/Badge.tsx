import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs tracking-wide',
  {
    variants: {
      tone: {
        cyan: 'border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow',
        violet: 'border-violet-glow/40 bg-violet-glow/10 text-violet-glow',
        ember: 'border-ember/40 bg-ember/10 text-ember',
        muted: 'border-white/15 bg-white/5 text-ink-muted',
      },
    },
    defaultVariants: { tone: 'muted' },
  },
)

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Small pill for tags and tech-stack labels. */
export function Badge({ tone, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />
}
