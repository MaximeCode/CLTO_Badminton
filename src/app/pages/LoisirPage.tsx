import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Clock, Users, Heart, Smile } from 'lucide-react';

const sessions = [
  {
    day: 'Lundi',
    time: '20h - 22h',
    level: 'Tous niveaux',
  },
  {
    day: 'Mercredi',
    time: '18h30 - 20h30',
    level: 'Débutants',
  },
  {
    day: 'Vendredi',
    time: '19h30 - 22h',
    level: 'Tous niveaux',
  },
  {
    day: 'Samedi',
    time: '14h - 17h',
    level: 'Loisir avancé',
  },
];

const benefits = [
  {
    icon: Heart,
    title: 'Convivialité',
    description: 'Une ambiance détendue et amicale pour le plaisir de jouer',
  },
  {
    icon: Users,
    title: 'Tous niveaux',
    description: 'Des créneaux adaptés aux débutants comme aux joueurs confirmés',
  },
  {
    icon: Clock,
    title: 'Horaires flexibles',
    description: 'Plusieurs créneaux dans la semaine pour s\'adapter à vos contraintes',
  },
  {
    icon: Smile,
    title: 'Sans pression',
    description: 'Jouez à votre rythme sans objectif de compétition',
  },
];

export function LoisirPage() {
  return (
    <>
      <PageHero
        title="LOISIR"
        subtitle="Le badminton pour le plaisir et la convivialité"
        image="https://images.unsplash.com/photo-1765118384650-7660293e74f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBsZWlzdXJlJTIwcmVjcmVhdGlvbmFsJTIwcGxheXxlbnwxfHx8fDE3NzU5Mjk2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              NOS CRÉNEAUX LOISIR
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choisissez le créneau qui vous convient et venez jouer dans la bonne humeur !
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session, index) => (
              <motion.div
                key={`${session.day}-${session.time}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#0153b6] to-[#013d87] rounded-lg p-6 shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="font-['Bebas_Neue'] text-3xl mb-4">{session.day}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={20} />
                  <span className="text-lg">{session.time}</span>
                </div>
                <div className="bg-[#da9619] inline-block px-3 py-1 rounded-full text-sm">
                  {session.level}
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
              POURQUOI CHOISIR LE LOISIR ?
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
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 rounded-lg p-12 text-center shadow-lg"
          >
            <h2 className="font-['Bebas_Neue'] text-4xl text-[#0153b6] mb-4">
              TARIFS ATTRACTIFS
            </h2>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              L'adhésion au club vous donne accès à tous les créneaux loisir de la semaine
            </p>
            <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-md">
              <div className="text-[#da9619] text-5xl font-bold mb-2">180€</div>
              <div className="text-gray-600 mb-6">par an (licence FFBaD incluse)</div>
              <a
                href="/contact"
                className="inline-block bg-[#da9619] text-white px-8 py-3 rounded-md hover:bg-[#c48515] transition-colors duration-200"
              >
                S'inscrire
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}