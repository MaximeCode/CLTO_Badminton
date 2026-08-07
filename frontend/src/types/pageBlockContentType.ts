import type { BlocksContent } from "@/types/blocks";

export type PageBlockContent = {
  id: number;
  documentId: string;
  contenu: BlocksContent | null;
};
