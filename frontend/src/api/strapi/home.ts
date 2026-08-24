import { fetchAPI } from '../Client';
import { mapMedia } from '@/utils/media';
import type { Hero } from '@/types/herosType';
import type { Article } from '@/types/articlesType';
import type { Accueil, LabelNomEtLogo, StatsClub } from '@/types/accueilType';
import type { Partner } from '@/types/partnersType';
import type { MotPresident } from '@/types/motPresident';
import { cachedFetch } from '@/utils/cachedFetch';
import type { Categorie } from '@/types/categoriesType';

export type HomeSectionsPayload = {
  featuredArticles: Article[];
  accueil: Accueil | null;
  partenaires: Partner[];
  motPresident: MotPresident | null;
};

export type HomePayload = HomeSectionsPayload & {
  heros: Hero[];
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
    contenu: [],
    excerpt: item.excerpt ?? '',
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

function mapSections(data: any): HomeSectionsPayload {
  return {
    featuredArticles: (data?.featuredArticles ?? []).map(mapArticle),
    accueil: mapAccueil(data?.accueil),
    partenaires: (data?.partenaires ?? []).map(mapPartner),
    motPresident: mapMotPresident(data?.motPresident),
  };
}

/** Hero carousel — chemin critique LCP, cache client 2 min */
export async function getHomeHeros(): Promise<Hero[]> {
  return cachedFetch(
    'home:heros',
    async () => {
      const { data } = await fetchAPI('/api/home/heros');
      return (data?.heros ?? []).map(mapHero);
    },
    120_000,
  );
}

/** Sections below-the-fold — cache client 1 min */
export async function getHomeSections(): Promise<HomeSectionsPayload> {
  return cachedFetch(
    'home:sections',
    async () => {
      const { data } = await fetchAPI('/api/home/sections');
      return mapSections(data);
    },
    60_000,
  );
}

/** Agrégat complet (legacy / fallback) */
export async function getHome(): Promise<HomePayload> {
  return cachedFetch(
    'home',
    async () => {
      const { data } = await fetchAPI('/api/home');
      return {
        heros: (data?.heros ?? []).map(mapHero),
        ...mapSections(data),
      };
    },
    60_000,
  );
}
