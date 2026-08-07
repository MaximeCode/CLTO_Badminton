import type { Base } from "@/types/baseType";

export type Hero = Base & {
  categorie: string;
  titre: string;
  description?: string;
  libelle_btn: string;
  image: {
    url: string;
  };
  lien?: string;
};
