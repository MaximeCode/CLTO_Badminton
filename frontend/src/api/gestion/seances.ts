import { format, parseISO, startOfWeek } from "date-fns";
import type { Seance, SeanceTag } from "@/types/seancesType";
import {
  fetchAPIGestion, // PP / PROD - décommenter l'appel ci-dessous
  fetchFakeAPIGestion,
} from "../Client";

/** Entrée JSON sans créneau, uniquement pour faire apparaître une semaine vide. */
const WEEK_ANCHOR_ORIGINE = "week_anchor";

/**
 * Semaines volontairement vides (miroir des ancres `origine: week_anchor` du JSON mock).
 * Nécessaire en PP/PROD où l’API ne renvoie pas ces ancres.
 */
const EMPTY_WEEK_STARTS_FALLBACK = ["2026-08-10"];

export type SeancesAout26Result = {
  seances: Seance[];
  emptyWeekStarts: string[];
};

type SeanceApiItem = {
  id: string;
  creneau_id: string;
  nom: string;
  gymnase_id: string;
  date_seance: string;
  jour_semaine: string;
  debut_creneau: string;
  fin_creneau: string;
  encadre: string;
  origine: string;
  actif: string;
  visible: string;
  saison_id: string;
  commentaire: string | null;
  gymnase_nom: string;
  gymnase_nom_court: string;
  ENCADREMENT?: SeanceTag[] | null;
  ENTRAINEUR?: SeanceTag[] | null;
  PUBLIC?: SeanceTag[] | null;
};

function formatTime(value: string): string {
  // "17:30:00" → "17:30"
  const [h = "00", m = "00"] = value.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

/** Type d’affichage pour les séances sans encadrement (couleur / légende). */
function resolveFreePlayPrimaryType(nom: string): string {
  const normalized = nom.trim().toLowerCase();
  if (normalized.includes("pratique libre")) return "Pratique libre";
  if (normalized.includes("matchs pour tous") || normalized.includes("match pour tous")) {
    return "Matchs pour tous";
  }
  return "Jeu libre";
}

function mapSeance(item: SeanceApiItem): Seance {
  const encadrement = item.ENCADREMENT ?? [];
  const hasEncadrement = encadrement.length > 0;
  const entraineurs = item.ENTRAINEUR ?? [];
  const hasEntraineur = entraineurs.length > 0;
  const types = encadrement.map((tag) => tag.libelle);
  const sessionKind = hasEncadrement || hasEntraineur ? "Entraînement" : "Jeu libre";

  return {
    id: String(item.id),
    creneauId: String(item.creneau_id),
    nom: item.nom,
    gymnaseId: String(item.gymnase_id),
    gymnaseNom: item.gymnase_nom,
    gymnaseNomCourt: item.gymnase_nom_court,
    dateSeance: item.date_seance,
    jourSemaine: Number(item.jour_semaine),
    debut: formatTime(item.debut_creneau),
    fin: formatTime(item.fin_creneau),
    sessionKind,
    types,
    primaryType: hasEncadrement || hasEntraineur ? types[0] : resolveFreePlayPrimaryType(item.nom),
    entraineurs: entraineurs.map((tag) => tag.libelle),
    publics: (item.PUBLIC ?? []).map((tag) => tag.libelle),
    commentaire: item.commentaire,
    actif: item.actif === "1",
    visible: item.visible === "1",
    saisonId: Number(item.saison_id),
  };
}

/**
 * Récupère les séances depuis l'API gestion CLTO pour une saison donnée.
 * Filtre : actif=1, visible=1, et saison_id correspondant.
 */
export async function getSeances(saisonId: number = 17): Promise<Seance[]> {
  const { data } =
    import.meta.env.VITE_ENV === "dev"
      ? await fetchFakeAPIGestion("allSeances") // DEV
      : await fetchAPIGestion(`/api/seances/${saisonId}`); // PP / PROD

  return (data as SeanceApiItem[])
    .filter(
      (item) =>
        item.actif === "1" &&
        item.visible === "1" &&
        (item.saison_id == null || Number(item.saison_id) === saisonId)
    )
    .map(mapSeance)
    .sort((a, b) => {
      const byDate = a.dateSeance.localeCompare(b.dateSeance);
      if (byDate !== 0) return byDate;
      return a.debut.localeCompare(b.debut);
    });
}

/**
 * Récupère les séances août (saison 16) + les ancres de semaines vides (`origine: week_anchor`).
 * Filtre séances : actif=1, visible=1, et saison_id correspondant.
 */
export async function getSeancesAout26(saisonId: number = 16): Promise<SeancesAout26Result> {
  const { data } =
    import.meta.env.VITE_ENV === "dev"
      ? await fetchFakeAPIGestion("allSeancesAout26") // DEV
      : await fetchAPIGestion(`/api/seances/${saisonId}`); // PP / PROD

  const items = data as SeanceApiItem[];

  const emptyWeekStarts = [
    ...new Set([
      ...items
        .filter((item) => item.origine === WEEK_ANCHOR_ORIGINE)
        .map((item) =>
          format(startOfWeek(parseISO(item.date_seance), { weekStartsOn: 1 }), "yyyy-MM-dd")
        ),
      ...EMPTY_WEEK_STARTS_FALLBACK,
    ]),
  ];

  const seances = items
    .filter(
      (item) =>
        item.origine !== WEEK_ANCHOR_ORIGINE &&
        item.actif === "1" &&
        item.visible === "1" &&
        (item.saison_id == null || Number(item.saison_id) === saisonId)
    )
    .map(mapSeance)
    .sort((a, b) => {
      const byDate = a.dateSeance.localeCompare(b.dateSeance);
      if (byDate !== 0) return byDate;
      return a.debut.localeCompare(b.debut);
    });

  return { seances, emptyWeekStarts };
}
