import { forwardRef, useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface FieldProps {
  label: string
  error?: string
}

const fieldClasses =
  'w-full rounded-md border bg-navy-900/70 px-4 py-3 text-ink placeholder:text-ink-muted/60 transition-colors focus:border-cyan-glow'

export const Input = forwardRef<
  HTMLInputElement,
  FieldProps & InputHTMLAttributes<HTMLInputElement>
>(function Input({ label, error, className, ...props }, ref) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-ink-muted">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClasses, error ? 'border-ember' : 'border-white/15', className)}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  )
})

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, error, className, ...props }, ref) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-ink-muted">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldClasses,
          'min-h-32 resize-y',
          error ? 'border-ember' : 'border-white/15',
          className,
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  )
})
