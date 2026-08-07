import type { BlocksContent } from "@/types/blocks";
import type { Base } from "@/types/baseType";

export type Stage = Base & {
  titre: string;
  date_debut: Date;
  date_fin: Date;
  public: string;
  autre_infos: string;
  description: BlocksContent;
  lien: string;
  gymnase: string;
};
