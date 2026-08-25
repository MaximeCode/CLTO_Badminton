import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getEvenements } from '@/api/strapi/evenement';
import type { Evenement } from '@/types/evenementType';
import { EvenementCard } from '../components/EvenementCard';
import { formatPaginationRange, ListPagination } from '../components/ListPagination';

const EVENTS_PER_PAGE = 5;

export function EvenementsPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.EVENEMENTS);
  const listRef = useRef<HTMLDivElement>(null);

  const [evenements, setEvenements] = useState<Evenement[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = evenements?.length ?? 0;
  const totalPages = Math.ceil(totalItems / EVENTS_PER_PAGE);

  const paginatedEvenements = useMemo(() => {
    if (!evenements) return [];
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return evenements.slice(start, start + EVENTS_PER_PAGE);
  }, [evenements, currentPage]);

  function goToPage(page: number) {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getEvenements();
        setEvenements(data);
        setCurrentPage(1);
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
      <PageHero title={BANDEAU_PAGES.EVENEMENTS} image={bandeauImage} />

      <Section className="py-12 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
            NOS ÉVÉNEMENTS 2026-2027
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Compétitions, tournois internes et bien plus encore ! Les inscriptions ainsi que le
            bénévolat se font directement via le lien. Pour toute question, n&apos;hésitez pas à
            vous rapprocher d&apos;un membre du bureau ou de l&apos;équipe organisatrice.
          </p>
          {totalItems > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              {formatPaginationRange(currentPage, EVENTS_PER_PAGE, totalItems)}
            </p>
          )}
        </motion.div>

        {loadError && (
          <p className="text-center text-red-600 mb-8" role="alert">
            {loadError}
          </p>
        )}

        <div ref={listRef} className="space-y-10 scroll-mt-24">
          {paginatedEvenements.map((evenement: Evenement) => {
            const links = [
              {
                href: evenement.lien_inscription_benevole,
                label: 'Inscription bénévole',
              },
              ...(evenement.lien_inscription_tournoi?.trim()
                ? [
                  {
                    href: evenement.lien_inscription_tournoi,
                    label: 'Inscription tournoi',
                  },
                ]
                : []),
            ];

            return (
              <EvenementCard
                key={evenement.id}
                titre={evenement.titre}
                date={evenement.date}
                detail_date={evenement.detail_date}
                lieu={evenement.lieu}
                horaire={evenement.horaire}
                affiche={evenement.affiche}
                links={links}
              >
                {evenement.petite_description ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {evenement.petite_description}
                  </p>
                ) : null}
              </EvenementCard>
            );
          })}
        </div>

        <ListPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </Section>
    </>
  );
}
