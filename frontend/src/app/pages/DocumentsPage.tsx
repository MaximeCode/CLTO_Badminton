import { motion } from "motion/react";
import { PageHero } from "../components/PageHero"
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from "../components/Section"
import { Seo } from "../components/Seo"

export function DocumentsPage() {
    const bandeauImage = useBandeauImage(BANDEAU_PAGES.DOCUMENTS);

    return (
        <>
            <Seo
                title="Documents"
                description="Documents officiels du CLTO Badminton Orléans : inscriptions, fiches de frais et ressources pour les adhérents du club."
            />
            <PageHero
                title={BANDEAU_PAGES.DOCUMENTS}
                subtitle="Dans cette rubrique, retrouvez tous les documents que vous cherchez, documents d'inscriptions, fiche de frais, fondamentaux financiers..."
                image={bandeauImage}
            />

            <Section className="bg-white">
                <div className="px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-7xl mx-auto border-2 border-gray-200 rounded-lg overflow-hidden my-8"
                    >
                        <iframe src="https://drive.google.com/embeddedfolderview?id=0B5b0oPdhLdHsOUxWQ1dUNHFSblE&resourcekey=0-PwFL53alm07OolM2gZoPnw#grid" width="100%" height="800px" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Documents officiels du CLTO Badminton Orléans"></iframe>
                    </motion.div>
                </div>
            </Section>
        </>
    );
}
