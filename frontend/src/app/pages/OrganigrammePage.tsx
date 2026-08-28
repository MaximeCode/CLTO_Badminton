import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Seo } from '../components/Seo';
import { motion } from 'motion/react';
import { Construction, Home, Mail } from 'lucide-react';
import { Link } from 'react-router';
import maintenanceImage from '../../imports/organigramme-maintenance.jpg';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Section } from '../components/Section';
import { getOrgContacts } from '@/api/gestion/contacts';
import type { OrgContact } from '@/types/orgContactsType';

const isInMaintenance = import.meta.env.VITE_ORGANIGRAMME_IN_MAINTENANCE === 'true';
const placeholderPhoto = new URL('../../imports/user.png', import.meta.url).href;

/** Partie 1 : CA + commissions (dont ouvreurs / bénévoles). Partie 2 : salariés. */
const PART1_GROUP_ORDER = [
  "Conseil d'administration",
  'Bénévoles',
  'gymnase',
] as const;

const PART2_GROUP_ORDER = ['Salariés', 'Service civique'] as const;

const GROUP_TITLES: Record<string, string> = {
  "Conseil d'administration": "Conseil d'administration",
  Bénévoles: 'Entraîneurs bénévoles',
  gymnase: 'Commission ouvreurs',
  Salariés: 'Salariés',
  'Service civique': 'Service civique',
};

function displayName(contact: OrgContact): string {
  const prenom = contact.prenom.trim();
  const nom = contact.nom.trim();
  const nomFormatted =
    nom.charAt(0).toUpperCase() + nom.slice(1).toLowerCase();
  return `${prenom} ${nomFormatted}`.trim();
}

function MemberCard({
  contact,
  isExecutive = false,
  headingLevel = 3,
}: {
  contact: OrgContact;
  isExecutive?: boolean;
  headingLevel?: 3 | 4;
}) {
  const HeadingTag = headingLevel === 4 ? 'h4' : 'h3';
  const name = displayName(contact);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.45,
        layout: { duration: 0.28, ease: 'easeInOut' },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setHovered(false);
        }
      }}
      tabIndex={contact.email ? 0 : undefined}
      className={[
        'group relative overflow-hidden bg-white rounded-2xl px-2 pb-4 pt-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 outline-hidden focus-visible:ring-2 focus-visible:ring-secondary/60 focus-visible:ring-offset-2',
        isExecutive ? 'border-primary/50' : 'border-primary/15',
      ].join(' ')}
    >
      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-secondary" />

      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative">
          <ImageWithFallback
            src={contact.photoUrl || placeholderPhoto}
            alt={name}
            className="h-20 w-20 rounded-full border-4 border-secondary object-cover shadow-md md:w-24 md:h-24"
          />
        </div>
        <div>
          <HeadingTag className="font-primary text-2xl md:text-3xl leading-none tracking-wide text-primary">
            {name}
          </HeadingTag>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-secondary">
            {contact.fonction}
          </p>
          {contact.email ? (
            <div
              className={`grid w-full overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${hovered ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              aria-hidden={!hovered}
            >
              <div className="min-h-0 overflow-hidden">
                <motion.a
                  href={`mailto:${contact.email}`}
                  initial={false}
                  animate={{
                    opacity: hovered ? 1 : 0,
                    y: hovered ? 0 : 6,
                  }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  tabIndex={hovered ? 0 : -1}
                  className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 text-sm text-primary-accent hover:text-secondary transition-colors duration-200 break-all ${hovered ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                >
                  <Mail size={14} className="shrink-0" />
                  {contact.email}
                </motion.a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

function GroupBlock({
  title,
  contacts,
  isExecutive = false,
}: {
  title: string;
  contacts: OrgContact[];
  isExecutive?: boolean;
}) {
  if (contacts.length === 0) return null;

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h3 className="mb-4 font-primary text-4xl text-primary md:text-5xl">{title}</h3>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contacts.map((contact) => (
          <MemberCard
            key={`${contact.id}-${contact.typeCode}`}
            contact={contact}
            isExecutive={isExecutive}
          />
        ))}
      </div>
    </div>
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
              Les membres du CLTO seront bientôt prêts à vous accueillir ! Nous vous attendons
              nombreux sur les terrains ;)
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
  const [contacts, setContacts] = useState<OrgContact[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (isInMaintenance) return;
    let cancelled = false;
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getOrgContacts();
        if (!cancelled) setContacts(data);
      } catch (error) {
        console.error('Error loading organigramme contacts:', error);
        if (!cancelled) {
          setLoadError(
            error instanceof Error ? error.message : 'Impossible de charger les données.',
          );
        }
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const byGroup = useMemo(() => {
    const map = new Map<string, OrgContact[]>();
    for (const contact of contacts) {
      const key = contact.typeGroupe || 'Autres';
      const list = map.get(key) ?? [];
      list.push(contact);
      map.set(key, list);
    }
    return map;
  }, [contacts]);

  return (
    <>
      <Seo
        title="Conseil d'administration"
        description="Conseil d'administration et organigramme du CLTO Badminton Orléans, club de badminton à Orléans."
      />
      <PageHero
        title="ORGANIGRAMME"
        subtitle="Organigramme 2026-2027 du CLTO Badminton"
        image={bandeauImage}
      />

      {isInMaintenance ? (
        <MaintenanceBlock />
      ) : (
        <Section className="bg-white">
          {loadError && (
            <p className="mb-8 text-center text-red-600" role="alert">
              {loadError}
            </p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-primary md:text-6xl">
              CA et commissions
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-primary-accent">
              Le conseil d&apos;administration, les commissions et les ouvreurs qui font vivre le
              club au quotidien.
            </p>
          </motion.div>

          {PART1_GROUP_ORDER.map((groupKey) => (
            <GroupBlock
              key={groupKey}
              title={GROUP_TITLES[groupKey] ?? groupKey}
              contacts={byGroup.get(groupKey) ?? []}
              isExecutive={groupKey === "Conseil d'administration"}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <h2 className="mb-4 font-primary text-5xl text-primary md:text-6xl">Les salariés</h2>
            <p className="mx-auto max-w-3xl text-lg text-primary-accent">
              L&apos;équipe salariée du club, au service des adhérents au quotidien.
            </p>
          </motion.div>

          {PART2_GROUP_ORDER.map((groupKey) => (
            <GroupBlock
              key={groupKey}
              title={GROUP_TITLES[groupKey] ?? groupKey}
              contacts={byGroup.get(groupKey) ?? []}
            />
          ))}
        </Section>
      )}
    </>
  );
}
