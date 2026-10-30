import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Stagger } from '@/components/motion/Stagger'
import { about } from '@/data/about'

/** About panel: bio, quick facts, education and certifications. */
export default function AboutPanel() {
  return (
    <Stagger className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 text-lg leading-relaxed text-ink">
        {about.summary.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="grid gap-3 sm:grid-cols-2">
        {about.facts.map((fact) => (
          <Card key={fact.label} tone="outline" className="p-4">
            <dt className="font-mono text-xs uppercase tracking-widest text-cyan-glow">
              {fact.label}
            </dt>
            <dd className="mt-1 text-ink">{fact.value}</dd>
          </Card>
        ))}
      </dl>

      <section aria-labelledby="education-title" className="flex flex-col gap-3">
        <h3 id="education-title" className="text-xl font-semibold">
          Education
        </h3>
        {about.education.map((item) => (
          <Card key={item.degree} className="flex flex-col gap-1">
            <p className="font-semibold">{item.degree}</p>
            <p className="text-ink-muted">
              {item.school} &middot; {item.period}
            </p>
            <p className="text-sm text-ember">{item.result}</p>
          </Card>
        ))}
      </section>

      <section aria-labelledby="cert-title" className="flex flex-col gap-3">
        <h3 id="cert-title" className="text-xl font-semibold">
          Certification
        </h3>
        <ul className="flex flex-wrap gap-2">
          {about.certifications.map((cert) => (
            <li key={cert.name}>
              <Badge tone="violet">
                {cert.name} &middot; {cert.issuer} &middot; {cert.year}
              </Badge>
            </li>
          ))}
        </ul>
      </section>
    </Stagger>
  )
}
