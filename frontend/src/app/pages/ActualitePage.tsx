import { Section } from '../components/Section';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Loader2 } from 'lucide-react';
import type { Article } from '@/types/articlesType';
import { useEffect, useState } from 'react';
import { getOneArticle } from '@/api/strapi/articles';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { motion } from 'motion/react';
import { extractTextFromBlocks } from '@/utils/blocksText';

const userAvatar = new URL('../../imports/user.png', import.meta.url).href;

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
        console.log("data: ", data);
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

  return (
    <>
      {/* Article hero banner */}
      <div className="relative h-[260px] sm:h-[320px] md:h-[400px] max-h-[260px] sm:max-h-[320px] md:max-h-[400px] overflow-hidden border-t-2 border-secondary bg-gradient-to-br from-primary-accent via-primary to-primary/80">
        {/* Subtle warm glow on the right, where the image sits */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(218,150,25,0.10),transparent_60%)]" />

        <div className="relative h-full mx-auto max-w-[1280px] px-6 py-10 md:py-14">
          <div className="h-full flex flex-col-reverse items-center gap-8 md:flex-row md:gap-12">

            {loading && (
              <div className="min-h-[50vh] w-full shrink-0 flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-secondary" />
                <p className="text-white text-xl ml-3">Chargement…</p>
              </div>
            )}

            {/* Left — title, ~70% */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 min-w-0"
            >
              <div className="flex items-stretch gap-3">
                <div className="w-1.5 shrink-0 rounded-full bg-secondary" />
                <h1 className="font-primary text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                  {article?.titre ?? ''}
                </h1>
              </div>
            </motion.div>

            {/* Right — vignette, ~30% */}
            {article?.vignette.url && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="w-full shrink-0 md:w-[30%]"
              >
                <div className="overflow-hidden rounded-xl border-2 border-secondary/50 shadow-2xl ring-2 ring-white/10">
                  <img
                    src={article.vignette.url}
                    alt={article.titre ?? ''}
                    className="h-auto w-full object-contain"
                  />
                </div>
              </motion.div>
            )}

          </div>
        </div>
      </div>

      <Section className="bg-white">
        <div className="mb-6">
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
          <div role="status" className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8 animate-pulse">
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
          <section className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
            <header className="border-b border-gray-200 pb-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                  {article?.categorie.libelle}
                </span>
                <span>
                  Publié le {article?.createdAt
                    ? new Date(article.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                    : ""}
                </span>
                <span>•</span>
                <span>Lecture: {calculateReadTime(article)} min</span>
              </div>
            </header>

            <article>
              <BlocksRenderer content={article?.contenu ?? []} />
            </article>

            <footer className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={userAvatar}
                  alt="Auteur de l'article"
                  className="h-12 w-12 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-gray-900">
                    Publié par {article?.createdBy?.username || article?.createdBy?.firstname ? (
                      <span className="font-semibold">
                        {article.createdBy.username
                          ?? [article.createdBy.firstname, article.createdBy.lastname].filter(Boolean).join(" ")}
                      </span>
                    ) : (
                      <span className="italic text-gray-500">Auteur mystérieux</span>
                    )}
                  </p>
                </div>
              </div>
            </footer>
          </section>
        )}
      </Section>
    </>
  );
}