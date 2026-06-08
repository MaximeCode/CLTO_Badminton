import { motion } from 'motion/react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  image: string;
}

export function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <div className="relative h-[260px] sm:h-[320px] md:h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/45 md:bg-gradient-to-r md:from-black/70 md:via-black/50 md:to-black/30" />
      </div>
      <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-14 sm:pt-16 md:pt-0 flex flex-col justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-wide md:tracking-wider leading-[1.15] mb-2 sm:mb-3 md:mb-4"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-sm sm:text-base md:text-xl leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
