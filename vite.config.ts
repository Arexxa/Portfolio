import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

/** Splits heavy vendors so the first paint only downloads the app shell. */
const codeSplitting = {
  groups: [
    { name: 'vendor-react', test: /node_modules[/](react|react-dom|scheduler)[/]/, priority: 30 },
    { name: 'vendor-motion', test: /node_modules[/](gsap|@gsap|lenis)[/]/, priority: 20 },
    {
      name: 'vendor-three',
      test: /node_modules[/](three|@react-three|three-stdlib|troika[^/]*|its-fine|zustand|suspend-react|meshline|maath|camera-controls|detect-gpu)[/]/,
      priority: 10,
    },
  ],
}

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    mode === 'analyze' && visualizer({ open: false, gzipSize: true, filename: 'dist/stats.html' }),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 900,
    rolldownOptions: { output: { codeSplitting } },
  },
}))
