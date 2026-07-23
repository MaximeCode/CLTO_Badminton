import { API_URL, fetchAPI } from "../Client";
import type { Galerie } from "@/types/galerieType";

export async function getGalerie(): Promise<Galerie[]> {
  const { data } = await fetchAPI(
    "/api/galeries?populate[vignette][fields][0]=url&sort[0]=createdAt:desc"
  );

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      vignette?: { url?: string } | null;
      url_album: string;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      vignette: {
        url: `${API_URL}${item.vignette?.url ?? ""}`,
      },
      url_album: item.url_album,
    })
  );
}

/** Construit l'URL du player Flickr à partir de l'URL d'album Strapi. */
export function getFlickrPlayerSrc(urlAlbum: string): string | null {
  const match = urlAlbum.match(/flickr\.com\/photos\/([^/]+)\/albums\/(\d+)/i);
  if (!match) return null;
  return `https://www.flickr.com/photos/${match[1]}/albums/${match[2]}/player/`;
}
