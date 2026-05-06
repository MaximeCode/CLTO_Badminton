import { motion } from 'motion/react';
import { Users, Trophy, Clock, Target } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '+400',
    label: 'Adhérents',
    description: 'Membres actifs au club',
  },
  {
    icon: Trophy,
    value: '12',
    label: 'Équipes',
    description: 'En compétition',
  },
  {
    icon: Clock,
    value: '35h',
    label: 'Créneaux',
    description: 'Par semaine',
  },
  {
    icon: Target,
    value: '6',
    label: 'Gymnases',
    description: 'À disposition',
  },
];

export function ClubStats() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
            LE CLUB EN CHIFFRES
          </h2>
          <p className="text-gray-600 text-lg">
            Des chiffres qui témoignent de notre dynamisme
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#da9619]"
            >
              {/* Decorative gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0153b6] to-[#da9619] rounded-t-2xl" />

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0153b6] to-[#0a69d1] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="text-white" size={32} />
                </div>
              </div>

              {/* Value */}
              <div className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-2 text-center">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-lg font-bold text-[#da9619] uppercase tracking-wide text-center mb-1">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-sm text-gray-600 text-center">
                {stat.description}
              </div>

              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0153b6]/5 to-[#da9619]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
