import { useContext, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Mail, Phone, ChevronDown, MapPin } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../components/ui/accordion';

import { ContactContext } from '../contexts/ContactContext';
import type { Contact } from '@/types/contactType';

import { formatTime, joinDays } from '@/utils/showHoraires';
import { Link } from 'react-router';
import { PageAdherer } from '@/types/pageAdhererType';
import { getPageAdherer } from '@/api/strapi/pageAdherer';
import { BlocksRenderer } from '../components/BlocksRenderer';

/* OLD DATA 

const docs = [
    { label: 'Certificat Médical 25-26', href: '#' },
    { label: 'Autorisation parentale 25-26', href: '#' },
    { label: 'Créneaux 25-26', href: '#' },
];

const adhesionCases = [
    {
        id: 'cas-1',
        title: "Cas 1 - Je n'avais pas de licence FFBad pendant la saison 2024-2025",
        content: [
            "Cliquez sur ce lien pour accéder au dossier d'inscription : https://adherer.ffbad.club/CLTO45",
            "A noter : si avez déjà été licencié dans un club avant la saison 24-25, le secrétariat fera le rapprochement lors de la réception du 
            dossier.",
        ],
    },
    {
        id: 'cas-2',
        title: "Cas 2 - J'étais licencié au CLTO Badminton pendant la saison 2024-2025",
        content: [
            "Vous recevrez un mail courant août avec un lien personnalisé pour votre réinscription. Si le lien ne fonctionne pas ou si vous ne 
            recevez pas le mail, suivez la procédure ci-dessous :",
            '1. Rendez-vous sur le site www.myffbad.fr',
            "2. Connectez-vous à votre compte à l'aide de vos identifiants (numéro de licence et mot de passe personnel)",
            '3. Cliquez sur votre nom pour afficher le menu',
            "4. Cliquez sur « renouveler votre adhésion »",
            '5. Vous êtes sur le dossier (pré complété), laissez-vous guider !',
        ],
    },
    {
        id: 'cas-3',
        title: "Cas 3 - J'avais une licence dans un autre club pendant la saison 2024-2025",
        content: [
            '1. Rendez-vous sur le site www.myffbad.fr',
            "2. Connectez-vous à votre compte à l'aide de vos identifiants (numéro de licence et mot de passe personnel)",
            '3. Dans la barre de recherche, écrivez "CLTO" puis indiquez "un club" dans le menu déroulant',
            '4. Cliquez sur "je m\'inscris dans ce club"',
            '5. Vous êtes sur le dossier, laissez-vous guider !',
        ],
    },
    {
        id: 'cas-4',
        title: "Cas 4 - J'ai déjà une licence dans un autre club pour la saison 2025-2026 (demande de licence complémentaire)",
        content: [
            "Si vous êtes déjà licencié dans un club mais que vous souhaitez bénéficier des créneaux du CLTO pour compléter votre semaine, deux 
            possibilités s'offrent à vous :",
            'Licence complémentaire Loisir : accès à tous les créneaux de jeu libre Loisir.',
            'Licence complémentaire compétiteur : accès aux créneaux de jeu libre compétiteur, et possibilité de prendre un supplément 
            entraînement.',
            '1. Complétez la demande de licence complémentaire : LIEN',
            "2. Si votre demande est acceptée, vous serez alors invité à compléter votre dossier en ligne de la même façon que pour une nouvelle 
            licence classique.",
            '3. Rendez-vous sur le site www.myffbad.fr',
            "4. Connectez-vous à votre compte à l'aide de vos identifiants (numéro de licence et mot de passe personnel)",
            '5. Dans la barre de recherche, écrivez "CLTO" puis indiquez "un club" dans le menu déroulant',
            '6. Cliquez sur "je m\'inscris dans ce club"',
            '7. Vous êtes sur le dossier, laissez-vous guider !',
        ],
        warning:
            "Attention : Les licences complémentaires compétiteur sont soumises à validation par le CA : chaque candidature sera analysée en 
            fonction des places disponibles, de l'intérêt pour le joueur, et de l'intérêt pour les deux clubs.",
    },
];

const paymentMethods = [
    "Carte bancaire : nouveau, lors de la réception du 2e mail de validation reçu de la FFBad. Ce mode permet un paiement en 2 ou 3 fois et la 
    validation automatique de la licence. A privilégier.",
    'Virement (IBAN : FR76 3004 7146 7000 0203 5420 117) en totalité et une seule fois. Merci d’indiquer "LICENCE" et le nom du joueur en libellé.
    ',
    "Chèque bancaire (ordre : CLTO Badminton), paiement autorisé en trois fois maximum sur trois mois consécutifs. La totalité des chèques doit 
    être remise en même temps.",
    "Dispositif Pass' Loisir : 80 € de réduction maximale, valable pour les licences jeunes uniquement pour les familles éligibles. Date limite : 
    10 novembre 2025.",
    'Dispositif Pass-Sport : 70 € de réduction, valable sur les licences jeunes et licences étudiantes boursières. Date limite : 31 décembre 2025.
    ',
    "Dispositif Yep's : 20 € de réduction, valable pour les 15-25 ans. Date limite : 15 décembre 2025.",
    "Chèques vacances (format dématérialisé privilégié), Coupons Sport, Chèque Up Sport & Loisir, espèces (uniquement en cas d'impossibilité d'un 
    autre moyen).",
];
 */

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
    return (
        <div className="mb-4 lg:mb-8">
            <h2 className="font-primary text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">{title}</h2>
            {subtitle && <p className="mt-2 max-w-4xl text-base text-primary-accent sm:mt-3 sm:text-lg">{subtitle}</p>}
        </div>
    );
}

