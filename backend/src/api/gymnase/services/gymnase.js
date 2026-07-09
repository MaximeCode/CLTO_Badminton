'use strict';

/**
 * gymnase service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gymnase.gymnase');
