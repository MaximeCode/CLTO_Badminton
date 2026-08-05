import { Partner } from "@/types/partnersType";
import { API_URL, fetchAPI } from "../Client";

export async function getPartners(): Promise<Partner[]> {
  const { data } = await fetchAPI("/api/partenaires?populate=*");

  return data.map(
    (item: {
      id: number;
      logos: {
        url: string;
      }[];
      type: string;
    }) => ({
      id: item.id,
      logos: (item.logos ?? []).map((logo) => ({
        url: `${API_URL}${logo.url ?? ""}`,
      })),
      type: item.type,
    })
  );
}
