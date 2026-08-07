import type { BlocksContent } from "@/types/blocks";
import type { Base } from "@/types/baseType";
import type { Categorie } from "./categoriesType";

export type Article = Base & {
  titre: string;
  vignette: {
    url: string;
  };
  a_la_une: boolean;
  contenu: BlocksContent;
  categories: Categorie[];
  createdAt: Date;
};
