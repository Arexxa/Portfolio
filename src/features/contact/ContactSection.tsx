import { lazy } from 'react'
import { Deferred } from '@/components/layout/Deferred'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { sectionById } from '@/data/sections'
import { site } from '@/data/site'
import { socials } from '@/data/socials'

// react-hook-form + zod are only needed here, so they live in this lazy chunk.
const ContactForm = lazy(() =>
  import('@/features/contact/ContactForm').then((mod) => ({ default: mod.ContactForm })),
)

const labelClasses = 'block text-[0.6875rem] uppercase tracking-[0.2em] text-ink-muted'

/** Contact: direct channels, socials, resume download and the form. */
export function ContactSection() {
  return (
    <Section meta={sectionById.contact}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-5">
          <Card className="flex flex-col gap-4">
            <p>
              <span className={labelClasses}>email</span>
              <a className="break-all text-primary hover:underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
            <p>
              <span className={labelClasses}>phone</span>
              <a className="hover:text-primary" href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
                {site.phone}
              </a>
            </p>
            <p>
              <span className={labelClasses}>location</span>
              {site.location.locality}, {site.location.region}, Malaysia
            </p>
          </Card>
          <ul className="flex flex-wrap gap-3">
            {socials.map((social) => (
              <li key={social.id}>
                <Button
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="outline"
                  size="sm"
                >
                  {social.label}
                  <Icon name="external" className="size-3.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </Button>
              </li>
            ))}
          </ul>
          <Button href={site.resumePath} download={site.resumeFileName} className="self-start">
            <Icon name="download" className="size-4" />
            Download resume (PDF)
          </Button>
        </div>
        <Deferred
          fallback={
            <div aria-hidden="true" className="min-h-[29rem] border border-dashed border-line" />
          }
          errorFallback={
            <p className="text-danger">
              The form failed to load. Email{' '}
              <a className="underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>{' '}
              instead.
            </p>
          }
        >
          <ContactForm />
        </Deferred>
      </div>
    </Section>
  )
}
