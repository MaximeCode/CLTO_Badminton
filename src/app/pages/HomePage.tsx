import { Hero } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { LatestNews } from '../components/LatestNews';
import { PresidentQuote } from '../components/PresidentQuote';
import { SpaceCards } from '../components/SpaceCards';
import { MatchResults } from '../components/MatchResults';
import { Partners } from '../components/Partners';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedNews />
      <LatestNews />
      <PresidentQuote />
      <SpaceCards />
      <MatchResults />
      <Partners />
    </>
  );
}
