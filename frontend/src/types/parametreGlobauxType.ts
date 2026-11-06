import type { Base } from "@/types/baseType";
import type { BlocksContent } from "@/types/blocks";

export type JourIndispo = {
  /** Début de la période (yyyy-MM-dd, inclus). */
  date_debut: string;
  /** Fin de la période (yyyy-MM-dd, inclus). Un seul jour → date_debut === date_fin. */
  date_fin: string;
  texte: BlocksContent | null;
};

export type ParametreGlobaux = Base & {
  lien_accueil_helloasso: string | null;
  lien_charte_interclub: string | null;
  saison_id: number | null;
  /** Libellés des créneaux complets (composant liste-txt.contenu). */
  creneaux_complets: string[];
  /** Périodes sans créneaux (jours fériés, gym indispo, vacances…). */
  indispo_gymnase: JourIndispo[];
};
