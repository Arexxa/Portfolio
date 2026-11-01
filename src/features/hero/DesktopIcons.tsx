import { Icon } from '@/components/ui/Icon'
import { sections } from '@/data/sections'
import { site } from '@/data/site'
import type { SectionId } from '@/types/content'

interface DesktopIconsProps {
  onOpen: (id: SectionId) => void
}

const iconClasses =
  'group flex min-h-20 w-full flex-col items-center justify-center gap-1.5 border border-transparent bg-bg/70 px-2 py-3 text-center transition-colors hover:border-line-strong hover:bg-surface focus-visible:border-primary'

/** Desktop shortcuts: one real button per section plus the resume download. */
export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  return (
    <nav aria-label="Desktop shortcuts">
      <ul className="grid grid-cols-3 gap-1 sm:grid-cols-6">
        {sections.map((section) => (
          <li key={section.id}>
            <button type="button" onClick={() => onOpen(section.id)} className={iconClasses}>
              <Icon
                name={section.icon}
                className="size-6 text-primary transition-transform group-hover:-translate-y-0.5"
              />
              <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink">
                {section.title}
              </span>
              <span aria-hidden="true" className="text-[0.625rem] text-ink-muted">
                {section.file}
              </span>
            </button>
          </li>
        ))}
        <li>
          <a href={site.resumePath} download={site.resumeFileName} className={iconClasses}>
            <Icon
              name="download"
              className="size-6 text-accent transition-transform group-hover:-translate-y-0.5"
            />
            <span className="text-[0.6875rem] uppercase tracking-[0.14em] text-ink">Resume</span>
            <span aria-hidden="true" className="text-[0.625rem] text-ink-muted">
              resume.pdf
            </span>
          </a>
        </li>
      </ul>
    </nav>
  )
}
