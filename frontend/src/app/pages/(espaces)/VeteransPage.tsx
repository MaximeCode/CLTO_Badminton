import { PageHero } from '../../components/PageHero';
import { Section } from '../../components/Section';
import { motion } from 'motion/react';
import { Clock, Users, Smile, ShieldCheck } from 'lucide-react';

const sessions = [
    {
        day: 'Mardi',
        time: '20h - 22h',
        info: 'Jeu libre veterans',
    },
    {
        day: 'Jeudi',
        time: '20h - 22h',
        info: 'Jeu libre veterans',
    },
];

const highlights = [
    {
        icon: Users,
        title: 'Groupe dedie',
        description: 'Des seances reservees aux veterans dans une ambiance conviviale.',
    },
    {
        icon: Clock,
        title: 'Rythme libre',
        description: 'Vous jouez a votre rythme, sans programme d entrainement impose.',
    },
    {
        icon: ShieldCheck,
        title: 'Pratique adaptee',
        description: 'Un cadre ideal pour continuer a jouer regulierement et se faire plaisir.',
    },
    {
        icon: Smile,
        title: 'Esprit club',
        description: 'Partage, bonne humeur et plaisir de jeu restent les priorites.',
    },
];

export function VeteransPage() {
    return (
        <>
            <PageHero
                title="VIEILLES PLUMES"
                subtitle="Des creneaux dedies en jeu libre, sans entrainements"
                image="https://images.unsplash.com/photo-1521537634581-0dced2fee2ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjbHViJTIwaW5kb29yfGVufDF8fHx8MTc4NTQ4NDI2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            />

            <Section className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                        NOS CRENEAUX VIEILLES PLUMES
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Deux rendez-vous hebdomadaires en jeu libre dedies aux veterans.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                    {sessions.map((session, index) => (
                        <motion.div
                            key={`${session.day}-${session.time}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-6 shadow-lg text-white hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="font-primary text-3xl mb-4">{session.day}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                <Clock size={20} />
                                <span className="text-lg">{session.time}</span>
                            </div>
                            <div className="bg-secondary inline-block px-3 py-1 rounded-full text-sm">
                                {session.info}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section className="bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
                        L'ESPACE VIEILLES PLUMES
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {highlights.map((highlight, index) => {
                        const Icon = highlight.icon;
                        return (
                            <motion.div
                                key={highlight.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Icon size={32} />
                                </div>
                                <h3 className="font-primary text-xl text-primary mb-3">
                                    {highlight.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{highlight.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>

            <Section className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-50 rounded-lg p-12 text-center shadow-lg"
                >
                    <h2 className="font-primary text-4xl text-primary mb-4">
                        UN FORMAT SIMPLE
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Pas d entrainement dirige: les seances sont organisees en jeu libre pour
                        privilegier le plaisir, les echanges et la regularite.
                    </p>
                </motion.div>
            </Section>
        </>
    );
}
