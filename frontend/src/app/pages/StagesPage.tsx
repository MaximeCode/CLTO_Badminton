import { motion } from 'motion/react';
import { Calendar, Euro, Users, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { useEffect, useState } from 'react';
import { getStages } from '@/api/strapi/stage';
import { getParametresGlobaux } from '@/api/strapi/parametre-globaux';
import { Stage } from '@/types/stageType';
import { BlocksRenderer } from '../components/BlocksRenderer';
import { formatDateRange } from '@/utils/formatDate';

const stageHero = new URL('../../imports/Banniere_stage.png', import.meta.url).href;
const HELLOASSO_URL_FALLBACK = import.meta.env.VITE_HELLOASSO_URL as string;

export function StagesPage() {
  const [stages, setStages] = useState<Stage[] | null>(null);
  const [helloassoUrl, setHelloassoUrl] = useState(HELLOASSO_URL_FALLBACK);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Fetch datas
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const [stagesData, parametres] = await Promise.all([
          getStages(),
          getParametresGlobaux(),
        ]);
        setStages(stagesData);
        setHelloassoUrl(
          parametres?.lien_accueil_helloasso?.trim() || HELLOASSO_URL_FALLBACK,
        );
      } catch (error) {
        console.error('Error loading data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les données.',
        );
      }
    }
    loadData();
  }, []);
  return (
    <>
      <PageHero
        title="STAGES"
        subtitle="Des stages encadrés pour progresser et préparer la saison"
        image={stageHero}
      />

      <Section className="py-12 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
            NOS STAGES 2026-2027
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stages encadrés par les entraîneurs du club, ouverts aux licenciés CLTO.
          </p>
        </motion.div>

        {stages?.map((stage: Stage) => (
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-lg bg-gray-50 shadow-lg"
          >
            <div className="bg-linear-to-r from-primary to-primary-accent px-6 py-4 sm:px-8">
              <h3 className="font-primary text-3xl text-white sm:text-4xl">{stage.titre}</h3>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-md">
                <div className="flex items-start gap-3 text-gray-700">
                  <Calendar size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="font-semibold">{formatDateRange(stage.date_debut, stage.date_fin)}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="font-semibold">{stage.gymnase}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <Users size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="font-semibold">{stage.public}</span>
                </div>
                <div className="flex items-start gap-3 text-gray-700">
                  <Euro size={20} className="mt-0.5 shrink-0 text-secondary" />
                  <span className="font-semibold">
                    {stage.autre_infos}
                  </span>
                </div>
              </div>

              <article>
                <BlocksRenderer content={stage.description ?? []} size="base" />
              </article>

              <a
                href={stage.lien}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-white transition-colors duration-200 hover:bg-secondary-accent"
              >
                S&apos;inscrire sur HelloAsso
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.article>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-linear-to-br from-primary to-primary-accent p-12 text-center text-white shadow-lg mt-24"
        >
          <h2 className="mb-4 font-primary text-4xl">INSCRIVEZ-VOUS</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Les places sont limitées et partent vite ! Accédez à la page d&apos;inscription via le bouton
            ci-dessous, ou contactez-nous pour toute question sur nos stages.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={helloassoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-8 py-3 text-white transition-colors duration-200 hover:bg-secondary-accent"
            >
              Voir notre page HelloAsso
              <ArrowRight size={18} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-8 py-3 text-white transition-colors duration-200 hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
