import type { Base } from "@/types/baseType";

export type Divisions = Base & {
  Nom_court: string;
  Nom_complet: string | null;
  Ordre: number;
};
