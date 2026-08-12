import { fetchAPI } from "../Client";
import type { Categorie } from "@/types/categoriesType";

export async function getCategories(): Promise<Categorie[]> {
  const query = new URLSearchParams({
    populate: "*",
    "filters[articles][id][$notNull]": "true",
  });
  const { data } = await fetchAPI(`/api/categories?${query.toString()}`);

  return data.map((item: { id: number; documentId: string; libelle: string }) => ({
    id: item.id,
    documentId: item.documentId,
    libelle: item.libelle,
  }));
}
