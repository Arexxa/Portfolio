import { useState, type ReactNode } from 'react'
import { DeviceTierContext } from '@/hooks/useDeviceTier'
import { detectDeviceTier } from '@/lib/deviceTier'

interface DeviceTierProviderProps {
  children: ReactNode
}

/** Detects the device tier once on mount; the tier is stable for the session. */
export function DeviceTierProvider({ children }: DeviceTierProviderProps) {
  const [tier] = useState(detectDeviceTier)
  return <DeviceTierContext.Provider value={tier}>{children}</DeviceTierContext.Provider>
}
