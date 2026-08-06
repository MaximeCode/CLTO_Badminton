import { API_URL, fetchAPI } from "../Client";
import type { Article } from "@/types/articlesType";
import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "@/types/categoriesType";

export async function getArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    "/api/articles?populate[categorie]=true&populate[vignette][fields][0]=url&sort[0]=createdAt:desc"
  );

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      vignette: {
        url: string;
      };
      a_la_une: boolean;
      contenu: BlocksContent;
      categorie: Categorie;
      createdAt: Date;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      vignette: {
        url: `${API_URL}${item.vignette?.url ?? ""}`,
      },
      a_la_une: item.a_la_une,
      contenu: item.contenu,
      categorie: item.categorie,
      createdAt: item.createdAt,
    })
  );
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    "/api/articles?populate[categorie]=true&populate[vignette][fields][0]=url&sort[0]=createdAt:desc&filters[a_la_une][$eq]=true"
  );

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      vignette: {
        url: string;
      };
      a_la_une: boolean;
      contenu: BlocksContent;
      categorie: Categorie;
      createdAt: Date;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      vignette: {
        url: `${API_URL}${item.vignette?.url ?? ""}`,
      },
      a_la_une: item.a_la_une,
      contenu: item.contenu,
      categorie: item.categorie,
      createdAt: item.createdAt,
    })
  );
}

export async function getOneArticle(documentId: string): Promise<Article | null> {
  const { data } = await fetchAPI(
    `/api/articles/${documentId}?populate[categorie]=true&populate[vignette][fields][0]=url`
  );
  if (!data) return null;
  return {
    id: data.id,
    documentId: data.documentId,
    titre: data.titre,
    vignette: {
      url: `${API_URL}${data.vignette?.url ?? ""}`,
    },
    a_la_une: data.a_la_une,
    contenu: data.contenu,
    categorie: data.categorie,
    createdAt: data.createdAt,
  };
}
