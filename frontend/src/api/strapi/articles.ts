import { fetchAPI } from "../Client";
import type { Article } from "@/types/articlesType";
import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "@/types/categoriesType";
import { mapMedia } from "@/utils/media";

type ArticleApiItem = {
  id: number;
  documentId: string;
  titre: string;
  vignette: unknown;
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
    vignette: mapMedia(item.vignette as never),
    a_la_une: item.a_la_une,
    contenu: item.contenu,
    categories: item.categories ?? [],
    createdAt: item.createdAt,
  };
}

const VIGNETTE_POPULATE =
  "populate[vignette][fields][0]=url&populate[vignette][fields][1]=width&populate[vignette][fields][2]=height&populate[vignette][fields][3]=alternativeText&populate[vignette][fields][4]=name&populate[vignette][fields][5]=mime&populate[vignette][fields][6]=formats";

export async function getArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    `/api/articles?populate[categories]=true&${VIGNETTE_POPULATE}&sort[0]=createdAt:desc`
  );

  return data.map(mapArticle);
}

export async function getOneArticle(documentId: string): Promise<Article | null> {
  const { data } = await fetchAPI(
    `/api/articles/${documentId}?populate[categories]=true&${VIGNETTE_POPULATE}`
  );
  if (!data) return null;
  return mapArticle(data);
}
