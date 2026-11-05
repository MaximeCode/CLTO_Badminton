import { fetchAPI } from "../Client";
import type { JourFerie, ParametreGlobaux } from "@/types/parametreGlobauxType";
import type { BlocksContent } from "@/types/blocks";

function mapCreneauxComplets(items: { contenu?: string | null }[] | null | undefined): string[] {
  return (items ?? [])
    .map((item) => item.contenu?.trim() ?? "")
    .filter((contenu) => contenu.length > 0);
}

function mapJoursFeries(
  items:
    | {
        date_debut?: string | null;
        date_fin?: string | null;
        texte?: BlocksContent | null;
      }[]
    | null
    | undefined,
): JourFerie[] {
  return (items ?? [])
    .map((item) => {
      const date_debut = item.date_debut?.trim() ?? "";
      const date_fin = item.date_fin?.trim() ?? "";
      if (!date_debut || !date_fin) return null;
      return {
        date_debut,
        date_fin,
        texte: item.texte ?? null,
      };
    })
    .filter((item): item is JourFerie => item != null);
}

export async function getParametresGlobaux(): Promise<ParametreGlobaux | null> {
  try {
    const { data } = await fetchAPI(
      "/api/parametre-globaux?populate[creneaux_complets]=true&populate[jours_feries]=true",
    );

    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      lien_accueil_helloasso: data.lien_accueil_helloasso ?? null,
      lien_charte_interclub: data.lien_charte_interclub ?? null,
      saison_id: data.saison_id ?? null,
      creneaux_complets: mapCreneauxComplets(data.creneaux_complets),
      jours_feries: mapJoursFeries(data.jours_feries),
    };
  } catch (error) {
    // Strapi renvoie 404 tant que le single type n'a pas été créé / publié
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
