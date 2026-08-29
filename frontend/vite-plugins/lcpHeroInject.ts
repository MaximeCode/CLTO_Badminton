import type { Plugin } from 'vite';
import { loadEnv } from 'vite';

type StrapiFormat = {
  url?: string;
  width?: number | null;
  height?: number | null;
};

type StrapiMedia = {
  id?: number;
  documentId?: string;
  name?: string;
  url?: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
  alternativeText?: string | null;
  formats?: Record<string, StrapiFormat | null> | null;
};

type StrapiHero = {
  id?: number;
  documentId?: string;
  categorie?: string;
  titre?: string;
  description?: string;
  libelle_btn?: string;
  lien?: string;
  image?: StrapiMedia | null;
};

type StrapiContact = {
  id?: number;
  documentId?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  jour_accueils_physique?: string[];
  heure_debut_accueils_physique?: string;
  heure_fin_accueils_physique?: string;
  jour_accueils_a_distance?: string[];
  heure_debut_accueils_a_distance?: string;
  heure_fin_accueils_a_distance?: string;
};

const FORMAT_ORDER = ['thumbnail', 'small', 'medium', 'large'] as const;
const LCP_HEAD_MARKER = '<!-- @lcp-hero -->';
const LCP_BODY_MARKER = '<!-- @lcp-hero-body -->';
const BOOTSTRAP_MARKER = '<!-- @bootstrap-data -->';

function absolutize(baseUrl: string, url?: string | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  return `${baseUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
}

function mapFormat(baseUrl: string, format?: StrapiFormat | null) {
  if (!format?.url) return undefined;
  return {
    url: absolutize(baseUrl, format.url),
    width: format.width ?? null,
    height: format.height ?? null,
  };
}

function mapMedia(baseUrl: string, media: StrapiMedia | null | undefined) {
  const formatsRaw = media?.formats ?? null;
  return {
    id: media?.id ?? 0,
    documentId: media?.documentId ?? '',
    name: media?.name ?? '',
    alternativeText: media?.alternativeText ?? null,
    url: absolutize(baseUrl, media?.url),
    mime: media?.mime,
    width: media?.width ?? null,
    height: media?.height ?? null,
    formats: formatsRaw
      ? {
          thumbnail: mapFormat(baseUrl, formatsRaw.thumbnail),
          small: mapFormat(baseUrl, formatsRaw.small),
          medium: mapFormat(baseUrl, formatsRaw.medium),
          large: mapFormat(baseUrl, formatsRaw.large),
        }
      : undefined,
  };
}

function mapHero(baseUrl: string, item: StrapiHero) {
  return {
    id: item.id ?? 0,
    documentId: item.documentId ?? '',
    categorie: item.categorie ?? '',
    titre: item.titre ?? '',
    description: item.description ?? '',
    libelle_btn: item.libelle_btn ?? 'En savoir plus',
    image: mapMedia(baseUrl, item.image),
    lien: item.lien ?? '',
  };
}

function mapContact(data: StrapiContact) {
  return {
    id: data.id ?? 0,
    documentId: data.documentId ?? '',
    telephone: data.telephone ?? '',
    email: data.email ?? '',
    adresse: data.adresse ?? '',
    jour_accueils_physique: data.jour_accueils_physique ?? [],
    heure_debut_accueils_physique: data.heure_debut_accueils_physique ?? '',
    heure_fin_accueils_physique: data.heure_fin_accueils_physique ?? '',
    jour_accueils_a_distance: data.jour_accueils_a_distance ?? [],
    heure_debut_accueils_a_distance: data.heure_debut_accueils_a_distance ?? '',
    heure_fin_accueils_a_distance: data.heure_fin_accueils_a_distance ?? '',
  };
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

function escapeJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

async function fetchHomeHeros(strapiUrl: string): Promise<StrapiHero[]> {
  const base = strapiUrl.replace(/\/$/, '');
  const response = await fetch(`${base}/api/home/heros`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`GET /api/home/heros → ${response.status}`);
  }
  const payload = (await response.json()) as { data?: { heros?: StrapiHero[] } };
  return payload?.data?.heros ?? [];
}

async function fetchContact(strapiUrl: string): Promise<StrapiContact | null> {
  const base = strapiUrl.replace(/\/$/, '');
  const response = await fetch(`${base}/api/contact`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`GET /api/contact → ${response.status}`);
  }
  const payload = (await response.json()) as { data?: StrapiContact };
  return payload?.data ?? null;
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
    `<div id="lcp-hero-slot" style="position:relative;height:50vh;min-height:20rem;overflow:hidden;z-index:0;margin:0;padding:0;">`,
    `  <img`,
    `    id="lcp-hero-prerender"`,
    `    src="${escapeAttr(href)}"`,
    srcSet ? `    srcset="${escapeAttr(srcSet)}"` : '',
    `    sizes="100vw"`,
    `    alt="${alt}"`,
    width ? `    width="${width}"` : '',
    height ? `    height="${height}"` : '',
    `    loading="eager"`,
    `    fetchpriority="high"`,
    `    decoding="sync"`,
    `    aria-hidden="true"`,
    `    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;margin:0;padding:0;border:0;"`,
    `  />`,
    `</div>`,
  ]
    .filter(Boolean)
    .join('\n  ');

  return { head, body };
}

function buildBootstrapTags(heros: StrapiHero[], contact: StrapiContact | null, strapiUrl: string): string {
  const mappedHeros = heros.map((hero) => mapHero(strapiUrl, hero));
  const scripts = [
    `<script type="application/json" id="home-heros-bootstrap">${escapeJson(mappedHeros)}</script>`,
  ];
  if (contact) {
    scripts.push(
      `<script type="application/json" id="contact-bootstrap">${escapeJson(mapContact(contact))}</script>`,
    );
  }
  return scripts.join('\n  ');
}

/**
 * Au build : récupère hero + contact Strapi et les injecte dans index.html
 * (preload LCP, img prerender, JSON bootstrap).
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
        const [heros, contact] = await Promise.all([
          fetchHomeHeros(strapiUrl),
          fetchContact(strapiUrl).catch((error) => {
            console.warn('[lcp-hero] Contact non injecté:', error);
            return null;
          }),
        ]);

        const firstHero = heros[0];
        if (!firstHero?.image?.url) {
          console.warn('[lcp-hero] Aucun hero trouvé — injection LCP ignorée.');
          return html;
        }

        const tags = buildLcpTags(firstHero, strapiUrl);
        if (!tags) return html;

        const bootstrap = buildBootstrapTags(heros, contact, strapiUrl);

        console.info(`[lcp-hero] Hero LCP injecté : ${firstHero.titre ?? '(sans titre)'}`);
        if (contact) console.info('[lcp-hero] Contact bootstrap injecté.');
        console.info(`[lcp-hero] ${heros.length} hero(s) bootstrap injecté(s).`);

        let result = html;
        if (result.includes(LCP_HEAD_MARKER)) {
          result = result.replace(LCP_HEAD_MARKER, tags.head);
        } else {
          result = result.replace('</head>', `  ${tags.head}\n</head>`);
        }

        if (result.includes(BOOTSTRAP_MARKER)) {
          result = result.replace(BOOTSTRAP_MARKER, bootstrap);
        } else {
          result = result.replace('</head>', `  ${bootstrap}\n</head>`);
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
