import { fetchAPI } from '../Client';
import { mapMedia } from '@/utils/media';
import type { Hero } from '@/types/herosType';
import type { Article } from '@/types/articlesType';
import type { Accueil, LabelNomEtLogo, StatsClub } from '@/types/accueilType';
import type { Partner } from '@/types/partnersType';
import type { MotPresident } from '@/types/motPresident';
import type { InterclubTeamSummary } from '@/types/interclubType';
import { sortTeamsByDivision } from '@/utils/interclubUtils';
import { cachedFetch } from '@/utils/cachedFetch';
import type { BlocksContent } from '@/types/blocks';
import type { Categorie } from '@/types/categoriesType';
import { API_URL } from '../Client';

export type HomePayload = {
  heros: Hero[];
  featuredArticles: Article[];
  accueil: Accueil | null;
  partenaires: Partner[];
  motPresident: MotPresident | null;
  teams: InterclubTeamSummary[];
};

function mapHero(item: any): Hero {
  const image = mapMedia(item.image);
  return {
    id: item.id,
    documentId: item.documentId,
    categorie: item.categorie,
    titre: item.titre,
    description: item.description ?? '',
    libelle_btn: item.libelle_btn ?? 'En savoir plus',
    image,
    lien: item.lien ?? '',
  };
}

function mapArticle(item: any): Article {
  return {
    id: item.id,
    documentId: item.documentId,
    titre: item.titre,
    vignette: mapMedia(item.vignette),
    a_la_une: item.a_la_une,
    contenu: (item.contenu ?? []) as BlocksContent,
    categories: (item.categories ?? []) as Categorie[],
    createdAt: item.createdAt,
  };
}

function mapAccueil(data: any): Accueil | null {
  if (!data) return null;
  const labels: LabelNomEtLogo[] = (data.labels ?? [])
    .filter((item: any) => item.label && item.logo?.url)
    .map((item: any) => ({
      id: item.id,
      label: item.label,
      logo: mapMedia(item.logo),
    }));

  return {
    id: data.id,
    documentId: data.documentId,
    stats_club: (data.stats_club ?? []) as StatsClub[],
    labels,
  };
}

function mapPartner(item: any): Partner {
  return {
    id: item.id,
    documentId: item.documentId,
    logos: (item.logos ?? []).map((logo: any) => mapMedia(logo)),
    type: item.type,
  };
}

function mapMotPresident(data: any): MotPresident | null {
  if (!data) return null;
  return {
    id: data.id,
    documentId: data.documentId,
    discours: data.discours,
    portrait: mapMedia(data.portrait),
  };
}

function mapTeam(team: any): InterclubTeamSummary {
  return {
    ...team,
    image: {
      url: team.image?.url ? (team.image.url.startsWith('http') ? team.image.url : `${API_URL}${team.image.url}`) : '',
      ...(team.image ? mapMedia(team.image) : {}),
    },
  } as InterclubTeamSummary;
}

export async function getHome(): Promise<HomePayload> {
  return cachedFetch('home', async () => {
    const { data } = await fetchAPI('/api/home');
    return {
      heros: (data?.heros ?? []).map(mapHero),
      featuredArticles: (data?.featuredArticles ?? []).map(mapArticle),
      accueil: mapAccueil(data?.accueil),
      partenaires: (data?.partenaires ?? []).map(mapPartner),
      motPresident: mapMotPresident(data?.motPresident),
      teams: sortTeamsByDivision((data?.teams ?? []).map(mapTeam)),
    };
  }, 60_000);
}
