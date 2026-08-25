import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { EvenementInfos, EvenementMedia } from '@/types/evenementType';
import { stringifyDate } from '@/utils/formatDate';

export type EvenementCardLink = {
  href: string;
  label: string;
};

type EvenementCardProps = EvenementInfos & {
  affiche?: EvenementMedia | null;
  children?: ReactNode;
  links: EvenementCardLink[];
};

export function EvenementCard({
  titre,
  date,
  detail_date,
  lieu,
  horaire,
  affiche,
  children,
  links,
}: EvenementCardProps) {
  const dateLabel = detail_date
    ? detail_date
    : stringifyDate(date, 'numeric', 'long', 'numeric');
  const visibleLinks = links.filter((link) => link.href?.trim());

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="overflow-hidden rounded-lg bg-gray-50 shadow-lg"
    >
      <div className="bg-linear-to-r from-primary to-primary-accent px-6 py-4 sm:px-8">
        <h3 className="font-primary text-3xl text-white sm:text-4xl">{titre}</h3>
      </div>

      <div className="flex flex-col md:flex-row md:max-h-162.5">
        {affiche?.url ? (
          <div className="md:w-1/3 shrink-0">
            <img
              src={affiche.url}
              alt={affiche.alternativeText || titre}
              className="h-48 w-full object-cover object-center md:h-162.5 md:max-h-162.5"
            />
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:max-h-162.5 p-6 sm:p-8">
          <div className="grid shrink-0 gap-4 sm:grid-cols-3 text-md">
            <div className="flex items-start gap-3 text-gray-700">
              <Calendar size={20} className="mt-0.5 shrink-0 text-secondary" />
              <span className="font-semibold">{dateLabel}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <MapPin size={20} className="mt-0.5 shrink-0 text-secondary" />
              <span className="font-semibold">{lieu}</span>
            </div>
            <div className="flex items-start gap-3 text-gray-700">
              <Clock size={20} className="mt-0.5 shrink-0 text-secondary" />
              <span className="font-semibold">{horaire}</span>
            </div>
          </div>

          {children ? (
            <div className="mt-6 min-h-0 flex-1 overflow-y-auto">{children}</div>
          ) : null}

          {visibleLinks.length > 0 && (
            <div className="mt-6 flex shrink-0 flex-col gap-2 sm:flex-row sm:gap-6">
              {visibleLinks.map((link) => (
                <a
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-semibold underline underline-offset-2 hover:text-secondary-accent transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
