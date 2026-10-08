'use strict';

/**
 * Recherche site agrégée.
 * GET /api/search?q=… — résultats multi-collections (auth: false)
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/search',
      handler: 'search.index',
      config: { auth: false },
    },
  ],
};
