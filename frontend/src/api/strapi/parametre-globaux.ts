import { fetchAPI } from "../Client";
import type { ParametreGlobaux } from "@/types/parametreGlobauxType";

export async function getParametresGlobaux(): Promise<ParametreGlobaux | null> {
  try {
    const { data } = await fetchAPI("/api/parametre-globaux");

    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      lien_accueil_helloasso: data.lien_accueil_helloasso ?? null,
      lien_charte_interclub: data.lien_charte_interclub ?? null,
    };
  } catch (error) {
    // Strapi renvoie 404 tant que le single type n'a pas été créé / publié
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
