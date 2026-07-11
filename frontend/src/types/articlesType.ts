import type { BlocksContent } from "@/types/blocks";
import type { Categorie } from "./categoriesType";
import type { Utilisateur } from "./utilisateursType";

export type Article = {
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
};
