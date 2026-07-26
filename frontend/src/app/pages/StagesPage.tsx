import { motion } from 'motion/react';
import { Calendar, Euro, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { PageHero } from '../components/PageHero';

const stages = [
  {
    title: "Stage d'Été",
    period: "Du 30 juin au 4 juillet 2025",
    level: "Tous niveaux (à partir de 10 ans)",
    price: "80 €",
    places: "20 places maximum",
    description:
      "Un stage intensif pour progresser pendant les grandes vacances. Au programme : travail technique sur les coups fondamentaux (dégagé, smash, amorti, drive), tactique de jeu en simple et double, ainsi que de nombreux matchs pour mettre en pratique les acquis. Encadré par nos entraîneurs diplômés d'État, ce stage se déroule dans une ambiance conviviale et dynamique, idéale pour progresser rapidement tout en passant un excellent moment.",
    highlight: "Été",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Stage Toussaint",
    period: "Du 27 au 29 octobre 2025",
    level: "Intermédiaire / Compétiteurs (P12 et au-dessus)",
    price: "55 €",
    places: "16 places maximum",
    description:
      "Trois jours intenses pour affiner votre jeu avant la pleine saison compétitive. Ce stage met l'accent sur le travail tactique et la préparation physique spécifique au badminton : déplacements, explosivité, endurance. Des séances analytiques avec retour vidéo seront proposées aux compétiteurs souhaitant identifier leurs points d'amélioration prioritaires. Idéal pour aborder la saison avec de bonnes bases.",
    highlight: "Toussaint",
    color: "from-primary to-primary-accent",
  },
  {
    title: "Stage de Noël",
    period: "Du 22 au 24 décembre 2025",
    level: "Tous niveaux (à partir de 8 ans)",
    price: "50 €",
    places: "24 places maximum",
    description:
      "Un stage festif pour finir l'année en beauté ! Ouvert à tous les niveaux, ce stage propose un programme varié allant de l'initiation aux jeunes débutants jusqu'aux exercices de perfectionnement pour les plus avancés. Des groupes de niveaux seront formés pour garantir une progression adaptée à chacun. La dernière demi-journée sera consacrée à un mini-tournoi interne amical dans une ambiance de fête.",
    highlight: "Noël",
    color: "from-green-700 to-green-500",
  },
];

export function StagesPage() {
  return (
    <>
      <PageHero
        title="STAGES"
        subtitle="Des stages encadrés pendant les vacances scolaires pour tous les niveaux"
        image="https://images.unsplash.com/photo-1599474924187-334a4ae5bd3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZ3xlbnwxfHx8fDE3ODU0ODQyNjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              NOS STAGES 2025/2026
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Profitez des vacances scolaires pour progresser grâce à nos stages encadrés par des entraîneurs diplômés.
            </p>
          </motion.div>

          <div className="space-y-10">
            {stages.map((stage, index) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`bg-linear-to-r ${stage.color} px-8 py-4 flex items-center justify-between`}>
                  <h3 className="font-primary text-3xl text-white">{stage.title}</h3>
                  <span className="bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
                    {stage.highlight}
                  </span>
                </div>

                <div className="p-8">
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Calendar size={20} className="text-secondary shrink-0" />
                      <span className="text-sm font-medium">{stage.period}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Users size={20} className="text-secondary shrink-0" />
                      <span className="text-sm font-medium">{stage.level}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Euro size={20} className="text-secondary shrink-0" />
                      <span className="text-sm font-semibold">{stage.price} / participant — {stage.places}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{stage.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-linear-to-br from-primary to-primary-accent rounded-lg p-12 text-center shadow-lg text-white"
          >
            <h2 className="font-primary text-4xl mb-4">INSCRIVEZ-VOUS</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Les places sont limitées et partent vite ! Contactez-nous pour réserver votre place ou pour toute question sur nos stages.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-3 rounded-md hover:bg-secondary-accent transition-colors duration-200"
            >
              Nous contacter
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
