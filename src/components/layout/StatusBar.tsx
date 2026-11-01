import { useEffect, useState, type MouseEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { SettingsControls } from '@/components/layout/SettingsControls'
import { sections } from '@/data/sections'
import { site } from '@/data/site'
import { cn } from '@/lib/cn'
import type { SectionId } from '@/types/content'

interface StatusBarProps {
  active: SectionId
  onNavigate: (id: SectionId) => void
  terminalOpen: boolean
  onToggleTerminal: () => void
}

const MENU_ID = 'status-menu'

/**
 * Sticky OS status bar: brand, section navigation (real hash links, enhanced with smooth
 * scrolling + focus), theme/CRT controls and the terminal dock toggle.
 */
export function StatusBar({ active, onNavigate, terminalOpen, onToggleTerminal }: StatusBarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const go = (event: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    event.preventDefault()
    setMenuOpen(false)
    onNavigate(id)
  }

  return (
    <header className="sticky top-0 z-(--z-bar) border-b border-line bg-bg/95">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-4 px-5 text-xs sm:px-8"
      >
        <a
          href="#hero"
          onClick={(event) => go(event, 'hero')}
          className="flex items-center gap-2 font-bold uppercase tracking-[0.2em] text-ink"
        >
          <span aria-hidden="true" className="size-2 bg-primary" />
          {site.osName}
        </a>

        <ul
          id={MENU_ID}
          className={cn(
            'absolute inset-x-0 top-12 flex-col border-b border-line bg-bg p-3 lg:static lg:flex lg:flex-row lg:border-0 lg:bg-transparent lg:p-0',
            menuOpen ? 'flex' : 'hidden',
          )}
        >
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(event) => go(event, section.id)}
                aria-current={active === section.id ? 'location' : undefined}
                className={cn(
                  'flex min-h-11 items-center gap-2 px-3 uppercase tracking-[0.16em] transition-colors lg:min-h-9',
                  active === section.id ? 'text-primary' : 'text-ink-muted hover:text-ink',
                )}
              >
                <span aria-hidden="true" className="text-[0.625rem]">
                  {section.number}
                </span>
                {section.title}
              </a>
            </li>
          ))}
          <li className="mt-2 border-t border-line pt-3 lg:hidden">
            <SettingsControls />
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <div className="hidden lg:flex">
            <SettingsControls />
          </div>
          <button
            type="button"
            onClick={onToggleTerminal}
            aria-expanded={terminalOpen}
            aria-controls="terminal-dock"
            aria-label="Toggle terminal (backtick key)"
            className={cn(
              'inline-flex size-11 items-center justify-center transition-colors lg:size-9',
              terminalOpen ? 'text-primary' : 'text-ink-muted hover:text-ink',
            )}
          >
            <Icon name="terminal" />
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center px-3 uppercase tracking-[0.16em] text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>
    </header>
  )
}
