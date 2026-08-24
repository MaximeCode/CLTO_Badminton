import type { ReactNode } from 'react';
import { buildSrcSet } from '@/utils/media';
import type { Media } from '@/types/baseType';

type ResponsiveImageProps = {
  media?: Pick<Media, 'url' | 'width' | 'height' | 'alternativeText' | 'formats' | 'name'> | null;
  src?: string;
  alt: string;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  fetchpriority?: 'high' | 'low' | 'auto';
  decoding?: 'async' | 'auto' | 'sync';
};

/**
 * Image responsive basée sur les formats Sharp Strapi (srcSet) quand disponibles.
 * Fallback sur `src` / `media.url` sinon.
 */
export function ResponsiveImage({
  media,
  src,
  alt,
  sizes = '100vw',
  className,
  width,
  height,
  loading = 'lazy',
  fetchpriority,
  decoding = 'async',
}: ResponsiveImageProps) {
  const resolvedSrc = src || media?.url || '';
  if (!resolvedSrc) return null as unknown as ReactNode;

  const srcSet = media ? buildSrcSet(media) : undefined;
  const w = width ?? media?.width ?? undefined;
  const h = height ?? media?.height ?? undefined;

  return (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      width={w ?? undefined}
      height={h ?? undefined}
      loading={loading}
      fetchpriority={fetchpriority}
      decoding={decoding}
    />
  );
}
