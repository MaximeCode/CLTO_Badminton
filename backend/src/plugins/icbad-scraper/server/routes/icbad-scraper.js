'use strict';

/**
 * ⚠️  Strapi v5 préfixe automatiquement les routes content-api d'un plugin
 *     avec /api/<nom-du-plugin>. Les URLs finales sont donc :
 *
 *  GET  /api/icbad-scraper/teams
 *  GET  /api/icbad-scraper/teams/:slug
 *  POST /api/icbad-scraper/scrape
 *  POST /api/icbad-scraper/scrape/:slug
 */
module.exports = [
  // ── Lecture publique ───────────────────────────────────────────────────────
  {
    method: 'GET',
    path: '/teams',
    handler: 'interclub.findAll',
    config: {
      auth: false, // Public — le front Next.js consomme sans auth
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/teams/:slug',
    handler: 'interclub.findOne',
    config: {
      auth: false,
      policies: [],
      middlewares: [],
    },
  },

  // ── Déclenchement manuel du scraping ───────────────────────────────────────
  {
    method: 'POST',
    path: '/scrape',
    handler: 'interclub.scrapeAll',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'POST',
    path: '/scrape/:slug',
    handler: 'interclub.scrapeOne',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];
