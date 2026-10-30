import { createContext, useContext } from 'react'

export interface AudioContextValue {
  enabled: boolean
  toggle: () => void
}

export const AudioStateContext = createContext<AudioContextValue | null>(null)

/** Ambient-audio state (off by default). */
export function useAudio(): AudioContextValue {
  const value = useContext(AudioStateContext)
  if (!value) throw new Error('useAudio must be used inside <AudioProvider>')
  return value
}
