import { useEffect, useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

import type { Article } from '@/types/articlesType';
import { getFeaturedArticles } from '@/api/strapi/articles';
import { extractTextFromBlocks } from '@/utils/blocksText';
import { Button } from './Button';

function formatArticleDate(date: Date | string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function FeaturedNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setLoading(true);
        const data = await getFeaturedArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Section className="bg-white">
        <div className="flex flex-col items-center justify-center min-h-64">
          <Loader2 size={40} className="text-[#0153b6] animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Chargement des actualités à la Une…</p>
        </div>
      </Section>
    );
  }

  if (loadError) {
    return (
      <Section className="bg-white">
        <div className="flex flex-col items-center justify-center min-h-64">
          <p className="text-gray-500 font-medium">{loadError}</p>
        </div>
      </Section>
    );
  }

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  if (!featuredArticle) {
    return null;
  }

  const excerpt = extractTextFromBlocks(featuredArticle.contenu, 160);

  return (
    <Section className='bg-white'>
      <HomePageSectionTitle title="À LA UNE" />

      <div className="grid lg:grid-cols-2 gap-8 md:w-5/6 mx-auto lg:w-full">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <Link to={`/actualite/${featuredArticle.documentId}`} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[16/10]">
              <img
                src={featuredArticle.vignette.url}
                alt={featuredArticle.titre}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white px-3 py-1 rounded-md text-sm font-medium">
                  {featuredArticle.categorie.libelle}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-primary text-3xl text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                {featuredArticle.titre}
              </h3>
              {excerpt && (
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {excerpt}
                </p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{formatArticleDate(featuredArticle.createdAt)}</span>
                <span
                  className="text-primary hover:text-primary-accent font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
                >
                  Lire l'article
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <hr className="block lg:hidden border-gray-200 w-50 mx-auto" />

        {/* Side Articles */}
        <div className="space-y-6">
          {sideArticles.map((article, index) => (
            <motion.div
              key={article.documentId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="group"
            >
              <Link to={`/actualite/${article.documentId}`} className="cursor-pointer flex gap-4">
                <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={article.vignette.url}
                    alt={article.titre}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-primary text-xl text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-200">
                    {article.titre}
                  </h3>
                  <span className="text-sm text-gray-500">{formatArticleDate(article.createdAt)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Button text='Voir toutes les actualités' to='/actualites' />
    </Section>
  );
}
