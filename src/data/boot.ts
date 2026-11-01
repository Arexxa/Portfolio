import type { BootLine } from '@/types/content'

/**
 * CUSTOMIZE: boot log lines, typed out on first visit. Keep it short: the whole sequence is
 * capped by BOOT.maxMs in lib/constants.ts regardless of length.
 */
export const bootLines: readonly BootLine[] = [
  { text: 'SHAHRUL.OS v3.0 // cold boot' },
  { text: 'mounting /data/profile', status: 'OK' },
  { text: 'loading experience.log (6 entries)', status: 'OK' },
  { text: 'linking modules: react next node sql etl', status: 'OK' },
  { text: 'spawning project windows', status: 'OK' },
  { text: 'opening contact channel', status: 'OK' },
  { text: 'handing control to operator...' },
]
