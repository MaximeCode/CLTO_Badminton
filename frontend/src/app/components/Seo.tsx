import { useEffect } from 'react';
import { DEFAULT_DESCRIPTION, buildTitle } from '@/utils/seo';
import { withEnvTitlePrefix } from './EnvBanner';

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  /** Ne pas indexer (ex. page 404). */
  noindex?: boolean;
  /** Utiliser `title` tel quel, sans suffixe site. */
  absoluteTitle?: boolean;
  /** Données structurées JSON-LD (schema.org). */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Met à jour title / description / Open Graph côté client (SPA Vite).
 * Utile pour Google (JS) et le partage social ; le HTML initial reste le fallback index.html.
 */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  noindex = false,
  absoluteTitle = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = absoluteTitle ? title : buildTitle(title);
    document.title = withEnvTitlePrefix(fullTitle);

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:locale', 'fr_FR');
    upsertMeta('property', 'og:site_name', 'CLTO Badminton Orléans');

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    upsertCanonical(canonicalUrl);
    upsertMeta('property', 'og:url', canonicalUrl);

    if (image) {
      upsertMeta('property', 'og:image', image);
    }

    upsertMeta('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    if (image) {
      upsertMeta('name', 'twitter:image', image);
    }

    const scriptId = 'clto-jsonld';
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const script = existing ?? document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) {
        document.head.appendChild(script);
      }
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, image, noindex, absoluteTitle, jsonLd]);

  return null;
}
