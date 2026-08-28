import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Seo } from '../components/Seo';
import type { Faq, FaqCategorie } from '@/types/faqsType';
import { getFaqCategories, getFaqs } from '@/api/strapi/faqs';
import { Section } from '../components/Section';
import { Link } from 'react-router';

export function FAQPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.FAQ);
  const listRef = useRef<HTMLDivElement>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<FaqCategorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setOpenIndex(null);
    setCategoriesOpen(false);
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const [faqsData, categoriesData] = await Promise.all([
          getFaqs(),
          getFaqCategories(),
        ]);
        setFaqs(faqsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading FAQ data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredFaqs = useMemo(() => {
    if (selectedCategory === 'Toutes') return faqs;
    return faqs.filter((faq) =>
      faq.faq_categories.some((categorie) => categorie.libelle === selectedCategory),
    );
  }, [selectedCategory, faqs]);

  const rangeLabel =
    filteredFaqs.length === 0
      ? 'Aucune question'
      : `${filteredFaqs.length} question${filteredFaqs.length > 1 ? 's' : ''}`;

  const categoryFilters = (
    <>
      <li className="w-full">
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
        <li key={category.id} className="w-full">
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
      <Seo
        title="FAQ"
        description="FAQ du CLTO Badminton Orléans : adhésion, créneaux, compétitions et pratique du badminton à Orléans."
      />
      <PageHero
        title="FAQ"
        subtitle="Toutes les réponses à vos questions sur le club et la pratique du badminton au CLTO"
        image={bandeauImage}
      />

      <Section className="bg-white">
        {loadError && (
          <p className="text-center text-red-600 mb-8" role="alert">
            {loadError}
          </p>
        )}

        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          <aside className="lg:sticky lg:top-36 flex flex-col w-full max-w-87.5 bg-gray-50 border border-gray-200 rounded-lg p-3 md:p-5 shadow-sm">
            <div className="lg:hidden w-full">
              <div className="flex items-start justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((open) => !open)}
                  aria-expanded={categoriesOpen}
                  aria-controls="faq-categories-list-mobile"
                  className="flex min-w-0 flex-1 items-center gap-2 text-left"
                >
                  <span className="min-w-0">
                    <span className="font-primary text-2xl text-primary flex items-center gap-2">
                      Catégories
                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-primary transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </span>
                    <span className="text-sm text-gray-600">{selectedCategory}</span>
                  </span>
                </button>
                <p className="shrink-0 pt-1 text-xs text-gray-500 text-right">{rangeLabel}</p>
              </div>

              {categoriesOpen && (
                <ul id="faq-categories-list-mobile" className="mt-4 ms-4 w-3/4 space-y-2">
                  {categoryFilters}
                </ul>
              )}
            </div>

            <div className="hidden lg:block w-full">
              <h2 className="font-primary text-2xl text-primary mb-4">Catégories</h2>
              <ul className="w-full space-y-2">{categoryFilters}</ul>
              <p className="mt-4 text-xs text-gray-500">{rangeLabel}</p>
            </div>
          </aside>

          <div ref={listRef} className="w-full scroll-mt-24 space-y-4">
            {loading ? (
              <p className="text-center text-gray-500 py-12">Chargement des questions…</p>
            ) : filteredFaqs.length === 0 ? (
              <p className="text-center text-gray-500 py-12">
                Aucune question dans cette catégorie.
              </p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.documentId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
                  className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-100 transition-colors duration-200"
                    aria-expanded={openIndex === index}
                  >
                    <span className="font-semibold text-primary text-base md:text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={22}
                      className={`text-secondary shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4 text-sm md:text-base whitespace-pre-line">
                          {faq.reponse}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </Section>

      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-12 text-center shadow-lg text-white"
        >
          <HelpCircle className="mx-auto mb-6" size={56} />
          <h2 className="font-primary text-4xl mb-4">UNE AUTRE QUESTION ?</h2>
          <p className="text-white/90 md:text-lg mb-8 max-w-2xl mx-auto">
            Notre équipe est disponible pour répondre à toutes vos questions. Contactez-nous et
            nous vous répondrons dans les meilleurs délais.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
          >
            Nous contacter
          </Link>
        </motion.div>
      </Section>
    </>
  );
}
