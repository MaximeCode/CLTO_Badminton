import { API_URL, fetchAPI } from "../Client";
import type { Hero } from "@/types/herosType";

export async function getHeros(): Promise<Hero[]> {
  let url = "/api/heros?populate[image][fields][0]=url";

  const { data } = await fetchAPI(url);

  return data.map(
    (item: {
      id: number;
      documentId: string;
      categorie: string;
      titre: string;
      description?: string;
      libelle_btn: string;
      image: {
        url: string;
      };
      lien: string;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      categorie: item.categorie,
      titre: item.titre,
      description: item.description ?? "",
      libelle_btn: item.libelle_btn ?? "En savoir plus",
      image: {
        url: `${API_URL}${item.image?.url ?? ""}`,
      },
      lien: item.lien ?? "",
    })
  );
}
