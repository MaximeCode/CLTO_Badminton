import type { BlocksContent } from "@/types/blocks";

export type InformationsPublic = {
  id: number;
  titre: string;
  contenu: BlocksContent;
};

export type ContenuPublic = {
  id: number;
  titre: string;
  sous_titre?: string | null;
  contenu: BlocksContent;
};

export type AvantagePublic = {
  id: number;
  contenu: string;
};

export type PrixVolant = {
  id: number;
  volants: string;
  prix: number;
};

export type PublicMedia = {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  url: string;
  mime?: string;
  width?: number | null;
  height?: number | null;
};

type PublicBase = {
  id: number;
  documentId: string;
  titre?: string | null;
  description?: string | null;
  image_bandeau?: PublicMedia | null;
};

export type PublicAdultesCompetiteurs = PublicBase & {
  tournois_competitions: ContenuPublic[];
  les_avantages: AvantagePublic[];
};

export type PublicAdultesLoisirs = PublicBase & {
  prix_licence: number;
  envie_de_progresser: InformationsPublic;
  vie_du_club: InformationsPublic[];
  les_avantages: AvantagePublic[];
};

export type PublicEntreprise = PublicBase & {
  lien_dossier_partenariat?: string | null;
  flyer: PublicMedia;
  partenariat: InformationsPublic[];
  les_avantages: AvantagePublic[];
};

export type PublicJeunes = PublicBase & {
  informations: InformationsPublic[];
  entrainements: InformationsPublic[];
  tournois_competitions: ContenuPublic[];
  les_avantages: AvantagePublic[];
  prix_volants: PrixVolant[];
};

export type PublicVieillesPlumes = PublicBase & {
  format_simple: BlocksContent;
  tournois_competitions: InformationsPublic[];
  les_avantages: AvantagePublic[];
};
