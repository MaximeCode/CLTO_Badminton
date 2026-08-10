export const SITE_NAME = "CLTO Badminton Orléans";

export const DEFAULT_DESCRIPTION =
  "CLTO Badminton Orléans : club de badminton à Orléans. Créneaux, inscriptions, interclubs, stages et vie du club.";

/** Construit un title de page unique, sauf si le titre est déjà le nom du site. */
export function buildTitle(pageTitle: string) {
  const trimmed = pageTitle.trim();
  if (!trimmed || trimmed === SITE_NAME) return SITE_NAME;
  return `${trimmed} | ${SITE_NAME}`;
}
