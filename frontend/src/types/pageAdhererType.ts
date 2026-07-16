import type { BlocksContent } from "@/types/blocks";

export type ContenuBloc = {
  id: number;
  titre: string;
  sous_titre?: string;
  contenu: BlocksContent;
};

export type CaseKey =
  | "cas_0"
  | "cas_1_1"
  | "cas_1_2"
  | "cas_2_1"
  | "cas_2_2"
  | "cas_3_1"
  | "cas_3_2";

export type EtapeInscription = {
  id: number;
  case_key: CaseKey;
  titre: string;
  contenu: BlocksContent;
};

export type Document = {
  id: number;
  libelle: string;
  document: {
    url: string;
  };
};

export type PageAdherer = {
  id: number;
  documentId: string;
  blocs: ContenuBloc[];
  cas_inscriptions: EtapeInscription[];
  documents: Document[];
};
