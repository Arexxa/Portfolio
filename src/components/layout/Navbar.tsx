import { useState } from 'react'
import { AudioToggle } from '@/features/audio/AudioToggle'
import { sections } from '@/data/sections'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import type { SectionId } from '@/types/content'

interface NavbarProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
}

/** Fixed top bar: brand, planet navigation (disclosure menu on mobile) and sound toggle. */
export function Navbar({ active, onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id: SectionId) => {
    setMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 sm:px-8"
      >
        <button
          type="button"
          onClick={() => go('hero')}
          className="font-mono text-sm font-bold tracking-widest text-ink"
        >
          {site.shortName.toUpperCase()}
          <span className="text-cyan-glow">.</span>
        </button>

        <ul
          id="nav-links"
          className={cn(
            'glass absolute inset-x-5 top-16 flex-col gap-1 rounded-glass p-3 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none',
            menuOpen ? 'flex' : 'hidden',
          )}
        >
          {sections.map((section) => (
            <li key={section.id}>
              <button
                type="button"
                onClick={() => go(section.id)}
                aria-current={active === section.id ? 'location' : undefined}
                className={cn(
                  'w-full rounded-full px-4 py-2 text-left text-sm transition-colors md:w-auto',
                  active === section.id ? 'text-cyan-glow' : 'text-ink-muted hover:text-ink',
                )}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <AudioToggle />
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-full border border-white/20 px-4 text-sm md:hidden"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((open) => !open)}
          >
            Menu
          </button>
        </div>
      </nav>
    </header>
  )
}
