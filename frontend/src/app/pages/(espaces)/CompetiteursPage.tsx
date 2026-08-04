import { useEffect, useState } from 'react';
import { PageHero } from '../../components/PageHero';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import {
  Trophy,
  Calendar,
  BookOpen,
  Gift,
  ShoppingBag,
  CheckCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { getPublicsJeunesCompetiteurs } from '@/api/strapi/publics';
import type { PublicJeunesCompetiteurs } from '@/types/publicsType';
import { BlocksRenderer } from '@/app/components/BlocksRenderer';

export function CompetiteursPage() {
  const [data, setData] = useState<PublicJeunesCompetiteurs | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const result = await getPublicsJeunesCompetiteurs();
        console.log('getPublicsJeunesCompetiteurs:', result);
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

  return (
    <>
      <PageHero
        title="JEUNES COMPÉTITEURS"
        subtitle="Saison 2026/2027 — Toutes les informations pour les entraînements, inscriptions aux tournois, championnats et avantages compétiteurs."
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      {/* Entraînements */}
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

        <div className="grid lg:grid-cols-2 gap-8">
          {data?.entrainements.map((entrainement, index) => (
            <motion.div
              key={entrainement.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-primary text-2xl text-primary">{entrainement.titre}</h3>
              </div>
              <div className="space-y-3 text-gray-700 [&_a]:text-secondary [&_p]:mb-2 [&_strong]:font-semibold">
                <BlocksRenderer content={entrainement.contenu} />
              </div>
              {/* {index === 0 && (
                <div className="mt-4">
                  <Link
                    to="/creneaux"
                    className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
                  >
                    <Calendar size={16} />
                    Voir tous les créneaux
                  </Link>
                </div>
              )} */}
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Tournois & Inscriptions */}
      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            TOURNOIS & INSCRIPTIONS
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {data?.tournois_competitions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 max-w-lg mx-auto w-full"
            >
              <h3 className="font-primary text-2xl text-primary mb-3">{item.titre}</h3>
              {item.sous_titre && (
                <p className="text-gray-500 text-sm mb-2">{item.sous_titre}</p>
              )}
              <div className="text-gray-600 leading-relaxed [&_a]:text-secondary [&_p]:mb-2">
                <BlocksRenderer content={item.contenu} size="sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Championnats */}
      <Section className="bg-gray-50">
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
            Les volants en plumes sont fournis par le club pour ces compétitions. Aucune dépense supplémentaire n'est à prévoir de votre côté.
          </p>
        </motion.div>
      </Section>

      {/* Tutoriels */}
      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            TUTORIELS
          </h2>
          <p className="text-gray-600 text-lg">
            Tout ce que vous devez savoir pour gérer vos inscriptions.
          </p>
        </motion.div>

        {data?.tutoriels.map((tuto, index) => (
          <motion.div
            key={tuto.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center max-w-lg mx-auto"
          >
            <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
              <BookOpen size={30} />
            </div>
            <h3 className="font-primary text-2xl text-primary mb-3">{tuto.titre}</h3>
            {tuto.sous_titre && (
              <p className="text-gray-500 text-sm mb-2">{tuto.sous_titre}</p>
            )}
            <div className="text-gray-600 leading-relaxed [&_a]:text-secondary [&_p]:mb-2">
              <BlocksRenderer content={tuto.contenu} size="sm" />
            </div>
          </motion.div>
        ))}
      </Section>

      {/* Avantages compétiteurs */}
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

        <div className="grid lg:grid-cols-2 gap-8">
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
              {data?.les_avantages.map((avantage) => (
                <li key={avantage.id} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
                  <span>{avantage.contenu}</span>
                </li>
              ))}
            </ul>
          </motion.div>

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
              {data?.prix_volants.map((item) => (
                <div key={item.id} className="bg-secondary/10 rounded-lg p-4 mb-4">
                  <p className="text-secondary font-bold text-xl text-center">
                    {item.volants} —{' '}
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
              href="https://www.helloasso.com/associations/clto-badminton/boutiques/commandes-groupees"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200 text-center"
            >
              Visiter la boutique
            </a>
          </motion.div>
        </div>
      </Section>

      {/* CTA Contact */}
      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
        >
          <Trophy className="mx-auto mb-6" size={64} />
          <h2 className="font-primary text-4xl mb-4">DES QUESTIONS ?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Pour toute question sur l'espace compétiteurs, les inscriptions aux tournois ou les championnats, notre équipe est à votre disposition.
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
