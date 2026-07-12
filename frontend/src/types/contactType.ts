export type Contact = {
  id: number;
  documentId: string;
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
