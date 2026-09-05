'use strict';

const controllers = require('./controllers');
const services = require('./services');
const adminRoutes = require('./routes/admin');

module.exports = () => ({
  controllers,
  services,
  routes: {
    admin: adminRoutes,
  },
});
