import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const cardVariants = cva('p-4 sm:p-5', {
  variants: {
    tone: {
      surface: 'notch notch-sm border border-line bg-surface-2 [--notch-bg:var(--surface)]',
      outline: 'border border-line',
    },
  },
  defaultVariants: { tone: 'surface' },
})

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

/** Inner surface used inside windows (facts, skill groups, contact channels). */
export function Card({ tone, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone }), className)} {...props} />
}
