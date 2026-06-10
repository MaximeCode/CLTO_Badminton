import { fetchAPI } from "../Client";
import type { Historique } from "../../types/historiqueType";

export async function getHistoriques(): Promise<Historique[]> {
  const { data } = await fetchAPI("/api/historiques?populate=*");

  return data.map(
    (item: {
      id: number;
      documentId: string;
      Titre: string;
      Description?: string | null;
      Date: Date;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      Titre: item.Titre,
      Description: item.Description,
      Date: item.Date,
    })
  );
}

export async function getOneHistorique(documentId: string): Promise<Historique> {
  const { data } = await fetchAPI(`/api/historiques/${documentId}?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    Titre: data.Titre,
    Description: data.Description,
    Date: data.Date,
  };
}
