import { motion } from 'motion/react';
import president from '../../imports/president.jpg';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function PresidentQuote() {
  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-primary overflow-hidden">
      <div
        className="absolute -top-px left-0 right-0 h-8 sm:h-10 md:h-20 bg-white z-10 pointer-events-none"
        style={{ clipPath: 'polygon(-1% 0, 101% 100%, 101% 0)' }}
      />
      <div
        className="absolute -bottom-px left-0 right-0 h-8 sm:h-10 md:h-20 bg-white z-10 pointer-events-none"
        style={{ clipPath: 'polygon(-1% 100%, 101% 0, 101% 100%)' }}
      />

      <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,2fr)] gap-8 md:gap-14 lg:gap-18 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 md:order-1"
          >
            <div
              className="pointer-events-none absolute -top-2 -left-1 sm:-top-4 sm:-left-2 lg:-top-8 lg:-left-4 text-secondary font-serif leading-none opacity-50 select-none text-6xl sm:text-7xl md:text-8xl lg:text-[120px]"
              aria-hidden
            >
              "
            </div>
            <div className="relative pl-6 sm:pl-8">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-primary italic leading-snug sm:leading-relaxed">
                Bienvenue au CLTO Badminton !
              </h3>
              <div className="mt-4 space-y-3 sm:space-y-4">
                <p className="text-white text-xs sm:text-md md:text-lg font-primary italic leading-relaxed">
                  Au cœur de la métropole orléanaise, le <strong>CLTO Badminton</strong> vous ouvre ses portes dans <strong>7 équipements sportifs</strong>, avec plus de <strong>60 heures de jeu par semaine</strong>, du <strong>lundi au dimanche</strong>.
                </p>
                <p className="text-white text-xs sm:text-md md:text-lg font-primary italic leading-relaxed">
                  Que vous soyez <strong>débutant, joueur loisir ou compétiteur</strong>, <strong>jeune ou adulte</strong>, chacun trouve sa place au CLTO&nbsp;— <strong>vous êtes le cœur du club&nbsp;!</strong>
                </p>
                <p className="text-white text-xs sm:text-md md:text-lg font-primary italic leading-relaxed">
                  Rejoignez-nous pour <strong>partager votre passion du badminton</strong>, <strong>rencontrer de nouveaux partenaires</strong>
                  et <strong>vivre des moments sportifs inoubliables</strong>.
                </p>
                <p className="text-white text-xs sm:text-md md:text-lg font-primary italic leading-relaxed">
                  <strong>À très bientôt au CLTO Badminton&nbsp;!</strong>
                </p>
              </div>
              <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-white/30">
                <div className="text-white font-medium text-sm sm:text-base">Steve BANDOU-NIATOLL</div>
                <div className="text-secondary text-xs sm:text-sm font-bold">Président du CLTO Badminton</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-full mx-auto max-w-[150px] md:w-3/4 md:max-w-xs">
              <div className="absolute -inset-4 border-4 border-secondary rotate-3" />
              <ImageWithFallback
                src={president}
                alt="Steve Bandou-Niatoll, Président du CLTO Badminton"
                className="relative rounded-lg object-cover aspect-3/4"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
