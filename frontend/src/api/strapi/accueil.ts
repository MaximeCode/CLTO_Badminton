import { fetchAPI } from "../Client";
import type { Accueil, LabelNomEtLogo, StatsClub } from "@/types/accueilType";
import { mapMedia } from "@/utils/media";

export async function getAccueil(): Promise<Accueil | null> {
  const { data } = await fetchAPI(
    "/api/accueil?populate[stats_club]=true&populate[labels][populate][logo][fields][0]=url&populate[labels][populate][logo][fields][1]=width&populate[labels][populate][logo][fields][2]=height&populate[labels][populate][logo][fields][3]=alternativeText&populate[labels][populate][logo][fields][4]=name&populate[labels][populate][logo][fields][5]=mime&populate[labels][populate][logo][fields][6]=formats"
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
        logo: unknown;
      }) => ({
        id: item.id,
        label: item.label,
        logo: mapMedia(item.logo as never),
      })
    );

  return {
    id: data.id,
    documentId: data.documentId,
    stats_club: (data.stats_club ?? []) as StatsClub[],
    labels,
  };
}
