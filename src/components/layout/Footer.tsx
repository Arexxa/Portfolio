import { site } from '@/data/site'
import { socials } from '@/data/socials'
import { Container } from '@/components/layout/Container'

/** Page footer, pinned to the bottom of the last flight stop. */
export function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-0 z-10 pb-5 text-sm text-ink-muted">
      <Container className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-5">
          {socials.map((social) => (
            <li key={social.id}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer noopener"
                className="transition-colors hover:text-cyan-glow"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  )
}
