import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, FileText, Mail, Phone, ChevronDown } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../components/ui/accordion';

const bgPromo = new URL('../../imports/bg-promo.jpg', import.meta.url).href;

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
            "A noter : si avez déjà été licencié dans un club avant la saison 24-25, le secrétariat fera le rapprochement lors de la réception du dossier.",
        ],
    },
    {
        id: 'cas-2',
        title: "Cas 2 - J'étais licencié au CLTO Badminton pendant la saison 2024-2025",
        content: [
            "Vous recevrez un mail courant août avec un lien personnalisé pour votre réinscription. Si le lien ne fonctionne pas ou si vous ne recevez pas le mail, suivez la procédure ci-dessous :",
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
            "Si vous êtes déjà licencié dans un club mais que vous souhaitez bénéficier des créneaux du CLTO pour compléter votre semaine, deux possibilités s'offrent à vous :",
            'Licence complémentaire Loisir : accès à tous les créneaux de jeu libre Loisir.',
            'Licence complémentaire compétiteur : accès aux créneaux de jeu libre compétiteur, et possibilité de prendre un supplément entraînement.',
            '1. Complétez la demande de licence complémentaire : LIEN',
            "2. Si votre demande est acceptée, vous serez alors invité à compléter votre dossier en ligne de la même façon que pour une nouvelle licence classique.",
            '3. Rendez-vous sur le site www.myffbad.fr',
            "4. Connectez-vous à votre compte à l'aide de vos identifiants (numéro de licence et mot de passe personnel)",
            '5. Dans la barre de recherche, écrivez "CLTO" puis indiquez "un club" dans le menu déroulant',
            '6. Cliquez sur "je m\'inscris dans ce club"',
            '7. Vous êtes sur le dossier, laissez-vous guider !',
        ],
        warning:
            "Attention : Les licences complémentaires compétiteur sont soumises à validation par le CA : chaque candidature sera analysée en fonction des places disponibles, de l'intérêt pour le joueur, et de l'intérêt pour les deux clubs.",
    },
];

