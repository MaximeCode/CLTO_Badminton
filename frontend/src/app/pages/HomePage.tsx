import { Hero } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { LatestNews } from '../components/LatestNews';
import { PresidentQuote } from '../components/PresidentQuote';
import { SpaceCards } from '../components/SpaceCards';
import { MatchResults } from '../components/MatchResults';
import { Partners } from '../components/Partners';
import { ClubStats } from '../components/ClubStats';
import { InterclubRankings } from '../components/InterclubRankings';

export function HomePage() {

  return (
    <>
      <Hero />
      <ClubStats />
      <FeaturedNews />
      <LatestNews />
      <PresidentQuote />
      <SpaceCards />
      <MatchResults />
      <InterclubRankings />
      <Partners />
    </>
  );
}
