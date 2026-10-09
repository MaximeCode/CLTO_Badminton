'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/report-error',
      handler: 'report-error.send',
      config: {
        auth: false,
      },
    },
  ],
};
