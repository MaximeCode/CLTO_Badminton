import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "./categoriesType";

export type Article = {
  id: number;
  documentId: string;
  titre: string;
  vignette: {
    url: string;
  };
  a_la_une: boolean;
  contenu: BlocksContent;
  categories: Categorie[];
  createdAt: Date;
};
