'use strict';

/**
 * Force le populate de createdBy / updatedBy sur les routes Article.
 * Compatible avec un `populate` déjà présent (objet, tableau ou string).
 */
module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const populate = ctx.query.populate;

    if (!populate) {
      ctx.query.populate = ['createdBy', 'updatedBy'];
    } else if (Array.isArray(populate)) {
      if (!populate.includes('createdBy')) populate.push('createdBy');
      if (!populate.includes('updatedBy')) populate.push('updatedBy');
    } else if (typeof populate === 'string') {
      ctx.query.populate = [populate, 'createdBy', 'updatedBy'];
    } else if (typeof populate === 'object') {
      ctx.query.populate = {
        ...populate,
        createdBy: true,
        updatedBy: true,
      };
    }

    await next();
  };
};
