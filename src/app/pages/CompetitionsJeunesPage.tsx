import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Trophy, Calendar, Target, Award } from 'lucide-react';

const competitions = [
  {
    name: 'Championnat Départemental Jeunes',
    description: 'Compétition officielle par catégorie d\'âge',
    period: 'Octobre - Mai',
  },
  {
    name: 'Tournois Régionaux',
    description: 'Participation aux tournois du calendrier régional',
    period: 'Toute l\'année',
  },
  {
    name: 'Interclubs Jeunes',
    description: 'Rencontres par équipes entre clubs',
    period: 'Janvier - Avril',
  },
  {
    name: 'Tournoi Interne du Club',
    description: 'Compétition conviviale entre les jeunes du club',
    period: 'Juin',
  },
];

const features = [
  {
    icon: Trophy,
    title: 'Encadrement spécialisé',
    description: 'Des entraîneurs expérimentés pour accompagner les jeunes compétiteurs',
  },
  {
    icon: Calendar,
    title: 'Calendrier adapté',
    description: 'Un programme de compétitions progressif et adapté à chaque niveau',
  },
  {
    icon: Target,
    title: 'Objectifs personnalisés',
    description: 'Un suivi individualisé pour atteindre les objectifs de chacun',
  },
  {
    icon: Award,
    title: 'Esprit d\'équipe',
    description: 'L\'apprentissage des valeurs sportives et du dépassement de soi',
  },
];

export function CompetitionsJeunesPage() {
  return (
    <>
      <PageHero
        title="COMPÉTITIONS JEUNES"
        subtitle="Le haut niveau pour nos jeunes talents"
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
              NOS COMPÉTITIONS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Un programme complet pour permettre à nos jeunes de se mesurer et de progresser
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {competitions.map((competition, index) => (
              <motion.div
                key={competition.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-3">
                  {competition.name}
                </h3>
                <p className="text-gray-600 mb-4">{competition.description}</p>
                <div className="flex items-center gap-2 text-[#da9619]">
                  <Calendar size={20} />
                  <span className="font-semibold">{competition.period}</span>
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
              NOTRE APPROCHE
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
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
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
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
              INTÉGRER LE GROUPE COMPÉTITION
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Votre enfant souhaite se lancer en compétition ? Contactez notre responsable jeunes !
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