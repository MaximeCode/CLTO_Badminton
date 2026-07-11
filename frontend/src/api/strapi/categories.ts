import { fetchAPI } from "../Client";
import type { Categorie } from "@/types/categoriesType";

export async function getCategories(): Promise<Categorie[]> {
  const { data } = await fetchAPI("/api/categories?populate=*");

  return data.map((item: { id: number; documentId: string; libelle: string }) => ({
    id: item.id,
    documentId: item.documentId,
    libelle: item.libelle,
  }));
}
