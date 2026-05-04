import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import bgCarouselDefault from '../../imports/bg-test.jpg';
import bgCarouselJeune from '../../imports/bg-promo.jpg';
import bgCarouselCompet from '../../imports/bg-test2.jpg';

const slides = [
  {
    id: 1,
    image: bgCarouselDefault,
    label: 'ACTUALITÉ DU CLUB',
    title: 'LE CLTO BADMINTON RECRUTE DE NOUVEAUX TALENTS',
    description: 'Rejoignez l\'un des clubs les plus compétitifs de France',
    cta: 'Découvrir',
  },
  {
    id: 2,
    image: bgCarouselCompet,
    label: 'COMPÉTITION',
    title: 'NOS ÉQUIPES EN ROUTE VERS LES CHAMPIONNATS',
    description: 'Suivez nos athlètes lors des prochains interclubs',
    cta: 'Voir les résultats',
  },
  {
    id: 3,
    image: bgCarouselJeune,
    label: 'ESPACE JEUNES',
    title: 'STAGES DE VACANCES POUR LES JEUNES',
    description: 'Inscriptions ouvertes pour les stages d\'été',
    cta: 'S\'inscrire',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

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
  }, []);

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

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          {/* Content */}
          <div className="relative h-full max-w-[1280px] mx-auto px-6 flex items-center">
            <div className="max-w-2xl">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-secondary uppercase tracking-wider mb-4"
              >
                {slides[currentSlide].label}
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="font-primary text-6xl md:text-7xl text-white leading-tight mb-4"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white/90 text-lg mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
              >
                {slides[currentSlide].cta} →
              </motion.button>

              {/* Slide Indicators */}
              <div className="mt-10 z-10 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="relative w-12 h-1 bg-white/30 overflow-hidden"
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

          {/* Diagonal Bottom Clip */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
