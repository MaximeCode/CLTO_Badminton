import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Dumbbell } from 'lucide-react';

const facilities = [
  {
    icon: MapPin,
    title: 'Gymnase Principal',
    description: '8 terrains de badminton de compétition avec un sol sportif adapté',
  },
  {
    icon: Users,
    title: 'Vestiaires',
    description: 'Vestiaires modernes et spacieux avec douches',
  },
  {
    icon: Dumbbell,
    title: 'Salle de Musculation',
    description: 'Équipements de préparation physique pour nos compétiteurs',
  },
  {
    icon: Clock,
    title: 'Créneaux Horaires',
    description: 'Plus de 25 heures de créneaux répartis sur toute la semaine',
  },
];

export function InfrastructuresPage() {
  return (
    <>
      <PageHero
        title="INFRASTRUCTURES"
        subtitle="Des équipements de qualité pour votre pratique"
        image="https://images.unsplash.com/photo-1582275053212-371003820068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBpbmZyYXN0cnVjdHVyZSUyMGZhY2lsaXR5fGVufDF8fHx8MTc3NTkyOTY5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
              NOS INSTALLATIONS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Le CLTO Badminton dispose d'installations modernes et adaptées à tous les niveaux de pratique
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <motion.div
                  key={facility.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#0153b6] text-white p-4 rounded-lg">
                      <Icon size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-2">
                        {facility.title}
                      </h3>
                      <p className="text-gray-600">{facility.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
            className="bg-white rounded-lg p-8 shadow-lg"
          >
            <h2 className="font-['Bebas_Neue'] text-4xl text-[#0153b6] mb-6">
              ADRESSE DU GYMNASE
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                <strong>Gymnase Municipal</strong><br />
                123 Avenue du Badminton<br />
                75000 Paris
              </p>
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Carte Google Maps</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}