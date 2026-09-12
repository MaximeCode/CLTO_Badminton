import { fetchAPI } from '../Client';
import { mapMedia } from '@/utils/media';
import type { PagePartenaires } from '@/types/pagePartenairesType';
import type { Partner } from '@/types/partnersType';
import type { InformationsPublic } from '@/types/publicsType';

function mapInformations(
  items: InformationsPublic[] | null | undefined,
): InformationsPublic[] {
  return (items ?? []).map((item) => ({
    id: item.id,
    titre: item.titre,
    contenu: item.contenu,
  }));
}

export async function getPagePartenaires(): Promise<PagePartenaires | null> {
  try {
    const { data } = await fetchAPI('/api/page-partenaire?populate=*');
    if (!data) return null;

    return {
      id: data.id,
      documentId: data.documentId,
      titre: data.titre ?? null,
      description: data.description ?? null,
      informations: mapInformations(data.informations),
    };
  } catch (error) {
    if (error instanceof Error && error.message === 'Not Found') {
      return null;
    }
    throw error;
  }
}

/** Lien dossier partenariats — champ partagé avec Public Entreprises. */
export async function getLienDossierPartenariat(): Promise<string | null> {
  try {
    const { data } = await fetchAPI('/api/public-entreprise?fields[0]=lien_dossier_partenariat');
    return data?.lien_dossier_partenariat ?? null;
  } catch (error) {
    if (error instanceof Error && error.message === 'Not Found') {
      return null;
    }
    throw error;
  }
}

export async function getPartenaires(): Promise<Partner[]> {
  try {
    const { data } = await fetchAPI('/api/partenaires?populate=logos&sort=ordre:asc');
    return (data ?? []).map((item: any) => ({
      id: item.id,
      documentId: item.documentId,
      logos: (item.logos ?? []).map((logo: any) => mapMedia(logo)),
      type: item.type,
      ordre: item.ordre,
    }));
  } catch (error) {
    if (error instanceof Error && error.message === 'Not Found') {
      return [];
    }
    throw error;
  }
}
