import type { Gymnase } from "@/types/gymnasesType";
import { fetchAPIGestion, fetchFakeAPIGestion } from "../Client";

function parseNullableNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

type GymnaseApiItem = {
  id: string | number;
  nom: string;
  nom_court: string;
  adresse: string;
  code_postal: string;
  ville: string;
  saison_id?: string;
  actif?: string;
  visible?: string;
  capacite_terrain: string | null;
  capacite_jeu_libre: string | null;
  capacite_entrainement: string | null;
  capacite_cours: string | null;
  latitude: string | null;
  longitude: string | null;
};

function mapGymnase(item: GymnaseApiItem): Gymnase {
  return {
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
  };
}

/**
 * Récupère les gymnases depuis l'API gestion CLTO pour une saison donnée.
 * Filtre : actif=1, visible=1, et saison_id correspondant.
 */
export async function getGymnases(saisonId: number = 17): Promise<Gymnase[]> {
  const { data } =
    import.meta.env.VITE_ENV === "dev"
      ? await fetchFakeAPIGestion("allGymnases") // DEV
      : await fetchAPIGestion(`/api/gymnases/${saisonId}`); // PP / PROD

  return (data as GymnaseApiItem[])
    .filter(
      (item) =>
        item.actif === "1" &&
        item.visible === "1" &&
        (item.saison_id == null || Number(item.saison_id) === saisonId)
    )
    .map(mapGymnase);
}
