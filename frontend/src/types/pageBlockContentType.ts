import type { BlocksContent } from "@/types/blocks";
import type { Base } from "@/types/baseType";

export type PageBlockContent = Base & {
  contenu: BlocksContent | null;
};
