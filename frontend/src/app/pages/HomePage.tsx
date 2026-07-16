import { Hero } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { PresidentQuote } from '../components/PresidentQuote';
import { SpaceCards } from '../components/SpaceCards';
import { Partners } from '../components/Partners';
import { ClubStats } from '../components/ClubStats';
import { InterclubRankings } from '../components/InterclubRankings';

export function HomePage() {

  return (
    <>
      <Hero />
      <ClubStats />
      <InterclubRankings />
      <FeaturedNews />
      <SpaceCards />
      <PresidentQuote />
      <Partners />
    </>
  );
}
