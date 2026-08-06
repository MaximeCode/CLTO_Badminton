export type Gymnase = {
  id: number;
  nom: string;
  nom_court: string;
  adresse: string;
  /** Nombre de terrains — non fourni par l'API gestion pour l'instant */
  nb_terrain: string | null;
  /** Coordonnées — à peupler plus tard pour la carte */
  latitude?: number;
  longitude?: number;
};
