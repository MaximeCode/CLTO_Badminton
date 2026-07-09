import { fetchAPI } from "../Client";
import type { Gymnase } from "../../types/gymnaseType";

export async function getGymnases(): Promise<Gymnase[]> {
  const { data } = await fetchAPI("/api/gymnases?populate=*");

  return data.map(
    (item: {
      id: number;
      documentId: string;
      libelle: string;
      adresse: string;
      latitude: string | null;
      longitude: string | null;
      terrains: number;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      libelle: item.libelle,
      adresse: item.adresse,
      latitude: item.latitude ? parseFloat(item.latitude) : NaN,
      longitude: item.longitude ? parseFloat(item.longitude) : NaN,
      terrains: item.terrains,
    })
  );
}
