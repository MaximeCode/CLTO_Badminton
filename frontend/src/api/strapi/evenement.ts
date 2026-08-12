import { API_URL, fetchAPI } from "../Client";
import type { Evenement, EvenementMedia } from "@/types/evenementType";

function mapMedia(media: EvenementMedia | null | undefined): EvenementMedia {
  if (!media) {
    return {
      id: 0,
      documentId: "",
      name: "",
      alternativeText: null,
      url: "",
    };
  }

  return {
    id: media.id,
    documentId: media.documentId,
    name: media.name,
    alternativeText: media.alternativeText ?? null,
    url: media.url ? `${API_URL}${media.url}` : "",
    mime: media.mime,
    width: media.width,
    height: media.height,
  };
}

export async function getEvenements(): Promise<Evenement[]> {
  const today = new Date().toISOString().slice(0, 10);
  const { data } = await fetchAPI(
    `/api/evenements?populate=*&sort[0]=date:asc&filters[date][$gte]=${today}`
  );

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      date: string;
      detail_date: string | null;
      lieu: string;
      horaire: string;
      petite_description: string | null;
      affiche: EvenementMedia | null;
      lien_inscription_benevole: string;
      lien_inscription_tournoi: string | null;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      date: item.date,
      detail_date: item.detail_date ?? null,
      lieu: item.lieu,
      horaire: item.horaire,
      petite_description: item.petite_description ?? null,
      affiche: mapMedia(item.affiche),
      lien_inscription_benevole: item.lien_inscription_benevole,
      lien_inscription_tournoi: item.lien_inscription_tournoi ?? null,
    })
  );
}
