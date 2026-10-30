import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out-expo disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary: 'bg-cyan-glow text-void shadow-glow-cyan hover:bg-white hover:shadow-glow-violet',
        outline: 'border border-white/25 text-ink hover:border-cyan-glow hover:text-cyan-glow',
        ghost: 'text-ink-muted hover:bg-white/10 hover:text-ink',
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

interface CommonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

/** Button that renders an `<a>` when `href` is provided. Variants come from `buttonVariants`. */
export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props
  const classes = cn(buttonVariants({ variant, size }), className)

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...anchorProps } = props
    return (
      <a {...anchorProps} className={classes}>
        {children}
      </a>
    )
  }
  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    type = 'button',
    ...buttonProps
  } = props
  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  )
}
