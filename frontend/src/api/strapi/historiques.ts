import { fetchAPI } from "../Client";
import type { Historique } from "@/types/historiquesType";

export async function getHistoriques(): Promise<Historique[]> {
  const { data } = await fetchAPI("/api/historiques?populate=*&order[date]=desc");

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

export async function getOneHistorique(documentId: string): Promise<Historique> {
  const { data } = await fetchAPI(`/api/historiques/${documentId}?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    titre: data.titre,
    description: data.description,
    date: data.date,
  };
}
