import { API_URL, fetchAPI } from "../Client";
import type { Hero } from "@/types/herosType";

export async function getHeros(interclub?: boolean): Promise<Hero[]> {
  let url = "/api/heros?populate[image][fields][0]=url";
  if (interclub !== undefined) {
    url += `&filters[interclub][$eq]=${interclub}`;
  }

  const { data } = await fetchAPI(url);

  return data.map(
    (item: {
      id: number;
      documentId: string;
      categorie: string;
      titre: string;
      description?: string;
      libelle_btn: string;
      interclub: boolean;
      image: {
        url: string;
      };
    }) => ({
      id: item.id,
      documentId: item.documentId,
      categorie: item.categorie,
      titre: item.titre,
      description: item.description ?? "",
      libelle_btn: item.libelle_btn ?? "En savoir plus",
      interclub: item.interclub ?? false,
      image: {
        url: `${API_URL}${item.image?.url ?? ""}`,
      },
    })
  );
}
