import type { Gymnase } from "@/types/gymnasesType";
import { fetchAPIGestion, fetchFakeAPIGestion } from "../Client";

function parseNullableNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Récupère les gymnases depuis l'API gestion CLTO pour une saison donnée.
 * Filtre : actif=1, visible=1, et saison_id correspondant.
 */
export async function getGymnases(saisonId: number): Promise<Gymnase[]> {
  const { data } = await fetchAPIGestion(`/api/gymnases/${saisonId}`); // PP / PROD
  // const { data } = await fetchFakeAPIGestion(`allGymnases`); // DEV

  return data.map(
    (item: {
      id: number;
      nom: string;
      nom_court: string;
      adresse: string;
      code_postal: string;
      ville: string;
      capacite_terrain: string | null;
      capacite_jeu_libre: string | null;
      capacite_entrainement: string | null;
      capacite_cours: string | null;
      latitude: string | null;
      longitude: string | null;
      // nb_terrains: string | null;
    }) => ({
      id: Number(item.id),
      nom: item.nom,
      nom_court: item.nom_court,
      adresse: `${item.adresse}, ${item.code_postal} ${item.ville}`,
      capacite_terrain: parseNullableNumber(item.capacite_terrain),
      capacite_jeu_libre: parseNullableNumber(item.capacite_jeu_libre),
      capacite_entrainement: parseNullableNumber(item.capacite_entrainement),
      capacite_cours: parseNullableNumber(item.capacite_cours),
      latitude: parseNullableNumber(item.latitude),
      longitude: parseNullableNumber(item.longitude),
      // nb_terrains: parseNullableNumber(item.nb_terrains),
    })
  );
}
