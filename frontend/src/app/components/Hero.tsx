import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isInternalAppLink } from '../../utils/resolveAppLink';
import type { Media } from '@/types/baseType';
import { ResponsiveImage } from './ResponsiveImage';

const ctaClassName =
  'inline-block cursor-pointer bg-secondary text-white text-sm sm:text-base px-5 py-2.5 sm:px-8 sm:py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200';

const ctaMotionProps = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { delay: 0.5 },
} as const;

export type HeroSlide = {
  id: number;
  image: string;
  /** Média Strapi complet pour srcSet / dimensions (optionnel). */
  media?: Media | null;
  label: string;
  title: string;
  description: string;
  cta?: string;
  lien?: string;
};

type HeroProps<T extends HeroSlide = HeroSlide> = {
  slides?: T[];
  variant?: 'home' | 'interclub';
};

export function Hero<T extends HeroSlide = HeroSlide>({
  slides = [] as unknown as T[],
  variant = 'home',
}: HeroProps<T>) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const isInterclub = variant === 'interclub';
  const loaded = slides.length > 0;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!loaded || reduceMotion || slides.length <= 1) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [loaded, reduceMotion, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((curr) => (curr - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const slide = slides[currentSlide];

  const navButtonClass =
    'min-w-11 min-h-11 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center cursor-pointer';

  if (!loaded) {
    return (
      <section
        className={
          isInterclub
            ? 'relative h-[52vh] min-h-85 lg:h-[70vh] lg:min-h-0 overflow-hidden bg-gray-200 flex flex-row items-center justify-center gap-4'
            : 'relative h-[50vh] min-h-80 lg:h-[65vh] lg:min-h-0 overflow-hidden bg-gray-200 flex flex-row items-center justify-center gap-4'
        }
        aria-busy="true"
        aria-label="Chargement du carrousel"
      >
        <Loader2 className="w-10 h-10 animate-spin text-secondary" aria-hidden />
        <p className="text-primary">Chargement des slides...</p>
        <div
          className="absolute -bottom-px left-0 right-0 h-10 md:h-24 bg-white z-10 pointer-events-none"
          style={{ clipPath: 'polygon(-1% 100%, 101% 0, 101% 100%)' }}
          aria-hidden
        />
      </section>
    );
  }

  const isLcpSlide = currentSlide === 0;

  return (
    <section
      className={
        isInterclub
          ? 'relative h-[52vh] min-h-85 lg:h-[70vh] lg:min-h-0 overflow-hidden'
          : 'relative h-[50vh] min-h-80 lg:h-[65vh] lg:min-h-0 overflow-hidden'
      }
      aria-roledescription="carousel"
      aria-label={isInterclub ? 'Carrousel interclubs' : 'Carrousel principal'}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
          className="absolute inset-0"
          role="group"
          aria-roledescription="slide"
          aria-label={`Diapositive ${currentSlide + 1} sur ${slides.length}`}
        >
          {slide.image || slide.media?.url ? (
            <ResponsiveImage
              media={slide.media}
              src={slide.image || slide.media?.url}
              alt={
                slide.title
                  ? `${slide.title} — CLTO Badminton Orléans`
                  : 'CLTO Badminton Orléans, club de badminton à Orléans'
              }
              sizes="100vw"
              className={
                isInterclub
                  ? 'absolute inset-0 h-full w-full object-cover object-[center_25%] md:object-center'
                  : 'absolute inset-0 h-full w-full object-cover object-center'
              }
              loading={isLcpSlide ? 'eager' : 'lazy'}
              fetchpriority={isLcpSlide ? 'high' : 'low'}
              decoding={isLcpSlide ? 'sync' : 'async'}
            />
          ) : (
            <div className="absolute inset-0 bg-primary" aria-hidden />
          )}

          <div
            className={
              isInterclub
                ? 'absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-black/75 md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent'
                : 'absolute inset-0 bg-linear-to-b from-black/85 via-black/60 to-black/30 md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent'
            }
            aria-hidden
          />

          <div
            className={
              isInterclub
                ? 'relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-end md:items-center pt-16 pb-20 md:pt-0 md:pb-0'
                : 'relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center pt-16 pb-20 md:pt-0 md:pb-0'
            }
          >
            <div className="flex flex-col">
              <div
                className={
                  isInterclub
                    ? 'max-w-xl bg-black/45 rounded-md px-4 py-3 sm:px-5 sm:py-4 md:bg-transparent md:rounded-none md:p-0'
                    : 'max-w-2xl'
                }
              >
                <motion.div
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.2 }}
                  className={
                    isInterclub
                      ? 'text-secondary uppercase tracking-[0.16em] text-[11px] sm:text-sm mb-2 md:mb-4'
                      : 'text-secondary uppercase tracking-wider text-lg md:text-xl mb-3 md:mb-4'
                  }
                >
                  {slide.label}
                </motion.div>

                {isInterclub ? (
                  <motion.h2
                    initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 0.3 }}
                    className="font-primary text-4xl lg:text-5xl xl:text-7xl text-white leading-[1.15] mb-2 md:mb-4"
                  >
                    {slide.title}
                  </motion.h2>
                ) : (
                  <motion.h1
                    initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: reduceMotion ? 0 : 0.3 }}
                    className="font-primary text-4xl lg:text-5xl xl:text-7xl text-white leading-[1.15] mb-3 md:mb-4"
                  >
                    {slide.title}
                  </motion.h1>
                )}

                <motion.p
                  initial={reduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reduceMotion ? 0 : 0.4 }}
                  className={
                    isInterclub
                      ? 'text-white/90 text-xs sm:text-base md:text-lg max-w-xl'
                      : 'text-white/90 text-sm sm:text-base md:text-lg max-w-xl mb-6 md:mb-8'
                  }
                >
                  {slide.description}
                </motion.p>

                {slide.cta && slide.lien && (
                  isInternalAppLink(slide.lien) ? (
                    <motion.div {...ctaMotionProps} className="w-fit">
                      <Link to={slide.lien} className={ctaClassName}>
                        {slide.cta} →
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      {...ctaMotionProps}
                      className={ctaClassName}
                      href={slide.lien}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {slide.cta} →
                    </motion.a>
                  )
                )}
              </div>

              {slides.length > 1 && (
                <div className="mt-10 z-10 flex gap-1.5 sm:gap-2" role="tablist" aria-label="Indicateurs du carrousel">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      role="tab"
                      aria-label={`Afficher la diapositive ${index + 1}`}
                      aria-selected={index === currentSlide}
                      aria-current={index === currentSlide ? 'true' : undefined}
                      onClick={() => goToSlide(index)}
                      className="relative min-w-11 min-h-11 inline-flex items-center justify-center"
                    >
                      <span className="relative block w-9 sm:w-12 h-1 bg-white/30 overflow-hidden" aria-hidden>
                        {index === currentSlide && (
                          <span
                            className="absolute inset-0 bg-secondary"
                            style={{ width: `${progress}%` }}
                          />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div
        className={`absolute -bottom-px left-0 right-0 h-10 md:h-24 bg-${isInterclub ? 'gray-100' : 'white'} z-10 pointer-events-none`}
        style={{ clipPath: 'polygon(-1% 100%, 101% 0, 101% 100%)' }}
        aria-hidden
      />

      {isInterclub && slides.length > 1 && (
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-32 left-4 sm:left-6 md:left-12 z-10 flex flex-col gap-3">
          <div className="flex sm:hidden gap-3">
            <button type="button" onClick={prevSlide} className={navButtonClass} aria-label="Diapositive précédente">
              <ChevronLeft size={20} aria-hidden />
            </button>
            <button type="button" onClick={nextSlide} className={navButtonClass} aria-label="Diapositive suivante">
              <ChevronRight size={20} aria-hidden />
            </button>
          </div>
        </div>
      )}

      {slides.length > 1 && (
        <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-3 sm:gap-4">
          <button type="button" onClick={prevSlide} className={navButtonClass} aria-label="Diapositive précédente">
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" aria-hidden />
          </button>
          <button type="button" onClick={nextSlide} className={navButtonClass} aria-label="Diapositive suivante">
            <ChevronRight size={20} className="sm:w-6 sm:h-6" aria-hidden />
          </button>
        </div>
      )}
    </section>
  );
}
