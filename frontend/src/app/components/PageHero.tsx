import { motion } from 'motion/react';

interface PageHeroProps {
  title?: string;
  subtitle?: string;
  image?: string;
  /** Texte alternatif de l'image de bannière (SEO / accessibilité). */
  imageAlt?: string;
}

export function PageHero({ title = '', subtitle = '', image, imageAlt }: PageHeroProps) {
  const hasImage = Boolean(image);
  const resolvedAlt =
    imageAlt ||
    (title
      ? `${title} — CLTO Badminton Orléans`
      : 'CLTO Badminton Orléans, club de badminton à Orléans');

  return (
    <div className="relative h-[160px] sm:h-[240px] md:h-[320px] overflow-hidden">
      <div className="absolute inset-0">
        {hasImage ? (
          <img
            src={image}
            alt={resolvedAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to bottom right, var(--primary) 0%, var(--primary-accent) 45%, var(--secondary) 90%, var(--secondary) 100%)',
            }}
            aria-hidden
          />
        )}
        {hasImage && title && (
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/60 to-black/45 md:bg-linear-to-r md:from-black/70 md:via-black/50 md:to-black/30" />
        )}
      </div>
      <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 pt-6 sm:pt-10 md:pt-0 flex flex-col justify-center">
        <div>
          <div className="flex items-stretch gap-3 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
            <div className="w-1.5 shrink-0 rounded-full bg-secondary" />
            {title ? (
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white text-4xl md:text-6xl lg:text-7xl tracking-wide md:tracking-wider leading-[1.15]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </motion.h1>
            ) : null}
          </div>
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
    </div>
  );
}
