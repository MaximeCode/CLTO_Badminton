import { fetchAPI } from "../Client";
import type { Hero } from "@/types/herosType";
import { mapMedia } from "@/utils/media";

export async function getHeros(): Promise<Hero[]> {
  const url =
    "/api/heros?populate[image][fields][0]=url&populate[image][fields][1]=width&populate[image][fields][2]=height&populate[image][fields][3]=alternativeText&populate[image][fields][4]=name&populate[image][fields][5]=mime&populate[image][fields][6]=formats";

  const { data } = await fetchAPI(url);

  return data.map(
    (item: {
      id: number;
      documentId: string;
      categorie: string;
      titre: string;
      description?: string;
      libelle_btn: string;
      image: unknown;
      lien: string;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      categorie: item.categorie,
      titre: item.titre,
      description: item.description ?? "",
      libelle_btn: item.libelle_btn ?? "En savoir plus",
      image: mapMedia(item.image as never),
      lien: item.lien ?? "",
    })
  );
}
