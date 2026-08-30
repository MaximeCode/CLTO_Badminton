import { Section } from '../components/Section';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Article } from '@/types/articlesType';
import { useEffect, useState } from 'react';
import { getOneArticle } from '@/api/strapi/articles';
import { extractTextFromBlocks } from '@/utils/blocksText';
import { stringifyDate } from '@/utils/formatDate';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { Seo } from '../components/Seo';
import { motion } from 'motion/react';

const userAvatar = new URL('../../imports/user.webp', import.meta.url).href;

const calculateReadTime = (article: Article | null) => {
  if (!article) return 0;
  const averageWPM = 260;
  const text = extractTextFromBlocks(article.contenu);
  const numOfWords = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(numOfWords / averageWPM);
};

export function ActualitePage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { documentId } = useParams<{ documentId: string }>();

  // Fetch datas
  useEffect(() => {
    if (!documentId) {
      setLoadError("Article introuvable.");
      setLoading(false);
      return;
    }

    const id = documentId;

    async function loadData() {
      try {
        setLoadError(null);
        const data = await getOneArticle(id);
        setArticle(data);
      } catch (error) {
        setArticle(null);
        setLoadError(
          error instanceof Error
            ? error.message
            : "Impossible de charger cet article.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [documentId]);

  const articleDescription = article
    ? (extractTextFromBlocks(article.contenu).slice(0, 160).trim() || `Actualité du CLTO Badminton Orléans : ${article.titre}`)
    : 'Actualité du CLTO Badminton Orléans.';

  return (
    <>
      <Seo
        title={article?.titre ?? 'Actualité'}
        description={articleDescription}
        image={article?.vignette?.url}
      />
      {/* Article hero banner — hauteur auto sur mobile (stack), fixe dès sm */}
      <div className="relative h-auto sm:h-80 md:h-100 sm:max-h-80 md:max-h-100 overflow-hidden border-t-2 border-secondary bg-linear-to-br from-primary-accent via-primary to-primary/80">
        {/* Subtle warm glow on the right, where the image sits */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(218,150,25,0.10),transparent_60%)]" />

        <div className="relative h-full mx-auto max-w-7xl min-w-0 px-4 sm:px-6 py-6 sm:py-10 md:py-14">
          <div className="h-full flex flex-col-reverse items-center gap-4 sm:gap-8 md:flex-row md:gap-12 min-w-0">

            {loading && (
              <div className="min-h-40 sm:min-h-[50vh] w-full min-w-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                <p className="text-white text-xl ml-3">Chargement…</p>
              </div>
            )}

            {/* Left - title, ~70% */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full flex-1 min-w-0"
            >
              <div className="flex items-stretch gap-3">
                <div className="w-1.5 shrink-0 rounded-full bg-secondary" />
                <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-white leading-tight wrap-break-word">
                  {article?.titre ?? ''}
                </h1>
              </div>
            </motion.div>

            {/* Right - vignette, ~30% (contrainte taille sur mobile pour éviter overflow) */}
            {article?.vignette.url && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full max-w-xs sm:max-w-sm min-w-0 md:max-w-none md:w-[30%] md:shrink-0"
              >
                <div className="overflow-hidden rounded-xl border-2 border-secondary/50 shadow-2xl ring-2 ring-white/10">
                  <img
                    src={article.vignette.url}
                    alt={article.titre ?? ''}
                    className="h-auto w-full max-w-full object-contain"
                  />
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      <Section className="bg-white">
        <div className="mb-6 min-w-0">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour aux articles
          </Link>
        </div>

        {loadError && (
          <div className="bg-red-500 text-white p-4 rounded-lg">
            {loadError}
          </div>
        )}

        {loading ? (
          <div role="status" className="bg-white rounded-lg shadow-lg p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 animate-pulse min-w-0 max-w-full">
            {/* Header */}
            <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 pb-6">
              <div className="h-6 w-20 rounded-full bg-gray-200" />
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
            {/* Content */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            {/* Footer */}
            <div className="flex items-center gap-3 border-t border-gray-200 pt-6">
              <div className="h-12 w-12 rounded-full bg-gray-200 shrink-0" />
              <div className="h-4 w-40 rounded bg-gray-200" />
            </div>
            <span className="sr-only">Chargement de l'article…</span>
          </div>
        ) : (
          <section className="bg-white rounded-lg shadow-lg p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 text-gray-700 leading-relaxed min-w-0 max-w-full overflow-x-hidden">
            <header className="border-b border-gray-200 pb-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-gray-500">
                {article?.categories.map((categorie) => (
                  <span
                    key={categorie.id}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary"
                  >
                    {categorie.libelle}
                  </span>
                ))}
                <span>
                  Publié le {article?.createdAt
                    ? stringifyDate(article.createdAt, "numeric", "long", "numeric")
                    : ""}
                </span>
                <span>•</span>
                <span>Lecture: {calculateReadTime(article)} min</span>
              </div>
            </header>

            <article className="min-w-0 wrap-break-word">
              <BlocksRenderer content={article?.contenu ?? []} size="sm" sizeDesktop="lg" headingOffset={1} />
            </article>
          </section>
        )}

        <div className="mt-6">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft size={16} />
            Retour aux articles
          </Link>
        </div>
      </Section>
    </>
  );
}