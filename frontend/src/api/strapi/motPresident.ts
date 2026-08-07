import type { MotPresident } from "@/types/motPresident";
import { API_URL, fetchAPI } from "../Client";

export async function getMotPresident(): Promise<MotPresident | null> {
  try {
    const { data } = await fetchAPI("/api/mot-du-president?populate=*");

    if (!data) {
      return null;
    }

    return {
      id: data.id,
      documentId: data.documentId,
      discours: data.discours,
      portrait: {
        url: `${API_URL}${data.portrait?.url ?? ""}`,
      },
    };
  } catch (error) {
    // Strapi renvoie 404 tant que le single type n'a pas été créé / publié
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
