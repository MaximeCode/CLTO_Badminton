import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import bandeauBureau from '../../imports/bandeau-bureau.jpg';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
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

const staffMembers: OrgMember[] = [
  { name: 'Véronique Marchet', role: 'Agente administrative et financière', image: placeholderPhoto },
  { name: 'Thomas Huboud-Perron', role: 'Coordinateur Technique', image: placeholderPhoto },
  { name: 'Yohan Hénault', role: 'Entraîneur', detail: 'En formation BPJEPS APT', image: placeholderPhoto },
  { name: 'Lucie Chantepie', role: 'Service civique', image: placeholderPhoto },
  { name: 'Valentin Weiskopf', role: 'Service civique', image: placeholderPhoto },
  { name: 'Louen Verrey', role: 'Service civique', image: placeholderPhoto },
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
    title: 'Événements',
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
        'group relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2',
        isExecutive ? 'border-primary/50' : 'border-primary/15',
      ].join(' ')}
    >
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0153b6] to-[#da9619]" />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <ImageWithFallback
            src={member.image ?? placeholderPhoto}
            alt={member.name}
            className="h-20 w-20 rounded-full border-4 border-secondary object-cover shadow-md md:w-24 md:h-24"
          />
          <div className="absolute -inset-1 -z-10 rounded-full bg-primary/10 blur-sm" />
        </div>
        <div>
          <h3 className="font-primary text-3xl leading-none tracking-wide text-primary">{member.name}</h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-secondary">{member.role}</p>
          {member.detail && <p className="mt-1 text-sm text-primary-accent">{member.detail}</p>}
        </div>
      </div>
    </motion.article>
  );
}

export function ConseilAdministrationPage() {
  return (
    <>
      <PageHero
        title="CONSEIL D'ADMINISTRATION"
        subtitle="Organigramme 2025-2026 du CLTO Badminton"
      image={bandeauBureau}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] via-white to-[#f5f9ff] py-20">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-primary md:text-6xl">Le Conseil d'Administration</h2>
            <p className="mx-auto max-w-3xl text-lg text-primary-accent">
              Une lecture simple de l'organisation du club : les fonctions cles du bureau puis les responsables de
              chaque commission.
            </p>
          </motion.div>

          <div className="mx-auto mb-20 grid max-w-6xl gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            <h2 className="mb-4 font-primary text-5xl text-primary md:text-6xl">Les Salariés</h2>
            <p className="mx-auto max-w-3xl text-lg text-primary-accent">
              L'équipe salariée du club, au service des adhérents au quotidien.
            </p>
          </motion.div>

          <div className="mx-auto mb-20 grid max-w-6xl gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staffMembers.map((member) => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-primary md:text-6xl">Les Commissions</h2>
            <p className="mx-auto max-w-3xl text-lg text-primary-accent">
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
                className="rounded-2xl border border-primary/20 bg-white/90 p-6 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-10 w-1.5 rounded-full bg-secondary" />
                  <h3 className="font-primary text-4xl leading-none text-primary">{section.title}</h3>
                </div>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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