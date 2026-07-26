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
    } else if (selectedCategory === 'À la une') {
      return articles.filter((article) => article.a_la_une);
    }

    return articles.filter((article) => article.categorie.libelle === selectedCategory);
  }, [selectedCategory, articles]);

  const categoryFilters = (
    <>
      <li className="w-full">
        <button
          type="button"
          onClick={() => selectCategory("Toutes")}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === "Toutes"
            ? "bg-primary text-white"
            : "text-gray-700 hover:bg-primary/10 hover:text-primary"
            }`}
        >
          Toutes
        </button>
      </li>
      <li className="w-full">
        <button
          type="button"
          onClick={() => selectCategory("À la une")}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === "À la une"
            ? "bg-primary text-white"
            : "text-gray-700 hover:bg-primary/10 hover:text-primary"
            }`}
        >
          À la une
        </button>
      </li>
      {categories.map((category) => (
        <li key={category.id} className="w-full">
          <button
            type="button"
            onClick={() => selectCategory(category.libelle)}
            className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === category.libelle
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-primary/10 hover:text-primary"
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
      />

      <Section className="bg-white">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-24 flex flex-col w-full max-w-[350px] bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-5 shadow-sm">
            {/* MOBILE */}
            <div className="lg:hidden w-full">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((open) => !open)}
                  aria-expanded={categoriesOpen}
                  aria-controls="categories-list-mobile"
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <span className="min-w-0">
                    <span className="font-primary text-2xl text-primary flex items-center gap-2">
                      Catégories
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-primary transition-transform duration-200 ${categoriesOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                    <span className="text-sm text-gray-600">{selectedCategory}</span>
                  </span>
                </button>
                <p className="shrink-0 pt-1 text-xs text-gray-500 text-right">
                  {filteredArticles.length} article
                  {filteredArticles.length > 1 ? "s" : ""} affiché
                  {filteredArticles.length > 1 ? "s" : ""}.
                </p>
              </div>

              {categoriesOpen && (
                <ul id="categories-list-mobile" className="mt-4 ms-4 w-3/4 space-y-2">
                  {categoryFilters}
                </ul>
              )}
            </div>

            {/* DESKTOP */}
            <div className="hidden lg:block w-full">
              <h3 className="font-primary text-2xl text-primary mb-4">Catégories</h3>
              <ul className="w-full space-y-2">{categoryFilters}</ul>
              <p className="mt-4 text-xs text-gray-500">
                {filteredArticles.length} article
                {filteredArticles.length > 1 ? "s" : ""} affiché
                {filteredArticles.length > 1 ? "s" : ""}.
              </p>
            </div>
          </aside>

          <div className="w-5/6 sm:w-full mx-auto grid sm:grid-cols-2 md:grid-cols-3 [2000px]:grid-cols-4 gap-8">
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
                      {article.a_la_une && (
                        <div
                          className="pointer-events-none absolute top-3 -right-10 w-36 rotate-45 bg-primary py-1 text-center text-xs font-semibold tracking-wide text-white shadow-sm"
                          aria-hidden
                        >
                          <span className='pl-2'>À la une</span>
                        </div>
                      )}
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