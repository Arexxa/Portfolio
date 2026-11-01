import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

/**
 * Splits heavy vendors so the first paint only downloads the app shell. Three.js and the
 * post-processing stack are only reached through dynamic imports, so they stay out of the
 * initial bundle. Motion is left to natural splitting so its lazy drag features stay lazy.
 */
const codeSplitting = {
  groups: [
    { name: 'vendor-react', test: /node_modules[/](react|react-dom|scheduler)[/]/, priority: 30 },
    {
      name: 'vendor-postfx',
      test: /node_modules[/](postprocessing|@react-three[/]postprocessing|n8ao|maath)[/]/,
      priority: 20,
    },
    {
      name: 'vendor-three',
      test: /node_modules[/](three|@react-three|its-fine|zustand|suspend-react|react-use-measure)[/]/,
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
