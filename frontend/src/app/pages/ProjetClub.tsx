import { motion } from "motion/react";
import { PageHero } from "../components/PageHero"
const projetclubHero = new URL('../../imports/Banniere_hello_asso.png', import.meta.url).href; // non définitif

export function ProjetClub() {
  return (
    <>
      <PageHero image={projetclubHero} />

      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 flex items-center justify-between">Projet Club F.J.P.C.R
            <span className="text-secondary">2024 - 2028</span></h2>
        </div>

        {/* Iframe avec le projet club */}
        <div className="px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[1280px] mx-auto border-2 border-gray-200 rounded-lg overflow-hidden my-8"
          >
            <iframe src="https://docs.google.com/presentation/d/e/2PACX-1vQK4X4eELLRKJUtgXSpSS7OV6Y9rZPwfvbs76DA6xvIhTy5xyVmbf_ho0W0Tc2aPonUJNcJfWUlkDwW/pubembed?start=false&loop=false&delayms=5000" width="100%" height="680" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Projet Club F.J.P.C.R | 2024 - 2028"></iframe>
          </motion.div>
        </div>
      </section>
    </>
  );
}