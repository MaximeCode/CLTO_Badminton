'use strict';

/**
 * Routes agrégées homepage.
 * GET /api/home         — tout (legacy)
 * GET /api/home/heros   — hero carousel (LCP)
 * GET /api/home/sections — reste de la page (sans interclubs)
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/home',
      handler: 'home.index',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/home/heros',
      handler: 'home.heros',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/home/sections',
      handler: 'home.sections',
      config: { auth: false },
    },
  ],
};
