import { useState, useEffect } from 'react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { motion } from 'motion/react';
import type { Historique } from '../../types/historiquesType';
import { getHistoriques } from '@/api/strapi/historiques';

export function HistoriquePage() {
  const [historiques, setHistoriques] = useState<Historique[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getHistoriques();
        // console.log(data);
        setHistoriques(data);
      } catch (error) {
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger l\'historique.',
        );
      }
    }

    loadData();
  }, []);
  return (
    <>
      <PageHero
        title="HISTORIQUE"
        subtitle="Plus de 40 ans de passion badminton"
        image="https://images.unsplash.com/photo-1553258223-6e8add562470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBoaXN0b3J5JTIwdmludGFnZXxlbnwxfHx8fDE3NzU5Mjk2OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
            NOTRE HISTOIRE
          </h2>
          <p className="text-gray-600 text-base md:text-lg w-full md:max-w-3xl mx-auto">
            Depuis sa création en 1985, le CLTO Badminton n'a cessé de grandir et de se développer
            pour devenir l'un des clubs majeurs de la région.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary transform -translate-x-1/2" />

          <div className="space-y-12">
            {historiques.map((event, index) => (
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
                <article className="md:w-5/12 w-full">
                  <div className="bg-gray-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="font-primary text-xl lg:text-2xl text-secondary mb-2 capitalize">
                      {new Date(event.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="font-primary text-2xl lg:text-3xl text-primary mb-3">
                      {event.titre}
                    </div>
                    <p className="text-gray-600 text-md lg:text-base">{event.description}</p>
                  </div>
                </article>

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