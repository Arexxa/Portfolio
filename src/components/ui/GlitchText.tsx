import { cn } from '@/lib/cn'

interface GlitchTextProps {
  text: string
  className?: string
}

/**
 * Text with two colour-split copies that flicker when an ancestor with `.glitch-trigger`
 * is hovered/focused, or when the enclosing section flashes. The copies are aria-hidden
 * so screen readers read the text once. Disabled under reduced motion (effects.css).
 */
export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <span className={cn('glitch', className)}>
      {text}
      <span aria-hidden="true" className="glitch-layer">
        {text}
      </span>
      <span aria-hidden="true" className="glitch-layer">
        {text}
      </span>
    </span>
  )
}
