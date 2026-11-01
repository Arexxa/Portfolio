import { Container } from '@/components/layout/Container'
import { site } from '@/data/site'
import { socials } from '@/data/socials'

/** Page footer, written as the end of a log file. */
export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-xs text-ink-muted">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="text-primary">EOF</span> &copy; {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 items-center uppercase tracking-[0.16em] transition-colors hover:text-primary sm:min-h-0"
              >
                {social.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.resumePath}
              download={site.resumeFileName}
              className="inline-flex min-h-11 items-center uppercase tracking-[0.16em] transition-colors hover:text-primary sm:min-h-0"
            >
              Resume.pdf
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  )
}
