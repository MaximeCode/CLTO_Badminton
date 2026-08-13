import type { BlocksContent } from "@/types/blocks";
import type { Base, Media } from "@/types/baseType";
import type { Categorie } from "./categoriesType";

export type Article = Base & {
  titre: string;
  vignette: Media;
  a_la_une: boolean;
  contenu: BlocksContent;
  categories: Categorie[];
  createdAt: Date;
};
