import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { motion } from 'motion/react';
import { Construction, Home } from 'lucide-react';
import { Link } from 'react-router';
import maintenanceImage from '../../imports/organigramme-maintenance.jpg';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Section } from '../components/Section';

const isInMaintenance = import.meta.env.VITE_ORGANIGRAMME_IN_MAINTENANCE === 'true';
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
  { name: 'Steve Bandou-Naitoll', role: 'Président', image: placeholderPhoto },
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
      { name: 'Steve Bandou-Naitoll', role: 'Responsable', detail: 'Informatique', image: placeholderPhoto },
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
        'group relative overflow-hidden bg-white rounded-2xl px-2 pb-4 pt-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2',
        isExecutive ? 'border-primary/50' : 'border-primary/15',
      ].join(' ')}
    >
      {/* Decorative gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-secondary" />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <ImageWithFallback
            src={member.image ?? placeholderPhoto}
            alt={member.name}
            className="h-20 w-20 rounded-full border-4 border-secondary object-cover shadow-md md:w-24 md:h-24"
          />
        </div>
        <div>
          <h3 className="font-primary text-2xl md:text-3xl leading-none tracking-wide text-primary">{member.name}</h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-secondary">{member.role}</p>
          {member.detail && <p className="mt-1 text-sm text-primary-accent">{member.detail}</p>}
        </div>
      </div>
    </motion.article>
  );
}

function MaintenanceBlock() {
  return (
    <Section className="bg-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-2 border-primary/15 bg-white shadow-sm"
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-secondary" />

        <div className="grid items-center gap-8 p-6 pt-8 md:grid-cols-2 md:gap-10 md:p-10 md:pt-12">
          <div className="order-2 text-center md:order-1 md:text-left">
            <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-secondary/10 px-3 py-1.5 text-secondary">
              <Construction className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-wide">Temps mort</span>
            </div>

            <h2 className="font-primary text-5xl leading-none text-primary md:text-6xl">
              Page en cours de construction
            </h2>

            <p className="mt-4 text-base text-primary-accent md:text-lg">
              Les membres du CLTO seront bientôt prêts à vous accueillir ! Nous vous attendons nombreux sur les terrains ;)
            </p>

            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-white transition-colors duration-200 hover:bg-primary-accent"
            >
              <Home className="h-4 w-4" />
              <span>Retour à l&apos;accueil</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="order-1 overflow-hidden rounded-xl md:order-2"
          >
            <ImageWithFallback
              src={maintenanceImage}
              alt="Raquette et volants de badminton sur un terrain"
              className="h-56 w-full object-cover md:h-72"
            />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}

export function OrganigrammePage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.ORGANIGRAMME);

  return (
    <>
      <PageHero
        title="ORGANIGRAMME"
        subtitle="Organigramme 2026-2027 du CLTO Badminton"
        image={bandeauImage}
      />

      {isInMaintenance ? (
        <MaintenanceBlock />
      ) : (
        <Section className="bg-white">
          {/* CA */}
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

          <div className="mx-auto mb-20 grid max-w-6xl gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {executiveBoard.map((member) => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} isExecutive />
            ))}
          </div>

          {/* Salariés */}
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

          <div className="mx-auto mb-20 grid max-w-6xl gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {staffMembers.map((member) => (
              <MemberCard key={`${member.name}-${member.role}`} member={member} />
            ))}
          </div>

          {/* Commissions */}
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
                className="rounded-2xl border border-primary/20 bg-white/90 px-3 py-5 shadow-sm backdrop-blur-sm"
              >
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-10 w-1.5 rounded-full bg-secondary" />
                  <h3 className="font-primary text-4xl leading-none text-primary">{section.title}</h3>
                </div>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                  {section.members.map((member) => (
                    <MemberCard key={`${section.title}-${member.name}-${member.role}`} member={member} />
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}