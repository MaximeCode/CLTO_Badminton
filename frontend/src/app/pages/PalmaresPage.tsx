import { useState, useEffect } from 'react';
import { PageHero } from '../components/PageHero'
import { Seo } from '../components/Seo';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { motion } from 'motion/react';
import type { Palmares } from '../../types/palmaresType';
import { getPalmares } from '@/api/strapi/palmares';
import { stringifyDate } from '@/utils/formatDate';

export function PalmaresPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.PALMARES);

  const [palmares, setPalmares] = useState<Palmares[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getPalmares();
        setPalmares(data);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger le palmarès.',
        );
      }
    }

    loadData();
  }, []);

  return (
    <>
      <Seo
        title="Palmarès"
        description="Palmarès du CLTO Badminton Orléans : performances et distinctions du club."
      />
      <PageHero
        title="PALMARÈS"
        subtitle="Les performances et distinctions du CLTO Badminton"
        image={bandeauImage}
      />

      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            NOS TITRES & DISTINCTIONS
          </h2>
          <p className="text-gray-600 text-base md:text-lg w-full md:max-w-3xl mx-auto">
            Le CLTO Badminton s&apos;est illustré au niveau national grâce à des joueuses et joueurs
            performants, notamment au Championnat de France individuel et au plus haut niveau
            d&apos;interclubs.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary transform -translate-x-1/2" />

          <div className="space-y-12">
            {palmares.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col gap-8`}
              >
                {/* Content */}
                <div className="md:w-5/12 w-full">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="font-primary text-xl lg:text-2xl text-secondary mb-2 capitalize">
                      {stringifyDate(event.date, 'numeric', 'short', 'numeric')}
                    </div>
                    <h3 className="font-primary text-2xl lg:text-4xl text-primary mb-3">
                      {event.titre}
                    </h3>
                    <p className="text-gray-600 text-md lg:text-base">{event.description}</p>
                  </div>
                </div>

                {/* Center Point */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg z-10" />

                {/* Spacer */}
                <div className="hidden md:block md:w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
