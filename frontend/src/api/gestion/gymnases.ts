import type { Gymnase } from "@/types/gymnasesType";

const GESTION_API_URL = "https://www.gestion.cltobadminton.fr";

type GymnaseApiItem = {
  id: string;
  nom: string;
  nom_court: string;
  saison_id: string;
  adresse: string;
  code_postal: string;
  ville: string;
  actif: string;
  visible: string;
  // nb_terrain?: string | null;
};

function formatAdresse(item: GymnaseApiItem): string {
  return `${item.adresse}, ${item.code_postal} ${item.ville}`;
}

function mapGymnase(item: GymnaseApiItem): Gymnase {
  return {
    id: Number(item.id),
    nom: item.nom,
    nom_court: item.nom_court,
    adresse: formatAdresse(item),
    // nb_terrain: item.nb_terrain ?? null,
    nb_terrain: null,
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
