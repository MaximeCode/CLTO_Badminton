import { PageHero } from '../../components/PageHero';
import { motion } from 'motion/react';
import { Calendar, Clock, Users, Target, Heart, Trophy } from 'lucide-react';
import { Link } from 'react-router';

const weeklySessions = [
    {
        day: 'Lundi',
        slot: '19h30 - 21h00',
        label: 'Initiation adultes',
    },
    {
        day: 'Mardi',
        slot: '19h30 - 22h00',
        label: 'Jeu libre et matchs',
    },
    {
        day: 'Jeudi',
        slot: '18h00 - 20h00',
        label: 'Créneau adultes tous niveaux',
    },
    {
        day: 'Vendredi',
        slot: '20h00 - 22h00',
        label: 'Jeu libre adultes',
    },
];

const formats = [
    {
        icon: Users,
        title: 'Loisir',
        description: 'Pour jouer régulièrement dans une ambiance conviviale, sans pression.',
    },
    {
        icon: Target,
        title: 'Progression',
        description: 'Des séances pour améliorer la technique, les déplacements et la tactique.',
    },
    {
        icon: Trophy,
        title: 'Compétition',
        description: 'Un accompagnement pour rejoindre les interclubs et tournois homologués.',
    },
];

const strengths = [
    {
        icon: Calendar,
        title: 'Semaine complète',
        description: 'Plusieurs créneaux du lundi au vendredi pour s’adapter aux emplois du temps.',
    },
    {
        icon: Clock,
        title: 'Rythme flexible',
        description: 'Vous choisissez les séances selon vos objectifs et votre disponibilité.',
    },
    {
        icon: Heart,
        title: 'Ambiance club',
        description: 'Un état d’esprit basé sur le partage, le plaisir de jouer et l’entraide.',
    },
];

export function AdultesPage() {
    return (
        <>
            <PageHero
                title="ADULTES"
                subtitle="Du loisir à la compétition, pratiquez le badminton à votre rythme"
                image="https://images.unsplash.com/photo-1599390270093-232c3e476f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjbHViJTIwYWR1bHRzfGVufDF8fHx8MTc4NTQ4NDUwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <section className="py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            NOS CRÉNEAUX ADULTES
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Des rendez-vous chaque semaine pour jouer, progresser et partager.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {weeklySessions.map((session, index) => (
                            <motion.div
                                key={`${session.day}-${session.slot}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-primary to-primary-accent rounded-lg p-6 shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
                            >
                                <h3 className="font-primary text-3xl mb-4">{session.day}</h3>
                                <div className="flex items-center gap-2 mb-3">
                                    <Clock size={20} />
                                    <span className="text-lg">{session.slot}</span>
                                </div>
                                <div className="bg-secondary inline-block px-3 py-1 rounded-full text-sm">
                                    {session.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            FORMATS DE PRATIQUE
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {formats.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Icon size={32} />
                                    </div>
                                    <h3 className="font-primary text-2xl text-primary mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="max-w-[1280px] mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                            POURQUOI NOUS REJOINDRE ?
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {strengths.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
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
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
                    >
                        <h3 className="font-primary text-4xl mb-4">PRÊT À COMMENCER ?</h3>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Contactez-nous pour trouver le créneau adultes qui vous correspond.
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
