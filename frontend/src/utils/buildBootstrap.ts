/**
 * Lit les données injectées au build dans index.html (JSON inline).
 */
export function readBootstrapJson<T>(id: string): T | null {
  if (typeof document === 'undefined') return null;
  const el = document.getElementById(id);
  if (!el?.textContent?.trim()) return null;
  try {
    return JSON.parse(el.textContent) as T;
  } catch {
    console.warn(`[bootstrap] JSON invalide pour #${id}`);
    return null;
  }
}
