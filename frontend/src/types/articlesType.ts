import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "./categoriesType";

export type ArticleCreatedBy = {
  id: number;
  firstname?: string | null;
  lastname?: string | null;
  username?: string | null;
};

export type Article = {
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
  createdBy: ArticleCreatedBy | null;
};
