import type { Avantage, Base } from "@/types/baseType";
import type { BlocksContent } from "@/types/blocks";
import type { EvenementFormation } from "@/types/evenementType";

export type PageFormation = Base & {
  contenu: BlocksContent | null;
  les_avantages: Avantage[];
  evenements: EvenementFormation[];
};
