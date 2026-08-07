import type { Gymnase } from "@/types/gymnasesType";

const GESTION_API_URL = "https://www.gestion.cltobadminton.fr";

type GymnaseApiItem = {
  id: string;
  nom: string;
  nom_court: string;
  capacite_terrain: string | null;
  capacite_jeu_libre: string | null;
  capacite_entrainement: string | null;
  capacite_cours: string | null;
  saison_id: string;
  adresse: string;
  code_postal: string;
  ville: string;
  actif: string;
  visible: string;
  longitude: string | null;
  latitude: string | null;
};

function formatAdresse(item: GymnaseApiItem): string {
  return `${item.adresse}, ${item.code_postal} ${item.ville}`;
}

function parseNullableNumber(value: string | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function mapGymnase(item: GymnaseApiItem): Gymnase {
  return {
    id: Number(item.id),
    nom: item.nom,
    nom_court: item.nom_court,
    adresse: formatAdresse(item),
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
export async function getGymnases(saisonId: number): Promise<Gymnase[]> {
  const response = await fetch(`${GESTION_API_URL}/api/gymnases/${saisonId}`);

  if (!response.ok) {
    throw new Error("Impossible de charger les gymnases.");
  }

  const data = (await response.json()) as GymnaseApiItem[];

  return data
    .filter(
      (item) =>
        item.actif === "1" &&
        item.visible === "1" &&
        Number(item.saison_id) === saisonId,
    )
    .map(mapGymnase);
}
