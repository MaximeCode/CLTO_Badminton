'use strict';

/**
 * public-jeunes service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::public-jeunes.public-jeunes');
