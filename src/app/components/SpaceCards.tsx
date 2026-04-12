import { motion } from 'motion/react';
import { Users, Trophy, Heart, Target, Award } from 'lucide-react';

const spaces = [
  {
    title: 'ESPACE JEUNES',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#0153b6',
  },
  {
    title: 'ESPACE ADULTES',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1716041040048-228dbae7b6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZyUyMHByYWN0aWNlfGVufDF8fHx8MTc3Mjc5NjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#da9619',
  },
  {
    title: 'COMPÉTITION',
    icon: Trophy,
    image: 'https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBzbWFzaCUyMGp1bXB8ZW58MXx8fHwxNzcyNzk2MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#0153b6',
  },
  {
    title: 'LOISIR',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzI2ODI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#da9619',
  },
  {
    title: 'ARBITRAGE',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb21wZXRpdGlvbiUyMG1hdGNofGVufDF8fHx8MTc3Mjc5NjEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    color: '#0153b6',
  },
];

export function SpaceCards() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1 h-16 bg-[#da9619]" />
          <h2 className="font-['Bebas_Neue'] text-5xl text-[#0153b6] tracking-wide">
            NOS ESPACES
          </h2>
        </div>

        {/* Space Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {spaces.map((space, index) => {
            const Icon = space.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative rounded-lg overflow-hidden cursor-pointer aspect-[3/4]"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${space.image})` }}
                />
                
                {/* Overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all duration-300"
                  style={{ backgroundColor: `${space.color}00` }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white">
                  <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    className="mb-4"
                  >
                    <Icon size={32} strokeWidth={2} />
                  </motion.div>
                  
                  <h3 className="font-['Bebas_Neue'] text-2xl text-center mb-2 group-hover:scale-105 transition-transform duration-300">
                    {space.title}
                  </h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    Découvrir →
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
