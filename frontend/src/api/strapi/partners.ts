import { Partner } from "@/types/partnersType";
import { fetchAPI } from "../Client";
import { mapMedia } from "@/utils/media";

export async function getPartners(): Promise<Partner[]> {
  const { data } = await fetchAPI("/api/partenaires?populate=*");

  return data.map(
    (item: {
      id: number;
      documentId: string;
      logos: unknown[];
      type: string;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      logos: (item.logos ?? []).map((logo) => mapMedia(logo as never)),
      type: item.type,
    })
  );
}
