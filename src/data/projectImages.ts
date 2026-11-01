import manifest from '@/assets/img/projects/manifest.json'
import type { ProjectImage } from '@/types/content'

interface ManifestEntry {
  width: number
  height: number
  lqip: string
}

/** Generated variant URLs, keyed by file name (e.g. `kejehub-1-480.avif`). */
const urls = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('@/assets/img/projects/*-{480,960}.{avif,webp}', {
      eager: true,
      query: '?url',
      import: 'default',
    }),
  ).map(([path, url]) => [path.split('/').pop()!, url]),
)

const SMALL = 480
const entries = manifest as Record<string, ManifestEntry>

function srcSet(name: string, format: 'avif' | 'webp', width: number): string {
  return `${urls[`${name}-480.${format}`]} ${Math.min(SMALL, width)}w, ${urls[`${name}-960.${format}`]} ${width}w`
}

/**
 * Resolve a screenshot produced by `npm run optimize-images` (see scripts/optimize-images.mjs).
 * Throws at startup if the image was never generated, so missing assets fail loudly in dev.
 */
export function projectImage(name: string): ProjectImage {
  const entry = entries[name]
  const src = urls[`${name}-960.webp`]
  if (!entry || !src)
    throw new Error(`Missing generated image "${name}". Run npm run optimize-images.`)
  return {
    src,
    width: entry.width,
    height: entry.height,
    lqip: entry.lqip,
    avifSrcSet: srcSet(name, 'avif', entry.width),
    webpSrcSet: srcSet(name, 'webp', entry.width),
  }
}
