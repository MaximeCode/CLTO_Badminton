/**
 * Valeurs exactes du champ `page` du Content-Type Bandeau.
 * Doivent correspondre au titre principal figé de chaque PageHero.
 * (Accueil et Interclub exclus — gérés autrement.)
 * Ordre alphabétique des valeurs (accents ignorés pour le tri).
 */
export const BANDEAU_PAGES = {
  ACTUALITES: "ACTUALITÉS",
  ADHERER: "ADHERER AU CLUB",
  ADULTES_COMPETITEURS: "ADULTES COMPÉTITEURS",
  ADULTES_LOISIRS: "ADULTES LOISIRS",
  AGENDA: "AGENDA",
  BENEVOLES: "BÉNÉVOLES",
  CONTACT: "CONTACT",
  CRENEAUX: "CRÉNEAUX",
  DOCUMENTS: "Documents officiels",
  ENTREPRISE: "ENTREPRISE",
  EVENEMENTS: "ÉVÉNEMENTS",
  FAQ: "FAQ",
  FORMATIONS: "FORMATIONS",
  GALERIE: "GALERIE",
  HISTORIQUE: "HISTORIQUE",
  JEUNES: "JEUNES",
  GYMNASES: "LES GYMNASES",
  MENTIONS_LEGALES: "MENTIONS LÉGALES",
  ORGANIGRAMME: "ORGANIGRAMME",
  PALMARES: "PALMARÈS",
  POLITIQUE_CONFIDENTIALITE: "POLITIQUE DE CONFIDENTIALITÉ",
  PROJET_CLUB: "PROJET CLUB",
  STAGES: "STAGES",
  VIEILLES_PLUMES: "VIEILLES PLUMES Seniors 60 ans et +",
} as const;

export type BandeauPage = (typeof BANDEAU_PAGES)[keyof typeof BANDEAU_PAGES];

/** Liste plate pour les admins / seed (ordre alphabétique). */
export const BANDEAU_PAGES_LIST: BandeauPage[] = Object.values(BANDEAU_PAGES);
