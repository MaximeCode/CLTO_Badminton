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

      {/* Bloc de liaison */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 text-center"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center">
                <Users className="h-7 w-7" />
              </div>
              <h3 className="font-primary text-xl text-primary">5 équipes engagées</h3>
              <p className="text-gray-600 text-sm">
                De la Nationale 2 à la Départementale 1, le CLTO aligne cinq équipes dans les championnats par équipes cette saison.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <h3 className="font-primary text-xl text-primary">Esprit d'équipe</h3>
              <p className="text-gray-600 text-sm">
                Les interclubs sont avant tout une aventure collective. Chaque rencontre est l'occasion de représenter le club avec fierté et solidarité.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <h3 className="font-primary text-xl text-primary">Septembre — Avril</h3>
              <p className="text-gray-600 text-sm">
                La saison interclubs s'étend de septembre à avril. Les rencontres se jouent le samedi, en réception ou en déplacement.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

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

      {/* Charte Interclubs */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="font-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary mb-4 leading-tight">
              CHARTE INTERCLUBS
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
              En rejoignant une équipe interclubs du CLTO, chaque joueur s'engage à respecter les valeurs et règles qui font la force de notre club.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <h3 className="font-primary text-2xl text-primary mb-4">Engagement et disponibilité</h3>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  Tout joueur sélectionné dans une équipe interclubs doit confirmer sa disponibilité dès réception de la convocation du capitaine. En cas d'empêchement, il est impératif de prévenir le capitaine au moins 72 heures avant la rencontre afin de permettre le remplacement dans les meilleures conditions.
                </p>
                <p>
                  La ponctualité est une exigence incontournable : les joueurs doivent être présents sur le site de la rencontre au moins 30 minutes avant le début officiel de la compétition pour permettre l'échauffement collectif et les formalités administratives.
                </p>
                <p>
                  La participation régulière aux entraînements compétiteurs tout au long de la saison est un critère pris en compte dans la composition des équipes et les sélections.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <h3 className="font-primary text-2xl text-primary mb-4">Fair-play et représentation du club</h3>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  Chaque joueur est ambassadeur du CLTO Badminton lors des rencontres interclubs. Un comportement exemplaire est attendu en toutes circonstances : respect des adversaires, des arbitres, des officiels de table et du public.
                </p>
                <p>
                  Tout acte contraire au fair-play ou portant atteinte à l'image du club pourra être sanctionné par le Conseil d'Administration. Les joueurs sont encouragés à féliciter leurs adversaires quelle que soit l'issue de la rencontre.
                </p>
                <p>
                  Le port de la tenue officielle du club est obligatoire pour toutes les rencontres interclubs. En cas de doute sur la tenue réglementaire, se rapprocher du capitaine en amont de la rencontre.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <h3 className="font-primary text-2xl text-primary mb-4">Matériel et volants</h3>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  Les volants utilisés lors des rencontres interclubs sont fournis par le club organisateur, conformément au règlement de la FFBAD. Chaque équipe doit néanmoins disposer d'un stock de volants de secours en cas de besoin imprévu.
                </p>
                <p>
                  Le matériel commun (filets, poteaux, tapis) est géré par les responsables du gymnase. Tout joueur est invité à participer au montage et au rangement du matériel avant et après les rencontres à domicile.
                </p>
                <p>
                  En déplacement, les frais de transport sont à la charge des joueurs. Le covoiturage est fortement encouragé et peut être organisé via le groupe de communication de l'équipe.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-lg"
            >
              <h3 className="font-primary text-2xl text-primary mb-4">Esprit d'équipe et solidarité</h3>
              <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <p>
                  La performance individuelle est au service du collectif. Les joueurs sont encouragés à soutenir leurs coéquipiers sur et en dehors du terrain, à partager leur expérience avec les moins confirmés et à maintenir une dynamique positive au sein de l'équipe.
                </p>
                <p>
                  Les capitaines d'équipe sont les interlocuteurs privilégiés entre les joueurs et le bureau du club. Toute difficulté ou désaccord doit être remonté dans un esprit de dialogue et de respect mutuel.
                </p>
                <p>
                  Le CLTO Badminton est un club familial et convivial. Les interclubs doivent refléter ces valeurs en toute circonstance, que ce soit en victoire ou en défaite.
                </p>
              </div>
            </motion.article>
          </div>
        </div>
      </section>
    </>
  );
}
