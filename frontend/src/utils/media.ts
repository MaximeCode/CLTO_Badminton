import { API_URL } from '@/api/Client';
import type { Media, MediaFormat, MediaFormats } from '@/types/baseType';

type StrapiFormat = {
  url?: string;
  width?: number | null;
  height?: number | null;
  size?: number | null;
  mime?: string | null;
};

type StrapiMediaLike = {
  id?: number;
  documentId?: string;
  name?: string;
  alternativeText?: string | null;
  url?: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
  formats?: Record<string, StrapiFormat | null> | null;
} | null | undefined;

function absolutize(url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return `${API_URL}${url}`;
}

function mapFormat(format?: StrapiFormat | null): MediaFormat | undefined {
  if (!format?.url) return undefined;
  return {
    url: absolutize(format.url),
    width: format.width ?? null,
    height: format.height ?? null,
    size: format.size ?? null,
    mime: format.mime ?? null,
  };
}

/** Normalise un média Strapi (URL absolue + formats Sharp si présents). */
export function mapMedia(media: StrapiMediaLike): Media {
  const formatsRaw = media?.formats ?? null;
  const formats: MediaFormats | undefined = formatsRaw
    ? {
        thumbnail: mapFormat(formatsRaw.thumbnail),
        small: mapFormat(formatsRaw.small),
        medium: mapFormat(formatsRaw.medium),
        large: mapFormat(formatsRaw.large),
      }
    : undefined;

  return {
    id: media?.id ?? 0,
    documentId: media?.documentId ?? '',
    name: media?.name ?? '',
    alternativeText: media?.alternativeText ?? null,
    url: absolutize(media?.url),
    mime: media?.mime,
    width: media?.width ?? null,
    height: media?.height ?? null,
    formats,
  };
}

const FORMAT_ORDER = ['thumbnail', 'small', 'medium', 'large'] as const;

/** Construit un srcSet à partir des formats Strapi + original. */
export function buildSrcSet(
  media: Pick<Media, 'url' | 'width' | 'formats'> | null | undefined,
): string | undefined {
  if (!media?.url) return undefined;

  const entries: Array<{ url: string; width: number }> = [];

  for (const key of FORMAT_ORDER) {
    const format = media.formats?.[key];
    if (format?.url && format.width) {
      entries.push({ url: format.url, width: format.width });
    }
  }

  if (media.width) {
    entries.push({ url: media.url, width: media.width });
  } else if (entries.length === 0) {
    return undefined;
  } else {
    // Original sans width connu : l'ajouter comme plus grande candidate
    const maxW = Math.max(...entries.map((e) => e.width));
    entries.push({ url: media.url, width: Math.round(maxW * 1.25) });
  }

  // Dédupliquer par largeur croissante
  const byWidth = new Map<number, string>();
  for (const entry of entries) {
    byWidth.set(entry.width, entry.url);
  }

  return [...byWidth.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ');
}

/** Choisit une URL adaptée à une largeur d'affichage cible (px CSS). */
export function pickMediaUrl(
  media: Pick<Media, 'url' | 'formats'> | null | undefined,
  targetWidth: number,
): string {
  if (!media?.url) return '';
  const candidates: Array<{ url: string; width: number }> = [];
  for (const key of FORMAT_ORDER) {
    const format = media.formats?.[key];
    if (format?.url && format.width) {
      candidates.push({ url: format.url, width: format.width });
    }
  }
  candidates.push({ url: media.url, width: Number.MAX_SAFE_INTEGER });
  candidates.sort((a, b) => a.width - b.width);
  return (candidates.find((c) => c.width >= targetWidth) ?? candidates[candidates.length - 1]).url;
}
