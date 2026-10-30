import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { useContactForm } from '@/features/contact/useContactForm'
import { site } from '@/data/site'

/** Accessible contact form with validation, honeypot and status messaging. */
export function ContactForm() {
  const { form, submit, status } = useContactForm()
  const { register, formState } = form
  const { errors } = formState

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4" aria-label="Contact form">
      <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Textarea label="Message" error={errors.message?.message} {...register('message')} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
        </label>
      </div>
      <Button type="submit" disabled={status === 'sending' || status === 'unconfigured'}>
        {status === 'sending' ? 'Sending...' : 'Send signal'}
      </Button>
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === 'success' && (
          <span className="text-cyan-glow">Signal received. I will reply soon.</span>
        )}
        {status === 'error' && (
          <span className="text-ember">
            Transmission failed. Please try again or email{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </span>
        )}
        {status === 'unconfigured' && (
          <span className="text-ink-muted">
            The form is not configured yet (set VITE_FORMSPREE_ENDPOINT). Email me directly instead.
          </span>
        )}
      </p>
    </form>
  )
}
