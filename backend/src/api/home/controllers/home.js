'use strict';

const { getCached } = require('../../../utils/apiCache');
const { fetchFullHome, fetchHeros, fetchHomeSections } = require('../../../utils/homeQueries');

const TTL_HEROS_MS = 120_000;
const TTL_SECTIONS_MS = 60_000;
const TTL_FULL_MS = 60_000;

module.exports = {
  /** GET /api/home — agrégat complet (rétrocompatibilité) */
  async index(ctx) {
    const data = await getCached('home:full', TTL_FULL_MS, fetchFullHome);
    ctx.body = { data };
  },

  /** GET /api/home/heros — chemin critique LCP (léger, cache long) */
  async heros(ctx) {
    const heros = await getCached('home:heros', TTL_HEROS_MS, fetchHeros);
    ctx.body = { data: { heros: heros ?? [] } };
  },

  /** GET /api/home/sections — below-the-fold sans classements interclubs */
  async sections(ctx) {
    const sections = await getCached('home:sections', TTL_SECTIONS_MS, fetchHomeSections);
    ctx.body = { data: sections };
  },
};
