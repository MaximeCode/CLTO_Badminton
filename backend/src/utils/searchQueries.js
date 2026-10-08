'use strict';

const { extractTextFromBlocks } = require('./blocksText');

const PAGE_SIZE = 5;
const MAX_TOTAL = 25;

/**
 * @param {string} q
 * @returns {Promise<Array<{
 *   type: string;
 *   title: string;
 *   excerpt?: string;
 *   url: string;
 *   group: string;
 * }>>}
 */
async function searchAll(q) {
  const [
    articles,
    stages,
    evenements,
    faqs,
    galeries,
    historiques,
    palmares,
  ] = await Promise.all([
    searchArticles(q),
    searchStages(q),
    searchEvenements(q),
    searchFaqs(q),
    searchGaleries(q),
    searchHistoriques(q),
    searchPalmares(q),
  ]);

  return [
    ...articles,
    ...stages,
    ...evenements,
    ...faqs,
    ...galeries,
    ...historiques,
    ...palmares,
  ].slice(0, MAX_TOTAL);
}

async function searchArticles(q) {
  const items = await strapi.documents('api::article.article').findMany({
    filters: {
      titre: { $containsi: q },
    },
    fields: ['titre', 'documentId', 'contenu', 'updatedAt'],
    sort: ['updatedAt:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'article',
    title: item.titre,
    excerpt: extractTextFromBlocks(item.contenu, 120) || undefined,
    url: `/actualite/${item.documentId}`,
    group: 'Actualités',
  }));
}

async function searchStages(q) {
  const items = await strapi.documents('api::stage.stage').findMany({
    filters: {
      $or: [
        { titre: { $containsi: q } },
        { gymnase: { $containsi: q } },
        { public: { $containsi: q } },
        { autre_infos: { $containsi: q } },
      ],
    },
    fields: [
      'titre',
      'gymnase',
      'public',
      'autre_infos',
      'description',
      'updatedAt',
    ],
    sort: ['date_debut:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => {
    const excerpt =
      extractTextFromBlocks(item.description, 120) ||
      [item.public, item.gymnase, item.autre_infos].filter(Boolean).join(' · ') ||
      undefined;

    return {
      type: 'stage',
      title: item.titre,
      excerpt,
      url: '/stages',
      group: 'Stages',
    };
  });
}

async function searchEvenements(q) {
  const items = await strapi.documents('api::evenement.evenement').findMany({
    filters: {
      $or: [
        { titre: { $containsi: q } },
        { petite_description: { $containsi: q } },
        { lieu: { $containsi: q } },
      ],
    },
    fields: ['titre', 'petite_description', 'lieu', 'date'],
    sort: ['date:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'evenement',
    title: item.titre,
    excerpt: item.petite_description || item.lieu || undefined,
    url: '/evenements',
    group: 'Événements',
  }));
}

async function searchFaqs(q) {
  const items = await strapi.documents('api::faq.faq').findMany({
    filters: {
      $or: [
        { question: { $containsi: q } },
        { reponse: { $containsi: q } },
      ],
    },
    fields: ['question', 'reponse', 'updatedAt'],
    sort: ['updatedAt:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'faq',
    title: item.question,
    excerpt: truncate(item.reponse, 120),
    url: '/faq',
    group: 'FAQ',
  }));
}

async function searchGaleries(q) {
  const items = await strapi.documents('api::galerie.galerie').findMany({
    filters: {
      titre: { $containsi: q },
    },
    fields: ['titre', 'date'],
    sort: ['date:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'galerie',
    title: item.titre,
    url: '/galerie',
    group: 'Galerie',
  }));
}

async function searchHistoriques(q) {
  const items = await strapi.documents('api::historique.historique').findMany({
    filters: {
      $or: [
        { titre: { $containsi: q } },
        { description: { $containsi: q } },
      ],
    },
    fields: ['titre', 'description', 'date'],
    sort: ['date:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'historique',
    title: item.titre,
    excerpt: truncate(item.description, 120),
    url: '/historique',
    group: 'Historique',
  }));
}

async function searchPalmares(q) {
  const items = await strapi.documents('api::palmares.palmares').findMany({
    filters: {
      $or: [
        { titre: { $containsi: q } },
        { description: { $containsi: q } },
      ],
    },
    fields: ['titre', 'description', 'date'],
    sort: ['date:desc'],
    limit: PAGE_SIZE,
    status: 'published',
  });

  return (items ?? []).map((item) => ({
    type: 'palmares',
    title: item.titre,
    excerpt: truncate(item.description, 120),
    url: '/palmares',
    group: 'Palmarès',
  }));
}

function truncate(value, maxLength) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const text = value.replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}

module.exports = { searchAll };
