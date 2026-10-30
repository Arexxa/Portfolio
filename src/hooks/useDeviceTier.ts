import { createContext, useContext } from 'react'
import type { DeviceTier } from '@/types/device'

export const DeviceTierContext = createContext<DeviceTier | null>(null)

/** Read the detected quality tier (high / medium / low) and its preset. */
export function useDeviceTier(): DeviceTier {
  const tier = useContext(DeviceTierContext)
  if (!tier) throw new Error('useDeviceTier must be used inside <DeviceTierProvider>')
  return tier
}
