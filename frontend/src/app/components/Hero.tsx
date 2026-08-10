import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { isInternalAppLink } from '../../utils/resolveAppLink';

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

  const isInterclub = variant === 'interclub';

  const loaded = slides.length > 0;

  useEffect(() => {
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
  }, [slides.length]);

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
    'w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center cursor-pointer';

  if (!loaded) {
    return (
      <section
        className={
          isInterclub
            ? 'relative h-[52vh] min-h-85 lg:h-[70vh] lg:min-h-0 overflow-hidden bg-gray-200 flex flex-row items-center justify-center gap-4'
            : 'relative h-[50vh] min-h-80 lg:h-[65vh] lg:min-h-0 overflow-hidden bg-gray-200 flex flex-row items-center justify-center gap-4'
        }
      >
        {/* Loader2 icon */}
        <Loader2 className="w-10 h-10 animate-spin text-secondary" />
        <p className="text-primary">Chargement des slides...</p>
        {/* Diagonal edge - outside AnimatePresence to avoid gap on slide change */}
        <div
          className="absolute -bottom-px left-0 right-0 h-10 md:h-24 bg-white z-10 pointer-events-none"
          style={{ clipPath: 'polygon(-1% 100%, 101% 0, 101% 100%)' }}
        />
      </section>
    );
  }

  return (
    <section
      className={
        isInterclub
          ? 'relative h-[52vh] min-h-85 lg:h-[70vh] lg:min-h-0 overflow-hidden'
          : 'relative h-[50vh] min-h-80 lg:h-[65vh] lg:min-h-0 overflow-hidden'
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className={
              isInterclub
                ? 'absolute inset-0 bg-cover bg-position-[center_25%] md:bg-center'
                : 'absolute inset-0 bg-cover bg-center'
            }
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          <div
            className={
              isInterclub
                ? 'absolute inset-0 bg-linear-to-b from-black/45 via-black/20 to-black/75 md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent'
                : 'absolute inset-0 bg-linear-to-b from-black/85 via-black/60 to-black/30 md:bg-linear-to-r md:from-black/80 md:via-black/50 md:to-transparent'
            }
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
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={
                    isInterclub
                      ? 'text-secondary uppercase tracking-[0.16em] text-[11px] sm:text-sm mb-2 md:mb-4'
                      : 'text-secondary uppercase tracking-wider text-lg md:text-xl mb-3 md:mb-4'
                  }
                >
                  {slide.label}
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className={
                    isInterclub
                      ? 'font-primary text-4xl lg:text-5xl xl:text-7xl text-white leading-[1.15] mb-2 md:mb-4'
                      : 'font-primary text-4xl lg:text-5xl xl:text-7xl text-white leading-[1.15] mb-3 md:mb-4'
                  }
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
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

              <div className="mt-10 z-10 flex gap-1.5 sm:gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="relative w-9 sm:w-12 h-1 bg-white/30 overflow-hidden"
                  >
                    {index === currentSlide && (
                      <div
                        className="absolute inset-0 bg-secondary"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Diagonal edge - outside AnimatePresence to avoid gap on slide change */}
      <div
        className={`absolute -bottom-px left-0 right-0 h-10 md:h-24 bg-${isInterclub ? 'gray-100' : 'white'} z-10 pointer-events-none`}
        style={{ clipPath: 'polygon(-1% 100%, 101% 0, 101% 100%)' }}
      />

      {isInterclub && (
        <div className="absolute bottom-12 sm:bottom-16 md:bottom-32 left-4 sm:left-6 md:left-12 z-10 flex flex-col gap-3">
          <div className="flex sm:hidden gap-3">
            <button type="button" onClick={prevSlide} className={navButtonClass}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" onClick={nextSlide} className={navButtonClass}>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-3 sm:gap-4">
        <button type="button" onClick={prevSlide} className={navButtonClass}>
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button type="button" onClick={nextSlide} className={navButtonClass}>
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}
