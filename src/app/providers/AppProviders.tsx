import type { ReactNode } from 'react'
import { DeviceTierProvider } from '@/app/providers/DeviceTierProvider'
import { SettingsProvider } from '@/app/providers/SettingsProvider'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { TerminalProvider } from '@/features/terminal/TerminalProvider'

interface AppProvidersProps {
  children: ReactNode
}

/** The only global state: device tier, user settings, Motion config, terminal session. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <DeviceTierProvider>
      <SettingsProvider>
        <MotionProvider>
          <TerminalProvider>{children}</TerminalProvider>
        </MotionProvider>
      </SettingsProvider>
    </DeviceTierProvider>
  )
}
