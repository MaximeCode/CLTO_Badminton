'use strict';

/**
 * Transforme un libellé en slug : minuscules, espaces → tirets.
 * Ex: "CLTO N2" → "clto-n2"
 */
const slugifyTeamLabel = (label) =>
  String(label)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

module.exports = { slugifyTeamLabel };
