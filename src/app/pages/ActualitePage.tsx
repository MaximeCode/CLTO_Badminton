import { PageHero } from '../components/PageHero';
import { useParams, Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';

const bgPromo = new URL('../../imports/bg-promo.jpg', import.meta.url).href;
const gymnaseChardon = new URL('../../imports/gymnase_chardon.jpg', import.meta.url)
    .href;
const presidentPhoto = new URL('../../imports/president.jpg', import.meta.url).href;
const userAvatar = new URL('../../imports/user.png', import.meta.url).href;

export function ActualitePage() {
    const { id } = useParams<{ id: string }>();
    const publicationDate = '12 avril 2026';
    const author = 'Équipe communication CLTO';

    return (
        <>
            <PageHero
                title={`ACTUALITÉ ${id}`}
                subtitle="Un aperçu complet du style éditorial et visuel des futurs articles CLTO"
                image={bgPromo}
            />

            <section className="py-10 md:py-20 bg-white">
                <div className="max-w-[960px] mx-auto px-6">
                    <div className="mb-6">
                        <Link
                            to="/actualites"
                            className="inline-flex items-center gap-2 rounded-md border border-primary/30 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                        >
                            <ArrowLeft size={16} />
                            Retour aux articles
                        </Link>
                    </div>
                    <article className="bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">
                        <header className="border-b border-gray-200 pb-6">
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
                                    Tournoi
                                </span>
                                <span>Publié le {publicationDate}</span>
                                <span>•</span>
                                <span>Lecture: 5 min</span>
                            </div>
                            <h2 className="mt-4 font-primary text-4xl text-primary">
                                19e Grandes Plumes écoresponsables d'Orléans
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Le rendez-vous phare du club revient avec une édition renforcée: plus de bénévoles, une organisation repensée et une expérience joueur/spectateur modernisée.
                            </p>
                        </header>

                        <div className="overflow-hidden rounded-lg border border-gray-200">
                            <img
                                src={gymnaseChardon}
                                alt="Gymnase Chardon prêt à accueillir les rencontres"
                                className="h-[320px] w-full object-cover"
                            />
                            <p className="bg-gray-50 px-4 py-3 text-sm text-gray-500">
                                Le gymnase Chardon accueillera une partie des tableaux simples et doubles.
                            </p>
                        </div>

                        <section className="space-y-4">
                            <h3 className="font-primary text-2xl text-primary">
                                Un tournoi pensé pour les joueurs et le public
                            </h3>
                            <p>
                                Le club <strong>CLTO Badminton</strong> organise son tournoi annuel les <strong>20 et 21 décembre 2026</strong>, avec une volonté claire: proposer un événement fluide, lisible et convivial à chaque instant de la journée.
                            </p>
                            <p>
                                Cette édition réunira <strong>plus de 400 joueurs</strong>, des catégories <strong>P12 à N1</strong>, sur deux jours intenses où chaque rotation de terrain sera optimisée pour limiter les temps d'attente.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h3 className="font-primary text-2xl text-primary">
                                Une démarche écoresponsable concrète
                            </h3>
                            <p>
                                Les Grandes Plumes poursuivent leur engagement: réduction des impressions papier, signalétique réutilisable, tri renforcé dans les zones de passage et mise en avant des mobilités douces pour les participants locaux.
                            </p>
                            <p>
                                Un espace restauration repensé mettra en avant des produits locaux et des contenants durables, en cohérence avec les valeurs du club et les attentes de nos partenaires institutionnels.
                            </p>
                        </section>

                        <blockquote className="rounded-lg border-l-4 border-secondary bg-amber-50 px-5 py-4 text-amber-900">
                            <p className="italic">
                                "Nous voulons que chaque participant reparte avec l'image d'un tournoi exigeant sportivement, mais aussi accueillant et responsable."
                            </p>
                            <footer className="mt-2 text-sm font-semibold">
                                — Comité d'organisation CLTO
                            </footer>
                        </blockquote>

                        <section className="space-y-4">
                            <h3 className="font-primary text-2xl text-primary">
                                Zoom sur l'expérience spectateur
                            </h3>
                            <p>
                                Le nouveau style de l'application permet d'aller plus loin: meilleure hiérarchie des contenus, accès rapide aux infos pratiques, et mise en avant des temps forts en direct.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Programme de la journée lisible dès l'arrivée sur la page</li>
                                <li>Mise en avant des finales et affichage simplifié des terrains</li>
                                <li>Blocs "infos utiles" persistants pour les visiteurs</li>
                            </ul>
                        </section>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <img
                                    src={presidentPhoto}
                                    alt="Portrait du président du club"
                                    className="h-52 w-full object-cover"
                                />
                                <p className="px-4 py-3 text-sm text-gray-500">
                                    Une communication plus humaine, avec des prises de parole régulières du bureau.
                                </p>
                            </div>
                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <img
                                    src={userAvatar}
                                    alt="Avatar utilisateur"
                                    className="h-52 w-full object-contain bg-gray-50"
                                />
                                <p className="px-4 py-3 text-sm text-gray-500">
                                    Des encarts profils pour identifier rapidement les intervenants de l'événement.
                                </p>
                            </div>
                        </div>

                        <footer className="pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3">
                                <img
                                    src={userAvatar}
                                    alt="Auteur de l'article"
                                    className="h-12 w-12 rounded-full object-cover border border-gray-200"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{author}</p>
                                    <p className="text-sm text-gray-500">
                                        Publication éditoriale de démonstration
                                    </p>
                                </div>
                            </div>
                        </footer>
                    </article>
                </div>
            </section>
        </>
    );
}