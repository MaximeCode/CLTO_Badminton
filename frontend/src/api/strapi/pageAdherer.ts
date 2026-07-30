import { API_URL, fetchAPI } from "../Client";
import type { PageAdherer, Document } from "@/types/pageAdhererType";

export async function getPageAdherer(): Promise<PageAdherer> {
  const { data } = await fetchAPI(
    "/api/page-adherer?populate[blocs]=true&populate[questions_parcours][populate]=reponses&populate[cas_inscriptions]=true&populate[documents][populate][document][fields][0]=url"
  );

  return {
    id: data.id,
    documentId: data.documentId,
    blocs: data.blocs ?? [],
    questions_parcours: data.questions_parcours ?? [],
    cas_inscriptions: data.cas_inscriptions ?? [],
    documents: (data.documents ?? []).map((document: Document) => ({
      id: document.id,
      libelle: document.libelle,
      document: {
        url: `${API_URL}${document.document?.url ?? ""}`,
      },
    })),
  };
}
