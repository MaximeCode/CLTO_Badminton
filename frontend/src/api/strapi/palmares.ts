import { fetchAPI } from "../Client";
import type { Palmares } from "@/types/palmaresType";

export async function getPalmares(): Promise<Palmares[]> {
  const { data } = await fetchAPI("/api/evenements?populate=*");

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      description?: string | null;
      date: string;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      description: item.description,
      date: item.date,
    })
  );
}

export async function getOnePalmares(documentId: string): Promise<Palmares> {
  const { data } = await fetchAPI(`/api/evenements/${documentId}?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    titre: data.titre,
    description: data.description,
    date: data.date,
  };
}
