import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Target, Heart, Trophy, Gift, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { getPublicAdultesCompetiteurs } from '@/api/strapi/publics';
import type { PublicAdultesCompetiteurs } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

const formats = [
  {
    icon: Users,
    title: 'Entraide',
    description: 'Pour jouer régulièrement dans une ambiance conviviale et partagée.',
  },
  {
    icon: Target,
    title: 'Progression',
    description: 'Des séances pour améliorer la technique, les déplacements et la tactique.',
  },
  {
    icon: Trophy,
    title: 'Compétition',
    description: 'Un accompagnement pour rejoindre les interclubs et tournois homologués.',
  },
];

const strengths = [
  {
    icon: Calendar,
    title: 'Semaine complète',
    description: 'Plusieurs créneaux du lundi au vendredi pour s’adapter aux emplois du temps.',
  },
  {
    icon: Clock,
    title: 'Rythme flexible',
    description: 'Vous choisissez les séances selon vos objectifs et votre disponibilité.',
  },
  {
    icon: Heart,
    title: 'Ambiance club',
    description: 'Un état d’esprit basé sur le partage, le plaisir de jouer et l’entraide.',
  },
];

function cardsGridClass(count: number) {
  if (count <= 1) return 'max-w-4xl mx-auto';
  if (count === 2) return 'grid lg:grid-cols-2 gap-8';
  return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
}

export function AdultesCompetiteursPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.ADULTES_COMPETITEURS);

  const [data, setData] = useState<PublicAdultesCompetiteurs | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicAdultesCompetiteurs();
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);

  const tournois = data?.tournois_competitions ?? [];
  const avantages = data?.les_avantages ?? [];

  return (
    <>
      <PageHero
        title={data?.titre || BANDEAU_PAGES.ADULTES_COMPETITEURS}
        subtitle={data?.description || "Du loisir à la compétition, pratiquez le badminton à votre rythme"}
        image={bandeauImage}
      />

      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            FORMATS DE PRATIQUE
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {formats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="font-primary text-2xl text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {tournois.length > 0 && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              TOURNOIS & COMPÉTITIONS
            </h2>
          </motion.div>

          <div className={cardsGridClass(tournois.length)}>
            {tournois.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 shadow-lg"
              >
                <h3 className="font-primary text-2xl text-primary mb-2">{item.titre}</h3>
                {item.sous_titre && (
                  <p className="text-secondary font-semibold mb-4">{item.sous_titre}</p>
                )}
                <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                  <BlocksRenderer content={item.contenu} headingOffset={3} />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      {avantages.length > 0 && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              LES AVANTAGES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-lg p-8 shadow-lg max-w-3xl mx-auto"
          >
            <h3 className="font-primary text-2xl text-primary mb-5 flex items-center gap-2">
              <Gift size={24} className="text-secondary" />
              Vos avantages
            </h3>
            <ul className="space-y-3">
              {avantages.map((avantage) => (
                <li key={avantage.id} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
                  <span>{avantage.contenu}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </Section>
      )}

      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            POURQUOI NOUS REJOINDRE ?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="font-primary text-xl text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-12 text-center shadow-lg text-white"
        >
          <h2 className="font-primary text-4xl mb-4">PRÊT À COMMENCER ?</h2>
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Contactez-nous pour trouver le créneau adultes qui vous correspond.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
          >
            Nous contacter
          </Link>
        </motion.div>
      </Section>

      {loadError && (
        <p className="sr-only" role="alert">
          {loadError}
        </p>
      )}
    </>
  );
}
