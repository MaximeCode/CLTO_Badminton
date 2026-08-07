import type { Base } from "@/types/baseType";
import type { Categorie } from "./categoriesType";

export type Galerie = Base & {
  titre: string;
  vignette: {
    url: string;
  };
  url_album: string;
  date: string;
  galerie_categorie: Categorie | null;
};
