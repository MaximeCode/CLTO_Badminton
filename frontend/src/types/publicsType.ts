import type { BlocksContent } from "@/types/blocks";

export type InformationsPublic = {
  id: number;
  titre: string;
  contenu: BlocksContent;
};

export type ContenuPublic = {
  id: number;
  titre: string;
  sous_titre?: string;
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

export type PublicJeunesLoisirs = {
  id: number;
  documentId: string;
  informations: InformationsPublic[];
};

export type PublicJeunesCompetiteurs = {
  id: number;
  documentId: string;
  entrainements: InformationsPublic[];
  tournois_competitions: ContenuPublic[];
  tutoriels: ContenuPublic[];
  les_avantages: AvantagePublic[];
  prix_volants: PrixVolant[];
};
