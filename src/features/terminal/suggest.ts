import { TERMINAL } from '@/lib/constants'

/** Levenshtein edit distance (small inputs only). */
export function editDistance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0]!
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const current = row[j]!
      row[j] = Math.min(row[j]! + 1, row[j - 1]! + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1))
      previous = current
    }
  }
  return row[b.length]!
}

/** Closest candidate for a mistyped word ("did you mean"), or null if nothing is close. */
export function suggest(input: string, candidates: readonly string[]): string | null {
  const needle = input.toLowerCase()
  if (!needle) return null
  let best: { value: string; distance: number } | null = null
  for (const candidate of candidates) {
    const distance = candidate.startsWith(needle) ? 0 : editDistance(needle, candidate)
    if (distance <= TERMINAL.suggestDistance && (!best || distance < best.distance)) {
      best = { value: candidate, distance }
    }
  }
  return best?.value ?? null
}

/** Candidates that start with `partial` (case-insensitive). */
export function completions(partial: string, candidates: readonly string[]): string[] {
  const needle = partial.toLowerCase()
  return candidates.filter((candidate) => candidate.toLowerCase().startsWith(needle))
}
