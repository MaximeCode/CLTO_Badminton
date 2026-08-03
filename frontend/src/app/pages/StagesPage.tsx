import { motion } from 'motion/react';
import { Calendar, Euro, Users, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';

const stageHero = new URL('../../imports/Banniere_stage.png', import.meta.url).href;

const HELLOASSO_URL =
  'https://www.helloasso.com/associations/clto-badminton/evenements/stage-de-rentree-jeunes-et-adultes-joueurs-clto';

type Stage = {
  title: string;
  period: string;
  location: string;
  audience: string;
  price: string;
  places: string;
  coaches: string;
  description: string[];
  schedule: { time: string; activity: string }[];
  notes: string[];
  url: string;
};

const stage: Stage = {
  title: 'Stage de rentrée — Joueurs CLTO',
  period: 'Du 19 au 21 août 2026',
  location: 'Gymnase Dessaux',
  audience: 'Adultes & jeunes licenciés — débutants, perfectionnement et Élite',
  price: '12 € / journée',
  places: '24 places maximum',
  coaches: 'Thomas et Yohan',
  description: [
    'Le CLTO propose un stage de rentrée ouvert à tous les publics licenciés : débutants, perfectionnement et Élite.',
    'Chaque journée combine préparation physique, séances de badminton et temps de jeux collectifs, dans une ambiance conviviale pour bien préparer la saison.',
    'Inscription à la journée : vous pouvez choisir un, deux ou trois jours selon vos disponibilités.',
  ],
  schedule: [
    { time: '8h45', activity: 'Rendez-vous' },
    { time: '9h00 – 10h00', activity: 'Course à pied (adaptée au niveau de chacun)' },
    { time: '10h00 – 12h00', activity: 'Badminton au gymnase' },
    { time: '12h00 – 13h00', activity: 'Pique-nique à l’Île Charlemagne' },
    { time: '13h00 – 16h00', activity: 'Jeux collectifs à l’Île Charlemagne' },
  ],
  notes: [
    'Si vous ne participez pas à la course, rendez-vous directement à 10h00 au gymnase.',
    'Pensez à apporter votre pique-nique (pas de réfrigérateur ni de club house sur place).',
    'Vestiaires disponibles.',
  ],
  url: HELLOASSO_URL,
};

export function StagesPage() {
  return (
    <>
      <PageHero
        title="STAGES"
        subtitle="Des stages encadrés pour progresser et préparer la saison"
        image={stageHero}
      />

      <Section className="py-12 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4 text-balance">
            NOS STAGES 2026-2027
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stages encadrés par les entraîneurs du club, ouverts aux licenciés CLTO.
          </p>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-lg bg-gray-50 shadow-lg"
        >
          <div className="bg-linear-to-r from-primary to-primary-accent px-6 py-4 sm:px-8">
            <h3 className="font-primary text-3xl text-white sm:text-4xl">{stage.title}</h3>
          </div>

          <div className="space-y-8 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-start gap-3 text-gray-700">
                <Calendar size={20} className="mt-0.5 shrink-0 text-secondary" />
                <span className="text-sm font-medium">{stage.period}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={20} className="mt-0.5 shrink-0 text-secondary" />
                <span className="text-sm font-medium">{stage.location}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Users size={20} className="mt-0.5 shrink-0 text-secondary" />
                <span className="text-sm font-medium">{stage.audience}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-700">
                <Euro size={20} className="mt-0.5 shrink-0 text-secondary" />
                <span className="text-sm font-semibold">
                  {stage.price} — {stage.places}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-gray-600 leading-relaxed">
              {stage.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                Encadrement assuré par <span className="font-medium text-primary">{stage.coaches}</span>.
              </p>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 font-primary text-2xl text-primary">
                <Clock size={22} className="text-secondary" />
                Programme de la journée
              </h4>
              <ul className="space-y-2 border-l-2 border-secondary/40 pl-4">
                {stage.schedule.map((item) => (
                  <li key={item.time} className="text-sm text-gray-700 sm:text-base">
                    <span className="font-semibold text-primary">{item.time}</span>
                    <span className="text-gray-500"> — </span>
                    {item.activity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-primary/10 bg-white px-4 py-4 sm:px-5">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-secondary">
                Informations pratiques
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                {stage.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <a
              href={stage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-6 py-3 text-white transition-colors duration-200 hover:bg-secondary-accent"
            >
              S&apos;inscrire sur HelloAsso
              <ArrowRight size={18} />
            </a>
          </div>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg bg-linear-to-br from-primary to-primary-accent p-12 text-center text-white shadow-lg mt-24"
        >
          <h2 className="mb-4 font-primary text-4xl">INSCRIVEZ-VOUS</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Les places sont limitées et partent vite ! Accédez à la page d&apos;inscription via le bouton
            ci-dessous, ou contactez-nous pour toute question sur nos stages.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={HELLOASSO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-secondary px-8 py-3 text-white transition-colors duration-200 hover:bg-secondary-accent"
            >
              S&apos;inscrire sur HelloAsso
              <ArrowRight size={18} />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-8 py-3 text-white transition-colors duration-200 hover:bg-white/20"
            >
              Nous contacter
            </Link>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
