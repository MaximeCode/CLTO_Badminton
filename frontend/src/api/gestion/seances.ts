import type { Seance, SeanceTag } from "@/types/seancesType";
import {
  fetchAPIGestion, // PP / PROD - décommenter l'appel ci-dessous
  fetchFakeAPIGestion,
} from "../Client";

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
  SC?: SeanceTag[] | null;
  OUVREUR?: SeanceTag[] | null;
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
  if (normalized.includes("matchs compétiteur") || normalized.includes("match compétiteur")) {
    return "Matchs Compétiteurs";
  }
  if (normalized.includes("matchs loisir") || normalized.includes("match loisir")) {
    return "Matchs Loisirs";
  }
  return "Jeu libre";
}

function mapTags(tags?: SeanceTag[] | null): string[] {
  return (tags ?? []).map((tag) => tag.libelle);
}

/** Fusionne plusieurs listes de responsables sans doublon (ordre conservé). */
function mergeResponsables(...lists: (SeanceTag[] | null | undefined)[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const list of lists) {
    for (const tag of list ?? []) {
      if (!seen.has(tag.libelle)) {
        seen.add(tag.libelle);
        result.push(tag.libelle);
      }
    }
  }
  return result;
}

function mapSeance(item: SeanceApiItem): Seance {
  const encadrement = item.ENCADREMENT ?? [];
  const hasEncadrement = encadrement.length > 0;
  const types = encadrement.map((tag) => tag.libelle);
  const sessionKind = hasEncadrement ? "Entraînement" : "Jeu libre";

  const entraineurs = hasEncadrement ? mapTags(item.ENTRAINEUR) : [];
  const serviceCivique = hasEncadrement ? mapTags(item.SC) : [];
  const ouvreurs = hasEncadrement
    ? mapTags(item.OUVREUR)
    : mergeResponsables(item.ENTRAINEUR, item.SC, item.OUVREUR);

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
    primaryType: hasEncadrement ? types[0] : resolveFreePlayPrimaryType(item.nom),
    entraineurs,
    serviceCivique,
    ouvreurs,
    publics: mapTags(item.PUBLIC),
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
      ? await fetchFakeAPIGestion("allSeances_01-09") // DEV
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
