import type { MotPresident } from "@/types/motPresident";
import { fetchAPI } from "../Client";
import { mapMedia } from "@/utils/media";

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
      portrait: mapMedia(data.portrait),
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
