import { PageHero } from '../components/PageHero';
import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';

const newsArticles = [
  {
    id: 1,
    title: 'Victoire éclatante de notre équipe N2',
    categories: ['Compétition', 'Interclubs'],
    date: '8 Avril 2026',
    excerpt: 'Notre équipe Nationale 2 remporte un match crucial face à ses adversaires directs au classement.',
    image: 'https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/1',
  },
  {
    id: 2,
    title: 'Nouveau partenariat avec Sport2000',
    categories: ['Club', 'Partenariats'],
    date: '5 Avril 2026',
    excerpt: 'Le CLTO Badminton est fier d\'annoncer un nouveau partenariat avec Sport2000 pour équiper nos joueurs.',
    image: 'https://images.unsplash.com/photo-1764173040024-14b12d295026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBjbHViJTIwaW5kb29yJTIwY291cnR8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/2',
  },
  {
    id: 3,
    title: 'Stage de printemps pour les jeunes',
    categories: ['Jeunes', 'Formation'],
    date: '2 Avril 2026',
    excerpt: 'Les inscriptions sont ouvertes pour le stage de printemps destiné aux jeunes de l\'école de badminton.',
    image: 'https://images.unsplash.com/photo-1642436978092-0f4b14112745?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBiYWRtaW50b258ZW58MXx8fHwxNzc1OTI5Njk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/3',
  },
  {
    id: 4,
    title: 'Tournoi interne : Save the Date',
    categories: ['Événement', 'Club'],
    date: '30 Mars 2026',
    excerpt: 'Le traditionnel tournoi interne du club aura lieu le 15 mai prochain. Tous les membres sont invités !',
    image: 'https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0b3VybmFtZW50JTIwbWF0Y2h8ZW58MXx8fHwxNzc1OTI5Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/4',
  },
  {
    id: 5,
    title: 'Belle performance en Régionale 2',
    categories: ['Compétition', 'Interclubs'],
    date: '28 Mars 2026',
    excerpt: 'Notre équipe R2 continue sa belle série avec une nouvelle victoire à domicile.',
    image: 'https://images.unsplash.com/photo-1659081463572-4c5903a309e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0ZWFtJTIwZ3JvdXAlMjBwaG90b3xlbnwxfHx8fDE3NzU5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/5',
  },
  {
    id: 6,
    title: 'Assemblée générale annuelle',
    categories: ['Club', 'Vie associative'],
    date: '25 Mars 2026',
    excerpt: 'L\'assemblée générale du club s\'est tenue avec succès en présence de nombreux adhérents.',
    image: 'https://images.unsplash.com/photo-1688380692117-63178554d76d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlb3BsZSUyMG1lZXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzc1OTI5Njk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/actualite/6',
  },
];

const articleCategories = Array.from(
  new Set(newsArticles.flatMap((article) => article.categories)),
);

export function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setCategoriesOpen(false);
  };

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Toutes') {
      return newsArticles;
    }

    return newsArticles.filter((article) => article.categories.includes(selectedCategory));
  }, [selectedCategory]);

  const categoryFilters = (
    <>
      <li>
        <button
          type="button"
          onClick={() => selectCategory('Toutes')}
          className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === 'Toutes'
            ? 'bg-primary text-white'
            : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
            }`}
        >
          Toutes
        </button>
      </li>
      {articleCategories.map((category) => (
        <li key={category}>
          <button
            type="button"
            onClick={() => selectCategory(category)}
            className={`w-full text-left rounded-md px-3 py-2 transition-colors ${selectedCategory === category
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
              }`}
          >
            {category}
          </button>
        </li>
      ))}
    </>
  );

  return (
    <>
      <PageHero
        title="ACTUALITÉS"
        subtitle="Toutes les dernières nouvelles du CLTO Badminton"
        image="https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      />

      <section className="py-8 md:py-15 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
            <aside className="lg:sticky lg:top-24 bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="lg:hidden">
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((open) => !open)}
                  aria-expanded={categoriesOpen}
                  aria-controls="categories-list-mobile"
                  className="flex w-full items-center justify-between gap-3 text-left"
                >
                  <span>
                    <span className="font-primary text-2xl text-primary block">
                      Catégories
                    </span>
                    <span className="text-sm text-gray-600">{selectedCategory}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-primary transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {categoriesOpen && (
                  <ul id="categories-list-mobile" className="mt-4 space-y-2">
                    {categoryFilters}
                  </ul>
                )}
              </div>

              <div className="hidden lg:block">
                <h3 className="font-primary text-2xl text-primary mb-4">
                  Catégories
                </h3>
                <ul className="space-y-2">{categoryFilters}</ul>
              </div>

              <p className="mt-4 text-xs text-gray-500">
                {filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''} affiché{filteredArticles.length > 1 ? 's' : ''}.
              </p>
            </aside>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <Link key={article.id} to={article.link}>
                  <motion.article
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
                      <div className="absolute top-4 left-4 bg-secondary text-white px-4 py-1 rounded-full text-sm">
                        {article.categories[0]}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={16} />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-primary text-2xl text-primary mb-3 group-hover:text-secondary transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {article.categories.map((category) => (
                          <span
                            key={category}
                            className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                      <button className="flex items-center gap-2 text-primary hover:text-secondary transition-colors">
                        Lire la suite
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}