import { fetchAPI } from "../Client";
import type {
  PublicJeunesLoisirs,
  PublicJeunesCompetiteurs,
  InformationsPublic,
  ContenuPublic,
  AvantagePublic,
  PrixVolant,
} from "@/types/publicsType";

export async function getPublicsJeunesLoisirs(): Promise<PublicJeunesLoisirs> {
  const { data } = await fetchAPI(`/api/public-jeunes-loisirs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    informations: data.informations.map((information: InformationsPublic) => ({
      id: information.id,
      titre: information.titre,
      contenu: information.contenu,
    })),
  };
}

export async function getPublicsJeunesCompetiteurs(): Promise<PublicJeunesCompetiteurs> {
  const { data } = await fetchAPI(`/api/public-jeunes-competiteurs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    entrainements: (data.entrainements ?? []).map((item: InformationsPublic) => ({
      id: item.id,
      titre: item.titre,
      contenu: item.contenu,
    })),
    tournois_competitions: (data.tournois_competitions ?? []).map((item: ContenuPublic) => ({
      id: item.id,
      titre: item.titre,
      sous_titre: item.sous_titre,
      contenu: item.contenu,
    })),
    tutoriels: (data.tutoriels ?? []).map((item: ContenuPublic) => ({
      id: item.id,
      titre: item.titre,
      sous_titre: item.sous_titre,
      contenu: item.contenu,
    })),
    les_avantages: (data.les_avantages ?? []).map((item: AvantagePublic) => ({
      id: item.id,
      contenu: item.contenu,
    })),
    prix_volants: (data.prix_volants ?? []).map((item: PrixVolant) => ({
      id: item.id,
      volants: item.volants,
      prix: item.prix,
    })),
  };
}
