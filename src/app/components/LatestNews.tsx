import { motion } from 'motion/react';
import { Link } from 'react-router';

const newsCards = [
  {
    category: 'Compétition',
    categoryColor: 'primary',
    title: 'Victoire éclatante de nos minimes lors des interclubs',
    date: '3 mars 2026',
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    category: 'Événement',
    categoryColor: 'secondary',
    title: 'Journée portes ouvertes : Samedi 15 mars',
    date: '1 mars 2026',
    image: 'https://images.unsplash.com/photo-1624024834874-2a1611305604?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NzI2ODI3OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    category: 'Club',
    categoryColor: 'primary',
    title: 'Nouvelle salle d\'entraînement inaugurée',
    date: '28 février 2026',
    image: 'https://images.unsplash.com/photo-1716041040048-228dbae7b6ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0cmFpbmluZyUyMHByYWN0aWNlfGVufDF8fHx8MTc3Mjc5NjEyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function LatestNews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1 h-16 bg-secondary" />
          <h2 className="font-primary text-5xl text-primary tracking-wide">
            DERNIÈRES ACTUALITÉS
          </h2>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {newsCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, boxShadow: '0 8px 32px rgba(1,83,182,0.15)' }}
              className="group bg-white rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-[16/10]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`text-white px-3 py-1 rounded-full text-sm font-medium bg-${card.categoryColor}`}
                  >
                    {card.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-primary text-2xl text-gray-900 mb-3 group-hover:text-primary transition-colors duration-200">
                  {card.title}
                </h3>
                <span className="text-sm text-gray-500">{card.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/actualites" className="border-2 border-primary text-primary px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-all duration-200">
            Toutes les actualités →
          </Link>
        </div>
      </div>
    </section>
  );
}
