'use strict';

/**
 * strapi-server.js — Point d'entrée plugin Strapi v5
 *
 * Doit simplement ré-exporter ce que retourne server/index.js
 * (qui est lui-même une fonction).
 */
module.exports = require('./server');