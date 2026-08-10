export type SeanceTag = {
  code: string;
  libelle: string;
};

/** Séance normalisée pour l'UI créneaux */
export type Seance = {
  id: string;
  creneauId: string;
  nom: string;
  gymnaseId: string;
  gymnaseNom: string;
  gymnaseNomCourt: string;
  dateSeance: string; // yyyy-MM-dd
  jourSemaine: number;
  debut: string; // HH:mm
  fin: string; // HH:mm
  sessionKind: "Entraînement" | "Jeu libre";
  /** Libellés ENCADREMENT (vide si jeu libre) */
  types: string[];
  /** Type principal pour pastille / couleur */
  primaryType: string;
  entraineurs: string[];
  publics: string[];
  commentaire: string | null;
  actif: boolean;
  visible: boolean;
  saisonId: number;
};

export type CreneauWeek = {
  id: string;
  label: string;
  period: string;
  weekStart: string; // yyyy-MM-dd
  weekEnd: string;
  seances: Seance[];
};

export const CRENEAU_TYPES = ["Élite", "Perfectionnement", "Intermédiaire", "Débutant"] as const;

export type CreneauType = (typeof CRENEAU_TYPES)[number];

export const CRENEAU_PUBLICS = [
  "Compétiteurs",
  "Famille",
  "Jeunes",
  "Loisirs",
  "Vétérans",
] as const;

export type CreneauPublic = (typeof CRENEAU_PUBLICS)[number];
