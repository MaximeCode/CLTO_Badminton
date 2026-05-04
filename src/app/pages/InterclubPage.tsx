import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import N2Img from "../../imports/IC/N2.png";
import N3Img from "../../imports/IC/N3.png";
import R2Img from "../../imports/IC/R2.png";
import D1AImg from "../../imports/IC/D1A.png";
import D1BImg from "../../imports/IC/D1B.png";

const teams = [
  {
    id: 1,
    image: N2Img,
    label: "INTERCLUBS",
    title: "NATIONALE 2",
    description:
      "Nos meilleurs joueurs en compétition nationale",
    competition: 2500383,
    tableau: 14022,
  },
  {
    id: 2,
    image: N3Img,
    label: "INTERCLUBS",
    title: "NATIONALE 3",
    description:
      "Découvrez toutes nos équipes engagées cette saison",
    competition: 2500384,
    tableau: 14026,
  },
  {
    id: 3,
    image: R2Img,
    label: "INTERCLUBS",
    title: "RÉGIONALE 2",
    description:
      "Leur objectif : la montée !",
    competition: 2500080,
    tableau: 14097,
  },
  {
    id: 4,
    image: D1AImg,
    label: "INTERCLUBS",
    title: "DÉPARTEMENTALE 1 - Équipe A",
    description:
      "L'équipe principale",
    competition: 2501074,
    tableau: 14555,
  },
  {
    id: 5,
    image: D1BImg,
    label: "INTERCLUBS",
    title: "DÉPARTEMENTALE 1 - Équipe B",
    description:
      "L'équipe secondaire de notre département",
    competition: 2501074,
    tableau: 14556,
  }
];

export function InterclubPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentICLink, setCurrentICLink] = useState(() => ({
    competition: teams[0].competition,
    tableau: teams[0].tableau,
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % teams.length);
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
    setCurrentSlide((curr) => (curr + 1) % teams.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (curr) => (curr - 1 + teams.length) % teams.length,
    );
    setProgress(0);
  };

  // Update the link to icbad.ffbad ... with the ids of the 'competition' and 'tableau'
  const changeLink_IC = (id: number) => {
    setCurrentICLink({ competition: teams[id].competition, tableau: teams[id].tableau });
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
                backgroundImage: `url(${teams[currentSlide].image})`,
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
                  className="text-secondary uppercase tracking-wider mb-4"
                >
                  {teams[currentSlide].label}
                </motion.div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-primary text-6xl md:text-7xl text-white leading-tight mb-4"
                >
                  {teams[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/90 text-lg mb-8"
                >
                  {teams[currentSlide].description}
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
          {teams.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative w-12 h-1 bg-white/30 overflow-hidden"
            >
              {index === currentSlide && (
                <div
                  className="absolute inset-0 bg-secondary"
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

      {/* FFBAD Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-primary text-5xl md:text-6xl text-primary mb-4">
              RÉSULTATS EN DIRECT
            </h2>
            <p className="text-gray-600 text-lg">
              Suivez tous les résultats de nos équipes sur le
              site de la FFBAD
            </p>
          </motion.div>

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
            <ul className="flex w-full flex-col space-y-3 text-sm font-medium text-body md:shrink-0 md:basis-64 lg:basis-72">
              {teams.map((team) => (
                <li key={team.id} className="w-full">
                  <span
                    onClick={() => setCurrentICLink({ competition: team.competition, tableau: team.tableau })}
                    className={
                      "flex w-full min-w-0 flex-row items-center gap-3 px-3 py-2.5 border-2 cursor-pointer rounded-sm text-body bg-primary hover:bg-secondary/80 text-white transition-colors duration-200" +
                      (currentICLink.competition === team.competition && currentICLink.tableau === team.tableau
                        ? " bg-secondary active"
                        : "")
                    }
                    aria-current={currentICLink.competition === team.competition && currentICLink.tableau === team.tableau ? "page" : undefined}
                  >
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center" aria-hidden>
                      <Users className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1 text-left leading-snug">{team.title}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="min-w-0 flex-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full rounded-lg"
              >
                <iframe
                  id="interclub-iframe"
                  width="100%"
                  height="700px"
                  className="h-[700px] w-full rounded-lg border-2 border-gray-200"
                  src={`https://icbad.ffbad.org/competition/${currentICLink.competition}/tableau/${currentICLink.tableau}`}
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}