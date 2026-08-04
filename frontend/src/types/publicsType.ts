import type { BlocksContent } from "@/types/blocks";

export type InformationsPublic = {
  id: number;
  titre: string;
  contenu: BlocksContent;
};

export type Public = {
  id: number;
  documentId: string;
  informations: InformationsPublic[];
};
