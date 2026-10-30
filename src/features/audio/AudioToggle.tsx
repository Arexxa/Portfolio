import { useAudio } from '@/features/audio/useAudio'
import { cn } from '@/lib/cn'

/** Sound on/off switch (off by default). */
export function AudioToggle() {
  const { enabled, toggle } = useAudio()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label="Ambient sound"
      title={enabled ? 'Sound on' : 'Sound off'}
      className="group inline-flex h-10 items-center gap-2 rounded-full border border-white/20 px-3 text-xs text-ink-muted transition-colors hover:border-cyan-glow hover:text-ink"
    >
      <span aria-hidden="true" className="flex h-4 items-end gap-0.5">
        {[0.5, 1, 0.7].map((height, index) => (
          <span
            key={index}
            style={{ height: `${enabled ? height * 100 : 25}%` }}
            className={cn(
              'w-0.5 rounded-full transition-[height] duration-300',
              enabled ? 'bg-cyan-glow' : 'bg-ink-muted',
            )}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  )
}
