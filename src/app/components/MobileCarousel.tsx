import { useRef, useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : direction > 0 ? '120%' : '-120%',
    opacity: direction === 0 ? 1 : 0.5,
    zIndex: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-120%' : direction < 0 ? '120%' : 0,
    opacity: 0.5,
    zIndex: 2,
  }),
};

type MobileCarouselProps<T> = {
  items: T[];
  getItemKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  prevAriaLabel?: string;
  nextAriaLabel?: string;
  className?: string;
};

export function MobileCarousel<T>({
  items,
  getItemKey,
  renderItem,
  prevAriaLabel = 'Élément précédent',
  nextAriaLabel = 'Élément suivant',
  className = '',
}: MobileCarouselProps<T>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const goToNext = () => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % items.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartRef.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const diffX = touchStartRef.current.x - event.changedTouches[0].clientX;
    const diffY = touchStartRef.current.y - event.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) goToNext();
      else goToPrev();
    }
  };

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div className={`block md:hidden ${className}`}>
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={getItemKey(activeItem)}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderItem(activeItem)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          type="button"
          aria-label={prevAriaLabel}
          onClick={goToPrev}
          className="flex items-center justify-center cursor-pointer focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-colors duration-200">
            <ChevronLeft size={20} />
          </span>
        </button>

        <button
          type="button"
          aria-label={nextAriaLabel}
          onClick={goToNext}
          className="flex items-center justify-center cursor-pointer focus:outline-none"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md text-primary hover:bg-primary hover:text-white transition-colors duration-200">
            <ChevronRight size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
