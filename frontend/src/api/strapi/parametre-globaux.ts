import { fetchAPI } from "../Client";
import type { ParametreGlobaux, SemaineSansCreneaux } from "@/types/parametreGlobauxType";
import type { BlocksContent } from "@/types/blocks";

function mapCreneauxComplets(items: { contenu?: string | null }[] | null | undefined): string[] {
  return (items ?? [])
    .map((item) => item.contenu?.trim() ?? "")
    .filter((contenu) => contenu.length > 0);
}

function mapSemainesSansCreneaux(
  items:
    | { date_indispo?: string | null; texte_indispo?: BlocksContent | null }[]
    | null
    | undefined,
): SemaineSansCreneaux[] {
  return (items ?? [])
    .map((item) => {
      const date_indispo = item.date_indispo?.trim() ?? "";
      if (!date_indispo) return null;
      return {
        date_indispo,
        texte_indispo: item.texte_indispo ?? null,
      };
    })
    .filter((item): item is SemaineSansCreneaux => item != null);
}

export async function getParametresGlobaux(): Promise<ParametreGlobaux | null> {
  try {
    const { data } = await fetchAPI(
      "/api/parametre-globaux?populate[creneaux_complets]=true&populate[semaines_sans_creneaux]=true",
    );

    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      lien_accueil_helloasso: data.lien_accueil_helloasso ?? null,
      lien_charte_interclub: data.lien_charte_interclub ?? null,
      saison_id: data.saison_id ?? null,
      creneaux_complets: mapCreneauxComplets(data.creneaux_complets),
      semaines_sans_creneaux: mapSemainesSansCreneaux(data.semaines_sans_creneaux),
    };
  } catch (error) {
    // Strapi renvoie 404 tant que le single type n'a pas été créé / publié
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
