import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Hero, type HeroSlide } from '../components/Hero';
import { Seo } from '../components/Seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/utils/seo';
import { getHomeHeros, getHomeSections, type HomeSectionsPayload } from '@/api/strapi/home';
import { getAdherentsCount } from '@/api/gestion/adherents';
import { getParametresGlobaux } from '@/api/strapi/parametre-globaux';
import type { Hero as HeroType } from '@/types/herosType';
import { pickMediaUrl } from '@/utils/media';

const FeaturedNews = lazy(() =>
  import('../components/FeaturedNews').then((m) => ({ default: m.FeaturedNews })),
);
const ClubStats = lazy(() =>
  import('../components/ClubStats').then((m) => ({ default: m.ClubStats })),
);
const InterclubRankings = lazy(() =>
  import('../components/InterclubRankings').then((m) => ({ default: m.InterclubRankings })),
);
const SpaceCards = lazy(() =>
  import('../components/SpaceCards').then((m) => ({ default: m.SpaceCards })),
);
const PresidentQuote = lazy(() =>
  import('../components/MotPresident').then((m) => ({ default: m.PresidentQuote })),
);
const Partners = lazy(() =>
  import('../components/Partners').then((m) => ({ default: m.Partners })),
);

function BelowFoldFallback() {
  return <div className="min-h-24" aria-hidden />;
}

export function HomePage() {
  const [heros, setHeros] = useState<HeroType[]>([]);
  const [sections, setSections] = useState<HomeSectionsPayload | null>(null);
  const [adherentsCount, setAdherentsCount] = useState<string>('…');

  const homeJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'SportsClub',
      name: 'CLTO Badminton Orléans',
      alternateName: 'CLTO',
      sport: 'Badminton',
      url: window.location.origin,
      description: DEFAULT_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Orléans',
        postalCode: '45000',
        addressCountry: 'FR',
      },
      areaServed: {
        '@type': 'City',
        name: 'Orléans',
      },
    }),
    [],
  );

  // Chemin critique : heros en premier (endpoint léger + cache serveur)
  useEffect(() => {
    let cancelled = false;
    getHomeHeros()
      .then((data) => {
        if (!cancelled) setHeros(data);
      })
      .catch((error) => {
        console.error('[HomePage] getHomeHeros failed:', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Sections below-the-fold en parallèle (sans classements interclubs)
  useEffect(() => {
    let cancelled = false;
    getHomeSections()
      .then((data) => {
        if (!cancelled) setSections(data);
      })
      .catch((error) => {
        console.error('[HomePage] getHomeSections failed:', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Nombre d'adhérents (API gestion, saison_id Strapi)
  useEffect(() => {
    let cancelled = false;
    async function loadAdherentsCount() {
      try {
        const parametres = await getParametresGlobaux();
        const saisonId = parametres?.saison_id;
        if (saisonId == null) {
          throw new Error("L'identifiant de saison n'est pas configuré.");
        }
        const count = await getAdherentsCount(saisonId);
        if (!cancelled) setAdherentsCount(String(count));
      } catch (error) {
        console.error('[HomePage] getAdherentsCount failed:', error);
        if (!cancelled) setAdherentsCount('-');
      }
    }
    loadAdherentsCount();
    return () => {
      cancelled = true;
    };
  }, []);

  // Preload LCP image dès que le hero est connu
  useEffect(() => {
    const first = heros[0];
    if (!first?.image) return;
    const href = pickMediaUrl(first.image, 1280) || first.image.url;
    if (!href) return;
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = href;
    link.setAttribute('fetchpriority', 'high');
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, [heros]);

  const heroSlides: HeroSlide[] = heros.map((h) => ({
    id: h.id,
    image: pickMediaUrl(h.image, 1600) || h.image.url,
    media: h.image,
    label: h.categorie,
    title: h.titre,
    description: h.description ?? '',
    cta: h.libelle_btn,
    lien: h.lien ?? '',
  }));

  return (
    <>
      <Seo
        title={SITE_NAME}
        absoluteTitle
        description={DEFAULT_DESCRIPTION}
        jsonLd={homeJsonLd}
      />
      <Hero slides={heroSlides} />
      {sections ? (
        <Suspense fallback={<BelowFoldFallback />}>
          <FeaturedNews initialArticles={sections.featuredArticles} />
          <ClubStats
            initialTeamsCount={undefined}
            initialAdherentsCount={adherentsCount}
            initialAccueil={sections.accueil}
          />
          <InterclubRankings />
          <SpaceCards />
          <PresidentQuote initialMotPresident={sections.motPresident} />
          <Partners initialPartners={sections.partenaires} />
        </Suspense>
      ) : (
        <BelowFoldFallback />
      )}
    </>
  );
}
