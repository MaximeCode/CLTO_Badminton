import type { Base, Media } from "@/types/baseType";
import type { BlocksContent } from "@/types/blocks";

export type EvenementMedia = Media;

/** Champs communs à la collection Événement et au composant formations. */
export type EvenementInfos = {
  titre: string;
  date: string;
  detail_date: string | null;
  lieu: string;
  horaire: string;
};

export type Evenement = Base &
  EvenementInfos & {
    petite_description: string | null;
    affiche: EvenementMedia;
    lien_inscription_benevole: string;
    lien_inscription_tournoi: string | null;
  };

/** Composant Strapi `evenements.evenements` (page Formations). */
export type EvenementFormation = EvenementInfos & {
  id: number;
  description: BlocksContent | null;
  lien_inscription: string;
};
