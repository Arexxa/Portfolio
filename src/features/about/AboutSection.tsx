import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui/Card'
import { about } from '@/data/about'
import { sectionById } from '@/data/sections'

/** `cat about.md`: bio, quick facts, education and certifications. */
export function AboutSection() {
  return (
    <Section meta={sectionById.about}>
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex max-w-prose flex-col gap-4 text-ink">
          {about.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Card>
          <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-ink-muted">profile.json</h3>
          <dl className="grid gap-3 text-sm">
            {about.facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[8rem_1fr] gap-3">
                <dt className="text-secondary">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-xl font-semibold">Education</h3>
          <ul className="flex flex-col gap-5">
            {about.education.map((item) => (
              <li key={item.degree} className="border-l border-line-strong pl-4">
                <p className="text-xs text-ink-muted">{item.period}</p>
                <p className="mt-1 text-ink">{item.degree}</p>
                <p className="text-sm text-ink-muted">{item.school}</p>
                <p className="mt-1 text-sm text-primary">{item.result}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-xl font-semibold">Certifications</h3>
          <ul className="flex flex-col gap-5">
            {about.certifications.map((cert) => (
              <li key={cert.name} className="border-l border-line-strong pl-4">
                <p className="text-xs text-ink-muted">{cert.year}</p>
                <p className="mt-1 text-ink">{cert.name}</p>
                <p className="text-sm text-ink-muted">{cert.issuer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
