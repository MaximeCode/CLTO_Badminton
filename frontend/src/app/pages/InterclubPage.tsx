import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Users } from "lucide-react";
import { motion } from "motion/react";
import { Hero, type HeroSlide } from "../components/Hero";
import { Seo } from '../components/Seo';
import { getInterclubTeams } from "@/api/icbad_local/interclub";
import { getParametresGlobaux } from "@/api/strapi/parametre-globaux";
import type { InterclubTeamSummary } from "@/types/interclubType";
import { getDivisionLabel, groupTeamsByIcbadUrl } from "@/utils/interclubUtils";
import { Section } from "../components/Section";

const ICBAD_URL = "https://icbad.ffbad.org/";

/** Convertit un lien Google Drive « partage » en URL d'embed `/preview`. */
function toGoogleDrivePreviewUrl(url: string): string {
  return url.replace("/view?usp=sharing", "/preview");
}

export function InterclubPage() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [teams, setTeams] = useState<InterclubTeamSummary[]>([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const [charteUrl, setCharteUrl] = useState("");

  const resultMenuItems = useMemo(() => groupTeamsByIcbadUrl(teams), [teams]);

  useEffect(() => {
    getInterclubTeams().then((data) => {
      setTeams(data);
      if (data[0]?.icbadUrl) {
        setCurrentUrl(data[0].icbadUrl);
      }
      setHeroSlides(
        data.map((team, index) => ({
          id: index + 1,
          image: team.image?.url ?? "",
          label: "INTERCLUBS",
          title: team.teamLabel,
          description: team.desc ?? "",
        }))
      );
    });

    getParametresGlobaux().then((parametres) => {
      const lien = parametres?.lien_charte_interclub?.trim();
      if (lien) {
        setCharteUrl(toGoogleDrivePreviewUrl(lien));
      }
    });
  }, []);

  return (
    <>
      <Seo
        title="Interclubs"
        description="Interclubs du CLTO Badminton Orléans : équipes, résultats et charte du club de badminton à Orléans."
      />
      <h1 className="sr-only">Interclubs du CLTO Badminton Orléans</h1>
      <Hero
        slides={heroSlides}
        variant="interclub"
      />

      {/* Bloc de liaison */}
      {teams.length > 0 && (
        <Section className="bg-gray-100">
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
              <p className="font-primary text-xl text-primary">{teams.length} équipes engagées</p>
              <p className="text-gray-600 text-sm">
                De la {getDivisionLabel(teams[0].divisions_interclub)} à la {getDivisionLabel(teams[teams.length - 1].divisions_interclub)}, le CLTO aligne {teams.length} équipes dans les championnats par équipes cette saison.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="font-primary text-xl text-primary">Esprit d'équipe</p>
              <p className="text-gray-600 text-sm">
                Les interclubs sont avant tout une aventure collective. Chaque rencontre est l'occasion de représenter le club avec fierté et solidarité.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <p className="font-primary text-xl text-primary">Septembre - Juin</p>
              <p className="text-gray-600 text-sm">
                La saison interclubs s'étend de septembre à juin.
              </p>
            </div>
          </motion.div>
        </Section>
      )}


      <Section className="bg-white">
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
            {resultMenuItems.map((item) => (
              <li key={item.key} className="w-full">
                <span
                  onClick={() => setCurrentUrl(item.icbadUrl)}
                  className={
                    "flex w-full min-w-0 flex-row items-center gap-2.5 sm:gap-3 px-3 py-2.5 sm:py-3 border-2 cursor-pointer rounded-sm text-body bg-primary hover:bg-secondary/80 text-white transition-colors duration-200" +
                    (currentUrl === item.icbadUrl
                      ? " bg-secondary active"
                      : "")
                  }
                  aria-current={
                    currentUrl === item.icbadUrl ? "page" : undefined
                  }
                >
                  <span
                    className="inline-flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center"
                    aria-hidden
                  >
                    <Users className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0 flex-1 text-left text-xs sm:text-sm leading-snug">
                    {item.label}
                  </span>
                </span>
              </li>
            ))}
            <li className="w-full pt-1">
              <a
                href={ICBAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full min-w-0 flex-row items-center justify-center gap-2 px-3 py-2.5 sm:py-3 border-2 border-secondary rounded-sm bg-secondary text-white hover:bg-secondary-accent transition-colors duration-200 text-xs sm:text-sm font-semibold"
              >
                Voir sur Icbad
                <ExternalLink className="h-4 w-4 shrink-0" />
              </a>
            </li>
          </ul>
          <div className="min-w-0 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full rounded-lg"
            >
              {currentUrl && (
                <iframe
                  id="interclub-iframe"
                  width="100%"
                  height="560px"
                  className="h-140 sm:h-155 md:h-175 w-full rounded-lg border-2 border-gray-200"
                  src={currentUrl}
                  title="Résultats interclubs FFBAD"
                />
              )}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Charte Interclubs */}
      <Section className="bg-gray-100">
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

        {charteUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="overflow-hidden rounded-lg border-2 border-gray-200 bg-white"
          >
            <iframe
              src={charteUrl}
              className="h-140 w-full sm:h-155 md:h-175"
              allow="autoplay"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Charte des interclubs"
            />
          </motion.div>
        )}
      </Section>
    </>
  );
}
