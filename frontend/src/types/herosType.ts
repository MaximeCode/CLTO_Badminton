import type { Base, Media } from "@/types/baseType";

export type Hero = Base & {
  categorie: string;
  titre: string;
  description?: string;
  libelle_btn: string;
  image: Media;
  lien?: string;
};
