import { motion } from 'motion/react';

export function PresidentQuote() {
  return (
    <section className="relative py-20 bg-[#0153b6] overflow-hidden">
      {/* Diagonal Top Edge */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />
      
      {/* Diagonal Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="text-[#da9619] text-[120px] leading-none font-serif absolute -top-8 -left-4 opacity-50">
              "
            </div>
            <div className="relative pl-8">
              <p className="text-white text-2xl md:text-3xl font-['Bebas_Neue'] italic leading-relaxed">
                Au cœur de la métropole orléanaise, le CLTO Badminton vous ouvre ses portes dans l'équipement sportif, avec plus de 60 heures de jeu par semaine. Que vous soyez débutant, joueur loisir ou compétiteur, vous trouverez votre place au CLTO — venez faire du club votre seconde famille !
              </p>
              <div className="mt-6 pt-6 border-t border-white/30">
                <div className="text-white font-medium">Jean Dupont</div>
                <div className="text-[#da9619] text-sm">Président du CLTO Badminton</div>
              </div>
            </div>
          </motion.div>

          {/* President Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 border-4 border-[#da9619] rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1737574821698-862e77f044c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3Mjc3MTM5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Président CLTO Badminton"
                className="relative w-full max-w-md rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
