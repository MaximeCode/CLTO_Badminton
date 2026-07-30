import { motion } from "motion/react";
import { PageHero } from "../components/PageHero"
import { Section } from "../components/Section"

export function DocumentsPage() {
    return (
        <>
            <PageHero title="Documents officiels" subtitle="Dans cette rubrique, retrouvez tous les documents que vous cherchez, documents d'inscriptions, fiche de frais, fondamentaux financiers..." />

            <Section className="bg-white">
                {/* Iframe avec le projet club */}
                <div className="px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto border-2 border-gray-200 rounded-lg overflow-hidden my-8"
                    >
                        <iframe src="https://drive.google.com/embeddedfolderview?id=0B5b0oPdhLdHsOUxWQ1dUNHFSblE&resourcekey=0-PwFL53alm07OolM2gZoPnw#grid" width="100%" height="800px" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Documents"></iframe>
                    </motion.div>
                </div>
            </Section>
        </>
    );
}