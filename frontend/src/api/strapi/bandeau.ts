import { API_URL, fetchAPI } from "../Client";
import type { Bandeau } from "@/types/bandeauType";
import type { Media } from "@/types/baseType";

function mapMedia(media: Media | null | undefined): Media {
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

function mapBandeau(item: Bandeau): Bandeau {
  return {
    id: item.id,
    documentId: item.documentId,
    page: item.page,
    image_bandeau: mapMedia(item.image_bandeau),
  };
}

export async function getBandeaux(): Promise<Bandeau[]> {
  const { data } = await fetchAPI(`/api/bandeaux?populate=*`);
  return (data ?? []).map(mapBandeau);
}

export async function getBandeauByPage(page: string): Promise<Bandeau | null> {
  const query = new URLSearchParams({
    "filters[page][$eq]": page,
    "populate": "*",
  });
  const { data } = await fetchAPI(`/api/bandeaux?${query.toString()}`);
  const item = Array.isArray(data) ? data[0] : null;
  return item ? mapBandeau(item) : null;
}
