import { fetchAPI } from "../Client";
import type { Avantage } from "@/types/baseType";
import type { EvenementFormation } from "@/types/evenementType";
import type { PageFormation } from "@/types/formationType";

function mapAvantages(items: Avantage[] | null | undefined): Avantage[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    contenu: item.contenu,
  }));
}

function mapEvenementsFormation(
  items: EvenementFormation[] | null | undefined,
): EvenementFormation[] {
  return (items ?? [])
    .map((item) => ({
      id: item.id,
      titre: item.titre,
      date: item.date,
      detail_date: item.detail_date ?? null,
      lieu: item.lieu,
      horaire: item.horaire,
      description: item.description ?? null,
      lien_inscription: item.lien_inscription,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getPageFormations(): Promise<PageFormation | null> {
  try {
    const { data } = await fetchAPI("/api/page-formation?populate=*");
    if (!data) return null;
    return {
      id: data.id,
      documentId: data.documentId,
      contenu: data.contenu ?? null,
      les_avantages: mapAvantages(data.les_avantages),
      evenements: mapEvenementsFormation(data.compo_evenements),
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Not Found") {
      return null;
    }
    throw error;
  }
}
