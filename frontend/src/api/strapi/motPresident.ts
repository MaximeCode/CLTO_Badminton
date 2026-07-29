import type { MotPresident } from "@/types/motPresident";
import { API_URL, fetchAPI } from "../Client";
import { BlocksContent } from "@/types/blocks";

export async function getMotPresident(): Promise<MotPresident | null> {
  const { data } = await fetchAPI("/api/mot-du-president?populate=*");

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    discours: data.discours,
    portrait: {
      url: `${API_URL}${data.portrait?.url ?? ""}`,
    },
  };
}
