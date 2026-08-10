import { useEffect, useMemo, useState } from 'react';
import { Hero, type HeroSlide } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { PresidentQuote } from '../components/MotPresident';
import { SpaceCards } from '../components/SpaceCards';
import { Partners } from '../components/Partners';
import { ClubStats } from '../components/ClubStats';
import { InterclubRankings } from '../components/InterclubRankings';
import { getHeros } from '@/api/strapi/heros';
import { Seo } from '../components/Seo';
import { DEFAULT_DESCRIPTION, SITE_NAME } from '@/utils/seo';

export function HomePage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

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
    getHeros().then((heros) => {
      setHeroSlides(
        heros.map((h) => ({
          id: h.id,
          image: h.image.url,
          label: h.categorie,
          title: h.titre,
          description: h.description ?? '',
          cta: h.libelle_btn,
          lien: h.lien ?? '',
        }))
      );
    });
  }, []);

  return (
    <>
      <Seo
        title={SITE_NAME}
        absoluteTitle
        description={DEFAULT_DESCRIPTION}
        jsonLd={homeJsonLd}
      />
      <Hero slides={heroSlides} />
      <FeaturedNews />
      <ClubStats />
      <InterclubRankings />
      <SpaceCards />
      <PresidentQuote />
      <Partners />
    </>
  );
}
