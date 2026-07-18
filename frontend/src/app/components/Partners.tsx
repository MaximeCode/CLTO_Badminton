import { motion } from 'motion/react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';
import { useEffect, useState } from 'react';
import { getPartners } from '@/api/strapi/partners';
import { Loader2 } from 'lucide-react';
import { Partner } from '@/types/partnersType';

export function Partners() {

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setLoading(true);
        const data = await getPartners();
        setPartners(data);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <Section className="bg-white">
        <div className="flex flex-col items-center justify-center min-h-64">
          <Loader2 size={40} className="text-[#0153b6] animate-spin mb-4" />
          <p className="text-gray-500 font-medium">Chargement des partenaires…</p>
        </div>
      </Section>
    );
  }

  if (loadError) {
    return (
      <Section className="bg-white">
        <div className="flex flex-col items-center justify-center min-h-64">
          <p className="text-gray-500 font-medium">{loadError}</p>
        </div>
      </Section>
    );
  }

  return (
    <Section className="bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_40%)]">
      <HomePageSectionTitle
        title="ILS NOUS SOUTIENNENT"
        subtitle="Nos partenaires accompagnent le club au quotidien et participent a son rayonnement local."
      />

      <div className="space-y-10">
        {partners.length > 0 ?
          partners.map((partner, partnerIndex) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: partnerIndex * 0.08 }}
              className="rounded-2xl border border-primary/10 bg-white/90 shadow-[0_12px_36px_rgba(1,83,182,0.08)]"
            >
              <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-primary/10">
                <h3 className="font-primary text-2xl text-footer tracking-wide">
                  {partner.type}
                </h3>
                <div className="h-1.5 w-14 rounded-full bg-secondary" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 md:p-7">
                {partner.logos.map((logo, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                    className="group relative rounded-xl border border-primary/12 bg-white p-4 md:p-5 min-h-[132px] flex items-center justify-center transition-all duration-200 hover:border-secondary/70 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(218,150,25,0.16)]"
                  >
                    <img
                      src={logo.url}
                      alt={`${logo.url}`}

                      className="max-h-16 md:max-h-[72px] w-auto object-contain grayscale-[12%] group-hover:grayscale-0 transition-all duration-200"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )) : (
            <div className="flex flex-col items-center justify-center min-h-64">
              <p className="text-gray-500 font-medium">Aucun partenaire trouvé</p>
            </div>
          )}
      </div>

      <div className="text-center mt-12">
        <p className="text-[#42526b] mb-4">Vous souhaitez devenir partenaire du CLTO ?</p>
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-md border-2 border-secondary px-6 py-2.5 text-secondary hover:bg-secondary hover:text-white transition-all duration-200"
        >
          Nous contacter
        </Link>
      </div>
    </Section>
  );
}
