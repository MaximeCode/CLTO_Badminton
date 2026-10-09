import { motion } from 'motion/react';
import { Calendar, Euro, Users, MapPin, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../components/Section';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { getStages } from '@/api/strapi/stage';
import { Stage } from '@/types/stageType';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { formatDateRange } from '@/utils/formatDate';
import { Seo } from '../components/Seo';
import { formatPaginationRange, ListPagination } from '../components/ListPagination';
import {
  parseSearchHash,
  searchElementId,
  useSearchHighlight,
} from '@/hooks/useSearchHighlight';
import { highlightText } from '@/utils/highlightText';
import { cn } from '../components/ui/utils';

const STAGES_PER_PAGE = 5;

export function StagesPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.STAGES);
  const listRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  const [stages, setStages] = useState<Stage[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const stagesData = await getStages();
        setStages(stagesData);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!stages) return;
    const target = parseSearchHash(hash);
    if (!target || target.type !== 'stage') return;
    const index = stages.findIndex((stage) => stage.documentId === target.documentId);
    if (index < 0) return;
    setCurrentPage(Math.floor(index / STAGES_PER_PAGE) + 1);
  }, [stages, hash]);

  const totalItems = stages?.length ?? 0;
  const totalPages = Math.ceil(totalItems / STAGES_PER_PAGE);

  const paginatedStages = useMemo(() => {
    if (!stages) return [];
    const start = (currentPage - 1) * STAGES_PER_PAGE;
    return stages.slice(start, start + STAGES_PER_PAGE);
  }, [stages, currentPage]);

  const highlightReady = useMemo(() => {
    if (!stages) return false;
    const target = parseSearchHash(hash);
    if (!target || target.type !== 'stage') return false;
    return paginatedStages.some((stage) => stage.documentId === target.documentId);
  }, [stages, hash, paginatedStages]);

  const { highlightedId, searchQuery, isFading } = useSearchHighlight({
    ready: highlightReady,
  });

  function goToPage(page: number) {
    setCurrentPage(page);
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <Seo
        title="Stages"
        description="Stages de badminton du CLTO Badminton Orléans pendant les vacances scolaires, pour tous les niveaux."
      />
      <PageHero
        title="STAGES"
        subtitle="Des stages encadrés pour progresser et préparer la saison au CLTO Badminton"
        image={bandeauImage}
      />

      <Section className="py-12 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
            NOS STAGES 2026-2027
          </h2>
          <p className="text-gray-600 text-lg text-balance max-w-4xl mx-auto space-y-3">
            <span className="block">
              Le CLTO Badminton propose tout au long de la saison des stages encadrés par les
              entraîneurs du club, pour progresser, se perfectionner ou préparer les compétitions.
            </span>
            <span className="block">
              Les stages sont principalement destinés aux licenciés du CLTO Badminton, mais certains
              peuvent également être ouverts aux joueurs extérieurs, selon les places disponibles et
              les conditions propres à chaque stage. Les conditions de participation sont précisées
              dans la présentation de chaque stage.
            </span>
          </p>
          {totalItems > 0 && (
            <p className="mt-4 text-sm text-gray-500">
              {formatPaginationRange(currentPage, STAGES_PER_PAGE, totalItems)}
            </p>
          )}
        </motion.div>

        {loadError && (
          <p className="text-center text-red-600 mb-8" role="alert">
            {loadError}
          </p>
        )}

        <div ref={listRef} className="flex flex-col gap-8 scroll-mt-24">
          {paginatedStages.map((stage: Stage) => {
            const inscriptionUrl = stage.lien?.trim();
            const stageDomId = searchElementId('stage', stage.documentId);
            const isHighlighted = highlightedId === stageDomId;
            const q = isHighlighted ? searchQuery : '';

            return (
              <motion.article
                id={stageDomId}
                key={stage.documentId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(
                  'scroll-mt-24 overflow-hidden rounded-lg bg-gray-50 shadow-lg',
                  isHighlighted && 'search-result-highlight',
                  isHighlighted && isFading && 'search-result-highlight--fade',
                )}
              >
                <div className="bg-linear-to-r from-primary to-primary-accent px-6 py-4 sm:px-8">
                  <h3 className="font-primary text-3xl text-white sm:text-4xl">
                    {highlightText(stage.titre, q)}
                  </h3>
                </div>

                <div className="space-y-8 p-6 sm:p-8">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-md">
                    <div className="flex items-start gap-3 text-gray-700">
                      <Calendar size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">
                        {formatDateRange(stage.date_debut, stage.date_fin)}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                      <MapPin size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">
                        {highlightText(stage.gymnase, q)}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                      <Users size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">
                        {highlightText(stage.public, q)}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 text-gray-700">
                      <Euro size={20} className="mt-0.5 shrink-0 text-secondary" />
                      <span className="font-semibold">
                        {highlightText(stage.autre_infos ?? '', q)}
                      </span>
                    </div>
                  </div>

                  <article>
                    <BlocksRenderer content={stage.description ?? []} size="base" headingOffset={3} />
                  </article>

                  {inscriptionUrl ? (
                    <a
                      href={inscriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-white transition-colors duration-200 hover:bg-secondary-accent"
                    >
                      S&apos;inscrire sur HelloAsso
                      <ArrowRight size={18} />
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-gray-300 px-6 py-3 text-gray-500"
                    >
                      Les inscriptions seront bientôt ouvertes
                    </span>
                  )}
                </div>
              </motion.article>
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
