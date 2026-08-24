import type { BlocksContent } from "@/types/blocks";
import type { Base, Media } from "@/types/baseType";
import type { Categorie } from "./categoriesType";

export type Article = Base & {
  titre: string;
  vignette: Media;
  a_la_une: boolean;
  contenu: BlocksContent;
  /** Excerpt pré-calculé côté API homepage (évite d'envoyer les blocks) */
  excerpt?: string;
  categories: Categorie[];
  createdAt: Date;
};
