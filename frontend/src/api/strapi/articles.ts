import { API_URL, fetchAPI } from "../Client";
import type { Article } from "@/types/articlesType";
import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "@/types/categoriesType";

type ArticleApiItem = {
  id: number;
  documentId: string;
  titre: string;
  vignette: {
    url: string;
  };
  a_la_une: boolean;
  contenu: BlocksContent;
  categories: Categorie[] | null;
  createdAt: Date;
};

function mapArticle(item: ArticleApiItem): Article {
  return {
    id: item.id,
    documentId: item.documentId,
    titre: item.titre,
    vignette: {
      url: `${API_URL}${item.vignette?.url ?? ""}`,
    },
    a_la_une: item.a_la_une,
    contenu: item.contenu,
    categories: item.categories ?? [],
    createdAt: item.createdAt,
  };
}

export async function getArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    "/api/articles?populate[categories]=true&populate[vignette][fields][0]=url&sort[0]=createdAt:desc"
  );

  return data.map(mapArticle);
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    "/api/articles?populate[categories]=true&populate[vignette][fields][0]=url&sort[0]=createdAt:desc&filters[a_la_une][$eq]=true"
  );

  return data.map(mapArticle);
}

export async function getOneArticle(documentId: string): Promise<Article | null> {
  const { data } = await fetchAPI(
    `/api/articles/${documentId}?populate[categories]=true&populate[vignette][fields][0]=url`
  );
  if (!data) return null;
  return mapArticle(data);
}
