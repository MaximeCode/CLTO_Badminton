import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Trophy, Calendar, Target, Users } from 'lucide-react';

const competitions = [
  {
    name: 'Interclubs',
    description: 'De la Nationale 2 à la Départementale 1 - 5 équipes engagées',
    period: 'Septembre - Avril',
  },
  {
    name: 'Tournois Homologués',
    description: 'Participation aux tournois du calendrier régional et national',
    period: 'Toute l\'année',
  },
  {
    name: 'Championnats Individuels',
    description: 'Championnats départementaux, régionaux et nationaux',
    period: 'Janvier - Mai',
  },
  {
    name: 'Tournoi Open du Club',
    description: 'Notre grand rendez-vous annuel ouvert à tous',
    period: 'Mars',
  },
];

const training = [
  {
    icon: Trophy,
    title: 'Entraînements compétition',
    description: 'Sessions spécifiques pour les joueurs en équipe',
    schedule: 'Mardi et Jeudi 20h-22h',
  },
  {
    icon: Target,
    title: 'Perfectionnement technique',
    description: 'Travail technique et tactique avec nos coachs',
    schedule: 'Mercredi 20h30-22h30',
  },
  {
    icon: Users,
    title: 'Préparation physique',
    description: 'Renforcement musculaire et cardio spécifique badminton',
    schedule: 'Vendredi 19h-20h',
  },
];

export function CompetitionsAdultesPage() {
  return (
    <>
      <PageHero
        title="COMPÉTITIONS ADULTES"
        subtitle="De la Départementale à la Nationale, rejoignez nos équipes"
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              Le CLTO Badminton vous offre de nombreuses opportunités de compétition
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
              ENTRAÎNEMENTS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des créneaux dédiés pour progresser et se préparer aux compétitions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {training.map((session, index) => {
              const Icon = session.icon;
              return (
                <motion.div
                  key={session.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="bg-[#0153b6] text-white w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-xl text-[#0153b6] mb-3">
                    {session.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{session.description}</p>
                  <div className="flex items-center gap-2 text-[#da9619]">
                    <Calendar size={16} />
                    <span className="text-sm font-semibold">{session.schedule}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0153b6] to-[#013d87] rounded-lg p-12 text-center shadow-lg text-white"
          >
            <Trophy className="mx-auto mb-6" size={64} />
            <h2 className="font-['Bebas_Neue'] text-4xl mb-4">
              REJOIGNEZ NOS ÉQUIPES
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Vous souhaitez jouer en interclubs ou participer à des tournois ?
              Contactez notre responsable compétition !
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