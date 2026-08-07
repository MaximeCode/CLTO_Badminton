import type { Base, Media } from "@/types/baseType";

export type EvenementMedia = Media;

export type Evenement = Base & {
  titre: string;
  date: string;
  detail_date: string | null;
  lieu: string;
  horaire: string;
  petite_description: string | null;
  affiche: Media;
  lien_inscription_benevole: string;
  lien_inscription_tournoi: string | null;
};
