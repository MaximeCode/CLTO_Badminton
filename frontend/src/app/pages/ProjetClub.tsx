import { motion } from "motion/react";
import { PageHero } from "../components/PageHero"
import { Section } from "../components/Section"
const projetclubHero = new URL('../../imports/Banniere_hello_asso.png', import.meta.url).href;

export function ProjetClub() {
  return (
    <>
      <PageHero
        image={projetclubHero}
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