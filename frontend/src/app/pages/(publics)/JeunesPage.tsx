import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import {
  Users,
  Clock,
  Award,
  Heart,
  Star,
  Trophy,
  Gift,
  ShoppingBag,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { getPublicJeunes } from '@/api/strapi/publics';
import type { PublicJeunes } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

const benefits = [
  {
    icon: Users,
    title: 'Encadrement qualifié',
    description: 'Nos entraîneurs diplômés accompagnent vos enfants dans leur progression',
  },
  {
    icon: Clock,
    title: 'Horaires adaptés',
    description: "Des créneaux pensés pour s'adapter aux emplois du temps scolaires",
  },
  {
    icon: Award,
    title: 'Passage de plumes',
    description: 'Un système de progression motivant avec les plumes FFBaD',
  },
  {
    icon: Heart,
    title: 'Esprit convivial',
    description: 'Une ambiance familiale où le plaisir est au cœur de la pratique',
  },
];

function cardsGridClass(count: number) {
  if (count == 1) return 'max-w-4xl mx-auto';
  return 'grid lg:grid-cols-2 gap-8';
}

export function JeunesPage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.JEUNES);

  const [data, setData] = useState<PublicJeunes | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicJeunes();
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

  const informations = data?.informations ?? [];
  const entrainements = data?.entrainements ?? [];
  const tournois = data?.tournois_competitions ?? [];
  const avantages = data?.les_avantages ?? [];
  const prixVolants = data?.prix_volants ?? [];

  return (
    <>
      <PageHero
        title={data?.titre || BANDEAU_PAGES.JEUNES}
        subtitle={data?.description || "L'apprentissage et la compétition pour les jeunes, du loisir à la performance"}
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
            POURQUOI NOUS REJOINDRE ?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
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
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {informations.length > 0 && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              INFORMATIONS
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Fonctionnement et informations utiles pour la saison <strong>2026/2027</strong>.
            </p>
          </motion.div>

          <div className={cardsGridClass(informations.length)}>
            {informations.map((carteInfo) => (
              <motion.article
                key={carteInfo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-8 shadow-lg"
              >
                <h3 className="font-primary text-3xl text-primary mb-4">{carteInfo.titre}</h3>
                <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                  <BlocksRenderer content={carteInfo.contenu} />
                </div>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {entrainements.length > 0 && (
        <Section className="bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              ENTRAÎNEMENTS
            </h2>
          </motion.div>

          <div className={cardsGridClass(entrainements.length)}>
            {entrainements.map((entrainement, index) => (
              <motion.div
                key={entrainement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-primary text-2xl text-primary mb-4">{entrainement.titre}</h3>
                <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                  <BlocksRenderer content={entrainement.contenu} />
                </div>
              </motion.div>
            ))}
          </div>
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
                <h3 className="font-primary text-2xl text-primary mb-2">{item.titre}</h3>
                {item.sous_titre && (
                  <p className="text-secondary font-semibold mb-4">{item.sous_titre}</p>
                )}
                <div className="space-y-4 text-gray-700 [&_a]:text-secondary [&_li]:text-sm [&_li]:text-primary-accent [&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_li]:text-base sm:[&_p]:text-base">
                  <BlocksRenderer content={item.contenu} />
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}

      <Section className="bg-linear-to-r from-primary to-primary-accent text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <span className="text-secondary font-semibold">Reconnaissance FFBAD</span>
          </div>
          <h2 className="font-primary text-5xl md:text-6xl mb-6">
            ÉCOLE 4 ÉTOILES
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            {[1, 2, 3, 4].map((star) => (
              <Star key={star} size={48} fill="#da9619" className="text-secondary" />
            ))}
            <Star size={48} className="text-white/30" />
          </div>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-4">
            Notre école de badminton est labellisée <strong>4 étoiles</strong> par la Fédération Française de Badminton (FFBAD)
          </p>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Cette reconnaissance témoigne de la qualité de notre enseignement, de nos infrastructures et de notre encadrement. Notre objectif : décrocher la 5ème étoile l'année prochaine !
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-primary text-secondary mb-2">Excellence</div>
              <p className="text-sm text-white/90">Formation de qualité reconnue</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-primary text-secondary mb-2">Encadrement</div>
              <p className="text-sm text-white/90">Entraîneurs diplômés FFBAD</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-primary text-secondary mb-2">Progression</div>
              <p className="text-sm text-white/90">Objectif 5ème étoile en 2027</p>
            </div>
          </div>
        </motion.div>
      </Section>

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
          <h3 className="font-primary text-3xl mb-4">Championnats offerts par le club</h3>
          <p className="text-white/90 leading-relaxed mb-4">
            Le championnat départemental individuel et le championnat régional individuel sont <strong>intégralement pris en charge</strong> par le CLTO Badminton pour tous les compétiteurs inscrits.
          </p>
          <p className="text-white/90 leading-relaxed">
            Les volants sont fournis par le club pour ces compétitions. Aucune dépense supplémentaire n'est à prévoir de votre côté.
          </p>
        </motion.div>
      </Section>

      {(avantages.length > 0 || prixVolants.length > 0) && (
        <Section className="bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              AVANTAGES COMPÉTITEURS
            </h2>
          </motion.div>

          <div className={`grid gap-8 ${avantages.length > 0 && prixVolants.length > 0 ? 'lg:grid-cols-2' : ''}`}>
            {avantages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-8 shadow-lg"
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
            )}

            {prixVolants.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-lg p-8 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-primary text-2xl text-primary mb-5 flex items-center gap-2">
                    <ShoppingBag size={24} className="text-secondary" />
                    Vente de volants
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Le club propose à ses adhérents compétiteurs des volants à tarif préférentiel. Ces volants de qualité sont idéaux pour l'entraînement et les tournois.
                  </p>
                  {prixVolants.map((item) => (
                    <div key={item.id} className="bg-secondary/10 rounded-lg p-4 mb-4">
                      <p className="text-secondary font-bold text-xl text-center">
                        {item.volants} -{' '}
                        <span className="text-2xl">
                          {Number(item.prix).toLocaleString('fr-FR', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          €
                        </span>{' '}
                        / tube
                      </p>
                      <p className="text-gray-500 text-sm text-center mt-1">
                        Tarif réservé aux adhérents CLTO
                      </p>
                    </div>
                  ))}
                </div>
                <a
                  href={`${import.meta.env.VITE_HELLOASSO_URL}/boutiques/commandes-groupees`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200 text-center"
                >
                  Visiter la boutique
                </a>
              </motion.div>
            )}
          </div>
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
            INSCRIVEZ VOTRE ENFANT
          </h2>
          <p className="text-white/90 text-md mb-8 max-w-2xl mx-auto">
            Les inscriptions sont ouvertes toute l'année. Deux séances d'essai gratuites !
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
