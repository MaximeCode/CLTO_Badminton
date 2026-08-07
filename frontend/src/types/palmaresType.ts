import type { Base } from "@/types/baseType";

export type Palmares = Base & {
  titre: string;
  description?: string | null;
  date: string;
};
