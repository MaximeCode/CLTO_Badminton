import { PageHero } from '../components/PageHero';
import { motion } from 'motion/react';
import { Calendar, ArrowRight } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: 'Victoire éclatante de notre équipe N2',
    category: 'Compétition',
    date: '8 Avril 2026',
    excerpt: 'Notre équipe Nationale 2 remporte un match crucial face à ses adversaires directs au classement.',
    image: 'https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    title: 'Nouveau partenariat avec Sport2000',
    category: 'Club',
    date: '5 Avril 2026',
    excerpt: 'Le CLTO Badminton est fier d\'annoncer un nouveau partenariat avec Sport2000 pour équiper nos joueurs.',
    image: 'https://images.unsplash.com/photo-1764173040024-14b12d295026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjbHViJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    title: 'Stage de printemps pour les jeunes',
    category: 'Jeunes',
    date: '2 Avril 2026',
    excerpt: 'Les inscriptions sont ouvertes pour le stage de printemps destiné aux jeunes de l\'école de badminton.',
    image: 'https://images.unsplash.com/photo-1642436978092-0f4b14112745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWRtaW50b258ZW58MXx8fHwxNzc1OTI5Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    title: 'Tournoi interne : Save the Date',
    category: 'Événement',
    date: '30 Mars 2026',
    excerpt: 'Le traditionnel tournoi interne du club aura lieu le 15 mai prochain. Tous les membres sont invités !',
    image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0b3VybmFtZW50JTIwbWF0Y2h8ZW58MXx8fHwxNzc1OTI5Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 5,
    title: 'Belle performance en Régionale 2',
    category: 'Compétition',
    date: '28 Mars 2026',
    excerpt: 'Notre équipe R2 continue sa belle série avec une nouvelle victoire à domicile.',
    image: 'https://images.unsplash.com/photo-1659081463572-4c5903a309e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0ZWFtJTIwZ3JvdXAlMjBwaG90b3xlbnwxfHx8fDE3NzU5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 6,
    title: 'Assemblée générale annuelle',
    category: 'Club',
    date: '25 Mars 2026',
    excerpt: 'L\'assemblée générale du club s\'est tenue avec succès en présence de nombreux adhérents.',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function ActualitesPage() {
  return (
    <>
      <PageHero
        title="ACTUALITÉS"
        subtitle="Toutes les dernières nouvelles du CLTO Badminton"
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#da9619] text-white px-4 py-1 rounded-full text-sm">
                    {article.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                    <Calendar size={16} />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-3 group-hover:text-[#da9619] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button className="flex items-center gap-2 text-[#0153b6] hover:text-[#da9619] transition-colors">
                    Lire la suite
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}