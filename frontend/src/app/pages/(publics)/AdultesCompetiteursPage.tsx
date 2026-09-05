import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Target, Heart, Flame, Mountain } from 'lucide-react';
import { Link } from 'react-router';
import { getPublicAdultesCompetiteurs } from '@/api/strapi/publics';
import type { PublicAdultesCompetiteurs } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

const espritCompetiteurs = [
  {
    icon: Target,
    title: 'Progression',
    description:
      'Des entraînements structurés pour développer la technique, les déplacements et la tactique.',
  },
  {
    icon: Flame,
    title: 'Engagement',
    description: 'Une pratique régulière pour progresser et atteindre ses objectifs.',
  },
  {
    icon: Users,
    title: "Esprit d'équipe",
    description:
      "Des entraînements et des compétitions vécus ensemble, dans un esprit d'entraide et de solidarité.",
  },
  {
    icon: Mountain,
    title: 'Dépassement de soi',
    description:
      'Des objectifs adaptés à chacun, du premier tournoi jusqu’aux compétitions de plus haut niveau.',
  },
  {
    icon: Heart,
    title: 'Convivialité',
    description:
      'La compétition et la performance sans perdre l’esprit convivial du CLTO Badminton.',
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

  const vieDuClub = data?.vie_du_club ?? [];
  const tournois = data?.tournois_competitions ?? [];

  return (
    <>
      <PageHero
        title={data?.titre || BANDEAU_PAGES.ADULTES_COMPETITEURS}
        subtitle={
          data?.description ||
          'Du loisir à la compétition, pratiquez le badminton à votre rythme'
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
            L&apos;ESPRIT DES CRÉNEAUX COMPÉTITEURS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {espritCompetiteurs.map((item, index) => {
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
                <h3 className="font-primary text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {data?.envie_de_progresser && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-center">
              {data.envie_de_progresser.titre}
            </h2>
            <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
              <BlocksRenderer
                content={data.envie_de_progresser.contenu}
                size="lg"
                headingOffset={1}
              />
            </div>
          </motion.div>
        </Section>
      )}

      {vieDuClub.length > 0 && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              Pourquoi choisir le CLTO ?
            </h2>
          </motion.div>

          <div className={cardsGridClass(vieDuClub.length)}>
            {vieDuClub.map((carte, index) => (
              <motion.article
                key={carte.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <h3 className="font-primary text-2xl text-primary mb-4">{carte.titre}</h3>
                <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                  <BlocksRenderer content={carte.contenu} headingOffset={3} />
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

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

      {data?.prix_licence != null && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 text-center"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">TARIFS</h2>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              L&apos;adhésion au club vous donne accès à tous les créneaux loisir de la semaine.
              Les licenciés présents au club la saison dernière peuvent bénéficier de 20&nbsp;€ de
              réduction.
            </p>
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-md">
              <div className="text-secondary text-5xl font-bold mb-2">
                {Number(data.prix_licence).toLocaleString('fr-FR')}€
              </div>
              <div className="text-gray-600 mb-2">par an (licence FFBaD incluse)</div>
              <p className="text-secondary text-sm font-semibold mb-6">
                Prix pour 1 entraînement. Pour 2 entraînements : +20&nbsp;€.
              </p>
              <Link
                to="/adherer"
                className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
              >
                S&apos;inscrire
              </Link>
            </div>
          </motion.div>
        </Section>
      )}

      <Section className="bg-white">
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

        <div className="grid md:grid-cols-3 gap-8">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} />
                </div>
                <h3 className="font-primary text-xl text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {loadError && (
        <p className="sr-only" role="alert">
          {loadError}
        </p>
      )}
    </>
  );
}
