import type { Base } from "@/types/baseType";
import type { BlocksContent } from "@/types/blocks";

export type ParametreGlobaux = Base & {
  lien_accueil_helloasso: string | null;
  lien_charte_interclub: string | null;
  saison_id: number | null;
  /** Libellés des créneaux complets (composant liste-txt.contenu). */
  creneaux_complets: string[];
  date_vacances_noel: Date | null;
  texte_vacances_noel: BlocksContent | null;
};
