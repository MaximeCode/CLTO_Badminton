import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Users, Trophy, Clock, Target } from 'lucide-react';
import { getInterclubTeams } from '@/api/icbad_local/interclub';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

export function ClubStats() {
  const [teamsCount, setTeamsCount] = useState<string>('…');

  useEffect(() => {
    getInterclubTeams()
      .then((teams) => setTeamsCount(String(teams.length)))
      .catch(() => setTeamsCount('-'));
  }, []);

  const stats = [
    {
      icon: Users,
      value: '+400',
      label: 'Adhérents',
      description: 'Membres au club',
    },
    {
      icon: Trophy,
      value: teamsCount,
      label: 'Équipes',
      description: 'En interclubs',
    },
    {
      icon: Clock,
      value: '57h',
      label: 'Créneaux',
      description: 'Par semaine',
    },
    {
      icon: Target,
      value: '5',
      label: 'Gymnases',
      description: 'À disposition',
    },
  ];

  return (
    <Section className="bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <HomePageSectionTitle
          title="LE CLUB EN CHIFFRES"
          subtitle="Des chiffres qui témoignent de notre dynamisme"
        />

      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:w-5/6 mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#da9619]"
          >
            {/* Decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0153b6] to-[#da9619]" />

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-[#0153b6] to-[#0a69d1] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-white w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
              </div>
            </div>

            {/* Value */}
            <div className="font-['Bebas_Neue'] text-5xl xl:text-6xl text-[#0153b6] mb-2 text-center">
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
    </Section>
  );
}
