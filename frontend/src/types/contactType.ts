import type { Base } from "@/types/baseType";

export type Contact = Base & {
  telephone: string;
  email: string;
  adresse: string;
  jour_accueils_physique: string[];
  heure_debut_accueils_physique: string;
  heure_fin_accueils_physique: string;
  jour_accueils_a_distance: string[];
  heure_debut_accueils_a_distance: string;
  heure_fin_accueils_a_distance: string;
};
