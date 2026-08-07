import { API_URL, fetchAPI } from "../Client";
import type {
  PublicAdultesCompetiteurs,
  PublicAdultesLoisirs,
  PublicEntreprise,
  PublicJeunes,
  PublicVieillesPlumes,
  InformationsPublic,
  ContenuPublic,
  AvantagePublic,
  PrixVolant,
} from "@/types/publicsType";
import type { Media } from "@/types/baseType";

function mapInformations(items: InformationsPublic[] | null | undefined): InformationsPublic[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    titre: item.titre,
    contenu: item.contenu,
  }));
}

function mapContenus(items: ContenuPublic[] | null | undefined): ContenuPublic[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    titre: item.titre,
    sous_titre: item.sous_titre ?? null,
    contenu: item.contenu,
  }));
}

function mapAvantages(items: AvantagePublic[] | null | undefined): AvantagePublic[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    contenu: item.contenu,
  }));
}

function mapPrixVolants(items: PrixVolant[] | null | undefined): PrixVolant[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    volants: item.volants,
    prix: item.prix,
  }));
}

function mapMedia(media: Media | null | undefined): Media {
  if (!media) {
    return {
      id: 0,
      documentId: "",
      name: "",
      alternativeText: null,
      url: "",
    };
  }

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

function mapBannerFields(data: {
  titre?: string | null;
  description?: string | null;
}) {
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
    tournois_competitions: mapContenus(data.tournois_competitions),
    les_avantages: mapAvantages(data.les_avantages),
  };
}

export async function getPublicAdultesLoisirs(): Promise<PublicAdultesLoisirs> {
  const { data } = await fetchAPI(`/api/public-adultes-loisirs?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    prix_licence: data.prix_licence,
    envie_de_progresser: {
      id: data.envie_de_progresser.id,
      titre: data.envie_de_progresser.titre,
      contenu: data.envie_de_progresser.contenu,
    },
    vie_du_club: mapInformations(data.vie_du_club),
    les_avantages: mapAvantages(data.les_avantages),
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
    les_avantages: mapAvantages(data.les_avantages),
  };
}

export async function getPublicJeunes(): Promise<PublicJeunes> {
  const { data } = await fetchAPI(`/api/public-jeunes?populate=*`);
  return {
    id: data.id,
    documentId: data.documentId,
    ...mapBannerFields(data),
    informations: mapInformations(data.informations),
    entrainements: mapInformations(data.entrainements),
    tournois_competitions: mapContenus(data.tournois_competitions),
    les_avantages: mapAvantages(data.les_avantages),
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
    les_avantages: mapAvantages(data.les_avantages),
  };
}
