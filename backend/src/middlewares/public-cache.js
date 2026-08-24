'use strict';

/**
 * Cache-Control sur les GET publics (API agrégée, contact, médias).
 */
const CACHE_RULES = [
  { match: (path) => path === '/api/home/heros', value: 'public, max-age=120, stale-while-revalidate=300' },
  {
    match: (path) => path === '/api/home' || path === '/api/home/sections',
    value: 'public, max-age=60, stale-while-revalidate=120',
  },
  { match: (path) => path === '/api/contact', value: 'public, max-age=300, stale-while-revalidate=600' },
  {
    match: (path) => path.startsWith('/api/icbad-scraper/teams'),
    value: 'public, max-age=60, stale-while-revalidate=120',
  },
  { match: (path) => path.startsWith('/uploads/'), value: 'public, max-age=31536000, immutable' },
];

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    if (ctx.method !== 'GET' || ctx.status < 200 || ctx.status >= 400) {
      return;
    }

    const rule = CACHE_RULES.find(({ match }) => match(ctx.path));
    if (rule && !ctx.response.get('Cache-Control')) {
      ctx.set('Cache-Control', rule.value);
    }
  };
};
