import { fetchAPI } from "../Client";
import type { PageAdherer } from "@/types/pageAdhererType";

export async function getPageAdherer(): Promise<PageAdherer> {
  const { data } = await fetchAPI("/api/page-adherer?populate=*");

  return {
    id: data.id,
    documentId: data.documentId,
    blocs: data.blocs,
    cas_inscriptions: data.cas_inscriptions,
  };
}
