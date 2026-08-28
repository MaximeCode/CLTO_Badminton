import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Clock, Users, Smile, ShieldCheck, Gift, CheckCircle } from 'lucide-react';
import { Link } from 'react-router';
import { getPublicVieillesPlumes } from '@/api/strapi/publics';
import type { PublicVieillesPlumes } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

const highlights = [
  {
    icon: Users,
    title: 'Groupe dédié',
    description: 'Des séances réservées aux vétérans dans une ambiance conviviale.',
  },
  {
    icon: Clock,
    title: 'Rythme libre',
    description: "Vous jouez à votre rythme, sans programme d'entraînement imposé.",
  },
  {
    icon: ShieldCheck,
    title: 'Pratique adaptée',
    description: 'Un cadre idéal pour continuer à jouer régulièrement et se faire plaisir.',
  },
  {
    icon: Smile,
    title: 'Esprit club',
    description: 'Partage, bonne humeur et plaisir de jeu restent les priorités.',
  },
];

function cardsGridClass(count: number) {
  if (count <= 1) return 'max-w-4xl mx-auto';
  if (count === 2) return 'grid lg:grid-cols-2 gap-8';
  return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
}

export function VieillesPlumesPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.VIEILLES_PLUMES);

  const [data, setData] = useState<PublicVieillesPlumes | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicVieillesPlumes();
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
  const formatSimple = data?.format_simple ?? [];

  return (
    <>
      <PageHero
        title={data?.titre || 'Le badminton pour les 60 ans et plus'}
        subtitle={
          data?.description ||
          'Des créneaux dédiés pour pratiquer le badminton en jeu libre, à son rythme et dans une ambiance conviviale.'
        }
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
            L'ESPACE VIEILLES PLUMES
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
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
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {formatSimple.length > 0 && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto rounded-lg p-8 shadow-lg"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-center">
              UN FORMAT SIMPLE
            </h2>
            <BlocksRenderer content={formatSimple} size='sm' sizeDesktop='base' headingOffset={1} />
          </motion.div>
        </Section>
      )}

      {tournois.length > 0 && (
        <Section className="bg-gray-50">
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
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <h3 className="font-primary text-2xl text-primary mb-4">{item.titre}</h3>
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

      <Section className="bg-linear-to-r from-primary to-primary-accent text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-primary text-4xl text-white mb-4">
            REJOIGNEZ-NOUS
          </h2>
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Envie de découvrir les créneaux Vieilles Plumes ? Contactez le club.
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
