import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import bandeauBureau from '../../imports/bandeau-bureau.jpg';
const placeholderPhoto = new URL('../../imports/user.png', import.meta.url).href;

type OrgMember = {
  name: string;
  role: string;
  detail?: string;
  image?: string;
};

type OrgSection = {
  title: string;
  members: OrgMember[];
};

const executiveBoard: OrgMember[] = [
  { name: 'Steve Bandou-Niatoll', role: 'Président', image: placeholderPhoto },
  { name: 'Mathieu Alves', role: 'Vice-président', detail: 'Vie sportive', image: placeholderPhoto },
  { name: 'XX', role: 'Vice-président', detail: 'Vie administrative', image: placeholderPhoto },
  { name: 'Philippe Maire', role: 'Trésorier', image: placeholderPhoto },
  { name: 'Elodie Ricaud', role: 'Secrétaire', image: placeholderPhoto },
  { name: 'XX', role: 'Responsable', detail: 'Subvention', image: placeholderPhoto },
];

const commissionSections: OrgSection[] = [
  {
    title: 'Partenariat & Entreprises',
    members: [
      { name: 'Benoit Soulard', role: 'Responsable Partenariat', image: placeholderPhoto },
      { name: 'Benjamin Gouit', role: 'Responsable Soirée Entreprise', image: placeholderPhoto },
    ],
  },
  {
    title: 'Compétitions',
    members: [
      { name: 'Martin Lamy', role: 'Responsable', image: placeholderPhoto },
      { name: 'Bastien Chailloux', role: 'Gestion IC N', image: placeholderPhoto },
      { name: 'Benoit Soulard', role: 'Membre', image: placeholderPhoto },
    ],
  },
  { title: 'Loisirs', members: [{ name: 'Valentin Martel', role: 'Responsable', image: placeholderPhoto }] },
  { title: 'Jeunes', members: [{ name: 'Mathilde Brochard', role: 'Responsable', image: placeholderPhoto }] },
  {
    title: 'Evenements',
    members: [
      {
        name: 'Mathilde Brochard',
        role: 'Responsable',
        detail: 'Compétitions officielles',
        image: placeholderPhoto,
      },
      { name: 'Benjamin Gouit', role: 'Responsable', detail: 'Tournois internes', image: placeholderPhoto },
      { name: 'Elodie Ricaud', role: 'Membre', image: placeholderPhoto },
    ],
  },
  {
    title: 'Communication',
    members: [
      { name: 'Elodie Ricaud', role: 'Responsable', image: placeholderPhoto },
      { name: 'Mathilde Brochard', role: 'Membre', image: placeholderPhoto },
    ],
  },
  { title: 'Formations & OI', members: [{ name: 'Laurent Thorin', role: 'Responsable', image: placeholderPhoto }] },
  {
    title: 'Annexes',
    members: [
      { name: 'Elodie Ricaud', role: 'Responsable', detail: 'Ecoresponsabilité', image: placeholderPhoto },
      { name: 'Steve Bandou-Niatoll', role: 'Responsable', detail: 'Informatique', image: placeholderPhoto },
      { name: 'Maxime Baude', role: 'Informatique', image: placeholderPhoto },
    ],
  },
];

function MemberCard({ member, isExecutive = false }: { member: OrgMember; isExecutive?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45 }}
      className={[
        'group relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-xl',
        isExecutive ? 'border-[#0153b6]/30' : 'border-[#0153b6]/15',
      ].join(' ')}
    >
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-[#0153b6] via-[#0a69d1] to-[#da9619]" />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <img
            src={member.image ?? placeholderPhoto}
            alt={member.name}
            className="h-24 w-24 rounded-full border-4 border-[#da9619] object-cover shadow-md md:h-28 md:w-28"
          />
          <div className="absolute -inset-1 -z-10 rounded-full bg-[#0153b6]/10 blur-sm" />
        </div>
        <div>
          <h3 className="font-primary text-3xl leading-none tracking-wide text-[#0153b6]">{member.name}</h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-[#da9619]">{member.role}</p>
          {member.detail && <p className="mt-1 text-sm text-[#1f3f68]">{member.detail}</p>}
        </div>
      </div>
    </motion.article>
  );
}

export function BureauPage() {
  return (
    <>
      <PageHero
        title="CONSEIL D'ADMINISTRATION"
        subtitle="Organigramme 2025-2026 du CLTO Badminton"
        image={bandeauBureau}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] via-white to-[#f5f9ff] py-20">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#0153b6]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-[#da9619]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-[#0153b6] md:text-6xl">Le Bureau</h2>
            <p className="mx-auto max-w-3xl text-lg text-[#1f3f68]">
              Une lecture simple de l'organisation du club : les fonctions cles du bureau puis les responsables de
              chaque commission.
            </p>
          </motion.div>

          <div className="mx-auto mb-20 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {executiveBoard.map((member) => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} isExecutive />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-[#0153b6] md:text-6xl">Les Commissions</h2>
            <p className="mx-auto max-w-3xl text-lg text-[#1f3f68]">
              Chaque commission a ses responsables referents, pour une organisation claire et accessible a tous les
              adherents.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {commissionSections.map((section, sectionIndex) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.05 }}
                className="rounded-2xl border border-[#0153b6]/20 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-10 w-1.5 rounded-full bg-[#da9619]" />
                  <h3 className="font-primary text-4xl leading-none text-[#0153b6]">{section.title}</h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.members.map((member) => (
                    <MemberCard key={`${section.title}-${member.name}-${member.role}`} member={member} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}