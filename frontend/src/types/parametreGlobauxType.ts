import type { Base } from "@/types/baseType";
import type { BlocksContent } from "@/types/blocks";

export type SemaineSansCreneaux = {
  /** Lundi de la semaine concernée (yyyy-MM-dd). */
  date_indispo: string;
  texte_indispo: BlocksContent | null;
};

export type ParametreGlobaux = Base & {
  lien_accueil_helloasso: string | null;
  lien_charte_interclub: string | null;
  saison_id: number | null;
  /** Libellés des créneaux complets (composant liste-txt.contenu). */
  creneaux_complets: string[];
  /** Semaines sans créneaux (message spécial à la place du planning). */
  semaines_sans_creneaux: SemaineSansCreneaux[];
};
