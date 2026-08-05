'use strict';

/**
 * scraper.js — Service Strapi v5
 *
 * Responsabilités :
 *  - Lire les Interclub Team créées dans Strapi (admin)
 *  - Récupérer le HTML de chaque URL IcBAD
 *  - Parser les données via icbad-parser
 *  - Mettre à jour les données scrapées (classement, matches, stats…)
 *  - Exposer scrapeAll() et scrapeOne(teamSlug)
 */

const fetch = require('node-fetch');
const { parseIcbad } = require('../utils/icbad-parser');
const { slugifyTeamLabel } = require('../utils/slugify');

const UID = 'plugin::icbad-scraper.interclub-team';

// Délai entre deux requêtes pour ne pas surcharger IcBAD (ms)
const FETCH_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Assure un teamSlug : si null/vide, le génère depuis teamLabel et le persiste.
 */
const ensureTeamSlug = async (strapi, team) => {
  if (team.teamSlug) {
    return team.teamSlug;
  }

  if (!team.teamLabel) {
    return null;
  }

  const teamSlug = slugifyTeamLabel(team.teamLabel);
  await strapi.documents(UID).update({
    documentId: team.documentId,
    data: { teamSlug },
  });

  strapi.log.info(
    `[icbad-scraper] 🏷️  teamSlug généré pour "${team.teamLabel}" → "${teamSlug}"`
  );

  return teamSlug;
};

/**
 * Charge toutes les équipes Interclub Team depuis Strapi.
 */
const loadTeamsFromStrapi = async (strapi) => {
  return strapi.documents(UID).findMany({
    fields: [
      'teamSlug',
      'teamLabel',
      'icbadUrl',
      'icbadTeamCode',
      'season',
    ],
    populate: {
      divisions_interclub: {
        fields: ['Nom_court', 'Nom_complet', 'Ordre'],
      },
    },
  });
};

/**
 * Indique si l'équipe a les champs minimum pour scraper IcBAD.
 */
const isScrapable = (team) => Boolean(team.icbadUrl && team.icbadTeamCode);

/**
 * Récupère le HTML d'une URL IcBAD.
 */
const fetchHtml = async (url) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; CLTO-Badminton-Scraper/1.0; +https://cltobadminton.fr)',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'fr-FR,fr;q=0.9',
    },
    timeout: 15000,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} pour ${url}`);
  }

  return response.text();
};

/**
 * Met à jour une équipe existante avec les données scrapées.
 * Ne touche pas aux champs éditoriaux (teamLabel, season, division, url, code…).
 */
const updateScrapedData = async (strapi, team, parsedData) => {
  const { competitionName, ranking, matches, bonuses } = parsedData;
  const cltoRow = ranking.find((r) => r.isClto);

  await strapi.documents(UID).update({
    documentId: team.documentId,
    data: {
      competitionName,
      ranking,
      matches,
      bonuses,
      lastScrapedAt: new Date().toISOString(),
      scrapeError: null,
      cltoPosition: cltoRow?.position ?? null,
      cltoPoints: cltoRow?.points ?? null,
      cltoPlayed: cltoRow?.played ?? null,
      cltoWon: cltoRow?.won ?? null,
      cltoDraw: cltoRow?.draw ?? null,
      cltoLost: cltoRow?.lost ?? null,
      cltoBonusPlus: cltoRow?.bonusPlus ?? null,
      cltoBonusMinus: cltoRow?.bonusMinus ?? null,
      cltoMatchDiff: cltoRow?.matchDiff ?? null,
      cltoSetDiff: cltoRow?.setDiff ?? null,
      cltoPtsDiff: cltoRow?.ptsDiff ?? null,
    },
  });

  const divisionLabel = team.divisions_interclub?.Nom_court ?? '?';
  strapi.log.info(
    `[icbad-scraper] ✅  Mis à jour : ${team.teamLabel} [${divisionLabel}] (position: ${cltoRow?.position ?? '?'}, ${cltoRow?.points ?? '?'} pts)`
  );
};

/**
 * Enregistre une erreur de scraping sans écraser les données existantes.
 */
const recordError = async (strapi, team, errorMessage) => {
  await strapi.documents(UID).update({
    documentId: team.documentId,
    data: {
      scrapeError: errorMessage,
      lastScrapedAt: new Date().toISOString(),
    },
  });

  strapi.log.error(
    `[icbad-scraper] ❌  Erreur ${team.teamLabel} : ${errorMessage}`
  );
};

/**
 * Scrape une entrée Interclub Team déjà chargée depuis Strapi.
 */
const scrapeTeamEntry = async (strapi, team) => {
  const teamSlug = await ensureTeamSlug(strapi, team);
  const label = team.teamLabel || teamSlug || team.documentId;

  if (!isScrapable(team)) {
    strapi.log.warn(
      `[icbad-scraper] ⏭️  Ignoré : "${label}" — icbadUrl ou icbadTeamCode manquant.`
    );
    return {
      success: false,
      skipped: true,
      teamSlug,
      teamLabel: team.teamLabel,
      reason: 'icbadUrl ou icbadTeamCode manquant',
    };
  }

  strapi.log.info(
    `[icbad-scraper] 🔄  Scraping ${team.teamLabel} — ${team.icbadUrl}`
  );

  try {
    const html = await fetchHtml(team.icbadUrl);
    const parsedData = parseIcbad(html, team.icbadTeamCode);
    await updateScrapedData(strapi, { ...team, teamSlug }, parsedData);
    return { success: true, teamSlug, teamLabel: team.teamLabel };
  } catch (err) {
    await recordError(strapi, team, err.message);
    return { success: false, teamSlug, teamLabel: team.teamLabel, error: err.message };
  }
};

/**
 * Scrape une seule équipe par son slug (entrée Strapi).
 */
const scrapeOne = async (strapi, teamSlug) => {
  const team = await strapi.documents(UID).findFirst({
    filters: { teamSlug },
    fields: [
      'teamSlug',
      'teamLabel',
      'icbadUrl',
      'icbadTeamCode',
      'season',
    ],
    populate: {
      divisions_interclub: {
        fields: ['Nom_court', 'Nom_complet', 'Ordre'],
      },
    },
  });

  if (!team) {
    throw new Error(`Équipe introuvable en base pour le slug : ${teamSlug}`);
  }

  return scrapeTeamEntry(strapi, team);
};

/**
 * Scrape toutes les équipes présentes dans Strapi, avec délai entre chaque requête.
 */
const scrapeAll = async (strapi) => {
  strapi.log.info('[icbad-scraper] 🚀  Début du scraping des équipes Strapi…');

  const teams = await loadTeamsFromStrapi(strapi);

  if (teams.length === 0) {
    strapi.log.warn(
      '[icbad-scraper] Aucune Interclub Team en base — rien à scraper.'
    );
    return [];
  }

  const results = [];

  for (let i = 0; i < teams.length; i++) {
    const result = await scrapeTeamEntry(strapi, teams[i]);
    results.push(result);

    if (i < teams.length - 1) {
      await sleep(FETCH_DELAY_MS);
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const skippedCount = results.filter((r) => r.skipped).length;
  const errorCount = results.filter((r) => !r.success && !r.skipped).length;

  strapi.log.info(
    `[icbad-scraper] 🏁  Scraping terminé — ${successCount} succès, ${skippedCount} ignoré(s), ${errorCount} erreur(s)`
  );

  return results;
};

module.exports = {
  scrapeAll,
  scrapeOne,
};
