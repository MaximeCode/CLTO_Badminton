import { PageHero } from '../../components/PageHero';
import { motion } from 'motion/react';
import {
  Trophy,
  Calendar,
  Users,
  BookOpen,
  Gift,
  ShoppingBag,
  Medal,
  CheckCircle,
  Info,
} from 'lucide-react';
import { Link } from 'react-router';

const gratuites = [
  { level: 'P10 / P11 / P12 / NC', avantage: '1 tournoi gratuit', color: 'bg-orange-100 text-orange-700' },
  { level: 'D9 / D8 / D7', avantage: '25 € de prise en charge', color: 'bg-green-100 text-green-700' },
  { level: 'R6 / R5', avantage: '50 € de prise en charge', color: 'bg-blue-50 text-blue-700' },
  { level: 'R4 / N3', avantage: '75 € de prise en charge', color: 'bg-indigo-100 text-indigo-700' },
  { level: 'N2', avantage: '100 € de prise en charge', color: 'bg-purple-100 text-purple-700' },
  { level: 'N1', avantage: '200 € de prise en charge', color: 'bg-red-100 text-red-700' },
];

const tutoriels = [
  {
    icon: BookOpen,
    title: 'Inscription aux tournois',
    description:
      'Découvrez pas à pas comment vous inscrire à un tournoi homologué : compte joueur, recherche de tournoi, choix des tableaux et validation de l\'inscription.',
  },
  {
    icon: Users,
    title: 'Fonctionnement du compte joueur',
    description:
      'Apprenez à gérer votre compte joueur BadStats : connexion, consultation du solde, utilisation des gratuités et suivi de votre classement.',
  },
];

const avantages = [
  'Championnats départemental et régional pris en charge intégralement par le club',
  'Volants en plumes fournis pendant tous les entraînements compétiteurs et créneaux jeu libre loisirs',
  'Gratuités tournois selon votre niveau (de 1 tournoi gratuit à 200 € de prise en charge)',
  'Accès aux créneaux compétiteurs encadrés par l\'entraîneur tout au long de la saison',
  'Covoiturage organisé avec les autres membres du club pour les déplacements en tournois',
  'Suivi individuel de la progression et conseils personnalisés de l\'entraîneur',
];

export function CompetiteursPage() {
  return (
    <>
      <PageHero
        title="ESPACE COMPÉTITEURS"
        subtitle="Saison 2025/2026 — Toutes les informations pour les entraînements, inscriptions aux tournois, championnats et avantages compétiteurs."
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      {/* Entraînements */}
      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Trophy size={20} />
                </div>
                <h3 className="font-primary text-2xl text-primary">Cours encadrés</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  Les cours encadrés sont validés par l'entraîneur. La participation régulière est indispensable pour progresser et bénéficier pleinement des avantages compétiteurs.
                </p>
                <p>
                  Le club fournit les volants en plumes pendant tous les entraînements et créneaux de jeu libre compétiteurs, <strong>hors vacances scolaires</strong>.
                </p>
                <p className="flex items-start gap-2">
                  <Info size={18} className="text-secondary shrink-0 mt-0.5" />
                  <span>
                    Attention : des changements ont eu lieu cette saison concernant les gymnases, les niveaux de groupes et les horaires. Consultez la page créneaux pour les informations à jour.
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to="/creneaux"
                  className="inline-flex items-center gap-2 text-secondary font-semibold hover:underline"
                >
                  <Calendar size={16} />
                  Voir tous les créneaux
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <h3 className="font-primary text-2xl text-primary">Organisation des séances</h3>
              </div>
              <div className="space-y-3 text-gray-700">
                <p>
                  Les séances compétiteurs sont organisées par niveaux afin de proposer un travail technique et tactique adapté à chaque joueur.
                </p>
                <p>
                  Des créneaux de jeu libre compétiteurs sont également disponibles pour compléter les entraînements encadrés et multiplier le temps de jeu.
                </p>
                <p>
                  En cas d'absence prévue, merci de prévenir l'entraîneur à l'avance par message ou par e-mail.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tournois & Inscriptions */}
      <section className="py-8 md:py-15 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
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

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-primary text-xl text-primary mb-3">Comment s'inscrire ?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                L'inscription aux tournois se fait via votre compte joueur. La procédure complète est détaillée dans le tutoriel dédié ci-dessous. En cas de question, contactez directement l'entraîneur.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-primary text-xl text-primary mb-3">Compte joueur</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Votre compte joueur vous permet de gérer vos inscriptions, de consulter votre solde de gratuités et de suivre votre classement en temps réel. Consultez le tutoriel pour tout savoir sur son fonctionnement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-primary text-xl text-primary mb-3">Organisation des tableaux</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Les tableaux Simple et Mixte se jouent généralement le <strong>samedi</strong>, les tableaux Double le <strong>dimanche</strong>. Le covoiturage entre compétiteurs du club est fortement encouragé.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gratuités */}
      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              GRATUITÉS SELON NIVEAU
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Le club prend en charge une partie de vos frais d'inscription aux tournois homologués selon votre niveau de classement.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {gratuites.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className={`rounded-lg p-6 shadow-md flex flex-col gap-2 ${item.color}`}
              >
                <div className="flex items-center gap-2">
                  <Medal size={20} className="shrink-0" />
                  <span className="font-primary text-lg font-bold">{item.level}</span>
                </div>
                <p className="text-sm font-semibold">{item.avantage}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm text-gray-500 flex items-center justify-center gap-2"
          >
            <Info size={16} />
            Les gratuités sont valables chaque saison, avec remise à zéro au début d'une nouvelle.
          </motion.p>
        </div>
      </section>

      {/* Championnats */}
      <section className="py-8 md:py-15 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
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
            className="bg-gradient-to-br from-primary to-primary-accent rounded-lg p-10 text-white shadow-lg max-w-3xl mx-auto text-center"
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
        </div>
      </section>

      {/* Tutoriels */}
      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
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
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tout ce que vous devez savoir pour gérer vos inscriptions et votre compte joueur.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tutoriels.map((tuto, index) => {
              const Icon = tuto.icon;
              return (
                <motion.div
                  key={tuto.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Icon size={30} />
                  </div>
                  <h3 className="font-primary text-2xl text-primary mb-3">{tuto.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{tuto.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Avantages compétiteurs */}
      <section className="py-8 md:py-15 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
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
                {avantages.map((avantage, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
                    <span>{avantage}</span>
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
                  Le club propose à ses adhérents compétiteurs des volants <strong>Forza S6000</strong> à tarif préférentiel. Ces volants de qualité sont idéaux pour l'entraînement et les tournois.
                </p>
                <div className="bg-secondary/10 rounded-lg p-4 mb-6">
                  <p className="text-secondary font-bold text-xl text-center">
                    Forza S6000 — <span className="text-2xl">26,50 €</span> / tube
                  </p>
                  <p className="text-gray-500 text-sm text-center mt-1">Tarif réservé aux adhérents CLTO</p>
                </div>
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
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
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
        </div>
      </section>
    </>
  );
}
