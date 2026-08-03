import { PageHero } from '../../components/PageHero';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Users, Clock, Award, Heart, Star } from 'lucide-react';
import { Link } from 'react-router';

const ageGroups = [
  {
    name: 'Babybad',
    description: 'Découverte ludique du badminton pour les plus jeunes',
    schedule: 'Vendredi 17h00-18h30',
  },
  {
    name: 'Minibad et EMIS',
    description: 'Minibad (-9 ans) et EMIS',
    schedule: 'Vendredi 17h00-18h30',
  },
  {
    name: 'Poussins et Benjamins',
    description: 'Poussins (9-11 ans) et Benjamins (11-13 ans)',
    schedule: 'Mercredi 16h30-18h00',
  },
  {
    name: 'Minimes et Cadets',
    description: 'Minimes (13-15 ans) et Cadets (15-17 ans)',
    schedule: 'Mercredi 18h00-19h30',
  },
];

const benefits = [
  {
    icon: Users,
    title: 'Encadrement qualifié',
    description: 'Nos entraîneurs diplômés accompagnent vos enfants dans leur progression',
  },
  {
    icon: Clock,
    title: 'Horaires adaptés',
    description: 'Des créneaux pensés pour s\'adapter aux emplois du temps scolaires',
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

export function JeunesPage() {
  return (
    <>
      <PageHero
        title="JEUNES LOISIRS"
        subtitle="L'apprentissage du badminton pour les jeunes de 6 à 14 ans"
        image="https://images.unsplash.com/photo-1642436978092-0f4b14112745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWRtaW50b258ZW58MXx8fHwxNzc1OTI5Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            NOS CATÉGORIES
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Des groupes adaptés à chaque âge pour une progression optimale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {ageGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-primary text-2xl text-white mb-3">
                {group.name}
              </h3>
              <p className="text-white/90 mb-4">{group.description}</p>
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-white/80" />
                <span className="bg-secondary inline-block px-3 py-1 rounded-full text-sm font-semibold">
                  {group.schedule}
                </span>
              </div>
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

      <Section className="bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
            JEUNES LOISIRS
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Fonctionnement, compétitions, avantages et informations utiles pour la saison <strong>2026/2027</strong>.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="font-primary text-3xl text-primary mb-4">Fonctionnement</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Chaque jeune bénéficie d&apos;un créneau encadré par semaine de 1h30, inclus dans le tarif de la
                licence.
              </p>
              <p>
                Pour les compétiteurs confirmés, les créneaux « Perfectionnement » et « Elite » sont accessibles sur
                demande des parents et avis des entraîneurs, avec un engagement à participer à au moins deux
                créneaux hebdomadaires et à cinq compétitions par saison.
              </p>
              <p>
                Les juniors sont orientés vers les créneaux adultes. Certains jeunes compétiteurs haut niveau peuvent
                aussi rejoindre des créneaux adultes sur accord du coordinateur.
              </p>
              <p>
                En complément, les jeunes peuvent participer aux créneaux de jeu libre du week-end, à condition
                d&apos;être accompagnés d&apos;un adulte responsable sur place.
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="font-primary text-3xl text-primary mb-4">Compétitions</h3>
            <p className="text-gray-700 mb-4">
              Les jeunes reçoivent régulièrement des informations par courriel pour s&apos;inscrire aux compétitions
              adaptées à leur niveau.
            </p>
            <ul className="space-y-2 text-gray-700 list-disc pl-6">
              <li>Plateau Minibad : rencontre départementale.</li>
              <li>Trophée Départemental Jeune (TDJ) : de NC à P10 ou de P10 à R6.</li>
              <li>Circuit Régional Jeune (CRJ) : pour compétiteurs aguerris.</li>
              <li>Circuit Elite Jeune (CEJ) : pour les joueurs sélectionnés lors des BAC.</li>
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="font-primary text-3xl text-primary mb-4">Les avantages club</h3>
            <ul className="space-y-2 text-gray-700 list-disc pl-6">
              <li>Les inscriptions aux compétitions sont gérées et payées par le club.</li>
              <li>Un t-shirt est offert à tous les jeunes qui participent à au moins une compétition.</li>
              <li>Des aides financières du club sont prévues et détaillées dans les documents dédiés.</li>
              <li>Les adhérents bénéficient aussi de réductions chez des partenaires équipementiers.</li>
            </ul>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h3 className="font-primary text-3xl text-primary mb-4">La commission jeunes</h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Elle réunit des bénévoles, des membres du Conseil d&apos;Administration, des parents et des jeunes
                cadets/juniors. Elle contribue aux décisions et à l&apos;organisation des événements jeunes.
              </p>
              <p>
                Des formations sont proposées (table de marque, juge de ligne, arbitrage, encadrement) et prises en
                charge par le club.
              </p>
              <p>
                Contact : <a className="text-primary hover:underline" href="mailto:commission.jeunes@cltobadminton.fr">commission.jeunes@cltobadminton.fr</a>
              </p>
            </div>
          </motion.article>
        </div>
      </Section>

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
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
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
    </>
  );
}