import { fetchAPIGestion } from "../Client";

/**
 * Récupère le nombre d'adhérents depuis l'API gestion CLTO pour une saison donnée.
 * La route renvoie un nombre brut (pas un tableau).
 */
export async function getAdherentsCount(saisonId: number = 17): Promise<number> {
  const { data } = await fetchAPIGestion(`/api/adherents/count/${saisonId}`);

  const count = Number(data);
  if (!Number.isFinite(count)) {
    throw new Error("Réponse API gestion invalide | Attendu: nombre d'adhérents, reçu: " + data);
  }
  return count;
}
