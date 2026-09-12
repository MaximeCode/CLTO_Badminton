import { fetchAPI } from "../Client";
import type { PageDecouvrirLeClub } from "@/types/pageDecouvrirLeClubType";
import type { InformationsPublic } from "@/types/publicsType";

function mapInformations(items: InformationsPublic[] | null | undefined): InformationsPublic[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    titre: item.titre,
    contenu: item.contenu,
  }));
}

export async function getPageDecouvrirLeClub(): Promise<PageDecouvrirLeClub | null> {
  try {
    const { data } = await fetchAPI("/api/page-decouvrir-le-club?populate=*");
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      titre: data.titre ?? null,
      description: data.description ?? null,
      informations: mapInformations(data.informations),
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
