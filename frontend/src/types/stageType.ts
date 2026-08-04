import type { BlocksContent } from "@/types/blocks";
import { Gymnase } from "./gymnasesType";

export type Stage = {
  id: number;
  documentId: string;
  titre: string;
  date_debut: Date;
  date_fin: Date;
  public: string;
  autre_infos: string;
  description: BlocksContent;
  lien: string;
  gymnase: Gymnase;
};