function CollapsiblePanel({
    id,
    title,
    subtitle,
    openPanel,
    onToggle,
    children,
    className = '',
}: {
    id: string;
    title: string;
    subtitle?: string;
    openPanel: string | null;
    onToggle: (id: string) => void;
    children: ReactNode;
    className?: string;
}) {
    const open = openPanel === id;

    return (
        <article
            className={`rounded-2xl border border-primary/15 bg-white shadow-sm ${className}`}
        >
            <button
                type="button"
                onClick={() => onToggle(id)}
                aria-expanded={open}
                className="flex w-full items-start justify-between gap-3 p-4 text-left sm:p-5 lg:hidden"
            >
                <span className="min-w-0 flex-1">
                    <h2 className="font-primary text-2xl leading-tight text-primary sm:text-3xl">{title}</h2>
                    {subtitle && (
                        <p className="mt-1 text-sm text-primary-accent line-clamp-2">{subtitle}</p>
                    )}
                </span>
                <ChevronDown
                    size={22}
                    className={`mt-1 shrink-0 text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <div className="hidden lg:block lg:p-8">
                <SectionTitle title={title} subtitle={subtitle} />
                {children}
            </div>

            {open && <div className="border-t border-primary/10 px-4 pb-4 pt-3 sm:px-5 sm:pb-5 lg:hidden">{children}</div>}
        </article>
    );
}

export function AdhererPage() {
    const [openPanel, setOpenPanel] = useState<string | null>(null);

    const togglePanel = (id: string) => {
        setOpenPanel((current) => (current === id ? null : id));
    };

    const contact = useContext<Contact | null>(ContactContext);

    const [pageAdhererDatas, setPageAdhererDatas] = useState<PageAdherer | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                setLoadError(null);
                const data = await getPageAdherer();
                setPageAdhererDatas(data);
            } catch (error) {
                console.error('Error loading data:', error);
                setLoadError(
                    error instanceof Error ? error.message : 'Impossible de charger les données.',
                );
            }
        }
        loadData();
    }, []);

    const introBloc = pageAdhererDatas?.blocs[0];
    const contentBlocs = pageAdhererDatas?.blocs.slice(1) ?? [];
    const casInscriptions = pageAdhererDatas?.cas_inscriptions ?? [];

    return (
        <>
            <PageHero
                title="ADHERER AU CLUB"
                subtitle="Toutes les informations d'inscription pour la saison 2025-2026"
            />

            <section className="bg-gradient-to-b from-[#f7fbff] via-white to-[#f5f9ff] py-10 md:py-16">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

                    {/* Intro bloc */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm sm:mb-10 sm:p-6 md:p-8"
                    >
                        {introBloc ? (
                            <>
                                <h1 className="mb-3 font-primary text-3xl text-primary sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                                    {introBloc.titre}
                                </h1>
                                {introBloc.sous_titre && (
                                    <p className="mb-2 text-lg font-semibold text-primary-accent sm:text-xl">
                                        {introBloc.sous_titre}
                                    </p>
                                )}
                                <div className="[&_p]:mb-0 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_p]:text-base">
                                    <BlocksRenderer content={introBloc.contenu} />
                                </div>
                            </>
                        ) : loadError ? (
                            <p className="text-sm text-red-500">{loadError}</p>
                        ) : (
                            <p className="text-sm text-primary-accent">Chargement...</p>
                        )}
                    </motion.div>

                    {/* Accordion : cas d'inscription */}
                    <section className="mb-8 sm:mb-12">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="font-primary text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                                Prêt(e) à vous inscrire ?
                            </h2>
                            <p className="mt-2 text-sm text-primary-accent sm:mt-3 sm:text-base md:text-lg">
                                Déterminez votre situation, et on vous explique tout. Le compte My-FFBAD est personnel : pour plusieurs licences (famille, conjoint...), connectez-vous à chaque compte individuellement.
                            </p>
                        </div>
                        <Accordion
                            type="single"
                            collapsible
                            className="overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-sm"
                        >
                            {casInscriptions.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={String(item.id)}
                                    className="border-primary/15 px-4 sm:px-6"
                                >
                                    <AccordionTrigger className="font-primary text-lg leading-snug text-primary hover:text-secondary hover:no-underline sm:text-xl lg:text-2xl hover:cursor-pointer">
                                        {item.titre}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-primary-accent sm:text-base">
                                        <div className="[&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_p]:text-base [&_li]:text-sm sm:[&_li]:text-base [&_li]:text-primary-accent">
                                            <BlocksRenderer content={item.contenu} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>

                    {/* Dynamic blocs panels */}
                    {contentBlocs.length > 0 && (
                        <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                            {contentBlocs.map((bloc) => (
                                <CollapsiblePanel
                                    key={bloc.id}
                                    id={String(bloc.id)}
                                    title={bloc.titre}
                                    subtitle={bloc.sous_titre}
                                    openPanel={openPanel}
                                    onToggle={togglePanel}
                                >
                                    <div className="[&_p]:mb-2 [&_p]:text-sm [&_p]:text-primary-accent sm:[&_p]:text-base [&_li]:text-sm sm:[&_li]:text-base [&_li]:text-primary-accent [&_a]:text-secondary">
                                        <BlocksRenderer content={bloc.contenu} />
                                    </div>
                                </CollapsiblePanel>
                            ))}
                        </div>
                    )}

                    {/* Contact panel — hardcoded, uses ContactContext */}
                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        <CollapsiblePanel
                            id="contact"
                            title="Nous contacter"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <div className="space-y-4 text-sm text-primary-accent sm:text-base">
                                <p className="flex items-center gap-2">
                                    <MapPin size={16} className="shrink-0" />
                                    {contact?.adresse}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Phone size={16} className="shrink-0" />
                                    {contact?.telephone}
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={16} className="shrink-0" />
                                    {contact?.email}
                                </p>
                                <p>
                                    <strong>{contact ? joinDays(contact.jour_accueils_physique) : '—'}&nbsp;:</strong>{' '}
                                    {contact ? `${formatTime(contact.heure_debut_accueils_physique)} à ${formatTime(contact.heure_fin_accueils_physique)}` : '—'} — accueil physique
                                </p>
                                <p>
                                    <strong>{contact ? joinDays(contact.jour_accueils_a_distance) : '—'}&nbsp;:</strong>{' '}
                                    {contact ? `${formatTime(contact.heure_debut_accueils_a_distance)} à ${formatTime(contact.heure_fin_accueils_a_distance)}` : '—'} — uniquement par téléphone, SMS, WhatsApp ou par mail
                                </p>
                                <p className="text-sm">
                                    Des bénévoles du club sont présents régulièrement sur les créneaux. N&apos;hésitez pas à faire appel
                                    à eux en cas de difficulté.
                                </p>
                                <div className="pt-2">
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 rounded-md bg-secondary px-5 py-2 text-white font-medium hover:bg-secondary/80 transition-colors"
                                    >
                                        Plus d&apos;informations sur la page Contact
                                        <ExternalLink size={16} className="shrink-0" />
                                    </Link>
                                </div>
                            </div>
                        </CollapsiblePanel>
                    </div>

                </div>
            </section>
        </>
    );
}
