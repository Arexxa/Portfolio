import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { site } from '@/data/site'
import { CONTACT_FIELD_ID, consumeContactFocus } from '@/features/contact/contactFocus'
import { useContactForm } from '@/features/contact/useContactForm'

/** Accessible contact form with validation, honeypot and status messaging. */
export function ContactForm() {
  const { form, submit, status } = useContactForm()
  const { errors } = form.formState
  const sending = status === 'sending'

  useEffect(() => {
    if (consumeContactFocus()) form.setFocus('name')
  }, [form])

  return (
    <form
      onSubmit={submit}
      noValidate
      className="relative flex flex-col gap-5"
      aria-label="Contact form"
    >
      <Input
        id={CONTACT_FIELD_ID}
        label="Name"
        autoComplete="name"
        error={errors.name?.message}
        {...form.register('name')}
      />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        inputMode="email"
        error={errors.email?.message}
        {...form.register('email')}
      />
      <Textarea label="Message" error={errors.message?.message} {...form.register('message')} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" tabIndex={-1} autoComplete="off" {...form.register('company')} />
        </label>
      </div>
      <Button
        type="submit"
        size="lg"
        className="self-start"
        disabled={sending || status === 'unconfigured'}
      >
        {sending ? 'Transmitting...' : 'Send message'}
      </Button>
      <p role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === 'success' && (
          <span className="text-success">&gt; message queued. I will reply soon.</span>
        )}
        {status === 'error' && (
          <span className="text-danger">
            &gt; transmission failed. Try again or email{' '}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </span>
        )}
        {status === 'unconfigured' && (
          <span className="text-ink-muted">
            &gt; form offline (VITE_FORMSPREE_ENDPOINT not set). Email me directly instead.
          </span>
        )}
      </p>
    </form>
  )
}