const paymentMethods = [
    "Carte bancaire : nouveau, lors de la réception du 2e mail de validation reçu de la FFBad. Ce mode permet un paiement en 2 ou 3 fois et la validation automatique de la licence. A privilégier.",
    'Virement (IBAN : FR76 3004 7146 7000 0203 5420 117) en totalité et une seule fois. Merci d’indiquer "LICENCE" et le nom du joueur en libellé.',
    "Chèque bancaire (ordre : CLTO Badminton), paiement autorisé en trois fois maximum sur trois mois consécutifs. La totalité des chèques doit être remise en même temps.",
    "Dispositif Pass' Loisir : 80 € de réduction maximale, valable pour les licences jeunes uniquement pour les familles éligibles. Date limite : 10 novembre 2025.",
    'Dispositif Pass-Sport : 70 € de réduction, valable sur les licences jeunes et licences étudiantes boursières. Date limite : 31 décembre 2025.',
    "Dispositif Yep's : 20 € de réduction, valable pour les 15-25 ans. Date limite : 15 décembre 2025.",
    "Chèques vacances (format dématérialisé privilégié), Coupons Sport, Chèque Up Sport & Loisir, espèces (uniquement en cas d'impossibilité d'un autre moyen).",
];

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

    return (
        <>
            <PageHero
                title="ADHERER AU CLUB"
                subtitle="Toutes les informations d'inscription pour la saison 2025-2026"
                image={bgPromo}
            />

            <section className="bg-gradient-to-b from-[#f7fbff] via-white to-[#f5f9ff] py-10 md:py-16">
                <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 rounded-2xl border border-primary/15 bg-white p-5 shadow-sm sm:mb-10 sm:p-6 md:p-8"
                    >
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-secondary sm:mb-3 sm:text-sm">
                            MAJ : 11 août 2025
                        </p>
                        <h1 className="mb-3 font-primary text-3xl text-primary sm:mb-4 sm:text-4xl md:text-5xl lg:text-6xl">
                            Bienvenue au CLTO Badminton
                        </h1>
                        <p className="mb-2 text-lg font-semibold text-primary-accent sm:text-xl">
                            Saison 2025-2026 - Les inscriptions sont ouvertes !
                        </p>
                        <p className="text-sm text-primary-accent sm:text-base">
                            Le dossier d&apos;inscription se complète exclusivement en ligne, merci de prendre connaissance des
                            informations ci-dessous.
                        </p>
                    </motion.div>

                    <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        <CollapsiblePanel
                            id="avant-debuter"
                            title="Avant de debuter"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <ul className="space-y-3 text-sm text-primary-accent sm:text-base">
                                <li>Pour les joueurs mineurs : l&apos;attestation parentale complétée et signée.</li>
                                <li>
                                    Votre justificatif si vous avez droit à une réduction (carte étudiant, attestation chômage pôle
                                    emploi, attestation RSA, livret de famille).
                                </li>
                                <li>
                                    Votre certificat médical si nécessaire. Nouvelle règle 25-26 : si vous répondez &quot;Oui&quot; à une question
                                    du questionnaire de santé, un certificat de moins de 6 mois est obligatoire.
                                </li>
                            </ul>
                            <div className="mt-4 space-y-2 text-sm text-primary">
                                <p>Liens : Autorisation parentale 25-26, questionnaire de santé adulte, questionnaire de santé jeune, certificat médical.</p>
                            </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                            id="modalites-paiement-intro"
                            title="Modalites de paiement"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <p className="text-sm text-primary-accent sm:text-base">
                                Après finalisation du dossier, vous recevrez un accusé de réception automatique FFBad puis un second
                                mail quand votre dossier sera validé par le club (dossier complet).
                            </p>
                            <p className="mt-3 font-semibold text-primary sm:mt-4">
                                Merci de ne procéder au paiement qu&apos;après réception de ce deuxième message.
                            </p>
                            <p className="mt-3 text-sm text-primary-accent sm:mt-4 sm:text-base">
                                Pour plus d&apos;informations (tarifs détaillés, planning et descriptif des créneaux, séances
                                d&apos;essai, modes de paiement acceptés), ouvrez les sections ci-dessous.
                            </p>
                        </CollapsiblePanel>
                    </div>

                    <section className="mb-8 sm:mb-12">
                        <div className="mb-4 sm:mb-6">
                            <h2 className="font-primary text-3xl text-primary sm:text-4xl md:text-5xl lg:text-6xl">
                                Pret(e) a vous inscrire ?
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
                            {adhesionCases.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}
                                    className="border-primary/15 px-4 sm:px-6"
                                >
                                    <AccordionTrigger className="font-primary text-lg leading-snug text-primary hover:text-secondary hover:no-underline sm:text-xl lg:text-2xl hover:cursor-pointer">
                                        {item.title}
                                    </AccordionTrigger>
                                    <AccordionContent className="space-y-2 text-sm text-primary-accent sm:text-base">
                                        {item.content.map((line) => (
                                            <p key={line}>{line}</p>
                                        ))}
                                        {item.warning && (
                                            <p className="mt-4 rounded-lg border border-secondary/30 bg-secondary/10 p-3 text-sm text-secondary-accent">
                                                {item.warning}
                                            </p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>

                    <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        <CollapsiblePanel
                            id="infos-complementaires"
                            title="Informations complementaires"
                            subtitle="Créneaux 2025-2026"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <p className="mb-4 text-sm text-primary-accent sm:text-base">Cliquez ici pour consulter les créneaux : LIEN</p>
                            <ul className="space-y-3 text-sm text-primary-accent sm:text-base">
                                <li>Jeu libre : matchs libres entre les joueurs présents sur le créneau.</li>
                                <li>
                                    Cours Adultes : initiation, perfectionnement, élite (accès selon classement puis recommandations de
                                    l&apos;entraîneur).
                                </li>
                                <li>
                                    Cours Jeunes : regroupements par âges (Babybad, Minibad, Poussins, Benjamins, Minimes, Cadets) puis
                                    par niveaux (Débutant, Perfectionnement, Élites).
                                </li>
                                <li>
                                    Convention sportive avec le collège et lycée St Paul Bourdon Blanc, et créneaux Jeu libre pour tous.
                                </li>
                            </ul>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                            id="tarifs"
                            title="Tarifs 25-26"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <ul className="space-y-2 text-sm text-primary-accent sm:text-base">
                                <li>Adulte (Jeu Libre) : 195.00 €</li>
                                <li>Jeune (Jeu libre + 1 cours encadré / semaine) : 175.00 €</li>
                                <li>Minibad/Babybad (Jeu Libre créneau famille + 1 cours encadré / semaine) : 120.00 €</li>
                                <li>Renouvellement de licence : réduction de 20 €</li>
                                <li>Licence complémentaire adulte (Loisir ou Compétiteur) : 130 €</li>
                                <li>Licence complémentaire jeune : 100 €</li>
                                <li>Licence estivale (1er mai au 31 août 2026) : 45 €</li>
                                <li>Cours encadrés adultes : +100 € (1 cours) / +125 € (2 cours)</li>
                                <li>
                                    Cours encadrés jeunes : 1 cours inclus, +100 € (2 cours), +125 € (3 cours), selon accord entraîneur.
                                </li>
                                <li>
                                    A partir du 1er février 2026 : réduction mi-saison de 30 % (non cumulable avec réduction étudiant ou
                                    autre).
                                </li>
                            </ul>
                        </CollapsiblePanel>
                    </div>

                    <div className="mb-8 grid gap-4 sm:mb-12 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        <CollapsiblePanel
                            id="modes-paiement"
                            title="Modes de paiement"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <ul className="space-y-3 text-sm text-primary-accent sm:text-base">
                                {paymentMethods.map((method) => (
                                    <li key={method}>{method}</li>
                                ))}
                            </ul>
                            <div className="mt-4 rounded-lg bg-[#f7fbff] p-3 text-sm text-primary-accent sm:mt-5 sm:p-4 sm:text-base">
                                <p>
                                    Paiements possibles en ligne, remis en mains propres au siège, sur un créneau, ou envoyés au siège du
                                    CLTO Badminton (1 boulevard de Québec, 45000 ORLEANS).
                                </p>
                                <p className="mt-2">
                                    Le premier versement doit être au minimum de 70 € (adulte), 60 € (jeune), 30 € (miniBad).
                                </p>
                            </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                            id="seances-essai"
                            title="Seances d'essai"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <p className="mb-4 text-sm text-primary-accent sm:text-base">
                                Il est possible de faire jusqu&apos;à deux séances d&apos;essai.
                            </p>
                            <ul className="mb-4 space-y-2 text-sm text-primary-accent sm:text-base">
                                <li>Vous rendre sur le créneau de votre choix (LIEN créneaux).</li>
                                <li>Vous présenter à l&apos;entraîneur ou à l&apos;ouvreur responsable du créneau.</li>
                                <li>Scanner le QR code (LIEN) pour bénéficier de l&apos;assurance obligatoire FFBad.</li>
                            </ul>
                            <p className="text-sm text-secondary-accent">
                                Attention : à scanner uniquement le jour de votre essai car l&apos;assurance ne sera valide que ce
                                jour-là.
                            </p>
                            <p className="mt-4 text-sm text-primary-accent sm:text-base">
                                Les volants sont fournis sur les créneaux, et nous possédons quelques raquettes de prêt pour les
                                séances d&apos;essai.
                            </p>
                        </CollapsiblePanel>
                    </div>

                    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                        <CollapsiblePanel
                            id="documents"
                            title="Documents"
                            subtitle="Tous les documents nécessaires à votre inscription"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <div className="space-y-3">
                                {docs.map((doc) => (
                                    <a
                                        key={doc.label}
                                        href={doc.href}
                                        className="flex items-center justify-between rounded-lg border border-primary/15 bg-[#f9fcff] px-4 py-3 text-sm text-primary transition-colors hover:border-secondary hover:text-secondary sm:text-base"
                                    >
                                        <span className="flex min-w-0 items-center gap-2">
                                            <FileText size={18} className="shrink-0" />
                                            <span className="truncate">{doc.label}</span>
                                        </span>
                                        <ExternalLink size={16} className="shrink-0" />
                                    </a>
                                ))}
                            </div>
                        </CollapsiblePanel>

                        <CollapsiblePanel
                            id="contact"
                            title="Nous contacter"
                            openPanel={openPanel}
                            onToggle={togglePanel}
                        >
                            <div className="space-y-4 text-sm text-primary-accent sm:text-base">
                                <p>1, Boulevard de Québec - 45000 Orléans</p>
                                <p className="flex items-center gap-2">
                                    <Phone size={16} className="shrink-0" />
                                    02.45.48.21.62
                                </p>
                                <p className="flex items-center gap-2">
                                    <Mail size={16} className="shrink-0" />
                                    contact@cltobadminton.fr
                                </p>
                                <div className="rounded-lg bg-[#f7fbff] p-3 text-sm sm:p-4">
                                    <p>Lundi et mardi de 9h30 à 16h - accueil physique</p>
                                    <p>Mercredi et jeudi de 9h30 à 16h - uniquement par téléphone, SMS, WhatsApp ou par mail</p>
                                </div>
                                <p className="text-sm">
                                    Des bénévoles du club sont présents régulièrement sur les créneaux. N&apos;hésitez pas à faire appel
                                    à eux en cas de difficulté.
                                </p>
                            </div>
                        </CollapsiblePanel>
                    </div>
                </div>
            </section>
        </>
    );
}
