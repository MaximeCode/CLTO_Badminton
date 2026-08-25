import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Gift } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { EvenementCard } from '../components/EvenementCard';
import { getPageFormations } from '@/api/strapi/formation';
import type { PageFormation } from '@/types/formationType';
import { formatPaginationRange, ListPagination } from '../components/ListPagination';

const FORMATIONS_PER_PAGE = 5;

export function FormationsPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.FORMATIONS);
  const listRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<PageFormation | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setData(await getPageFormations());
        setCurrentPage(1);
      } catch (error) {
        console.error('Error loading formations:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  const avantages = data?.les_avantages ?? [];
  const evenements = data?.evenements ?? [];
  const totalPages = Math.ceil(evenements.length / FORMATIONS_PER_PAGE);

  const paginatedEvenements = useMemo(() => {
    const start = (currentPage - 1) * FORMATIONS_PER_PAGE;
    return evenements.slice(start, start + FORMATIONS_PER_PAGE);
  }, [evenements, currentPage]);

  function goToPage(page: number) {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <PageHero
        title="FORMATIONS"
        subtitle="GEO, arbitre et autres formations proposées par le club"
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

      {avantages.length > 0 && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              LES AVANTAGES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-lg p-8 shadow-lg max-w-3xl mx-auto"
          >
            <h3 className="font-primary text-2xl text-primary mb-5 flex items-center gap-2">
              <Gift size={24} className="text-secondary" />
              Ce que le club offre
            </h3>
            <ul className="space-y-3">
              {avantages.map((avantage) => (
                <li key={avantage.id} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle
                    size={22}
                    strokeWidth={2.5}
                    className="text-secondary shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{avantage.contenu}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </Section>
      )}

      {evenements.length > 0 && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
              NOS FORMATIONS
            </h2>
            <p className="mt-4 text-sm text-gray-500">
              {formatPaginationRange(currentPage, FORMATIONS_PER_PAGE, evenements.length)}
            </p>
          </motion.div>

          <div ref={listRef} className="space-y-10 scroll-mt-24">
            {paginatedEvenements.map((evenement) => (
              <EvenementCard
                key={evenement.id}
                titre={evenement.titre}
                date={evenement.date}
                detail_date={evenement.detail_date}
                lieu={evenement.lieu}
                horaire={evenement.horaire}
                links={[
                  {
                    href: evenement.lien_inscription,
                    label: 'Inscription',
                  },
                ]}
              >
                {evenement.description ? (
                  <div className="text-gray-700 leading-relaxed [&_a]:text-secondary [&_p]:mb-3 last:[&_p]:mb-0">
                    <BlocksRenderer content={evenement.description} headingOffset={3} />
                  </div>
                ) : null}
              </EvenementCard>
            ))}
          </div>

          <ListPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </Section>
      )}
    </>
  );
}
