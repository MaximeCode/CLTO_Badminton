import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Smile, Trophy, Target, Medal, Feather } from 'lucide-react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

const spaces = [
  {
    title: 'JEUNES LOISIRS',
    icon: Smile,
    color: 'primary' as const,
    link: '/jeunes-loisirs',
  },
  {
    title: 'JEUNES COMPÉTITEURS',
    icon: Trophy,
    color: 'secondary' as const,
    link: '/jeunes-competiteurs',
  },
  {
    title: 'ADULTES LOISIRS',
    icon: Target,
    color: 'primary' as const,
    link: '/adultes-loisirs',
  },
  {
    title: 'ADULTES COMPÉTITEURS',
    icon: Medal,
    color: 'secondary' as const,
    link: '/adultes-competiteurs',
  },
  {
    title: 'VIEILLES PLUMES',
    icon: Feather,
    color: 'primary' as const,
    link: '/vieilles-plumes',
  },
];

const overlayClasses = {
  primary: 'from-primary/90 to-primary/50',
  secondary: 'from-secondary/90 to-secondary/50',
} as const;

type Space = (typeof spaces)[number];

function SpaceCard({ space }: { space: Space }) {
  const Icon = space.icon;

  return (
    <div className="group relative h-full max-h-[300px] rounded-lg overflow-hidden cursor-pointer aspect-[3/4]">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
      // style={{ backgroundImage: `url(${space.image})` }}
      />

      <div
        className={`absolute inset-0 bg-linear-to-t ${overlayClasses[space.color]}  group-hover:opacity-95 transition-opacity duration-300`}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 text-white">
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          className="mb-2 sm:mb-4"
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2} />
        </motion.div>

        <h3 className="font-primary text-lg sm:text-xl md:text-2xl text-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300 leading-tight">
          {space.title}
        </h3>
      </div>
    </div>
  );
}

export function SpaceCards() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollMetrics, setScrollMetrics] = useState({
    canScroll: false,
    canScrollRight: false,
    thumbWidth: 100,
    thumbLeft: 0,
  });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      const maxScroll = scrollWidth - clientWidth;
      const canScroll = maxScroll > 1;
      const thumbWidth = canScroll ? Math.max((clientWidth / scrollWidth) * 100, 18) : 100;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;

      setScrollMetrics({
        canScroll,
        canScrollRight: scrollLeft < maxScroll - 1,
        thumbWidth,
        thumbLeft: progress * (100 - thumbWidth),
      });
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  return (
    <Section className="bg-white">
      <HomePageSectionTitle title="NOS PUBLICS" />

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex flex-row gap-4 overflow-x-auto overflow-y-hidden pb-1 scrollbar-none"
        >
          {spaces.map((space, index) => (
            <Link
              key={space.link}
              to={space.link}
              className="shrink-0 w-48 sm:w-56"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <SpaceCard space={space} />
              </motion.div>
            </Link>
          ))}
        </div>

        {scrollMetrics.canScrollRight && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-14 bg-linear-to-l from-white to-transparent"
            aria-hidden
          />
        )}

        {scrollMetrics.canScroll && (
          <div
            className="mt-3 h-1.5 rounded-full bg-muted"
            role="scrollbar"
            aria-orientation="horizontal"
            aria-valuenow={Math.round(scrollMetrics.thumbLeft)}
          >
            <div
              className="h-full rounded-full bg-secondary"
              style={{
                width: `${scrollMetrics.thumbWidth}%`,
                marginLeft: `${scrollMetrics.thumbLeft}%`,
              }}
            />
          </div>
        )}
      </div>
    </Section>
  );
}
