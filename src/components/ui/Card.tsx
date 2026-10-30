import type { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const cardVariants = cva('rounded-glass p-5 sm:p-6', {
  variants: {
    tone: {
      glass: 'glass',
      solid: 'bg-navy-800 border border-white/10',
      outline: 'border border-white/15',
    },
    interactive: {
      true: 'transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-cyan-glow/60',
      false: '',
    },
  },
  defaultVariants: { tone: 'solid', interactive: false },
})

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

/** Surface primitive. */
export function Card({ tone, interactive, className, ...props }: CardProps) {
  return <div className={cn(cardVariants({ tone, interactive }), className)} {...props} />
}
