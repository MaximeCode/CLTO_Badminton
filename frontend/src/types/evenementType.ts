export type EvenementMedia = {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  url: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
};

export type Evenement = {
  id: number;
  documentId: string;
  titre: string;
  date: string;
  lieu: string;
  horaire: string;
  petite_description: string | null;
  affiche: EvenementMedia;
  lien_inscription_benevole: string;
  lien_inscription_tournoi: string | null;
};
