import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Building2, ExternalLink, FileDown } from 'lucide-react';
import { getPublicEntreprise } from '@/api/strapi/publics';
import type { PublicEntreprise } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

export function EntreprisePage() {
  const [data, setData] = useState<PublicEntreprise | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicEntreprise();
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  const partenariat = data?.partenariat ?? [];
  const flyerUrl = data?.flyer?.url;
  const dossierUrl = data?.lien_dossier_partenariat;
  const hasFlyerOrPartenariat = Boolean(flyerUrl) || partenariat.length > 0;

  return (
    <>
      <PageHero
        title="ENTREPRISE"
        subtitle="Partenariats et offres pour les entreprises"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      />

      {hasFlyerOrPartenariat && (
        <Section className="bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            {flyerUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-primary text-5xl md:text-6xl text-primary mb-8 text-center">
                  NOTRE OFFRE
                </h2>
                <div
                  className="block bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg md:max-w-xl mx-auto md:mx-0 md:max-w-none"
                >
                  <img
                    src={flyerUrl}
                    alt={data?.flyer?.alternativeText || data?.flyer?.name || 'Flyer entreprise'}
                    className="w-full h-auto rounded-md"
                  />
                  <a href={flyerUrl} target="_blank" rel="noopener noreferrer" className="w-full md:w-1/2 mx-auto mt-2 text-center text-secondary font-semibold flex items-center justify-center gap-2 hover:text-white hover:bg-secondary transition-all duration-200 rounded-md px-4 py-2">
                    <FileDown size={18} />
                    Télécharger le flyer
                  </a>
                </div>
              </motion.div>
            )}

            {partenariat.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="font-primary text-5xl md:text-6xl text-primary mb-8 text-center">
                  PARTENARIAT
                </h2>
                <div className="space-y-6">
                  {partenariat.map((carte) => (
                    <article
                      key={carte.id}
                      className="bg-white rounded-lg p-8 shadow-lg"
                    >
                      <h3 className="font-primary text-2xl text-primary mb-4">{carte.titre}</h3>
                      <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                        <BlocksRenderer content={carte.contenu} />
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </Section>
      )}

      {dossierUrl && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-12 text-center shadow-lg text-white"
          >
            <Building2 className="mx-auto mb-6" size={56} />
            <h2 className="font-primary text-4xl mb-4">DOSSIER PARTENARIAT</h2>
            <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
              Consultez notre dossier complet pour découvrir les modalités de partenariat avec le CLTO Badminton.
            </p>
            <a
              href={dossierUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
            >
              Accéder au dossier
              <ExternalLink size={18} />
            </a>
          </motion.div>
        </Section>
      )}

      {loadError && (
        <p className="sr-only" role="alert">
          {loadError}
        </p>
      )}
    </>
  );
}
