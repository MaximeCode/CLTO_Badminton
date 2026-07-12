import type { BlocksContent } from "@/types/blocks";

export type ContenuBloc = {
  id: number;
  titre: string;
  sous_titre?: string;
  contenu: BlocksContent;
};

export type EtapeInscription = {
  id: number;
  titre: string;
  contenu: BlocksContent;
};

export type PageAdherer = {
  id: number;
  documentId: string;
  blocs: ContenuBloc[];
  cas_inscriptions: EtapeInscription[];
};
