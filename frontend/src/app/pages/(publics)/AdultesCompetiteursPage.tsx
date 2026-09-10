import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Target, Heart, Flame, Mountain, Trophy } from 'lucide-react';
import { Link } from 'react-router';
import { getPublicAdultesCompetiteurs } from '@/api/strapi/publics';
import type { PublicAdultesCompetiteurs } from '@/types/publicsType';
import { BlocksRenderer, listVariantFromTitle } from '@/app/components/BlocksRenderer';
import { Seo } from '@/app/components/Seo';

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
  const avantages = data?.les_avantages;
  const inscriptionChamp = data?.inscription_champ;
  const hasInscriptionChamp = Boolean(
    inscriptionChamp?.contenu && inscriptionChamp.contenu.length > 0,
  );

  return (
    <>
      <Seo
        title="Adultes compétiteurs"
        description={
          data?.description?.trim() ||
          'Badminton adultes compétiteurs au CLTO Badminton Orléans : du loisir à la compétition.'
        }
      />
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
                listVariant={listVariantFromTitle(data.envie_de_progresser.titre)}
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
                  <BlocksRenderer
                    content={carte.contenu}
                    headingOffset={3}
                    listVariant={listVariantFromTitle(carte.titre)}
                  />
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
                  <BlocksRenderer
                    content={item.contenu}
                    headingOffset={3}
                    listVariant={listVariantFromTitle(item.titre)}
                  />
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
              L&apos;adhésion au club vous donne accès à tous les créneaux jeu libre de la semaine.
              Les licenciés présents au club la saison dernière bénéficient de <strong>20&nbsp;€</strong> de
              réduction.<br />
              <span className="text-gray-600 text-sm italic">*Tarifs pour les catégories Perfectionnement & Élite</span>
            </p>
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-md">
              <div className="text-secondary text-5xl font-bold mb-2">
                {Number(data.prix_licence).toLocaleString('fr-FR')}€
              </div>
              <div className="text-gray-600 mb-2">par an (licence FFBaD incluse)</div>
              <p className="text-secondary text-sm font-semibold mb-6">
                Accès à tous les jeu libres
              </p>
              <Link
                to="/adherer"
                className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
              >
                S&apos;inscrire
              </Link>
            </div>

            {/* Branchement type organigramme vers options entraînements */}
            <div className="relative mx-auto max-w-3xl" aria-hidden>
              <div className="mx-auto h-8 w-0.5 bg-gray-300" />
              {/* Fourche desktop : barre + 2 descentes centrées sur chaque colonne */}
              <div className="relative mx-auto hidden h-8 md:block">
                <div className="absolute left-1/4 right-1/4 top-0 h-0.5 bg-gray-300" />
                <div className="absolute left-1/4 top-0 h-8 w-0.5 -translate-x-1/2 bg-gray-300" />
                <div className="absolute left-3/4 top-0 h-8 w-0.5 -translate-x-1/2 bg-gray-300" />
              </div>
            </div>

            <div className="mx-auto flex max-w-3xl flex-col gap-0 md:grid md:grid-cols-2 md:gap-8">
              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-secondary text-5xl font-bold mb-2">+120&nbsp;€</div>
                <div className="text-gray-600 mb-2">pour 1 entraînement, avec un entraîneur diplômé</div>
                <Link
                  to="/adherer"
                  className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
                >
                  S&apos;inscrire
                </Link>
              </div>

              {/* Trait vertical mobile entre les 2 options */}
              <div className="mx-auto h-6 w-0.5 bg-gray-300 md:hidden" aria-hidden />

              <div className="bg-white rounded-lg p-8 shadow-md">
                <div className="text-secondary text-5xl font-bold mb-2">+140&nbsp;€</div>
                <div className="text-gray-600 mb-2">pour 2 entraînements, avec un entraîneur diplômé</div>
                <Link
                  to="/adherer"
                  className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
                >
                  S&apos;inscrire
                </Link>
              </div>
            </div>
          </motion.div>
        </Section>
      )}

      {avantages?.contenu && avantages.contenu.length > 0 && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              {avantages.titre || 'LES AVANTAGES'}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-8 shadow-lg max-w-4xl mx-auto [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base"
          >
            <BlocksRenderer
              content={avantages.contenu}
              size="sm"
              sizeDesktop="lg"
              headingOffset={2}
              listVariant={listVariantFromTitle(avantages.titre)}
            />
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

      {hasInscriptionChamp && inscriptionChamp && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              S'INSCRIRE À UN CHAMPIONNAT
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 md:p-10 text-white shadow-lg w-full text-center"
          >
            <Trophy className="mx-auto mb-5" size={52} />
            <h3 className="font-primary text-3xl mb-4">{inscriptionChamp.titre}</h3>
            <BlocksRenderer
              content={inscriptionChamp.contenu}
              variant="onPrimary"
              size="base"
              headingOffset={3}
            />
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
          <h2 className="font-primary text-4xl mb-4">REJOIGNEZ-NOUS</h2>
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Rejoignez les créneaux Adultes Compétiteurs pour progresser, dans un esprit d&apos;équipe
            et de performance.
          </p>
          <Link
            to="/adherer"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
          >
            S&apos;inscrire
          </Link>
        </motion.div>
      </Section>

      {loadError && (
        <p className="px-6 pb-6 text-center text-red-600" role="alert">
          {loadError}
        </p>
      )}
    </>
  );
}
