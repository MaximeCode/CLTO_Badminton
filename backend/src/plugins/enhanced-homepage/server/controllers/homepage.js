'use strict';

const { errors } = require('@strapi/utils');

module.exports = ({ strapi }) => ({
  async getRecentDocuments(ctx) {
    const action = ctx.query?.action;

    if (action !== 'update' && action !== 'publish') {
      throw new errors.ValidationError('Query param "action" must be "update" or "publish"');
    }

    const homepageService = strapi.plugin('enhanced-homepage').service('homepage');

    if (action === 'publish') {
      ctx.body = { data: await homepageService.getRecentlyPublishedDocuments() };
      return;
    }

    ctx.body = { data: await homepageService.getRecentlyUpdatedDocuments() };
  },
});
