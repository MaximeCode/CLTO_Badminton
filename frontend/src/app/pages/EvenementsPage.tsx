import { motion } from 'motion/react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { useEffect, useMemo, useState } from 'react';
import { getEvenements } from '@/api/strapi/evenement';
import type { Evenement } from '@/types/evenementType';
import { EvenementCard } from '../components/EvenementCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '../components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EVENTS_PER_PAGE = 5;

export function EvenementsPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.EVENEMENTS);

  const [evenements, setEvenements] = useState<Evenement[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = evenements ? Math.ceil(evenements.length / EVENTS_PER_PAGE) : 0;

  const paginatedEvenements = useMemo(() => {
    if (!evenements) return [];
    const start = (currentPage - 1) * EVENTS_PER_PAGE;
    return evenements.slice(start, start + EVENTS_PER_PAGE);
  }, [evenements, currentPage]);

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        </motion.div>

        {loadError && (
          <p className="text-center text-red-600 mb-8" role="alert">
            {loadError}
          </p>
        )}

        <div className="space-y-10">
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

        {totalPages > 1 && (
          <Pagination className="mt-12 text-primary">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="default"
                  aria-label="Page précédente"
                  aria-disabled={currentPage <= 1}
                  className={`gap-1 px-2.5 sm:pl-2.5 ${currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage > 1) goToPage(currentPage - 1);
                  }}
                >
                  <ChevronLeft className="size-4" />
                  <span className="hidden sm:block">Précédent</span>
                </PaginationLink>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    isActive={page === currentPage}
                    className="cursor-pointer"
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(page);
                    }}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationLink
                  href="#"
                  size="default"
                  aria-label="Page suivante"
                  aria-disabled={currentPage >= totalPages}
                  className={`gap-1 px-2.5 sm:pr-2.5 ${currentPage >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                    }`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage < totalPages) goToPage(currentPage + 1);
                  }}
                >
                  <span className="hidden sm:block">Suivant</span>
                  <ChevronRight className="size-4" />
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </Section>
    </>
  );
}
