import type { ReactNode } from 'react';
import { buildSrcSet, resolveMediaAlt } from '@/utils/media';
import type { Media } from '@/types/baseType';

type ResponsiveImageProps = {
  media?: Pick<Media, 'url' | 'width' | 'height' | 'alternativeText' | 'formats' | 'name'> | null;
  src?: string;
  /** Prioritaire s’il est renseigné ; sinon dérivé de `media` (+ fallback). */
  alt?: string;
  /** Contexte page (ex. titre d’article) si `alternativeText` Strapi est vide. */
  altFallback?: string;
  /** Image purement décorative : `alt=""` (RGAA 1.2). */
  decorative?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  /** HTML attribute (React 18 n’accepte pas fetchPriority camelCase). */
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
  altFallback,
  decorative = false,
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
  const resolvedAlt = decorative
    ? ''
    : alt?.trim() || resolveMediaAlt(media, altFallback);

  return (
    <img
      src={resolvedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={resolvedAlt}
      className={className}
      width={w ?? undefined}
      height={h ?? undefined}
      loading={loading}
      fetchpriority={fetchpriority}
      decoding={decoding}
      aria-hidden={decorative || undefined}
    />
  );
}
