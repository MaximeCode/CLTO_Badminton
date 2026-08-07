import { fetchAPI } from "../Client";
import type { PageBlockContent } from "@/types/pageBlockContentType";

export async function getPageFormations(): Promise<PageBlockContent | null> {
  try {
    const { data } = await fetchAPI("/api/page-formation");
    if (!data) return null;
    return {
      id: data.id,
      documentId: data.documentId,
      contenu: data.contenu ?? null,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}

export async function getPageBenevoles(): Promise<PageBlockContent | null> {
  try {
    const { data } = await fetchAPI("/api/page-benevole");
    if (!data) return null;
    return {
      id: data.id,
      documentId: data.documentId,
      contenu: data.contenu ?? null,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
