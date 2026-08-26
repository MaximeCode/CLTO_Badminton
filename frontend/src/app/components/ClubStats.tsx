import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Users, Trophy, Clock, Target } from 'lucide-react';
import { getInterclubTeams } from '@/api/icbad_local/interclub';
import { getAdherentsCount } from '@/api/gestion/adherents';
import { getParametresGlobaux } from '@/api/strapi/parametre-globaux';
import { getAccueil } from '@/api/strapi/accueil';
import type { Accueil, LabelNomEtLogo, StatsClub } from '@/types/accueilType';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

export function ClubStats({
  initialTeamsCount,
  initialAdherentsCount,
  initialAccueil,
}: {
  initialTeamsCount?: string;
  initialAdherentsCount?: string;
  initialAccueil?: Accueil | null;
} = {}) {
  const [teamsCount, setTeamsCount] = useState<string>(initialTeamsCount ?? '…');
  const [adherentsCount, setAdherentsCount] = useState<string>(
    initialAdherentsCount ?? '…',
  );
  const [extraStats, setExtraStats] = useState<StatsClub[]>(initialAccueil?.stats_club ?? []);
  const [labels, setLabels] = useState<LabelNomEtLogo[]>(initialAccueil?.labels ?? []);

  useEffect(() => {
    if (initialTeamsCount != null) {
      setTeamsCount(initialTeamsCount);
      return;
    }
    getInterclubTeams()
      .then((teams) => setTeamsCount(String(teams.length)))
      .catch(() => setTeamsCount('-'));
  }, [initialTeamsCount]);

  useEffect(() => {
    if (initialAdherentsCount != null) {
      setAdherentsCount(initialAdherentsCount);
      return;
    }

    let cancelled = false;
    async function loadAdherentsCount() {
      try {
        const parametres = await getParametresGlobaux();
        const saisonId = parametres?.saison_id;
        if (saisonId == null) {
          throw new Error("L'identifiant de saison n'est pas configuré.");
        }
        const count = await getAdherentsCount(saisonId);
        if (!cancelled) setAdherentsCount(String(count));
      } catch {
        if (!cancelled) setAdherentsCount('-');
      }
    }

    loadAdherentsCount();
    return () => {
      cancelled = true;
    };
  }, [initialAdherentsCount]);

  useEffect(() => {
    if (initialAccueil !== undefined) {
      setExtraStats(initialAccueil?.stats_club ?? []);
      setLabels(initialAccueil?.labels ?? []);
      return;
    }
    getAccueil()
      .then((accueil) => {
        setExtraStats(accueil?.stats_club ?? []);
        setLabels(accueil?.labels ?? []);
      })
      .catch(() => {
        setExtraStats([]);
        setLabels([]);
      });
  }, [initialAccueil]);

  const stats = [
    {
      icon: Users,
      value: adherentsCount,
      label: 'Adhérents',
      description: 'Pour la saison 2026-2027',
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
        className="mb-6 md:mb-12"
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

            <div className="font-['Bebas_Neue'] text-5xl xl:text-6xl text-primary mb-2 text-center">
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
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {extraStats.map((stat, index) => (
              <motion.div
                key={`${stat.id}-${stat.desc}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.6875rem)] ${extraStats.length > 5 ? 'lg:w-[calc(25%-0.75rem)]' : ''} flex flex-col justify-center items-center rounded-xl border border-primary/10 bg-white/80 px-2 py-3 md:px-4 md:py-5 text-center shadow-sm hover:border-secondary/40 hover:shadow-md transition-all duration-200`}
              >
                <div className="font-['Bebas_Neue'] text-3xl md:text-4xl text-primary leading-none mb-2">
                  {stat.chiffre}
                </div>
                <div className="text-sm md:text-base text-secondary leading-snug">
                  {stat.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {labels.length > 0 && (
        <div className="mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HomePageSectionTitle title="Nos labels" />
          </motion.div>

          <div className="lg:w-5/6 mx-auto grid grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-4 md:gap-6">
            {labels.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.label}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-5 md:p-6 text-center shadow-sm hover:border-secondary/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary to-secondary" />

                <div className="flex items-center justify-center min-h-20 md:min-h-24 mb-4">
                  <img
                    src={item.logo.url}
                    alt={item.label}
                    width={item.logo.width ?? 160}
                    height={item.logo.height ?? 80}
                    className="max-h-16 md:max-h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <p className="text-sm md:text-base font-semibold text-primary leading-snug">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
