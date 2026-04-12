import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Trophy, Target, Users } from 'lucide-react';

const teams = [
  {
    name: 'Nationale 2',
    level: 'Élite',
    description: 'Notre équipe phare évoluant au plus haut niveau régional',
    players: 12,
    objective: 'Maintien et podium',
  },
  {
    name: 'Nationale 3',
    level: 'Excellence',
    description: 'Une équipe compétitive visant la montée',
    players: 10,
    objective: 'Montée en N2',
  },
  {
    name: 'Régionale 2',
    level: 'Confirmé',
    description: 'Joueurs confirmés avec un excellent esprit d\'équipe',
    players: 10,
    objective: 'Top 3 du championnat',
  },
  {
    name: 'Départementale 1 - A',
    level: 'Intermédiaire',
    description: 'Première équipe départementale',
    players: 8,
    objective: 'Accession en Régionale',
  },
  {
    name: 'Départementale 1 - B',
    level: 'Intermédiaire',
    description: 'Seconde équipe départementale',
    players: 8,
    objective: 'Maintien confortable',
  },
];

export function NosEquipesPage() {
  return (
    <>
      <PageHero
        title="NOS ÉQUIPES"
        subtitle="Découvrez toutes nos équipes engagées en compétition"
        image="https://images.unsplash.com/photo-1659081463572-4c5903a309e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0ZWFtJTIwZ3JvdXAlMjBwaG90b3xlbnwxfHx8fDE3NzU5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

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
              5 ÉQUIPES COMPÉTITIVES
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              De la Nationale 2 à la Départementale 1, nos équipes représentent le club avec fierté
            </p>
          </motion.div>

          <div className="space-y-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-[#0153b6] to-[#013d87] p-8 flex flex-col justify-center items-center text-white">
                    <div className="text-6xl mb-4">🏸</div>
                    <h3 className="font-['Bebas_Neue'] text-3xl mb-2 text-center">
                      {team.name}
                    </h3>
                    <span className="bg-[#da9619] px-4 py-1 rounded-full text-sm">
                      {team.level}
                    </span>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <p className="text-gray-600 mb-6">{team.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Users className="text-[#0153b6]" size={24} />
                        <div>
                          <div className="text-sm text-gray-500">Effectif</div>
                          <div className="font-bold text-gray-800">{team.players} joueurs</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <Target className="text-[#da9619]" size={24} />
                        <div>
                          <div className="text-sm text-gray-500">Objectif</div>
                          <div className="font-bold text-gray-800">{team.objective}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
            <Trophy className="mx-auto mb-6 text-[#da9619]" size={64} />
            <h2 className="font-['Bebas_Neue'] text-4xl text-[#0153b6] mb-4">
              REJOIGNEZ UNE ÉQUIPE
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Vous souhaitez jouer en compétition ? Contactez-nous pour intégrer l'une de nos équipes !
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