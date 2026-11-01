import { useCallback, useState } from 'react'

function read<T>(key: string, fallback: T, validate: (value: unknown) => value is T): T {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) return fallback
    const parsed: unknown = JSON.parse(raw)
    return validate(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

/**
 * Persisted state. Values are validated on read so a tampered or outdated entry falls back
 * to `fallback`. Storage failures (private mode, quota) are ignored: state still works in memory.
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => read(key, fallback, validate))

  const update = useCallback(
    (next: T) => {
      setValue(next)
      try {
        window.localStorage.setItem(key, JSON.stringify(next))
      } catch {
        /* storage unavailable: keep the in-memory value */
      }
    },
    [key],
  )

  return [value, update]
}
