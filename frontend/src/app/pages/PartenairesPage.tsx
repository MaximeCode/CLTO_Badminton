import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Building2, ExternalLink, Handshake } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { Seo } from '../components/Seo';
import { BlocksRenderer, listVariantFromTitle } from '../components/BlocksRenderer';
import { ClubStats } from '../components/ClubStats';
import { Partners } from '../components/Partners';
import {
  getLienDossierPartenariat,
  getPagePartenaires,
  getPartenaires,
} from '@/api/strapi/partenaire';
import { getAdherentsCount } from '@/api/gestion/adherents';
import type { PagePartenaires } from '@/types/pagePartenairesType';
import type { Partner } from '@/types/partnersType';
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
          <BlocksRenderer
            content={carte.contenu}
            headingOffset={2}
            listVariant={listVariantFromTitle(carte.titre)}
          />
        </div>
      </motion.div>
    </Section>
  );
}

export function PartenairesPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.PARTENAIRES);

  const [data, setData] = useState<PagePartenaires | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [dossierUrl, setDossierUrl] = useState<string | null>(null);
  const [adherentsCount, setAdherentsCount] = useState<string>('…');
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const [page, logos, dossier, count] = await Promise.all([
          getPagePartenaires(),
          getPartenaires(),
          getLienDossierPartenariat(),
          getAdherentsCount().catch(() => null),
        ]);
        setData(page);
        setPartners(logos);
        setDossierUrl(dossier);
        if (count != null) setAdherentsCount(String(count));
        else setAdherentsCount('-');
      } catch (error) {
        console.error('Error loading partenaires page:', error);
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
        title="Partenaires"
        description="Devenez partenaire du CLTO Badminton Orléans : sponsoring, mécénat, matériel et visibilité pour soutenir le club."
      />
      <PageHero
        title={data?.titre || BANDEAU_PAGES.PARTENAIRES}
        subtitle={
          data?.description || 'Devenez partenaire du CLTO Badminton'
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
            Le contenu détaillé de cette page sera bientôt disponible. En attendant,
            consultez notre dossier partenaires ou contactez-nous.
          </p>
        </Section>
      )}

      <ClubStats
        initialAdherentsCount={adherentsCount}
        variant="compact"
      />

      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-12 text-center shadow-lg text-white"
        >
          <Handshake className="mx-auto mb-6" size={56} />
          <h2 className="font-primary text-4xl mb-4">DEVENEZ PARTENAIRE</h2>
          <p className="text-white/90 text-md mb-6 max-w-2xl mx-auto">
            Découvrez notre dossier partenaires / sponsoring ou contactez-nous pour
            construire ensemble un partenariat adapté à vos objectifs.<br />
            Contactez le responsable partenariat ci-dessous ou envoyer un message via le formulaire de contact pour plus d&apos;informations.
          </p>
          <p className="text-white text-md mb-8 max-w-2xl mx-auto font-semibold">
            Benoit SOULARD —{' '}
            <a
              href="mailto:benoit.soulard@cltobadminton.fr"
              className="underline decoration-white/40 underline-offset-2 hover:decoration-white"
            >
              benoit.soulard@cltobadminton.fr
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {dossierUrl && (
              <a
                href={dossierUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary-text text-white px-8 py-3 rounded-md hover:bg-secondary-text-hover transition-colors duration-200"
              >
                <Building2 size={18} />
                Dossier partenaires
                <ExternalLink size={18} />
              </a>
            )}
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white px-8 py-3 rounded-md text-white hover:bg-white hover:text-primary transition-colors duration-200"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </Section>

      {partners.length > 0 && <Partners partners={partners} variant="compact" />}
    </>
  );
}
