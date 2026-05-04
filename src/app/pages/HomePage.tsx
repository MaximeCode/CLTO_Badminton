import { Hero } from '../components/Hero';
import { FeaturedNews } from '../components/FeaturedNews';
import { LatestNews } from '../components/LatestNews';
import { PresidentQuote } from '../components/PresidentQuote';
import { SpaceCards } from '../components/SpaceCards';
import { MatchResults } from '../components/MatchResults';
import { Partners } from '../components/Partners';
import { motion } from 'motion/react';

export function HomePage() {

  const dataGeneral = [
    {
      nb: 400,
      desc: "Licencié au CLTO pour la saison 2025/2026"
    },
    {
      nb: 100,
      desc: "Licences extérieure au CLTO pour la saison 2025/2026"
    },
    {
      nb: 5,
      desc: "Nombre d'étoiles du club labellisé par la FFBAD"
    }
  ]

  return (
    <>
      <Hero />

      {/* Chiffres Clés */}
      <section className="py-20 bg-white text-primary">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="font-primary text-5xl md:text-6xl text-white mb-4">
            LES CHIFFRES CLÉS
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`relative flex items-center md:flex-row flex-col gap-8`}
          >
            {/* Content */}
            {dataGeneral.map((data) => (
              <div className="md:w-5/12 w-full hover:scale-105 transition-all duration-300">
                <div className="bg-primary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="font-primary text-4xl text-secondary mb-2">
                    {data.nb}
                  </div>
                  <h3 className="font-primary text-2xl text-white mb-3">
                    {data.desc}
                  </h3>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <FeaturedNews />
      <LatestNews />
      <PresidentQuote />
      <SpaceCards />
      <MatchResults />
      <Partners />
    </>
  );
}
