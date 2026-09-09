import { useEffect, useMemo, useState } from 'react';
import { PageHero } from '../components/PageHero';
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Seo } from '../components/Seo';
import { motion } from 'motion/react';
import { Construction, Home, Mail } from 'lucide-react';
import { Link } from 'react-router';
import maintenanceImage from '../../imports/organigramme-maintenance.webp';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Section } from '../components/Section';
import { getOrgContacts } from '@/api/gestion/contacts';
import type { OrgContact } from '@/types/orgContactsType';

const isInMaintenance = import.meta.env.VITE_ORGANIGRAMME_IN_MAINTENANCE === 'true';
const placeholderPhoto = new URL('../../imports/user.webp', import.meta.url).href;

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

function isPresident(contact: OrgContact): boolean {
  return contact.fonction.trim().toLowerCase() === 'président';
}

function contactKey(contact: OrgContact): string {
  return `${contact.id}-${contact.typeCode}`;
}

/** Président en tête ; ordre API conservé pour les autres (sort stable). */
function withPresidentFirst(contacts: OrgContact[]): OrgContact[] {
  return [...contacts].sort((a, b) => {
    const aPres = isPresident(a);
    const bPres = isPresident(b);
    if (aPres === bPres) return 0;
    return aPres ? -1 : 1;
  });
}

/** Survol réel (desktop) — évite d'ouvrir le footer au tap mobile via mouseenter synthétique. */
function isDesktopHoverDevice(): boolean {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

function MemberCard({
  contact,
  isExecutive = false,
  headingLevel = 3,
  footerOpen,
  onOpenFooter,
  onCloseFooter,
  onToggleFooter,
}: {
  contact: OrgContact;
  isExecutive?: boolean;
  headingLevel?: 3 | 4;
  footerOpen: boolean;
  onOpenFooter: () => void;
  onCloseFooter: () => void;
  onToggleFooter: () => void;
}) {
  const HeadingTag = headingLevel === 4 ? 'h4' : 'h3';
  const name = displayName(contact);
  const hasEmail = Boolean(contact.email);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.45,
        layout: { duration: 0.28, ease: 'easeInOut' },
      }}
      className="relative min-w-0"
      onMouseEnter={() => {
        if (hasEmail && isDesktopHoverDevice()) onOpenFooter();
      }}
      onMouseLeave={() => {
        if (hasEmail && isDesktopHoverDevice()) onCloseFooter();
      }}
    >
      <article
        className={[
          'group relative overflow-hidden bg-white rounded-2xl px-2 pb-4 pt-6 shadow-sm transition-shadow duration-300 border-2 outline-hidden',
          isExecutive ? 'border-primary/50' : 'border-primary/15',
          hasEmail ? 'hover:shadow-xl' : '',
        ].join(' ')}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary to-secondary" />

        {hasEmail ? (
          <button
            type="button"
            className={[
              'absolute top-4 right-2 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 text-primary shadow-sm transition-colors duration-200 hover:border-secondary hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 md:hidden',
              footerOpen ? 'bg-gray-200' : 'bg-white',
            ].join(' ')}
            aria-label={footerOpen ? "Masquer l'adresse e-mail" : "Afficher l'adresse e-mail"}
            aria-expanded={footerOpen}
            onClick={(event) => {
              event.stopPropagation();
              onToggleFooter();
            }}
          >
            <Mail size={16} aria-hidden />
          </button>
        ) : null}

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
          </div>
        </div>
      </article>

      {hasEmail ? (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${footerOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          aria-hidden={!footerOpen}
        >
          <div className={`min-h-0 ${footerOpen ? 'overflow-visible' : 'overflow-hidden'}`}>
            <div className="relative w-full pt-2 pb-1">
              {/* Réserve la hauteur d'une ligne à partir de sm (footer en absolute) */}
              <div
                className="pointer-events-none invisible hidden border-2 border-transparent px-3 py-2 text-sm sm:block"
                aria-hidden
              >
                &nbsp;
              </div>
              {/* <sm : dans le flux, largeur carte, wrap ; sm+ : centré sous la carte, une ligne */}
              <div className="w-full sm:absolute sm:left-1/2 sm:top-2 sm:z-20 sm:w-auto sm:-translate-x-1/2">
                <motion.a
                  href={`mailto:${contact.email}`}
                  initial={false}
                  animate={{
                    opacity: footerOpen ? 1 : 0,
                    y: footerOpen ? 0 : 8,
                  }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  tabIndex={footerOpen ? 0 : -1}
                  className={`flex w-full max-w-full items-center gap-2 break-all rounded-xl border-2 border-primary/15 bg-white px-3 py-2 text-left text-sm text-primary underline decoration-primary/40 underline-offset-2 shadow-sm transition-colors duration-200 hover:border-secondary/40 hover:text-secondary hover:decoration-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 sm:inline-flex sm:w-max sm:break-normal sm:whitespace-nowrap sm:text-center active:text-secondary ${footerOpen ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                >
                  <Mail size={14} className="shrink-0 self-start sm:self-center" aria-hidden />
                  <span>{contact.email}</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </motion.div>
  );
}

function GroupBlock({
  title,
  contacts,
  isExecutive = false,
  openFooterKey,
  onOpenFooterKey,
}: {
  title: string;
  contacts: OrgContact[];
  isExecutive?: boolean;
  openFooterKey: string | null;
  onOpenFooterKey: (key: string | null) => void;
}) {
  if (contacts.length === 0) return null;

  const orderedContacts = isExecutive ? withPresidentFirst(contacts) : contacts;

  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h3 className="mb-4 font-primary text-4xl text-primary md:text-5xl">{title}</h3>
      </motion.div>

      <div className="mx-auto grid max-w-6xl gap-4 md:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {orderedContacts.map((contact) => {
          const key = contactKey(contact);
          return (
            <MemberCard
              key={key}
              contact={contact}
              isExecutive={isExecutive}
              footerOpen={openFooterKey === key}
              onOpenFooter={() => onOpenFooterKey(key)}
              onCloseFooter={() => {
                if (openFooterKey === key) onOpenFooterKey(null);
              }}
              onToggleFooter={() => {
                onOpenFooterKey(openFooterKey === key ? null : key);
              }}
            />
          );
        })}
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
              Les membres du CLTO sont prêts à vous accueillir sur les <a href="/creneaux" className="text-primary underline">créneaux disponibles</a> ! Nous vous attendons
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
  const [openFooterKey, setOpenFooterKey] = useState<string | null>(null);

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
        title="Organigramme"
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
            <p className="mx-auto mt-3 max-w-3xl text-sm text-primary-accent/80 italic">
              Survolez une carte, ou touchez l&apos;icône e-mail sur mobile, pour afficher
              l&apos;adresse.
            </p>
          </motion.div>

          {PART1_GROUP_ORDER.map((groupKey) => (
            <GroupBlock
              key={groupKey}
              title={GROUP_TITLES[groupKey] ?? groupKey}
              contacts={byGroup.get(groupKey) ?? []}
              isExecutive={groupKey === "Conseil d'administration"}
              openFooterKey={openFooterKey}
              onOpenFooterKey={setOpenFooterKey}
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
              openFooterKey={openFooterKey}
              onOpenFooterKey={setOpenFooterKey}
            />
          ))}
        </Section>
      )}
    </>
  );
}
