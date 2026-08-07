import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { useEffect, useState } from 'react';
import { getEvenements } from '@/api/strapi/evenement';
import type { Evenement } from '@/types/evenementType';
import { stringifyDate } from '@/utils/formatDate';

export function EvenementsPage() {
  const [evenements, setEvenements] = useState<Evenement[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getEvenements();
        setEvenements(data);
      } catch (error) {
        console.error('Error loading evenements:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  return (
    <>
      <PageHero title="EVENEMENTS" />

      <Section className="py-12 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
            NOS EVENEMENTS 2026-2027
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Compétitions, tournois internes et bien plus encore ! Les inscriptions ainsi que le
            bénévolat se font directement via le lien. Pour toute question, n&apos;hésitez pas à
            vous rapprocher d&apos;un membre du bureau ou de l&apos;équipe organisatrice.
          </p>
        </motion.div>

        {loadError && (
          <p className="text-center text-red-600 mb-8" role="alert">
            {loadError}
          </p>
        )}

        <div className="space-y-10">
          {evenements?.map((evenement: Evenement) => (
            <motion.article
              key={evenement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-hidden rounded-lg bg-gray-50 shadow-lg"
            >
              <div className="bg-linear-to-r from-primary to-primary-accent px-6 py-4 sm:px-8">
                <h3 className="font-primary text-3xl text-white sm:text-4xl">
                  {evenement.titre}
                </h3>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 shrink-0">
                  <img
                    src={evenement.affiche.url}
                    alt={evenement.affiche.alternativeText || evenement.titre}
                    className="h-full w-full object-cover min-h-48 md:min-h-full"
                  />
                </div>

                <div className="flex-1 space-y-6 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-3 text-md">
                    <div className="flex items-start gap-3 text-gray-700">
                      <Calendar size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">
                        {stringifyDate(evenement.date, 'numeric', 'long', 'numeric')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                      <MapPin size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">{evenement.lieu}</span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                      <Clock size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">{evenement.horaire}</span>
                    </div>
                  </div>

                  {evenement.petite_description && (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {evenement.petite_description}
                    </p>
                  )}

                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
                    <a
                      href={evenement.lien_inscription_benevole}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary font-semibold underline underline-offset-2 hover:text-secondary-accent transition-colors"
                    >
                      Inscription bénévole
                    </a>
                    {evenement.lien_inscription_tournoi?.trim() && (
                      <a
                        href={evenement.lien_inscription_tournoi}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary font-semibold underline underline-offset-2 hover:text-secondary-accent transition-colors"
                      >
                        Inscription tournoi
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>
    </>
  );
}
