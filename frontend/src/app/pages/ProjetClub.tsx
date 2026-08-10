import { motion } from "motion/react";
import { PageHero } from "../components/PageHero"
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from "../components/Section"
import { Seo } from "../components/Seo"

export function ProjetClub() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.PROJET_CLUB);

  return (
    <>
      <Seo
        title="Projet club"
        description="Projet club F.J.P.C.R 2024-2028 du CLTO Badminton Orléans : orientations et ambitions du club orléanais."
      />
      <PageHero
        title={BANDEAU_PAGES.PROJET_CLUB || "PROJET CLUB"}
        image={bandeauImage}
        subtitle="Le projet F.J.P.C.R 2024-2028 du CLTO Badminton à Orléans"
        imageAlt="Projet club CLTO Badminton Orléans"
      />

      <Section className="bg-white">
        <h2 className="font-primary text-4xl md:text-6xl text-primary mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            Projet Club F.J.P.C.R
            <span className="text-secondary">2024 - 2028</span>
          </div>
        </h2>

        {/* Iframe avec le projet club */}
        <div className="lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto border-2 border-gray-200 rounded-lg overflow-hidden my-8"
          >
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQK4X4eELLRKJUtgXSpSS7OV6Y9rZPwfvbs76DA6xvIhTy5xyVmbf_ho0W0Tc2aPonUJNcJfWUlkDwW/pubembed?start=false&loop=false&delayms=5000" width="100%" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Projet Club F.J.P.C.R | 2024 - 2028" className="h-75 md:h-170"></iframe>
          </motion.div>
        </div>
      </Section >
    </>
  );
}
