import { motion } from 'motion/react';
import { Users, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';

const spaces = [
  {
    title: 'ESPACE JEUNES',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'primary' as const,
    link: '/jeunes',
  },
  {
    title: 'ESPACE ADULTES',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1716041040048-228dbae7b6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZyUyMHByYWN0aWNlfGVufDF8fHx8MTc3Mjc5NjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'secondary' as const,
    link: '/adultes',
  },
  {
    title: 'COMPÉTITION',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBzbWFzaCUyMGp1bXB8ZW58MXx8fHwxNzcyNzk2MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'primary' as const,
    link: '/competition',
  },
  {
    title: 'LOISIR',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzI2ODI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'secondary' as const,
    link: '/loisir',
  },
  {
    title: 'VÉTÉRANS',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb21wZXRpdGlvbiUyMG1hdGNofGVufDF8fHx8MTc3Mjc5NjEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: 'primary' as const,
    link: '/veterans',
  },
];

const overlayClasses = {
  primary: 'from-primary/90 via-primary/50',
  secondary: 'from-secondary/90 via-secondary/50',
} as const;

type Space = (typeof spaces)[number];

function SpaceCard({ space }: { space: Space }) {
  const Icon = space.icon;

  return (
    <div className="group relative h-full max-h-[300px] rounded-lg overflow-hidden cursor-pointer aspect-[3/4]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${space.image})` }}
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t ${overlayClasses[space.color]} to-transparent group-hover:opacity-95 transition-opacity duration-300`}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 text-white">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="mb-2 sm:mb-4"
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
        </motion.div>

        <h3 className="font-primary text-lg sm:text-xl md:text-2xl text-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300 leading-tight">
          {space.title}
        </h3>
      </div>
    </div>
  );
}

export function SpaceCards() {
  return (
    <section className="py-8 md:py-15 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <HomePageSectionTitle title="NOS ESPACES" />

        <div className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-4 scrollbar-styled">
          {spaces.map((space, index) => (
            <Link
              key={space.link}
              to={space.link}
              className="shrink-0 w-48 sm:w-56"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <SpaceCard space={space} />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
