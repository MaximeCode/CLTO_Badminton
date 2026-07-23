import { fetchAPI } from "../Client";
import type { Accueil, StatsClub } from "@/types/accueilType";

export async function getAccueil(): Promise<Accueil | null> {
  const { data } = await fetchAPI("/api/accueil?populate=*");

  if (!data) return null;

  return {
    id: data.id,
    documentId: data.documentId,
    stats_club: (data.stats_club ?? []) as StatsClub[],
  };
}
