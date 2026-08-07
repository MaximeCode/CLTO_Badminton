export type Gymnase = {
  id: number;
  nom: string;
  nom_court: string;
  adresse: string;
  capacite_terrain: number | null;
  capacite_jeu_libre: number | null;
  capacite_entrainement: number | null;
  capacite_cours: number | null;
  latitude: number | null;
  longitude: number | null;
};
