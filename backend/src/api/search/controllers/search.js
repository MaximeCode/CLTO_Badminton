'use strict';

const { searchAll } = require('../../../utils/searchQueries');

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 80;

module.exports = {
  /** GET /api/search?q=… */
  async index(ctx) {
    const raw = typeof ctx.query.q === 'string' ? ctx.query.q : '';
    const q = raw.trim().slice(0, MAX_QUERY_LENGTH);

    if (q.length < MIN_QUERY_LENGTH) {
      ctx.body = { data: [] };
      return;
    }

    const data = await searchAll(q);
    ctx.body = { data };
  },
};
