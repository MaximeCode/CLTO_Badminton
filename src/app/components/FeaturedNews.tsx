import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const featuredArticle = {
  category: 'Actualités',
  title: 'Tournoi d\'été CLTO : Une édition record avec plus de 120 participants',
  excerpt: 'Le tournoi d\'été organisé par le CLTO Badminton a connu un succès retentissant avec la participation de plus de 120 joueurs venus de toute la région...',
  date: '28 février 2026',
  image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb21wZXRpdGlvbiUyMG1hdGNofGVufDF8fHx8MTc3Mjc5NjEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};

const sideArticles = [
  {
    title: 'L\'équipe senior qualifiée pour les championnats régionaux',
    date: '25 février 2026',
    image: 'https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBzbWFzaCUyMGp1bXB8ZW58MXx8fHwxNzcyNzk2MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    title: 'Nouveau créneau horaire pour les entraînements jeunes',
    date: '22 février 2026',
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function FeaturedNews() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Title */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-1 h-16 bg-[#da9619]" />
          <h2 className="font-['Bebas_Neue'] text-5xl text-[#0153b6] tracking-wide">
            À LA UNE
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[16/10]">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#da9619] text-white px-3 py-1 rounded-md text-sm font-medium">
                    {featuredArticle.category}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-['Bebas_Neue'] text-3xl text-gray-900 mb-2 group-hover:text-[#0153b6] transition-colors duration-200">
                  {featuredArticle.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{featuredArticle.date}</span>
                  <a
                    href="#"
                    className="text-[#0153b6] hover:text-[#013d87] font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
                  >
                    Lire l'article
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Side Articles */}
          <div className="space-y-6">
            {sideArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="group cursor-pointer flex gap-4"
              >
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-['Bebas_Neue'] text-xl text-gray-900 mb-2 group-hover:text-[#da9619] transition-colors duration-200">
                    {article.title}
                  </h4>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
