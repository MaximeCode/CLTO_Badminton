import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import type { Faq } from '../../types/faqsType';
import { getFaqs } from '@/api/strapi/faqs';
import { Section } from '../components/Section';

export function FAQPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.FAQ);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Fetch datas
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        // console.log('Loading data...');
        const data = await getFaqs();
        // console.log('data loaded:', data);
        setFaqs(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Toutes les réponses à vos questions sur le club et la pratique du badminton"
        image={bandeauImage}
      />

      {loadError && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-red-600">{loadError}</p>
        </div>
      )}

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle size={40} className="text-secondary hidden md:block" />
            <h2 className="font-primary text-5xl md:text-6xl text-primary">
              QUESTIONS FRÉQUENTES
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Vous ne trouvez pas la réponse à votre question ? N'hésitez pas à nous contacter directement.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs && faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="bg-gray-50 rounded-lg shadow-md overflow-hidden"
            >
              <button
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
                    <p className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4 text-sm md:text-base">
                      {faq.reponse}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
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
            Notre équipe est disponible pour répondre à toutes vos questions. Contactez-nous et nous vous répondrons dans les meilleurs délais.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
          >
            Nous contacter
          </a>
        </motion.div>
      </Section>
    </>
  );
}
