import type { Base } from "@/types/baseType";

export type Historique = Base & {
  titre: string;
  description?: string | null;
  date: string;
};
