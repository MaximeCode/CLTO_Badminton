import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import type { Faq } from '../../types/faqsType';
import { getFaqs } from '@/api/strapi/faqs';

// const faqs = [
//   {
//     question: "Comment adhérer au CLTO Badminton ?",
//     answer:
//       "L'adhésion au club se fait en ligne via HelloAsso ou directement au gymnase lors des créneaux d'accueil. Il vous suffit de remplir le formulaire d'inscription, de régler la cotisation annuelle et de fournir un certificat médical de non contre-indication à la pratique sportive (ou de signer le questionnaire de santé). La licence FFBAD est comprise dans la cotisation.",
//   },
//   {
//     question: "Quels sont les tarifs d'adhésion pour la saison 2025/2026 ?",
//     answer:
//       "Les tarifs varient selon la catégorie : Babybad/Minibad à partir de 130 €, Jeunes (Poussins à Cadets) entre 180 € et 220 €, Adultes loisir à partir de 230 €, Adultes compétiteurs à partir de 270 €. Des réductions familles sont disponibles. Contactez-nous pour un devis personnalisé.",
//   },
//   {
//     question: "Quels sont les créneaux d'entraînement disponibles ?",
//     answer:
//       "Le club propose des créneaux sur plusieurs gymnases tout au long de la semaine : le lundi, mercredi, vendredi et week-end pour le jeu libre et les entraînements encadrés. Les horaires précis sont disponibles sur la page Créneaux du site. Des créneaux spécifiques existent pour les jeunes, les compétiteurs et les vétérans.",
//   },
//   {
//     question: "Comment s'inscrire à un tournoi homologué ?",
//     answer:
//       "L'inscription aux tournois se fait via votre compte joueur sur le site BadStats ou via le logiciel Tournament Software. Vous devez être à jour de cotisation et disposer d'un solde suffisant sur votre compte joueur. Le club prend en charge une partie des frais selon votre niveau (voir la section Gratuités sur l'espace Compétiteurs). Un tutoriel détaillé est disponible sur la page Espace Compétiteurs.",
//   },
//   {
//     question: "Le club propose-t-il des stages pendant les vacances scolaires ?",
//     answer:
//       "Oui, le CLTO organise des stages pendant les principales vacances scolaires (été, Toussaint, Noël). Ces stages sont ouverts à tous les niveaux, des débutants aux compétiteurs. Ils sont encadrés par nos entraîneurs diplômés. Retrouvez tous les détails sur notre page Stages.",
//   },
//   {
//     question: "Dois-je avoir mon propre matériel pour venir jouer ?",
//     answer:
//       "Une raquette est indispensable, mais le club peut en prêter aux débutants lors des premières séances. Les volants sont fournis par le club pendant les entraînements encadrés et les créneaux compétiteurs. Pour le jeu libre, vous devez apporter vos propres volants (plumes ou plastique). Le club propose également une vente de volants Forza S6000 à tarif préférentiel (26,50 €/tube) pour les adhérents.",
//   },
//   {
//     question: "Puis-je venir essayer avant de m'inscrire ?",
//     answer:
//       "Absolument ! Le CLTO propose deux séances d'essai gratuites pour les nouveaux pratiquants adultes et jeunes. Il suffit de nous contacter via le formulaire en ligne ou de vous présenter directement lors d'un créneau d'accueil. Vous serez accueillis par un membre du bureau ou un entraîneur.",
//   },
//   {
//     question: "Quels gymnases utilise le club ?",
//     answer:
//       "Le CLTO Badminton dispose de plusieurs gymnases dans le secteur. Les gymnases principaux sont équipés de terrains homologués avec un marquage au sol dédié au badminton. La liste complète des gymnases, adresses et accès est disponible sur la page Gymnases du site.",
//   },
// ];

export function FAQPage() {
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
        image="https://images.unsplash.com/photo-1611329857570-f02988717f30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBxdWVzdGlvbnxlbnwxfHx8fDE3ODU0ODQyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />

      {loadError && (
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <p className="text-red-600">{loadError}</p>
        </div>
      )}

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <HelpCircle size={40} className="text-secondary" />
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
                      <p className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                        {faq.reponse}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
          >
            <HelpCircle className="mx-auto mb-6" size={56} />
            <h2 className="font-primary text-4xl mb-4">UNE AUTRE QUESTION ?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible pour répondre à toutes vos questions. Contactez-nous et nous vous répondrons dans les meilleurs délais.
            </p>
            <a
              href="/contact"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
