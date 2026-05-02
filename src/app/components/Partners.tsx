import { motion } from 'motion/react';
import { Link } from 'react-router';
import badmintonComiteLoiret from "../../imports/Partners/Badminton_ComiteLoiret.jpg";
import badmintonFFBAD from "../../imports/Partners/Badminton_FFBAD.jpg";
import badmintonLabelSolibad from "../../imports/Partners/Badminton_Label_solibad.jpg";
import badmintonLigueCentreValDeLoire from "../../imports/Partners/Badminton_LigueCentreValDeLoire.jpg";
import institutionnelANS from "../../imports/Partners/Institutionnel_ANS.jpg";
import institutionnelCentreValDeLoire from "../../imports/Partners/Institutionnel_CentreValDeLoire.png";
import institutionnelDepartementLoiret from "../../imports/Partners/Institutionnel_DepartementLoiret.png";
import institutionnelMairieOrleans from "../../imports/Partners/Institutionnel_MairieOrleans.png";
import partenaireDSCarrelages from "../../imports/Partners/Partenaire_DS_Carrelages.png";
import partenaireLardeSportsOrleans from "../../imports/Partners/Partenaire_LardeSports_ORLEANS.jpg";
import partenaireNinkaPark from "../../imports/Partners/Partenaire_NinkaPark.jpg";
import partenaireOrex from "../../imports/Partners/Partenaire_Orex.png";
import partenaireOrleansMasters from "../../imports/Partners/Partenaire_OrleansMasters.png";
import partenaireSPBB from "../../imports/Partners/Partenaire_SPBB.png";
import partenaireVictor from "../../imports/Partners/Partenaire_Victor.png";
import partenaireWebAndCo from "../../imports/Partners/Partenaire_Web-&-Co.png";

type Partner = {
  id: number;
  name: string;
  logo: string;
  category: 'badminton' | 'institutionnel' | 'entreprise';
};

const partners: Partner[] = [
  { id: 1, name: "Comite Loiret", logo: badmintonComiteLoiret, category: 'badminton' },
  { id: 2, name: "FFBAD", logo: badmintonFFBAD, category: 'badminton' },
  { id: 3, name: "Label Solibad", logo: badmintonLabelSolibad, category: 'badminton' },
  { id: 4, name: "Ligue Centre-Val de Loire", logo: badmintonLigueCentreValDeLoire, category: 'badminton' },
  { id: 5, name: "ANS", logo: institutionnelANS, category: 'institutionnel' },
  { id: 6, name: "Region Centre-Val de Loire", logo: institutionnelCentreValDeLoire, category: 'institutionnel' },
  { id: 7, name: "Departement du Loiret", logo: institutionnelDepartementLoiret, category: 'institutionnel' },
  { id: 8, name: "Mairie d'Orleans", logo: institutionnelMairieOrleans, category: 'institutionnel' },
  { id: 9, name: "DS Carrelages", logo: partenaireDSCarrelages, category: 'entreprise' },
  { id: 10, name: "Larde Sports Orleans", logo: partenaireLardeSportsOrleans, category: 'entreprise' },
  { id: 11, name: "Ninka Park", logo: partenaireNinkaPark, category: 'entreprise' },
  { id: 12, name: "Orex", logo: partenaireOrex, category: 'entreprise' },
  { id: 13, name: "Orleans Masters", logo: partenaireOrleansMasters, category: 'entreprise' },
  { id: 14, name: "SPBB", logo: partenaireSPBB, category: 'entreprise' },
  { id: 15, name: "Victor", logo: partenaireVictor, category: 'entreprise' },
  { id: 16, name: "Web & Co", logo: partenaireWebAndCo, category: 'entreprise' },
];

const partnerGroups = [
  { key: 'badminton', title: 'Partenaires badminton' },
  { key: 'institutionnel', title: 'Partenaires institutionnels' },
  { key: 'entreprise', title: 'Partenaires entreprises' },
] as const;

export function Partners() {
  return (
    <section className="py-20 bg-[linear-gradient(180deg,#f7fbff_0%,#ffffff_40%)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="mt-4 font-primary text-4xl md:text-5xl text-[#0a1f3d] tracking-wide">
            Ils nous soutiennent
          </h2>
          <p className="mt-3 text-[#42526b] max-w-2xl mx-auto">
            Nos partenaires accompagnent le club au quotidien et participent a son rayonnement local.
          </p>
        </div>

        <div className="space-y-10">
          {partnerGroups.map((group, groupIndex) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: groupIndex * 0.08 }}
              className="rounded-2xl border border-[#0153b6]/10 bg-white/90 shadow-[0_12px_36px_rgba(1,83,182,0.08)]"
            >
              <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-[#0153b6]/10">
                <h3 className="font-primary text-2xl text-[#0a1f3d] tracking-wide">
                  {group.title}
                </h3>
                <div className="h-1.5 w-14 rounded-full bg-[#da9619]" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 md:p-7">
                {partners
                  .filter((partner) => partner.category === group.key)
                  .map((partner, index) => (
                    <motion.div
                      key={partner.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      className="group relative rounded-xl border border-[#0153b6]/12 bg-white p-4 md:p-5 min-h-[132px] flex items-center justify-center transition-all duration-200 hover:border-[#da9619]/70 hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(218,150,25,0.16)]"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-16 md:max-h-[72px] w-auto object-contain grayscale-[12%] group-hover:grayscale-0 transition-all duration-200"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#42526b] mb-4">Vous souhaitez devenir partenaire du CLTO ?</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border-2 border-[#da9619] px-6 py-2.5 text-[#da9619] hover:bg-[#da9619] hover:text-white transition-all duration-200"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </section>
  );
}
