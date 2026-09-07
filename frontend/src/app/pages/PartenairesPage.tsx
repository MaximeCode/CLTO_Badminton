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
import type { BlocksContent } from '@/types/blocks';
import type { InformationsPublic } from '@/types/publicsType';

function hasBlocks(content: BlocksContent | null | undefined): boolean {
  return Array.isArray(content) && content.length > 0;
}

function CardsSection({
  title,
  cards,
}: {
  title: string;
  cards: InformationsPublic[];
}) {
  if (cards.length === 0) return null;

  return (
    <Section className="bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10 md:mb-12"
      >
        <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-primary">
          {title}
        </h2>
      </motion.div>

      <div
        className={
          cards.length === 1
            ? 'max-w-3xl mx-auto'
            : 'grid gap-6 md:grid-cols-2 md:gap-8'
        }
      >
        {cards.map((carte, index) => (
          <motion.article
            key={carte.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="rounded-2xl border border-primary/10 bg-white p-6 md:p-8 shadow-sm"
          >
            <h3 className="font-primary text-2xl md:text-3xl text-primary mb-4">
              {carte.titre}
            </h3>
            <div className="[&_a]:text-secondary-text [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_p]:text-base sm:[&_li]:text-base">
              <BlocksRenderer
                content={carte.contenu}
                headingOffset={3}
                listVariant={listVariantFromTitle(carte.titre)}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function BlocksSection({
  title,
  content,
  className = 'bg-white',
}: {
  title: string;
  content: BlocksContent | null;
  className?: string;
}) {
  if (!hasBlocks(content)) return null;

  return (
    <Section className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-primary text-center mb-8">
          {title}
        </h2>
        <div className="rounded-2xl border border-primary/10 bg-white p-6 md:p-10 shadow-sm [&_a]:text-secondary-text [&_li]:text-primary-accent [&_p]:mb-3 [&_p]:text-primary-accent">
          <BlocksRenderer
            content={content!}
            headingOffset={2}
            listVariant={listVariantFromTitle(title)}
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

  const formesSoutien = data?.formes_soutien ?? [];
  const visibilite = data?.visibilite ?? [];
  const hasEditorialContent =
    hasBlocks(data?.presentation) ||
    hasBlocks(data?.pourquoi) ||
    formesSoutien.length > 0 ||
    visibilite.length > 0;

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

      <BlocksSection
        title="Présentation"
        content={data?.presentation ?? null}
        className="bg-gray-50"
      />

      <ClubStats
        initialAdherentsCount={adherentsCount}
        variant="compact"
      />

      <BlocksSection
        title="Pourquoi devenir partenaire"
        content={data?.pourquoi ?? null}
        className="bg-white"
      />

      <CardsSection title="Formes de soutien" cards={formesSoutien} />
      <CardsSection title="Visibilité et valorisation" cards={visibilite} />

      {!hasEditorialContent && !loadError && (
        <Section className="bg-gray-50">
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Le contenu détaillé de cette page sera bientôt disponible. En attendant,
            consultez notre dossier partenaires ou contactez-nous.
          </p>
        </Section>
      )}

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
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Découvrez notre dossier partenaires / sponsoring ou contactez-nous pour
            construire ensemble un partenariat adapté à vos objectifs.
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
