/**
 * Lien interne du site (chemin relatif géré par React Router).
 * Ex. "/adherer"
 */
export function isInternalAppLink(link: string): boolean {
  return link.startsWith("/");
}

/**
 * Absolutise un lien interne avec VITE_APP_URL.
 * Les liens externes sont renvoyés tels quels.
 * Ex. "/adherer" → "http://localhost:5173/adherer"
 */
export function toAbsoluteAppUrl(link: string): string {
  if (!isInternalAppLink(link)) {
    return link;
  }

  return `${import.meta.env.VITE_APP_URL}${link}`;
}
