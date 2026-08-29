import type { Plugin } from 'vite';
import { loadEnv } from 'vite';

type StrapiFormat = {
  url?: string;
  width?: number | null;
  height?: number | null;
};

type StrapiMedia = {
  url?: string;
  width?: number | null;
  height?: number | null;
  alternativeText?: string | null;
  formats?: Record<string, StrapiFormat | null> | null;
};

type StrapiHero = {
  titre?: string;
  image?: StrapiMedia | null;
};

const FORMAT_ORDER = ['thumbnail', 'small', 'medium', 'large'] as const;
const LCP_HEAD_MARKER = '<!-- @lcp-hero -->';
const LCP_BODY_MARKER = '<!-- @lcp-hero-body -->';

function absolutize(baseUrl: string, url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

function pickMediaUrl(media: StrapiMedia | null | undefined, baseUrl: string, targetWidth: number): string {
  if (!media?.url) return '';
  const candidates: Array<{ url: string; width: number }> = [];
  for (const key of FORMAT_ORDER) {
    const format = media.formats?.[key];
    if (format?.url && format.width) {
      candidates.push({ url: absolutize(baseUrl, format.url), width: format.width });
    }
  }
  candidates.push({ url: absolutize(baseUrl, media.url), width: Number.MAX_SAFE_INTEGER });
  candidates.sort((a, b) => a.width - b.width);
  return (candidates.find((c) => c.width >= targetWidth) ?? candidates[candidates.length - 1]).url;
}

function buildSrcSet(media: StrapiMedia | null | undefined, baseUrl: string): string | undefined {
  if (!media?.url) return undefined;
  const entries: Array<{ url: string; width: number }> = [];
  for (const key of FORMAT_ORDER) {
    const format = media.formats?.[key];
    if (format?.url && format.width) {
      entries.push({ url: absolutize(baseUrl, format.url), width: format.width });
    }
  }
  if (media.width) {
    entries.push({ url: absolutize(baseUrl, media.url), width: media.width });
  }
  if (entries.length === 0) return undefined;
  const byWidth = new Map<number, string>();
  for (const entry of entries) byWidth.set(entry.width, entry.url);
  return [...byWidth.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([w, url]) => `${url} ${w}w`)
    .join(', ');
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

async function fetchFirstHero(strapiUrl: string): Promise<StrapiHero | null> {
  const base = strapiUrl.replace(/\/$/, '');
  const response = await fetch(`${base}/api/home/heros`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`GET /api/home/heros → ${response.status}`);
  }
  const payload = (await response.json()) as { data?: { heros?: StrapiHero[] } };
  return payload?.data?.heros?.[0] ?? null;
}

function buildLcpTags(hero: StrapiHero, strapiUrl: string): { head: string; body: string } | null {
  const media = hero.image;
  const href = pickMediaUrl(media, strapiUrl, 1280) || absolutize(strapiUrl, media?.url);
  if (!href) return null;

  const srcSet = buildSrcSet(media, strapiUrl);
  const alt = escapeAttr(
    hero.titre ? `${hero.titre} — CLTO Badminton Orléans` : 'CLTO Badminton Orléans, club de badminton à Orléans',
  );
  const width = media?.width ?? '';
  const height = media?.height ?? '';

  const preloadSrcSet = srcSet ? ` imagesrcset="${escapeAttr(srcSet)}" imagesizes="100vw"` : '';

  const head = `<link rel="preload" as="image" href="${escapeAttr(href)}" fetchpriority="high"${preloadSrcSet} />`;

  const body = [
    `<img`,
    `  id="lcp-hero-prerender"`,
    `  src="${escapeAttr(href)}"`,
    srcSet ? `  srcset="${escapeAttr(srcSet)}"` : '',
    `  sizes="100vw"`,
    `  alt="${alt}"`,
    width ? `  width="${width}"` : '',
    height ? `  height="${height}"` : '',
    `  loading="eager"`,
    `  fetchpriority="high"`,
    `  decoding="sync"`,
    `  aria-hidden="true"`,
    `  style="position:fixed;inset:0;width:100%;height:50vh;min-height:20rem;object-fit:cover;object-position:center;z-index:0;pointer-events:none;margin:0;padding:0;border:0;"`,
    `/>`,
  ]
    .filter(Boolean)
    .join('\n  ');

  return { head, body };
}

/**
 * Au build : récupère le 1er hero Strapi et l’injecte dans index.html
 * (preload + img) pour la découverte LCP PSI.
 * Nécessite VITE_STRAPI_URL au moment du `npm run build`.
 */
export function lcpHeroInject(): Plugin {
  let strapiUrl = '';

  return {
    name: 'vite-plugin-lcp-hero',
    apply: 'build',
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), '');
      strapiUrl = env.VITE_STRAPI_URL ?? '';
    },
    async transformIndexHtml(html) {
      if (!strapiUrl) {
        console.warn('[lcp-hero] VITE_STRAPI_URL absent — injection LCP ignorée.');
        return html;
      }

      try {
        const hero = await fetchFirstHero(strapiUrl);
        if (!hero?.image?.url) {
          console.warn('[lcp-hero] Aucun hero trouvé — injection LCP ignorée.');
          return html;
        }

        const tags = buildLcpTags(hero, strapiUrl);
        if (!tags) return html;

        console.info(`[lcp-hero] Hero LCP injecté : ${hero.titre ?? '(sans titre)'}`);

        let result = html;
        if (result.includes(LCP_HEAD_MARKER)) {
          result = result.replace(LCP_HEAD_MARKER, tags.head);
        } else {
          result = result.replace('</head>', `  ${tags.head}\n</head>`);
        }

        if (result.includes(LCP_BODY_MARKER)) {
          result = result.replace(LCP_BODY_MARKER, `${tags.body}\n  ${LCP_BODY_MARKER}`);
        } else {
          result = result.replace('<div id="root">', `${tags.body}\n  <div id="root">`);
        }

        return result;
      } catch (error) {
        console.warn('[lcp-hero] Échec fetch Strapi — injection LCP ignorée:', error);
        return html;
      }
    },
  };
}
