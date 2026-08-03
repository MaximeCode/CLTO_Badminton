import { fetchAPI } from "../Client";
import type { Categorie } from "@/types/categoriesType"; // Même type que les catégories

export async function getGalerieCategories(): Promise<Categorie[]> {
  const { data } = await fetchAPI("/api/galerie-categories?populate=*");

  return data.map((item: { id: number; documentId: string; libelle: string }) => ({
    id: item.id,
    documentId: item.documentId,
    libelle: item.libelle,
  }));
}
