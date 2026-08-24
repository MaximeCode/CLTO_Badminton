'use strict';

const compress = require('koa-compress');
const zlib = require('zlib');

/**
 * Compression gzip/deflate des réponses JSON et texte (réduit le transfert API).
 */
module.exports = (config, { strapi }) => {
  return compress({
    threshold: 1024,
    gzip: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
    deflate: {
      flush: zlib.constants.Z_SYNC_FLUSH,
    },
  });
};
