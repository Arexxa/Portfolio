import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const badgeVariants = cva(
  'inline-flex items-center border px-2 py-0.5 font-mono text-[0.6875rem] leading-5 tracking-wide',
  {
    variants: {
      tone: {
        primary: 'border-primary/40 text-primary',
        secondary: 'border-secondary/40 text-secondary',
        accent: 'border-accent/40 text-accent',
        muted: 'border-line-strong text-ink-muted',
      },
    },
    defaultVariants: { tone: 'muted' },
  },
)

export type BadgeTone = NonNullable<VariantProps<typeof badgeVariants>['tone']>

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

/** Tech-stack tag, rendered like a hashtag (`#react`). */
export function Badge({ tone, className, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...props}>
      <span aria-hidden="true" className="opacity-60">
        #
      </span>
      {children}
    </span>
  )
}
