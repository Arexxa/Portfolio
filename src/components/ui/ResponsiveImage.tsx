import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { ProjectImage } from '@/types/content'

interface ResponsiveImageProps {
  image: ProjectImage
  alt: string
  /** `sizes` attribute describing the rendered width. */
  sizes: string
  className?: string
  /** Eager-load images that are visible on first paint. */
  priority?: boolean
}

type LoadState = 'loading' | 'loaded' | 'error'

/**
 * AVIF/WebP <picture> with explicit dimensions (no layout shift), lazy loading and a
 * blurred LQIP placeholder that fades out once the real image has decoded.
 */
export function ResponsiveImage({ image, alt, sizes, className, priority }: ResponsiveImageProps) {
  const [state, setState] = useState<LoadState>('loading')

  if (state === 'error') {
    return (
      <div
        className={cn(
          'flex aspect-[2/1] items-center justify-center bg-surface-2 text-xs text-ink-muted',
          className,
        )}
      >
        image unavailable
      </div>
    )
  }

  return (
    <div
      className={cn('relative overflow-hidden bg-surface-2', className)}
      style={{ backgroundImage: `url(${image.lqip})`, backgroundSize: 'cover' }}
    >
      <picture>
        <source type="image/avif" srcSet={image.avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={image.webpSrcSet} sizes={sizes} />
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setState('loaded')}
          onError={() => setState('error')}
          className={cn(
            'h-full w-full object-cover object-top transition-opacity duration-500',
            state === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        />
      </picture>
    </div>
  )
}
