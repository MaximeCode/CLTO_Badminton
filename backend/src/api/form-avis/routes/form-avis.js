'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/form-avis',
      handler: 'form-avis.send',
      config: {
        auth: false,
      },
    },
  ],
};
