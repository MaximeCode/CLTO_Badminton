import type { Categorie } from "./categoriesType";

export type Galerie = {
  id: number;
  documentId: string;
  titre: string;
  vignette: {
    url: string;
  };
  url_album: string;
  galerie_categorie: Categorie | null;
};
