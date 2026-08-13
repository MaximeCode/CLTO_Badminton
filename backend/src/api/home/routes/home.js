'use strict';

/**
 * Custom homepage aggregate route.
 * GET /api/home
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/home',
      handler: 'home.index',
      config: {
        auth: false,
      },
    },
  ],
};
