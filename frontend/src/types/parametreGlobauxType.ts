import type { Base } from "@/types/baseType";

export type ParametreGlobaux = Base & {
  lien_accueil_helloasso: string | null;
  lien_charte_interclub: string | null;
  saison_id: number | null;
  /** Libellés des créneaux complets (composant liste-txt.contenu). */
  creneaux_complets: string[];
};
