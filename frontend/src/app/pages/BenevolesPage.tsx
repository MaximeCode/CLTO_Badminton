import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { getPageBenevoles } from '@/api/strapi/pageBlockContent';
import type { PageBlockContent } from '@/types/pageBlockContentType';

export function BenevolesPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.BENEVOLES);

  const [data, setData] = useState<PageBlockContent | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setData(await getPageBenevoles());
      } catch (error) {
        console.error('Error loading benevoles:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  return (
    <>
      <PageHero
        title="BÉNÉVOLES"
        subtitle="Rejoignez l'équipe des bénévoles du CLTO Badminton"
        image={bandeauImage}
      />

      <Section className="bg-gray-50">
        {loadError && (
          <p className="text-center text-red-600 mb-6" role="alert">
            {loadError}
          </p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white rounded-lg p-6 md:p-10 shadow-lg [&_a]:text-secondary [&_li]:text-primary-accent [&_p]:mb-3 [&_p]:text-primary-accent"
        >
          {data?.contenu ? (
            <BlocksRenderer content={data.contenu} headingOffset={1} />
          ) : (
            <p className="text-gray-600 text-center">
              Le contenu de cette page sera bientôt disponible.
            </p>
          )}
        </motion.div>
      </Section>
    </>
  );
}
