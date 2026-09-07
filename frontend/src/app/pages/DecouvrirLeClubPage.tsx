import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { getPageDecouvrirLeClub } from '@/api/strapi/decouvrirLeClub';
import type { PageDecouvrirLeClub } from '@/types/pageDecouvrirLeClubType';
import type { InformationsPublic } from '@/types/publicsType';

function InformationSection({
  carte,
  index,
}: {
  carte: InformationsPublic;
  index: number;
}) {
  const alternateBg = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';

  return (
    <Section className={alternateBg}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-primary text-center mb-8">
          {carte.titre}
        </h2>
        <div className="rounded-2xl border border-primary/10 bg-white p-6 md:p-10 shadow-sm [&_a]:text-secondary-text [&_li]:text-primary-accent [&_p]:mb-3 [&_p]:text-primary-accent">
          <BlocksRenderer content={carte.contenu} headingOffset={2} />
        </div>
      </motion.div>
    </Section>
  );
}

function ProjetClubSection() {
  return (
    <Section className="bg-white">
      <h2 className="font-primary text-4xl md:text-6xl text-primary mb-4 flex items-center justify-between">
        <div className="flex flex-col">
          Projet Club F.J.P.C.R
          <span className="text-secondary">2024 - 2028</span>
        </div>
      </h2>

      {/* Iframe avec le projet club */}
      <div className="lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto border-2 border-gray-200 rounded-lg overflow-hidden my-8"
        >
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vQK4X4eELLRKJUtgXSpSS7OV6Y9rZPwfvbs76DA6xvIhTy5xyVmbf_ho0W0Tc2aPonUJNcJfWUlkDwW/pubembed?start=false&loop=false&delayms=5000"
            width="100%"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Projet Club F.J.P.C.R | 2024 - 2028"
            className="h-75 md:h-170"
          />
        </motion.div>
      </div>
    </Section>
  );
}

export function DecouvrirLeClubPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.DECOUVRIR_LE_CLUB);

  const [data, setData] = useState<PageDecouvrirLeClub | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setData(await getPageDecouvrirLeClub());
      } catch (error) {
        console.error('Error loading découvrir le club:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  const informations = data?.informations ?? [];

  return (
    <>
      <Seo
        title="Découvrir le club"
        description="Découvrez le CLTO Badminton Orléans : qui nous sommes, nos publics, nos valeurs et le projet club F.J.P.C.R 2024-2028."
      />
      <PageHero
        title={data?.titre || BANDEAU_PAGES.DECOUVRIR_LE_CLUB}
        subtitle={
          data?.description || 'Présentation du CLTO Badminton Orléans'
        }
        image={bandeauImage}
      />

      {loadError && (
        <Section className="bg-white">
          <p className="text-center text-red-600" role="alert">
            {loadError}
          </p>
        </Section>
      )}

      {informations.map((carte, index) => (
        <InformationSection key={carte.id} carte={carte} index={index} />
      ))}

      {informations.length === 0 && !loadError && (
        <Section className="bg-gray-50">
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Le contenu détaillé de cette page sera bientôt disponible.
          </p>
        </Section>
      )}

      <ProjetClubSection />
    </>
  );
}
