import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/globals.css'
import { App } from '@/app/App'
import { DeviceTierProvider } from '@/app/providers/DeviceTierProvider'
import { LenisProvider } from '@/app/providers/LenisProvider'
import { AudioProvider } from '@/features/audio/AudioProvider'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

createRoot(root).render(
  <StrictMode>
    <DeviceTierProvider>
      <LenisProvider>
        <AudioProvider>
          <App />
        </AudioProvider>
      </LenisProvider>
    </DeviceTierProvider>
  </StrictMode>,
)
