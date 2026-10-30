import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ContactForm } from '@/features/contact/ContactForm'
import { site } from '@/data/site'
import { socials } from '@/data/socials'

/** Contact panel: direct channels, resume download and the form. */
export default function ContactPanel() {
  return (
    <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col gap-4">
        <Card tone="outline" className="flex flex-col gap-3">
          <p>
            <span className="block font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Email
            </span>
            <a className="break-all hover:text-cyan-glow" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
          <p>
            <span className="block font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Phone
            </span>
            <a className="hover:text-cyan-glow" href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}>
              {site.phone}
            </a>
          </p>
          <p>
            <span className="block font-mono text-xs uppercase tracking-widest text-cyan-glow">
              Based in
            </span>
            {site.location.locality}, {site.location.region}
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
                {social.label} &#8599;
              </Button>
            </li>
          ))}
        </ul>
        <Button href={site.resumePath} download>
          Download resume (PDF)
        </Button>
      </div>
      <ContactForm />
    </div>
  )
}
