import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

import type { Article } from '@/types/articlesType';
import { getArticles } from '@/api/strapi/articles';
import type { Categorie } from '@/types/categoriesType';
import { getCategories } from '@/api/strapi/categories';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

function ArticleCardSkeleton() {
  return (
    <div role="status" className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
      <div className="relative h-56 bg-gray-200">
        <div className="absolute top-4 left-4 h-6 w-20 rounded-full bg-gray-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="mb-2 h-6 w-full rounded bg-gray-200" />
        <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
        <div className="mb-4">
          <div className="h-5 w-16 rounded-full bg-gray-200" />
        </div>
        <div className="h-5 w-28 rounded bg-gray-200" />
      </div>
      <span className="sr-only">Chargement...</span>
    </div>
  );
}

export function ActualitesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCategoriesOpen(false);
  };

  // Fetch datas
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        // Fetch les 2 datas en même tps (best perf)
        const [data, categoriesData] = await Promise.all([getArticles(), getCategories()]);
        setArticles(data);
        // console.log('articles: ', data);
        setCategories(categoriesData);
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

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return articles;
    }

    return articles.filter((article) => article.categorie.libelle === selectedCategory);
  }, [selectedCategory, articles]);

  const categoryFilters = (
    <>
      <li>
        <button
          type="button"
          onClick={() => selectCategory('Toutes')}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === 'Toutes'
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
            }`}
        >
          Toutes
        </button>
      </li>
      {categories.map((category) => (
        <li key={category.id}>
          <button
            type="button"
            onClick={() => selectCategory(category.libelle)}
            className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === category.libelle
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
          >
            {category.libelle}
          </button>
        </li>
      ))}
    </>
  );

  return (
    <>
      <PageHero
        title="ACTUALITÉS"
        subtitle="Toutes les dernières nouvelles du CLTO Badminton"
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <Section className="bg-white">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-24 bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
            {/* MOBILE */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setCategoriesOpen((open) => !open)}
                aria-expanded={categoriesOpen}
                aria-controls="categories-list-mobile"
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <span>
                  <span className="font-primary text-2xl text-primary block">
                    Catégories
                  </span>
                  <span className="text-sm text-gray-600">{selectedCategory}</span>
                </span>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-primary transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {categoriesOpen && (
                <ul id="categories-list-mobile" className="mt-4 space-y-2">
                  {categoryFilters}
                </ul>
              )}
            </div>

            {/* DESTKTOP */}
            <div className="hidden lg:block">
              <h3 className="font-primary text-2xl text-primary mb-4">
                Catégories
              </h3>
              <ul className="space-y-2">{categoryFilters}</ul>
            </div>

            {/* ALL */}
            <p className="mt-4 text-xs text-gray-500">
              {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} affiché{filteredArticles.length > 1 ? 's' : ''}.
            </p>
          </aside>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-8">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <ArticleCardSkeleton key={i} />
              ))
              : filteredArticles.map((article, index) => (
                <Link key={article.id} to={`/actualite/${article.documentId}`}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <ImageWithFallback
                        src={article.vignette.url}
                        alt={article.titre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-white px-4 py-1 rounded-full text-sm">
                        {article.categorie.libelle}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={16} />
                        <span>{new Date(article.createdAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}</span>
                      </div>
                      <h3 className="font-primary text-2xl text-primary mb-3 group-hover:text-secondary transition-colors">
                        {article.titre}
                      </h3>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span
                          key={article.categorie.id}
                          className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                        >
                          {article.categorie.libelle}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                        Lire la suite
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.article>
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </>
  );
}