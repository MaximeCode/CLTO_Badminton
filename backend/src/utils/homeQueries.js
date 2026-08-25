'use strict';

const { extractTextFromBlocks } = require('./blocksText');

const MEDIA_FIELDS = ['url', 'width', 'height', 'alternativeText', 'name', 'mime', 'formats'];

async function fetchHeros() {
  return strapi.documents('api::hero.hero').findMany({
    populate: {
      image: { fields: MEDIA_FIELDS },
    },
    sort: ['createdAt:asc'],
  });
}

async function fetchFeaturedArticles() {
  const articles = await strapi.documents('api::article.article').findMany({
    filters: { a_la_une: { $eq: true } },
    fields: ['titre', 'documentId', 'a_la_une', 'createdAt', 'contenu'],
    populate: {
      vignette: { fields: MEDIA_FIELDS },
      categories: {
        fields: ['libelle'],
      },
    },
    sort: ['createdAt:desc'],
    limit: 6,
  });

  return (articles ?? []).map((article) => ({
    id: article.id,
    documentId: article.documentId,
    titre: article.titre,
    a_la_une: article.a_la_une,
    createdAt: article.createdAt,
    vignette: article.vignette,
    categories: article.categories,
    excerpt: extractTextFromBlocks(article.contenu, 160),
  }));
}

async function fetchAccueil() {
  return strapi.documents('api::accueil.accueil').findFirst({
    populate: {
      stats_club: true,
      labels: {
        populate: {
          logo: { fields: MEDIA_FIELDS },
        },
      },
    },
  });
}

async function fetchPartenaires() {
  return strapi.documents('api::partenaire.partenaire').findMany({
    populate: {
      logos: { fields: MEDIA_FIELDS },
    },
  });
}

async function fetchMotPresident() {
  return strapi
    .documents('api::mot-du-president.mot-du-president')
    .findFirst({
      populate: {
        portrait: { fields: MEDIA_FIELDS },
      },
    })
    .catch(() => null);
}

async function fetchHomeSections() {
  const [featuredArticles, accueil, partenaires, motPresident] = await Promise.all([
    fetchFeaturedArticles(),
    fetchAccueil(),
    fetchPartenaires(),
    fetchMotPresident(),
  ]);

  return {
    featuredArticles,
    accueil: accueil ?? null,
    partenaires: partenaires ?? [],
    motPresident: motPresident ?? null,
  };
}

async function fetchFullHome() {
  const [heros, sections] = await Promise.all([fetchHeros(), fetchHomeSections()]);
  return {
    heros: heros ?? [],
    ...sections,
  };
}

module.exports = {
  fetchHeros,
  fetchHomeSections,
  fetchFullHome,
};
