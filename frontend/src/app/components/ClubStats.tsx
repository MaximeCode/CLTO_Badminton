import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Users, Trophy, Clock, Target } from 'lucide-react';
import { getInterclubTeams } from '@/api/icbad_local/interclub';
import { getAccueil } from '@/api/strapi/accueil';
import type { StatsClub } from '@/types/accueilType';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

export function ClubStats() {
  const [teamsCount, setTeamsCount] = useState<string>('…');
  const [extraStats, setExtraStats] = useState<StatsClub[]>([]);

  useEffect(() => {
    getInterclubTeams()
      .then((teams) => setTeamsCount(String(teams.length)))
      .catch(() => setTeamsCount('-'));
  }, []);

  useEffect(() => {
    getAccueil()
      .then((accueil) => setExtraStats(accueil?.stats_club ?? []))
      .catch(() => setExtraStats([]));
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
    <Section className="bg-linear-to-b from-white to-gray-50">
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
            className="group relative overflow-hidden bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-secondary"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-secondary" />

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-linear-to-br from-primary-accent to-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-white w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8" />
              </div>
            </div>

            <div className="font-primary text-5xl xl:text-6xl text-primary mb-2 text-center">
              {stat.value}
            </div>

            <div className="text-lg font-bold text-secondary uppercase tracking-wide text-center mb-1">
              {stat.label}
            </div>

            <div className="text-sm text-gray-600 text-center">
              {stat.description}
            </div>

            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.div>
        ))}
      </div>

      {extraStats.length > 0 && (
        <div className="mt-14 lg:w-5/6 mx-auto">
          <h3 className="font-primary text-3xl text-primary text-center mb-6">
            Mais aussi...
          </h3>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            {extraStats.map((stat, index) => (
              <motion.div
                key={`${stat.id}-${stat.desc}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="sm:w-sm rounded-xl border border-primary/10 bg-white/80 px-4 py-5 text-center shadow-sm hover:border-secondary/40 hover:shadow-md transition-all duration-200"
              >
                <div className="font-primary text-3xl md:text-4xl text-primary leading-none mb-2">
                  {stat.chiffre}
                </div>
                <div className="text-xs sm:text-sm text-secondary leading-snug">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
