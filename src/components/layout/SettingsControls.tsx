import { useSettings } from '@/hooks/useSettings'
import { THEMES } from '@/lib/constants'

const controlClasses =
  'inline-flex min-h-11 items-center gap-1.5 px-3 uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink lg:min-h-9'

/** Theme cycle + CRT toggle, shared by the desktop bar and the mobile menu. */
export function SettingsControls() {
  const { theme, setTheme, crt, setCrt } = useSettings()
  const index = THEMES.findIndex((option) => option.id === theme)
  const next = THEMES[(index + 1) % THEMES.length] ?? THEMES[0]!

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => setTheme(next.id)}
        className={controlClasses}
        aria-label={`Theme: ${theme}. Switch to ${next.label}`}
      >
        <span aria-hidden="true" className="size-2 bg-primary" />
        {theme}
      </button>
      <button
        type="button"
        onClick={() => setCrt(!crt)}
        aria-pressed={crt}
        className={controlClasses}
      >
        CRT overlay{' '}
        <span aria-hidden="true" className={crt ? 'text-primary' : undefined}>
          {crt ? 'on' : 'off'}
        </span>
      </button>
    </div>
  )
}
