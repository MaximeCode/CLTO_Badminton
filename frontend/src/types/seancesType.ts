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
  /** Libellés SC (Service Civique) */
  serviceCivique: string[];
  /** Jeu libre : ENTRAINEUR, SC et OUVREUR fusionnés. Entraînement : OUVREUR uniquement. */
  ouvreurs: string[];
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

export const CRENEAU_TYPES = [
  "Élite",
  "Perfectionnement",
  "Intermédiaire",
  "Débutant",
  "Stage",
] as const;
export const CRENEAU_HINT = [
  "Compétiteurs classés R minimum",
  "Compétiteurs classés D8 minimum",
  "Joueurs ayant plus de 3 ans de pratique",
  "Joueurs ayant moins de 3 ans de pratique",
  "Stage / journée dédiée",
] as const;

export const CRENEAU_JEU_LIBRE_ITEMS = [
  { type: "Matchs pour tous", hint: "Matchs ouverts à tous les publics" },
  { type: "Pratique libre", hint: "Pratiques et publics variés" },
  { type: "Matchs Loisirs", hint: "Matchs destinés aux joueurs Loisirs" },
  { type: "Matchs Compétiteurs", hint: "Matchs destinés aux joueurs Compétiteurs" },
] as const;

export type CreneauType = (typeof CRENEAU_TYPES)[number];

export const CRENEAU_PUBLICS = [
  "Compétiteurs",
  "Famille",
  "Loisirs",
  "Jeunes",
  "Adultes",
  "Vétérans",
] as const;

export type CreneauPublic = (typeof CRENEAU_PUBLICS)[number];
