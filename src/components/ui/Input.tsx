import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib/cn'

interface FieldProps {
  label: string
  error?: string
}

const fieldClasses =
  'w-full border bg-bg px-3 py-2.5 font-mono text-ink placeholder:text-ink-muted/70 transition-colors focus:border-primary focus-visible:outline-offset-0'

function FieldShell({
  id,
  label,
  error,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs uppercase tracking-[0.18em] text-ink-muted">
        <span aria-hidden="true" className="text-primary">
          ${' '}
        </span>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          <span aria-hidden="true">! </span>
          {error}
        </p>
      )}
    </div>
  )
}

/** Labelled text input with an inline error message wired via aria-describedby. */
export const Input = forwardRef<
  HTMLInputElement,
  FieldProps & InputHTMLAttributes<HTMLInputElement>
>(function Input({ label, error, className, id: idProp, ...props }, ref) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClasses, error ? 'border-danger' : 'border-line-strong', className)}
        {...props}
      />
    </FieldShell>
  )
})

/** Labelled textarea, same contract as Input. */
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ label, error, className, id: idProp, ...props }, ref) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        ref={ref}
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldClasses,
          'min-h-36 resize-y',
          error ? 'border-danger' : 'border-line-strong',
          className,
        )}
        {...props}
      />
    </FieldShell>
  )
})
