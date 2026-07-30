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

export type NodeKey =
  | "q-deja-licence"
  | "q-licence-2526"
  | "q-licence-clto"
  | "q-type-licence-a"
  | "q-type-licence-b"
  | "q-type-licence-c";

export type AnswerKey = "oui" | "non" | "principale" | "complementaire";

export type ReponseParcours = {
  id: number;
  answer_key: AnswerKey;
  label: string;
};

export type QuestionParcours = {
  id: number;
  node_key: NodeKey;
  question: string;
  reponses: ReponseParcours[];
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
  questions_parcours: QuestionParcours[];
  cas_inscriptions: EtapeInscription[];
  documents: Document[];
};
