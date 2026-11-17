'use strict';

/**
 * Rate limit simple en mémoire pour POST /api/form-contact.
 * 5 requêtes / IP / 15 minutes.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map();

function getClientIp(ctx) {
  const forwarded = ctx.request.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return ctx.request.ip || ctx.ip || 'unknown';
}

function pruneExpired(now) {
  for (const [ip, entry] of hits.entries()) {
    if (entry.resetAt <= now) {
      hits.delete(ip);
    }
  }
}

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const now = Date.now();
    pruneExpired(now);

    const ip = getClientIp(ctx);
    const entry = hits.get(ip);

    if (!entry || entry.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
      return next();
    }

    if (entry.count >= MAX_REQUESTS) {
      strapi.log.warn(`[form-contact] rate limit hit for ${ip}`);
      return ctx.tooManyRequests('Trop de tentatives. Réessayez dans quelques minutes.');
    }

    entry.count += 1;
    return next();
  };
};
