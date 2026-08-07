import { API_URL, fetchAPI } from "../Client";
import type { Accueil, LabelNomEtLogo, StatsClub } from "@/types/accueilType";

export async function getAccueil(): Promise<Accueil | null> {
  const { data } = await fetchAPI(
    "/api/accueil?populate[stats_club]=true&populate[labels][populate][logo][fields][0]=url"
  );

  if (!data) return null;

  const labels: LabelNomEtLogo[] = (data.labels ?? [])
    .filter(
      (item: { label?: string; logo?: { url?: string } | null }) =>
        item.label && item.logo?.url
    )
    .map(
      (item: {
        id: number;
        label: string;
        logo: { url: string };
      }) => ({
        id: item.id,
        label: item.label,
        logo: {
          url: `${API_URL}${item.logo.url}`,
        },
      })
    );

  return {
    id: data.id,
    documentId: data.documentId,
    stats_club: (data.stats_club ?? []) as StatsClub[],
    labels,
  };
}
