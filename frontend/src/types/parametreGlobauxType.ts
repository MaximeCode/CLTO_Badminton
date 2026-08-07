import type { Base } from "@/types/baseType";

export type ParametreGlobaux = Base & {
  lien_accueil_helloasso: string | null;
  lien_charte_interclub: string | null;
  saison_id: number | null;
};
