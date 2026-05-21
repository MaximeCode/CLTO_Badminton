import { useCallback, useState } from "react";
import { Users } from "lucide-react";
import { motion } from "motion/react";
import { Hero, type HeroSlide } from "../components/Hero";
import N2Img from "../../imports/IC/N2.png";
import N3Img from "../../imports/IC/N3.png";
import R2Img from "../../imports/IC/R2.png";
import D1AImg from "../../imports/IC/D1A.png";
import D1BImg from "../../imports/IC/D1B.png";

type InterclubTeam = HeroSlide & {
  competition: number;
  tableau: number;
};

const teams: InterclubTeam[] = [
  {
    id: 1,
    image: N2Img,
    label: "INTERCLUBS",
    title: "NATIONALE 2",
    description: "Nos meilleurs joueurs en compétition nationale",
    competition: 2500383,
    tableau: 14022,
  },
  {
    id: 2,
    image: N3Img,
    label: "INTERCLUBS",
    title: "NATIONALE 3",
    description: "Découvrez toutes nos équipes engagées cette saison",
    competition: 2500384,
    tableau: 14026,
  },
  {
    id: 3,
    image: R2Img,
    label: "INTERCLUBS",
    title: "RÉGIONALE 2",
    description: "Leur objectif : la montée !",
    competition: 2500080,
    tableau: 14097,
  },
  {
    id: 4,
    image: D1AImg,
    label: "INTERCLUBS",
    title: "DÉPARTEMENTALE 1 - Équipe A",
    description: "L'équipe principale",
    competition: 2501074,
    tableau: 14555,
  },
  {
    id: 5,
    image: D1BImg,
    label: "INTERCLUBS",
    title: "DÉPARTEMENTALE 1 - Équipe B",
    description: "L'équipe secondaire de notre département",
    competition: 2501074,
    tableau: 14556,
  },
];

export function InterclubPage() {
  const [currentICLink, setCurrentICLink] = useState(() => ({
    competition: teams[0].competition,
    tableau: teams[0].tableau,
  }));

  return (
    <>
      <Hero
        slides={teams}
        variant="interclub"
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-3 md:mb-4 leading-tight">
              RÉSULTATS EN DIRECT
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              Suivez tous les résultats de nos équipes sur le site de la FFBAD
            </p>
          </motion.div>

          <div className="flex flex-col gap-5 md:gap-6 md:flex-row md:items-start lg:gap-8">
            <ul className="flex w-full flex-col space-y-2.5 md:space-y-3 text-sm font-medium text-body md:shrink-0 md:basis-64 lg:basis-72">
              {teams.map((team) => (
                <li key={team.id} className="w-full">
                  <span
                    onClick={() =>
                      setCurrentICLink({
                        competition: team.competition,
                        tableau: team.tableau,
                      })
                    }
                    className={
                      "flex w-full min-w-0 flex-row items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:py-3 border-2 cursor-pointer rounded-sm text-body bg-primary hover:bg-secondary/80 text-white transition-colors duration-200" +
                      (currentICLink.competition === team.competition &&
                        currentICLink.tableau === team.tableau
                        ? " bg-secondary active"
                        : "")
                    }
                    aria-current={
                      currentICLink.competition === team.competition &&
                        currentICLink.tableau === team.tableau
                        ? "page"
                        : undefined
                    }
                  >
                    <span
                      className="inline-flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center"
                      aria-hidden
                    >
                      <Users className="h-5 w-5" strokeWidth={2} />
                    </span>
                    <span className="min-w-0 flex-1 text-left text-xs sm:text-sm leading-snug">
                      {team.title}
                    </span>
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
                  height="560px"
                  className="h-[560px] sm:h-[620px] md:h-[700px] w-full rounded-lg border-2 border-gray-200"
                  src={`https://icbad.ffbad.org/competition/${currentICLink.competition}/tableau/${currentICLink.tableau}`}
                  title="Résultats interclubs FFBAD"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
