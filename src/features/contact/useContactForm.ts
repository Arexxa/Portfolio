import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  contactSchema,
  type ContactInput,
  type ContactValues,
} from '@/features/contact/contactSchema'
import { env } from '@/lib/env'

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured'

/**
 * Form state + Formspree submission. Honeypot hits resolve as success without sending.
 * An in-flight request is aborted if the form unmounts.
 */
export function useContactForm() {
  const [status, setStatus] = useState<SubmitStatus>(
    env.formspreeEndpoint ? 'idle' : 'unconfigured',
  )
  const abortRef = useRef<AbortController | null>(null)
  const form = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', company: '' },
  })

  useEffect(() => () => abortRef.current?.abort(), [])

  const submit = form.handleSubmit(async (values) => {
    if (values.company) return setStatus('success')
    if (!env.formspreeEndpoint) return setStatus('unconfigured')
    setStatus('sending')
    abortRef.current = new AbortController()
    try {
      const response = await fetch(env.formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name, email: values.email, message: values.message }),
        signal: abortRef.current.signal,
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
      form.reset()
      setStatus('success')
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus('error')
    }
  })

  return { form, submit, status }
}
