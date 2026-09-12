import { API_URL, fetchAPI } from "../Client";
import type {
  PublicAdultesCompetiteurs,
  PublicAdultesLoisirs,
  PublicEntreprise,
  PublicJeunes,
  PublicVieillesPlumes,
  InformationsPublic,
  ContenuPublic,
  PrixVolant,
} from "@/types/publicsType";
import type { Media } from "@/types/baseType";

function mapInformations(
  items: Array<InformationsPublic | null | undefined> | null | undefined,
): InformationsPublic[] {
  return (items ?? [])
    .filter((item): item is InformationsPublic => item != null)
    .map((item) => ({
      id: item.id,
      titre: item.titre ?? "",
      contenu: item.contenu ?? [],
    }));
}

function mapInformation(
  item: InformationsPublic | null | undefined,
): InformationsPublic | null {
  if (!item) return null;
  return {
    id: item.id,
    titre: item.titre ?? "",
    contenu: item.contenu ?? [],
  };
}

function mapContenus(
  items: Array<ContenuPublic | null | undefined> | null | undefined,
): ContenuPublic[] {
  return (items ?? [])
    .filter((item): item is ContenuPublic => item != null)
    .map((item) => ({
      id: item.id,
      titre: item.titre ?? "",
      sous_titre: item.sous_titre ?? null,
      contenu: item.contenu ?? [],
    }));
}

function mapPrixVolants(
  items: Array<PrixVolant | null | undefined> | null | undefined,
): PrixVolant[] {
  return (items ?? [])
    .filter((item): item is PrixVolant => item != null)
    .map((item) => ({
      id: item.id,
      volants: item.volants,
      prix: item.prix,
    }));
}

function mapMedia(media: Media | null | undefined): Media | null {
  if (!media) return null;

  return {
    id: media.id,
    documentId: media.documentId,
    name: media.name,
    alternativeText: media.alternativeText ?? null,
    url: media.url ? `${API_URL}${media.url}` : "",
    mime: media.mime,
    width: media.width,
    height: media.height,
  };
}

function mapBannerFields(data: { titre?: string | null; description?: string | null }) {
  return {
    titre: data.titre ?? null,
    description: data.description ?? null,
  };
}

export async function getPublicAdultesCompetiteurs(): Promise<PublicAdultesCompetiteurs> {
  const { data } = await fetchAPI(`/api/public-adultes-competiteurs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    prix_licence: data.prix_licence ?? null,
    envie_de_progresser: mapInformation(data.envie_de_progresser),
    vie_du_club: mapInformations(data.vie_du_club),
    tournois_competitions: mapContenus(data.tournois_competitions),
    inscription_champ: mapInformation(data.inscription_champ),
    les_avantages: mapInformation(data.les_avantages),
  };
}

export async function getPublicAdultesLoisirs(): Promise<PublicAdultesLoisirs> {
  const { data } = await fetchAPI(`/api/public-adultes-loisirs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    prix_licence: data.prix_licence ?? null,
    envie_de_progresser: mapInformation(data.envie_de_progresser),
    vie_du_club: mapInformations(data.vie_du_club),
    les_avantages: mapInformation(data.les_avantages),
  };
}

export async function getPublicEntreprise(): Promise<PublicEntreprise> {
  const { data } = await fetchAPI(`/api/public-entreprise?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    lien_dossier_partenariat: data.lien_dossier_partenariat ?? null,
    flyer: mapMedia(data.flyer),
    partenariat: mapInformations(data.partenariat),
    les_avantages: mapInformation(data.les_avantages),
  };
}

export async function getPublicJeunes(): Promise<PublicJeunes> {
  const { data } = await fetchAPI(`/api/public-jeunes?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    prix_licence: data.prix_licence ?? null,
    informations: mapInformations(data.informations),
    entrainements: mapInformations(data.entrainements),
    tournois_competitions: mapContenus(data.tournois_competitions),
    inscription_champ: mapInformation(data.inscription_champ),
    les_avantages: mapInformation(data.les_avantages),
    prix_volants: mapPrixVolants(data.prix_volants),
  };
}

export async function getPublicVieillesPlumes(): Promise<PublicVieillesPlumes> {
  const { data } = await fetchAPI(`/api/public-vieilles-plumes?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    format_simple: data.format_simple ?? [],
    tournois_competitions: mapInformations(data.tournois_competitions),
    les_avantages: mapInformation(data.les_avantages),
  };
}
