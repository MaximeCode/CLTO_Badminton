import { motion } from 'motion/react';
import president from '../../imports/president.jpg'

export function PresidentQuote() {
  return (
    <section className="relative py-20 bg-[#0153b6] overflow-hidden">
      {/* Diagonal Top Edge */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 0, 100% 100%, 100% 0)' }} />

      {/* Diagonal Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />

      <div className="max-w-[1280px] mx-auto px-6 py-8">
        <div
          className="grid gap-12 items-center"
          style={{ gridTemplateColumns: '60% 40%' }}
        >
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
              <h3 className="text-white text-2xl md:text-3xl font-primary italic leading-relaxed">
                Bienvenue au CLTO Badminton !
              </h3>
              <p className="text-white text-lg md:text-xl font-primary italic leading-relaxed mt-4">
                Au cœur de la métropole orléanaise, le <strong>CLTO Badminton</strong> vous ouvre ses portes dans <strong>7 équipements sportifs</strong>, avec plus de <strong>60 heures de jeu par semaine</strong>, du <strong>lundi au dimanche</strong>.
              </p>
              <p className="text-white text-lg md:text-xl font-primary italic leading-relaxed mt-2">
                Que vous soyez <strong>débutant, joueur loisir ou compétiteur</strong>, <strong>jeune ou adulte</strong>, chacun trouve sa place au CLTO&nbsp;— <strong>vous êtes le cœur du club&nbsp;!</strong>
              </p>
              <p className="text-white text-lg md:text-xl font-primary italic leading-relaxed mt-2">
                Rejoignez-nous pour <strong>partager votre passion du badminton</strong>, <strong>rencontrer de nouveaux partenaires</strong>
                et <strong>vivre des moments sportifs inoubliables</strong>.
              </p>
              <p className="text-white text-lg md:text-xl font-primary italic leading-relaxed mt-2">
                <strong>À très bientôt au CLTO Badminton&nbsp;!</strong>
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
            className="relative flex justify-end"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 border-4 border-[#da9619] rotate-3" />
              <img
                src={president}
                alt="Président CLTO Badminton"
                className="relative w-full max-w-md rounded-lg object-cover aspect-[3/4]"
              />
            </div>
          </motion.div>
        </div>

      </div >
    </section >
  );
}
