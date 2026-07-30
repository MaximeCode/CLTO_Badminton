// backend/src/api/form-contact/routes/form-contact.js
'use strict';

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/form-contact',
      handler: 'form-contact.send',
      config: {
        auth: false,
      },
    },
  ],
};
