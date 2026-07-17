import { useEffect, useState } from 'react';
import { Hero, type HeroSlide } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { PresidentQuote } from '../components/PresidentQuote';
import { SpaceCards } from '../components/SpaceCards';
import { Partners } from '../components/Partners';
import { ClubStats } from '../components/ClubStats';
import { InterclubRankings } from '../components/InterclubRankings';
import { getHeros } from '@/api/strapi/heros';

export function HomePage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  useEffect(() => {
    getHeros(false).then((heros) => {
      setHeroSlides(
        heros.map((h) => ({
          id: h.id,
          image: h.image.url,
          label: h.categorie,
          title: h.titre,
          description: h.description ?? '',
          cta: h.libelle_btn,
        }))
      );
    });
  }, []);

  return (
    <>
      <Hero slides={heroSlides} />
      <ClubStats />
      <InterclubRankings />
      <FeaturedNews />
      <SpaceCards />
      <PresidentQuote />
      <Partners />
    </>
  );
}
