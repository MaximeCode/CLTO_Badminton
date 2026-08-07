import type { Base } from "@/types/baseType";

export type Utilisateur = Base & {
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
};
