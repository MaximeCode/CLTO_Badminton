import type { Seance, SeanceTag } from "@/types/seancesType";
import {
  fetchAPIGestion, // PP / PROD — décommenter l'appel ci-dessous
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
  PUBLIC?: SeanceTag[] | null;
};

function formatTime(value: string): string {
  // "17:30:00" → "17:30"
  const [h = "00", m = "00"] = value.split(":");
  return `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
}

function mapSeance(item: SeanceApiItem): Seance {
  const encadrement = item.ENCADREMENT ?? [];
  const hasEncadrement = encadrement.length > 0;
  const types = encadrement.map((tag) => tag.libelle);
  const sessionKind = hasEncadrement ? "Entraînement" : "Jeu libre";

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
    primaryType: hasEncadrement ? types[0] : "Jeu libre",
    entraineurs: (item.ENTRAINEUR ?? []).map((tag) => tag.libelle),
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
