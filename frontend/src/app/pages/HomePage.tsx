import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Hero, type HeroSlide } from '../components/Hero';
import { Seo } from '../components/Seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/utils/seo';
import { getHome, type HomePayload } from '@/api/strapi/home';
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
  const [home, setHome] = useState<HomePayload | null>(null);

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

  useEffect(() => {
    let cancelled = false;
    getHome()
      .then((data) => {
        if (!cancelled) setHome(data);
      })
      .catch((error) => {
        console.error('[HomePage] getHome failed:', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Preload LCP image as soon as hero data is known
  useEffect(() => {
    const first = home?.heros?.[0];
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
  }, [home?.heros]);

  const heroSlides: HeroSlide[] = (home?.heros ?? []).map((h) => ({
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
      {home ? (
        <Suspense fallback={<BelowFoldFallback />}>
          <FeaturedNews initialArticles={home.featuredArticles} />
          <ClubStats
            initialTeamsCount={String(home.teams.length)}
            initialAccueil={home.accueil}
          />
          <InterclubRankings initialTeams={home.teams} />
          <SpaceCards />
          <PresidentQuote initialMotPresident={home.motPresident} />
          <Partners initialPartners={home.partenaires} />
        </Suspense>
      ) : (
        <BelowFoldFallback />
      )}
    </>
  );
}
