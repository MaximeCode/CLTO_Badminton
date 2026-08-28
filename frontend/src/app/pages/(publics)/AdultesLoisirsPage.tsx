import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import {
  Handshake,
  Users,
  Scale,
  Sparkles,
  Smile,
  Gift,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { getPublicAdultesLoisirs } from '@/api/strapi/publics';
import type { PublicAdultesLoisirs } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

const espritLoisirs = [
  {
    icon: Handshake,
    title: 'Fair-play',
    description: 'Respect des adversaires, des partenaires et des règles, sur et en dehors du terrain.',
  },
  {
    icon: Smile,
    title: 'Convivialité',
    description: 'Une ambiance détendue et amicale pour se retrouver autour du badminton.',
  },
  {
    icon: Users,
    title: 'Mixité des niveaux',
    description: 'Débutants et joueurs confirmés partagent les mêmes créneaux, dans l’entraide.',
  },
  {
    icon: Scale,
    title: 'Ouvert à toutes et à tous',
    description: 'Des créneaux ouverts à toutes et tous, pour jouer ensemble sans distinction.',
  },
  {
    icon: Sparkles,
    title: 'Plaisir de jouer',
    description: 'Le plaisir avant tout : pratiquer, bouger et partager un bon moment autour du badminton.',
  },
];

function cardsGridClass(count: number) {
  if (count <= 1) return 'max-w-4xl mx-auto';
  if (count === 2) return 'grid lg:grid-cols-2 gap-8';
  return 'grid md:grid-cols-2 lg:grid-cols-3 gap-8';
}

export function AdultesLoisirsPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.ADULTES_LOISIRS);

  const [data, setData] = useState<PublicAdultesLoisirs | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicAdultesLoisirs();
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
  const avantages = data?.les_avantages ?? [];

  return (
    <>
      <PageHero
        title={data?.titre || BANDEAU_PAGES.ADULTES_LOISIRS}
        subtitle={data?.description || 'Le badminton en toute convivialité'}
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
            L'ESPRIT DES CRÉNEAUX LOISIRS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {espritLoisirs.map((item, index) => {
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
              <BlocksRenderer content={data.envie_de_progresser.contenu} size="lg" headingOffset={1} />
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
              <div className="text-gray-600 mb-6">par an (licence FFBaD incluse)</div>
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
          className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-12 text-center shadow-lg text-white"
        >
          <h2 className="font-primary text-4xl mb-4">Pourquoi nous rejoindre ?</h2>
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Rejoignez les créneaux Adultes Loisirs pour jouer à votre rythme, dans une ambiance
            conviviale.
          </p>
          <Link
            to="/adherer"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
          >
            Adhérer
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
