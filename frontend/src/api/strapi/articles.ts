import { API_URL, fetchAPI } from "../Client";
import type { Article } from "@/types/articlesType";
import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "@/types/categoriesType";
import type { Utilisateur } from "@/types/utilisateursType";

export async function getArticles(): Promise<Article[]> {
  const { data } = await fetchAPI(
    "/api/articles?populate[categorie]=true&populate[vignette][fields][0]=url&populate[auteur][fields][0]=username"
  );

  return data.map(
    (item: {
      id: number;
      documentId: string;
      titre: string;
      vignette: {
        url: string;
      };
      contenu: BlocksContent;
      categorie: Categorie;
      createdAt: Date;
      auteur: Utilisateur | null;
    }) => ({
      id: item.id,
      documentId: item.documentId,
      titre: item.titre,
      vignette: {
        url: `${API_URL}${item.vignette?.url ?? ""}`,
      },
      contenu: item.contenu,
      categorie: item.categorie,
      createdAt: item.createdAt,
      auteur: item.auteur,
    })
  );
}

export async function getOneArticle(documentId: string): Promise<Article | null> {
  const { data } = await fetchAPI(
    `/api/articles/${documentId}?populate[categorie]=true&populate[vignette][fields][0]=url&populate[auteur][fields][0]=username`
  );
  if (!data) return null;
  return {
    id: data.id,
    documentId: data.documentId,
    titre: data.titre,
    vignette: {
      url: `${API_URL}${data.vignette?.url ?? ""}`,
    },
    contenu: data.contenu,
    categorie: data.categorie,
    createdAt: data.createdAt,
    auteur: data.auteur,
  };
}
