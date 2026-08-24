'use strict';

/**
 * Aggregated homepage payload — reduces waterfall of client requests.
 */

module.exports = {
  async index(ctx) {
    const mediaFields = ['url', 'width', 'height', 'alternativeText', 'name', 'mime', 'formats'];

    const [heros, featuredArticles, accueil, partenaires, motPresident, teams] =
      await Promise.all([
        strapi.documents('api::hero.hero').findMany({
          populate: {
            image: { fields: mediaFields },
          },
          sort: ['createdAt:asc'],
        }),
        strapi.documents('api::article.article').findMany({
          filters: { a_la_une: { $eq: true } },
          populate: {
            vignette: { fields: mediaFields },
            categories: true,
          },
          sort: ['createdAt:desc'],
          limit: 6,
        }),
        strapi.documents('api::accueil.accueil').findFirst({
          populate: {
            stats_club: true,
            labels: {
              populate: {
                logo: { fields: mediaFields },
              },
            },
          },
        }),
        strapi.documents('api::partenaire.partenaire').findMany({
          populate: {
            logos: { fields: mediaFields },
          },
        }),
        strapi.documents('api::mot-du-president.mot-du-president').findFirst({
          populate: {
            portrait: { fields: mediaFields },
          },
        }).catch(() => null),
        strapi.documents('plugin::icbad-scraper.interclub-team').findMany({
          fields: [
            'teamSlug',
            'teamLabel',
            'competitionName',
            'season',
            'cltoPosition',
            'cltoPoints',
            'cltoPlayed',
            'cltoWon',
            'cltoDraw',
            'cltoLost',
            'cltoBonusPlus',
            'cltoBonusMinus',
            'cltoMatchDiff',
            'cltoSetDiff',
            'cltoPtsDiff',
            'lastScrapedAt',
            'scrapeError',
            'ranking',
            'icbadUrl',
            'desc',
            'objectif',
          ],
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height', 'formats'],
            },
            divisions_interclub: {
              fields: ['Nom_court', 'Nom_complet', 'Ordre'],
            },
          },
        }),
      ]);

    const teamsSorted = [...(teams ?? [])].sort((a, b) => {
      const orderA = a.divisions_interclub?.Ordre ?? 999;
      const orderB = b.divisions_interclub?.Ordre ?? 999;
      return orderA - orderB;
    });

    ctx.body = {
      data: {
        heros: heros ?? [],
        featuredArticles: featuredArticles ?? [],
        accueil: accueil ?? null,
        partenaires: partenaires ?? [],
        motPresident: motPresident ?? null,
        teams: teamsSorted,
      },
    };
  },
};
