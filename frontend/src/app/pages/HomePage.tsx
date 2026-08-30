import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Hero, type HeroSlide } from '../components/Hero';
import { Seo } from '../components/Seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/utils/seo';
import { getHomeHeros, getHomeSections, type HomeSectionsPayload } from '@/api/strapi/home';
import { getAdherentsCount } from '@/api/gestion/adherents';
import { getParametresGlobaux } from '@/api/strapi/parametre-globaux';
import { readBootstrapJson } from '@/utils/buildBootstrap';
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
  const [heros, setHeros] = useState<HeroType[]>(
    () => readBootstrapJson<HeroType[]>('home-heros-bootstrap') ?? [],
  );
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

  // Bootstrap build → affichage immédiat ; refresh différé pour ne pas bloquer PSI
  useEffect(() => {
    let cancelled = false;
    const hasBootstrap = (readBootstrapJson<HeroType[]>('home-heros-bootstrap') ?? []).length > 0;

    const loadHeros = () => {
      getHomeHeros()
        .then((data) => {
          if (!cancelled && data.length > 0) setHeros(data);
        })
        .catch((error) => {
          if (!hasBootstrap) console.error('[HomePage] getHomeHeros failed:', error);
        });
    };

    if (hasBootstrap) {
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(loadHeros, { timeout: 5000 });
        return () => {
          cancelled = true;
          window.cancelIdleCallback(id);
        };
      }
      const timer = globalThis.setTimeout(loadHeros, 3000);
      return () => {
        cancelled = true;
        globalThis.clearTimeout(timer);
      };
    }

    loadHeros();
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
          <FeaturedNews articles={sections.featuredArticles} />
          <ClubStats
            initialAdherentsCount={adherentsCount}
            accueil={sections.accueil}
          />
          <InterclubRankings />
          <SpaceCards />
          <PresidentQuote motPresident={sections.motPresident} />
          <Partners partners={sections.partenaires} />
        </Suspense>
      ) : (
        <BelowFoldFallback />
      )}
    </>
  );
}
