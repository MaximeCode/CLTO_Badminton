import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { MotPresident } from '@/types/motPresident';
import { BlocksRenderer } from './BlocksRenderer';

export function PresidentQuote({ motPresident }: { motPresident: MotPresident | null }) {
  if (!motPresident) {
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8 flex items-center justify-center min-h-48">
          <p className="text-white text-center text-base sm:text-lg font-medium max-w-2xl">
            Un discours ainsi que la photo du président du CLTO Badminton seront prochainement intégrés
          </p>
        </div>
      </section>
    );
  }

  const quotesClasses = "pointer-events-none absolute text-white/50 font-serif leading-none select-none text-5xl sm:text-6xl md:text-7xl";

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,2fr)] gap-8 md:gap-14 lg:gap-18 md:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-white text-2xl md:text-3xl font-primary italic leading-snug sm:leading-relaxed">
              Bienvenue au CLTO Badminton !
            </h2>

            <div className="relative mt-5 sm:mt-6">
              <span
                className={`${quotesClasses} -top-3 left-0`}
                aria-hidden
              >
                “
              </span>

              <div className="pl-5 sm:pl-8 pr-1 sm:pr-6">
                <BlocksRenderer
                  content={motPresident.discours ?? []}
                  variant="onPrimary"
                  size="sm"
                  headingOffset={2}
                />
              </div>

              <span
                className={`${quotesClasses} -bottom-7 right-0 lg:-bottom-15`}
                aria-hidden
              >
                ”
              </span>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/30">
              <div className="text-white font-medium text-sm sm:text-base">Steve BANDOU-NAITOLL</div>
              <div className="text-secondary text-xs sm:text-sm font-bold">Président du CLTO Badminton</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
          >
            <div className="relative w-full mx-auto max-w-35 sm:max-w-40 md:w-3/4 md:max-w-xs">
              <div className="absolute -inset-3 sm:-inset-4 border-3 sm:border-4 border-secondary rotate-2 sm:rotate-3" />
              <ImageWithFallback
                src={motPresident.portrait.url ?? ""}
                alt="Steve Bandou-Naitoll, Président du CLTO Badminton Orléans"
                className="relative rounded-lg object-cover aspect-3/4"
                width={motPresident.portrait.width ?? 400}
                height={motPresident.portrait.height ?? 533}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
