import { PageHero } from '../../components/PageHero';
import { motion } from 'motion/react';
import { Trophy, Calendar, Target, Users, Award } from 'lucide-react';
import { Link } from 'react-router';

const adultCompetitions = [
    {
        name: 'Interclubs',
        description: 'De la Nationale 2 a la Departementale 1 - 5 equipes engagees',
        period: 'Septembre - Avril',
    },
    {
        name: 'Tournois Homologues',
        description: 'Participation aux tournois du calendrier regional et national',
        period: "Toute l'annee",
    },
    {
        name: 'Championnats Individuels',
        description: 'Championnats departementaux, regionaux et nationaux',
        period: 'Janvier - Mai',
    },
    {
        name: 'Tournoi Open du Club',
        description: 'Notre grand rendez-vous annuel ouvert a tous',
        period: 'Mars',
    },
];

const youthCompetitions = [
    {
        name: 'Championnat Departemental Jeunes',
        description: "Competition officielle par categorie d'age",
        period: 'Octobre - Mai',
    },
    {
        name: 'Tournois Regionaux',
        description: 'Participation aux tournois du calendrier regional',
        period: "Toute l'annee",
    },
    {
        name: 'Interclubs Jeunes',
        description: 'Rencontres par equipes entre clubs',
        period: 'Janvier - Avril',
    },
    {
        name: 'Tournoi Interne du Club',
        description: 'Competition conviviale entre les jeunes du club',
        period: 'Juin',
    },
];

const supportPoints = [
    {
        icon: Trophy,
        title: 'Entrainements competition',
        description: 'Des seances dediees pour preparer les joueurs adultes et jeunes.',
    },
    {
        icon: Target,
        title: 'Progression technique',
        description: 'Travail technique et tactique adapte selon les objectifs de chacun.',
    },
    {
        icon: Users,
        title: "Esprit d'equipe",
        description: 'Un cadre collectif pour progresser, se depasser et representer le club.',
    },
    {
        icon: Award,
        title: 'Suivi encadre',
        description: 'Un accompagnement progressif pour decouvrir puis performer en competition.',
    },
];

export function CompetiteursPage() {
    return (
        <>
            <PageHero
                title="COMPETITEUR"
                subtitle="Une filiere competition complete pour adultes et jeunes"
                image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <section className="py-10 md:py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            COMPETITIONS ADULTES
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {adultCompetitions.map((competition, index) => (
                            <motion.div
                                key={competition.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-50 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="font-primary text-2xl text-primary mb-3">
                                    {competition.name}
                                </h3>
                                <p className="text-gray-600 mb-4">{competition.description}</p>
                                <div className="flex items-center gap-2 text-secondary">
                                    <Calendar size={20} />
                                    <span className="font-semibold">{competition.period}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-20 bg-gray-50">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            COMPETITIONS JEUNES
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {youthCompetitions.map((competition, index) => (
                            <motion.div
                                key={competition.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="font-primary text-2xl text-primary mb-3">
                                    {competition.name}
                                </h3>
                                <p className="text-gray-600 mb-4">{competition.description}</p>
                                <div className="flex items-center gap-2 text-secondary">
                                    <Calendar size={20} />
                                    <span className="font-semibold">{competition.period}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            ACCOMPAGNEMENT COMPETITION
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {supportPoints.map((point, index) => {
                            const Icon = point.icon;
                            return (
                                <motion.div
                                    key={point.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-gray-50 rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="font-primary text-xl text-primary mb-3">
                                        {point.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{point.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
                    >
                        <Trophy className="mx-auto mb-6" size={64} />
                        <h2 className="font-primary text-4xl mb-4">REJOINDRE LE GROUPE</h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Vous souhaitez integrer la filiere competition adulte ou jeunes ?
                            Contactez-nous pour echanger sur votre projet sportif.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
                        >
                            Nous contacter
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
