import { motion } from 'motion/react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';
import type { Partner } from '@/types/partnersType';

export function Partners({
  partners,
  variant = 'full',
}: {
  partners: Partner[];
  /** `compact` : rappel léger des logos, sans CTA recrutement. */
  variant?: 'full' | 'compact';
}) {
  const isCompact = variant === 'compact';

  return (
    <Section className="bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_40%)]">
      <HomePageSectionTitle
        title="ILS NOUS SOUTIENNENT"
        subtitle={
          isCompact
            ? 'Entreprises et institutions qui accompagnent déjà le CLTO Badminton.'
            : 'Nos partenaires accompagnent le CLTO Badminton Orléans au quotidien et participent a son rayonnement local.'
        }
      />

      <div className={isCompact ? 'space-y-6' : 'space-y-10'}>
        {partners.length > 0 ? (
          partners.map((partner, partnerIndex) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: partnerIndex * 0.08 }}
              className={
                isCompact
                  ? 'rounded-xl border border-primary/10 bg-white/90'
                  : 'rounded-2xl border border-primary/10 bg-white/90 shadow-[0_12px_36px_rgba(1,83,182,0.08)]'
              }
            >
              <div
                className={`flex items-center justify-between border-b border-primary/10 ${isCompact ? 'px-4 py-3 md:px-6' : 'px-6 md:px-8 py-4'
                  }`}
              >
                <h3
                  className={`font-primary text-footer tracking-wide ${isCompact ? 'text-xl' : 'text-2xl'
                    }`}
                >
                  {partner.type}
                </h3>
                <div className="h-1.5 w-8 md:w-14 rounded-full bg-secondary" />
              </div>

              <div
                className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ${isCompact ? 'gap-3 p-3 md:p-5' : 'gap-5 p-5 md:p-7'
                  }`}
              >
                {partner.logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className={`group relative flex items-center justify-center rounded-xl border border-primary/12 bg-white transition-all duration-200 hover:border-secondary/70 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(218,150,25,0.16)] ${isCompact
                      ? 'min-h-20 p-2 md:min-h-24 md:px-6'
                      : 'min-h-25 p-3 md:min-h-30 md:px-10'
                      }`}
                  >
                    <img
                      src={logo.url}
                      alt={
                        logo.alternativeText ||
                        logo.name ||
                        `Logo partenaire — ${partner.type}`
                      }
                      width={logo.width ?? 180}
                      height={logo.height ?? 90}
                      className={`w-auto object-contain grayscale-12 group-hover:grayscale-0 transition-all duration-200 ${isCompact ? 'max-h-12 md:max-h-16' : 'max-h-16 md:max-h-22.5'
                        }`}
                      loading="lazy"
                      decoding="async"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center min-h-40">
            <p className="text-gray-500 font-medium">Aucun partenaire trouvé</p>
          </div>
        )}
      </div>

      {!isCompact && (
        <div className="text-center mt-12">
          <p className="text-[#42526b] mb-4">Vous souhaitez devenir partenaire du CLTO ?</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/partenaires"
              className="inline-flex items-center justify-center rounded-md border-2 border-primary px-6 py-2.5 text-primary hover:bg-primary hover:text-white transition-all duration-200"
            >
              En savoir plus
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md border-2 
          border-secondary px-6 py-2.5 text-secondary hover:bg-secondary hover:text-white 
          transition-all duration-200"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}
