import { fetchAPI } from "../Client";
import type { Public, InformationsPublic } from "@/types/publicsType";

export async function getPublicsJeunesLoisirs(): Promise<Public> {
  const { data } = await fetchAPI(`/api/public-jeunes-loisirs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    informations: data.informations.map((information: InformationsPublic) => ({
      id: information.id,
      titre: information.titre,
      contenu: information.contenu,
    })),
  };
}
