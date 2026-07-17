'use strict';

module.exports = ({ strapi }) => ({


  /**
   * controllers/interclub.js
   *
   * Expose :
   *  GET  /api/icbad-scraper/teams           → liste toutes les équipes (TOUS LES CHAMPS)
   *  GET  /api/icbad-scraper/teams/:slug     → détail complet d'une équipe
   *  POST /api/icbad-scraper/scrape          → déclenche le scraping de toutes les équipes (admin)
   *  POST /api/icbad-scraper/scrape/:slug    → déclenche le scraping d'une équipe (admin)
   */

  // ── Liste toutes les équipes (TOUS LES CHAMPS) ─────────
  findAll: async (ctx) => {
    const uid = 'plugin::icbad-scraper.interclub-team';

    // Ordre métier : N1 → N2 → N3 → R1 → R2 → R3 → D1-A → D1-B → D2-A → D2-B → D3 → D4
    const DIVISION_ORDER = [
      'N1', 'N2', 'N3',
      'R1', 'R2', 'R3',
      'D1-A', 'D1-B', 'D2-A', 'D2-B', 'D3', 'D4',
    ];

    const entries = await strapi.documents(uid).findMany({
      fields: [
        'teamSlug', 'teamLabel', 'division', 'competitionName', 'season',
        'cltoPosition', 'cltoPoints', 'cltoPlayed', 'cltoWon', 'cltoDraw',
        'cltoLost', 'cltoBonusPlus', 'cltoBonusMinus',
        'cltoMatchDiff', 'cltoSetDiff', 'cltoPtsDiff',
        'lastScrapedAt', 'scrapeError', 'ranking',
        'icbadUrl', 'desc', 'objectif',
      ],
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
      },
    });

    const sorted = [...entries].sort((a, b) => {
      const orderA = DIVISION_ORDER.indexOf(a.division);
      const orderB = DIVISION_ORDER.indexOf(b.division);
      return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
    });

    ctx.body = { data: sorted };
  },

  // ── Détail complet d'une équipe par slug ───────────────────────────────
  findOne: async (ctx) => {
    const { slug } = ctx.params;
    const uid = 'plugin::icbad-scraper.interclub-team';

    const entry = await strapi.documents(uid).findFirst({
      filters: { teamSlug: slug },
      populate: {
        image: {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
      },
    });

    if (!entry) {
      return ctx.notFound(`Équipe "${slug}" introuvable.`);
    }

    ctx.body = { data: entry };
  },

  // ── Scraping manuel — toutes les équipes (admin seulement) ────────────
  scrapeAll: async (ctx) => {
    const { scrapeAll } = strapi
      .plugin('icbad-scraper')
      .service('scraper');

    // Lancer en arrière-plan pour ne pas bloquer la réponse HTTP
    scrapeAll(strapi).catch((err) => {
      strapi.log.error('[icbad-scraper] scrapeAll error:', err.message);
    });

    ctx.body = {
      message: 'Scraping lancé en arrière-plan pour toutes les équipes.',
    };
  },

  // ── Scraping manuel — une équipe (admin seulement) ────────────────────
  scrapeOne: async (ctx) => {
    const { slug } = ctx.params;
    const { scrapeOne } = strapi
      .plugin('icbad-scraper')
      .service('scraper');

    try {
      const result = await scrapeOne(strapi, slug);
      ctx.body = { data: result };
    } catch (err) {
      ctx.badRequest(err.message);
    }
  },
});
