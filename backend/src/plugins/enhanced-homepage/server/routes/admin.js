'use strict';

module.exports = {
  type: 'admin',
  routes: [
    {
      method: 'GET',
      path: '/recent-documents',
      handler: 'homepage.getRecentDocuments',
      config: {
        policies: ['admin::isAuthenticatedAdmin'],
      },
    },
  ],
};
