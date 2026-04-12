import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Users, Clock, Award, Heart } from 'lucide-react';

const ageGroups = [
  {
    name: 'Mini-Bad (6-8 ans)',
    description: 'Découverte du badminton par le jeu et l\'amusement',
    schedule: 'Mercredi 14h-15h',
  },
  {
    name: 'Poussins (9-10 ans)',
    description: 'Apprentissage des bases techniques et tactiques',
    schedule: 'Mercredi 15h-16h30',
  },
  {
    name: 'Benjamins (11-12 ans)',
    description: 'Perfectionnement et initiation à la compétition',
    schedule: 'Mercredi 16h30-18h',
  },
  {
    name: 'Minimes (13-14 ans)',
    description: 'Développement de la technique et de la tactique',
    schedule: 'Vendredi 18h-19h30',
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

export function EcoleDeBadPage() {
  return (
    <>
      <PageHero
        title="ÉCOLE DE BAD"
        subtitle="L'apprentissage du badminton pour les jeunes de 6 à 14 ans"
        image="https://images.unsplash.com/photo-1642436978092-0f4b14112745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWRtaW50b258ZW58MXx8fHwxNzc1OTI5Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
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
                className="bg-gray-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-3">
                  {group.name}
                </h3>
                <p className="text-gray-600 mb-4">{group.description}</p>
                <div className="flex items-center gap-2 text-[#da9619]">
                  <Clock size={20} />
                  <span className="font-semibold">{group.schedule}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
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
                  <div className="bg-[#0153b6] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-xl text-[#0153b6] mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Bebas_Neue'] text-4xl text-[#0153b6] mb-4">
              INSCRIVEZ VOTRE ENFANT
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Les inscriptions sont ouvertes toute l'année. Deux séances d'essai gratuites !
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#da9619] text-white px-8 py-3 rounded-md hover:bg-[#c48515] transition-colors duration-200"
            >
              Nous contacter
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}