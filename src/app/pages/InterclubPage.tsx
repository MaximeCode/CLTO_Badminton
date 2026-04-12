import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import N2Img from "../../imports/N2.png";
import N3Img from "../../imports/N3.png";
import R2Img from "../../imports/R2.png";
import D1AImg from "../../imports/D1A.png";
import D1BImg from "../../imports/D1B.png";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1659081463572-4c5903a309e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0ZWFtJTIwZ3JvdXAlMjBwaG90b3xlbnwxfHx8fDE3NzU5Mjk2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "NATIONALE 2",
    title: "NOTRE ÉQUIPE D'ÉLITE",
    description:
      "Nos meilleurs joueurs en compétition nationale",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1723074832950-9fb031b0f4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjBhY3Rpb24lMjBzaG90JTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzc1OTI2NjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "INTERCLUBS",
    title: "LA COMPÉTITION PAR ÉQUIPES",
    description:
      "Découvrez toutes nos équipes engagées cette saison",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1765544581327-b5e9055d986c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWRtaW50b24lMjB0b3VybmFtZW50JTIwbWF0Y2h8ZW58MXx8fHwxNzc1OTI5Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    label: "RÉSULTATS",
    title: "SUIVEZ NOS PERFORMANCES",
    description:
      "Tous les résultats de nos équipes en temps réel",
  },
];

const teams = [
  {
    name: "Nationale 2",
    image: N2Img,
    level: "Élite",
    description:
      "Notre équipe phare évoluant au plus haut niveau régional",
  },
  {
    name: "Nationale 3",
    image: N3Img,
    level: "Excellence",
    description:
      "Une équipe compétitive visant la montée en N2",
  },
  {
    name: "Régionale 2",
    image: R2Img,
    level: "Confirmé",
    description:
      "Joueurs confirmés avec un excellent esprit d'équipe",
  },
  {
    name: "Départementale 1 - Équipe A",
    image: D1AImg,
    level: "Intermédiaire",
    description:
      "Première équipe départementale avec de belles ambitions",
  },
  {
    name: "Départementale 1 - Équipe B",
    image: D1BImg,
    level: "Intermédiaire",
    description:
      "Seconde équipe départementale avec des joueurs motivés",
  },
];

export function InterclubPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % slides.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((curr) => (curr + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (curr) => (curr - 1 + slides.length) % slides.length,
    );
    setProgress(0);
  };

  return (
    <>
      {/* Hero Carousel */}
      <section className="relative h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slides[currentSlide].image})`,
              }}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative h-full max-w-[1280px] mx-auto px-6 flex items-center">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[#da9619] uppercase tracking-wider mb-4"
                >
                  {slides[currentSlide].label}
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-['Bebas_Neue'] text-6xl md:text-7xl text-white leading-tight mb-4"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/90 text-lg mb-8"
                >
                  {slides[currentSlide].description}
                </motion.p>
              </div>
            </div>

            {/* Diagonal Bottom Clip */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24 bg-white"
              style={{
                clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-6 md:left-12 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-12 h-1 bg-white/30 overflow-hidden"
            >
              {index === currentSlide && (
                <div
                  className="absolute inset-0 bg-[#da9619]"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 flex items-center justify-center"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Teams Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
              NOS ÉQUIPES INTERCLUBS
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez les équipes qui représentent le CLTO
              Badminton dans les différentes divisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#da9619] text-white px-4 py-1 rounded-full text-sm">
                    {team.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-['Bebas_Neue'] text-2xl text-[#0153b6] mb-2">
                    {team.name}
                  </h3>
                  <p className="text-gray-600">
                    {team.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FFBAD Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-[#0153b6] mb-4">
              RÉSULTATS EN DIRECT
            </h2>
            <p className="text-gray-600 text-lg">
              Suivez tous les résultats de nos équipes sur le
              site de la FFBAD
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 rounded-lg p-4 shadow-lg"
          >
            <iframe
              id="interclub-iframe"
              width="100%"
              height="900px"
              className="w-full h-[600px] rounded-lg"
              src="https://icbad.ffbad.org/competition/2500384/tableau/14034"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </>
  );
}