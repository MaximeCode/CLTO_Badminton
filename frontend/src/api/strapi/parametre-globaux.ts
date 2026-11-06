import { fetchAPI } from "../Client";
import type { JourIndispo, ParametreGlobaux } from "@/types/parametreGlobauxType";
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
    | undefined
): JourIndispo[] {
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
    .filter((item): item is JourIndispo => item != null);
}

export async function getParametresGlobaux(): Promise<ParametreGlobaux | null> {
  try {
    const { data } = await fetchAPI(
      "/api/parametre-globaux?populate[creneaux_complets]=true&populate[indispo_gymnase]=true"
    );

    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      lien_accueil_helloasso: data.lien_accueil_helloasso ?? null,
      lien_charte_interclub: data.lien_charte_interclub ?? null,
      saison_id: data.saison_id ?? null,
      creneaux_complets: mapCreneauxComplets(data.creneaux_complets),
      indispo_gymnase: mapJoursFeries(data.indispo_gymnase),
    };
  } catch (error) {
    // Strapi renvoie 404 tant que le single type n'a pas été créé / publié
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
