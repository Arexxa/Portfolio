import { useCallback, useEffect, useMemo, useState } from 'react'
import { bootLines } from '@/data/boot'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BOOT, STORAGE_KEYS } from '@/lib/constants'

const PAUSE_CHARS = Math.round(BOOT.linePauseMs / BOOT.charMs)
const CHARS_PER_TICK = Math.max(1, Math.round(BOOT.tickMs / BOOT.charMs))
const TOTAL = bootLines.reduce((sum, line) => sum + line.text.length + PAUSE_CHARS, 0)

export interface TypedLine {
  text: string
  status?: string
  complete: boolean
}

export interface BootState {
  done: boolean
  lines: TypedLine[]
  /** 0..1 */
  progress: number
  skip: () => void
}

function alreadyBooted(): boolean {
  try {
    return window.sessionStorage.getItem(STORAGE_KEYS.booted) === '1'
  } catch {
    return false
  }
}

/** Slice the boot log to the number of characters typed so far. */
function typedLines(typed: number): TypedLine[] {
  const result: TypedLine[] = []
  let remaining = typed
  for (const line of bootLines) {
    if (remaining <= 0) break
    const visible = Math.min(line.text.length, remaining)
    result.push({
      text: line.text.slice(0, visible),
      status: line.status,
      complete: visible === line.text.length,
    })
    remaining -= line.text.length + PAUSE_CHARS
  }
  return result
}

/**
 * Drives the boot log: types it out, then finishes after a short hold, after BOOT.maxMs at
 * most, or immediately on any key/pointer press. Runs once per session and never under
 * reduced motion.
 */
export function useBootSequence(): BootState {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(() => reduced || alreadyBooted())
  const [typed, setTyped] = useState(0)

  const skip = useCallback(() => {
    setDone(true)
    try {
      window.sessionStorage.setItem(STORAGE_KEYS.booted, '1')
    } catch {
      /* storage unavailable: the boot will simply play again next visit */
    }
  }, [])

  useEffect(() => {
    if (done) return
    const interval = window.setInterval(
      () => setTyped((count) => Math.min(TOTAL, count + CHARS_PER_TICK)),
      BOOT.tickMs,
    )
    const cap = window.setTimeout(skip, BOOT.maxMs)
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.clearInterval(interval)
      window.clearTimeout(cap)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [done, skip])

  useEffect(() => {
    if (done || typed < TOTAL) return
    const hold = window.setTimeout(skip, BOOT.holdMs)
    return () => window.clearTimeout(hold)
  }, [done, typed, skip])

  const lines = useMemo(() => typedLines(typed), [typed])
  return { done, lines, progress: Math.min(1, typed / TOTAL), skip }
}
