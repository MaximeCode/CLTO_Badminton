import { useContext, useEffect, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Mail, Phone, ChevronDown, MapPin, Download } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { InscriptionWizard } from '../components/InscriptionWizard';

import { ContactContext } from '../contexts/ContactContext';
import type { Contact } from '@/types/contactType';

import { formatTime, joinDays } from '@/utils/showHoraires';
import { Link } from 'react-router';
import { PageAdherer, Document } from '@/types/pageAdhererType';
import { getPageAdherer } from '@/api/strapi/pageAdherer';
import { BlocksRenderer } from '../components/BlocksRenderer';

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
                console.log('pageAdhererDatas:', data);
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
    const documents = pageAdhererDatas?.documents ?? [];
    return (
        <>
            <PageHero
                title="ADHERER AU CLUB"
                subtitle="Retrouvez toutes les informations pour rejoindre le CLTO Badminton"
            />

            <section className="bg-linear-to-b from-primary/3 via-white to-primary/2 py-10 md:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">

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

                    {/* Assistant interactif : cas d'inscription */}
                    <section className="mb-8 sm:mb-12">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="font-primary text-2xl text-primary sm:text-3xl md:text-4xl lg:text-5xl">
                                Prêt(e) à vous inscrire ?
                            </h2>
                            <p className="mt-2 text-sm text-primary-accent sm:mt-3 sm:text-base md:text-lg">
                                Répondez à quelques questions pour afficher les instructions correspondant à votre situation.<br />
                                <span className='md:text-sm text-secondary-accent/80 italic'>
                                    À noter : le compte My-FFBAD est personnel. Si vous souhaitez prendre plusieurs licences (famille, conjoint...), connectez-vous à chacun des comptes pour faire les demandes individuellement.
                                </span>
                            </p>
                        </div>

                        <InscriptionWizard
                            casInscriptions={casInscriptions}
                            isLoading={!pageAdhererDatas && !loadError}
                            loadError={loadError}
                        />
                    </section>

                    <div className='grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8'>
                        {/* Dynamic blocs panels */}
                        {contentBlocs.length > 0 &&
                            contentBlocs.map((bloc) => (
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
                            ))
                        }

                        {/* Contact panel — hardcoded, uses ContactContext */}
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

                        {/* Documents panel */}
                        <CollapsiblePanel
                            id="documents"
                            title="Documents"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <div className="space-y-4 text-sm text-primary-accent sm:text-base">
                                <p className="italic text-primary-accent/80">
                                    Trouver ici tous les documents nécessaires pour votre inscription au CLTO Badminton Orléans
                                </p>

                                <ul className="flex flex-col gap-3 pt-1">
                                    {documents.map((document) => (
                                        <li key={document.id}>
                                            <a
                                                href={document.document.url}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex w-full items-center gap-3 rounded-xl border border-primary/15 bg-primary/3 px-4 py-3 text-left transition-all duration-200 hover:border-secondary/40 hover:bg-secondary/10 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                                            >
                                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
                                                    <Download size={18} strokeWidth={2.25} />
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block font-medium text-primary group-hover:text-primary-accent">
                                                        {document.libelle}
                                                    </span>
                                                    <span className="mt-0.5 block text-xs text-primary-accent/70">
                                                        Télécharger le document
                                                    </span>
                                                </span>
                                                <ExternalLink
                                                    size={16}
                                                    className="shrink-0 text-primary-accent/40 transition-colors group-hover:text-secondary"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CollapsiblePanel>
                    </div>
                </div>
            </section>
        </>
    );
}
