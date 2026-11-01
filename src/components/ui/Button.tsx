import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const buttonVariants = cva(
  'notch notch-sm inline-flex items-center justify-center gap-2 border font-mono uppercase tracking-[0.14em] transition-[color,background-color,border-color,box-shadow] duration-200 ease-out-expo disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        primary: 'border-primary bg-primary text-bg hover:bg-ink hover:border-ink',
        outline: 'border-line-strong bg-bg text-ink hover:border-primary hover:text-primary',
        ghost: 'border-transparent text-ink-muted hover:text-primary [&::after]:hidden',
      },
      size: {
        sm: 'min-h-9 px-3 text-[0.6875rem]',
        md: 'min-h-11 px-5 text-xs',
        lg: 'min-h-12 px-6 text-[0.8125rem]',
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
