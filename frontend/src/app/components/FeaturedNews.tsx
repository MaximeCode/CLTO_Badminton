import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { HomePageSectionTitle } from './homePage_SectionTitle';
import { Section } from './Section';

const featuredArticle = {
  category: 'Actualités',
  title: 'Les Grandes Plumes d\'Orléans 2026, un succès !',
  excerpt: 'Le tournoi d\'hiver organisé par le CLTO Badminton les 20 et 21 décembre 2025, a connu un franc succès retentissant avec la participation de plus de 120 joueurs venus de toute la région...',
  date: '28 février 2026',
  image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjb21wZXRpdGlvbiUyMG1hdGNofGVufDF8fHx8MTc3Mjc5NjEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  link: '/actualite/1'
};

const sideArticles = [
  {
    title: 'De nombreuses médailles remportées par nos joueurs aux championnats régionaux',
    date: '25 février 2026',
    image: 'https://images.unsplash.com/photo-1595220427358-8cf2ce3d7f89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBzbWFzaCUyMGp1bXB8ZW58MXx8fHwxNzcyNzk2MTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/1'
  },
  {
    title: 'Très belle seconde place pour notre Nationale 2',
    date: '26 Avril 2026',
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/1'
  },
  {
    title: 'Autre article',
    date: '1 Juin 2026',
    image: 'https://images.unsplash.com/photo-1733141732172-3abba91f4db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB5b3V0aCUyMGp1bmlvcnxlbnwxfHx8fDE3NzI3OTYxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/1'
  },
];

export function FeaturedNews() {
  return (
    <Section className='bg-white'>
      <HomePageSectionTitle title="À LA UNE" />

      <div className="grid lg:grid-cols-2 gap-8 md:w-5/6 mx-auto lg:w-full">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <Link to={featuredArticle.link} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-4 aspect-[16/10]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white px-3 py-1 rounded-md text-sm font-medium">
                  {featuredArticle.category}
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-primary text-3xl text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">
                {featuredArticle.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {featuredArticle.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{featuredArticle.date}</span>
                <span
                  className="text-primary hover:text-primary-accent font-medium flex items-center gap-2 group-hover:gap-3 transition-all duration-200"
                >
                  Lire l'article
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        <hr className="block lg:hidden border-gray-200 w-50 mx-auto" />

        {/* Side Articles */}
        <div className="space-y-6">
          {sideArticles.map((article, index) => (
            <motion.div
              key={`${article.title}-${article.date}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className={`group ${index === 2 ? 'hidden md:block' : ''}`} // 3rd article is hidden on mobile
            >
              <Link to={article.link} className="cursor-pointer flex gap-4">
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-primary text-xl text-gray-900 mb-2 group-hover:text-secondary transition-colors duration-200">
                    {article.title}
                  </h4>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
