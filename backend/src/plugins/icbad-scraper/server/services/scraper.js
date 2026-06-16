'use strict';

/**
 * scraper.js — Service Strapi v5
 *
 * Responsabilités :
 *  - Récupérer le HTML de chaque URL IcBAD configurée
 *  - Parser les données via icbad-parser
 *  - Upsert (créer ou mettre à jour) chaque entrée interclub-team en base
 *  - Exposer scrapeAll() et scrapeOne(teamSlug)
 */

const fetch = require('node-fetch');
const { parseIcbad } = require('../utils/icbad-parser');

/**
 * Configuration des 5 équipes CLTO.
 *
 * ⚠️  Remplacez les URLs par les vraies URLs de chaque poule IcBAD.
 *     Le teamCode doit correspondre exactement au sigle dans le HTML IcBAD.
 * 
 * ⚠️  Penser à mettre à jour les Divisions dans plugins\icbad-scraper\server\content-types\interclub-team\schema.json
 */
const TEAMS_CONFIG = [
  {
    teamSlug: 'clto-n2',
    teamLabel: 'CLTO N2',
    division: 'N2',
    icbadTeamCode: '45-CLTO-1',
    icbadUrl: 'https://icbad.ffbad.org/competition/2500383/tableau/14022',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-n3',
    teamLabel: 'CLTO N3',
    division: 'N3',
    icbadTeamCode: '45-CLTO-2',
    icbadUrl: 'https://icbad.ffbad.org/competition/2500384/tableau/14026',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-r2',
    teamLabel: 'CLTO R2',
    division: 'R2',
    icbadTeamCode: '45-CLTO-3',
    icbadUrl: 'https://icbad.ffbad.org/competition/2500080/tableau/14097',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-d1a',
    teamLabel: 'CLTO D1-A',
    division: 'D1-A',
    icbadTeamCode: '45-CLTO-1',
    icbadUrl: 'https://icbad.ffbad.org/competition/2501074/tableau/14555',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-d1b',
    teamLabel: 'CLTO D1-B',
    division: 'D1-B',
    icbadTeamCode: '45-CLTO-2',
    icbadUrl: 'https://icbad.ffbad.org/competition/2501074/tableau/14556',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-d2a',
    teamLabel: 'CLTO D2-A',
    division: 'D2-A',
    icbadTeamCode: '45-CLTO-6',
    icbadUrl: 'https://icbad.ffbad.org/competition/2501077/tableau/14407',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-d2b',
    teamLabel: 'CLTO D2-B',
    division: 'D2-B',
    icbadTeamCode: '45-CLTO-7',
    icbadUrl: 'https://icbad.ffbad.org/competition/2501077/tableau/14406',
    season: '2025-2026',
  },
  {
    teamSlug: 'clto-d3',
    teamLabel: 'CLTO D3',
    division: 'D3',
    icbadTeamCode: '45-CLTO-1',
    icbadUrl: 'https://icbad.ffbad.org/competition/2501079/tableau/15522',
    season: '2025-2026',
  },
];

// Délai entre deux requêtes pour ne pas surcharger IcBAD (ms)
const FETCH_DELAY_MS = 2000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Récupère le HTML d'une URL IcBAD.
 * Retourne null en cas d'erreur réseau.
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
 * Upsert une entrée interclub-team en base Strapi.
 * Cherche par teamSlug (unique). Crée si absent, met à jour sinon.
 */
const upsertTeam = async (strapi, teamConfig, parsedData) => {
  const uid = 'plugin::icbad-scraper.interclub-team';

  const { competitionName, ranking, matches, bonuses } = parsedData;

  // Extraire les stats CLTO depuis le classement
  const cltoRow = ranking.find((r) => r.isClto);

  const payload = {
    teamSlug: teamConfig.teamSlug,
    teamLabel: teamConfig.teamLabel,
    division: teamConfig.division,
    icbadUrl: teamConfig.icbadUrl,
    icbadTeamCode: teamConfig.icbadTeamCode,
    competitionName,
    season: teamConfig.season,
    ranking,
    matches,
    bonuses,
    lastScrapedAt: new Date().toISOString(),
    scrapeError: null,

    // Dénormalisé CLTO
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
  };

  // Chercher une entrée existante
  const existing = await strapi.documents(uid).findFirst({
    filters: { teamSlug: teamConfig.teamSlug },
  });

  if (existing) {
    await strapi.documents(uid).update({
      documentId: existing.documentId,
      data: payload,
    });
    strapi.log.info(
      `[icbad-scraper] ✅  Mis à jour : ${teamConfig.teamLabel} (position: ${cltoRow?.position ?? '?'}, ${cltoRow?.points ?? '?'} pts)`
    );
  } else {
    await strapi.documents(uid).create({ data: payload });
    strapi.log.info(
      `[icbad-scraper] ✅  Créé : ${teamConfig.teamLabel}`
    );
  }
};

/**
 * Enregistre une erreur de scraping sans écraser les données existantes.
 */
const recordError = async (strapi, teamConfig, errorMessage) => {
  const uid = 'plugin::icbad-scraper.interclub-team';

  const existing = await strapi.documents(uid).findFirst({
    filters: { teamSlug: teamConfig.teamSlug },
  });

  const errorPayload = {
    scrapeError: errorMessage,
    lastScrapedAt: new Date().toISOString(),
  };

  if (existing) {
    await strapi.documents(uid).update({
      documentId: existing.documentId,
      data: errorPayload,
    });
  } else {
    // Créer une entrée minimale pour tracer l'erreur
    await strapi.documents(uid).create({
      data: {
        ...errorPayload,
        teamSlug: teamConfig.teamSlug,
        teamLabel: teamConfig.teamLabel,
        division: teamConfig.division,
        icbadUrl: teamConfig.icbadUrl,
        season: teamConfig.season,
      },
    });
  }

  strapi.log.error(
    `[icbad-scraper] ❌  Erreur ${teamConfig.teamLabel} : ${errorMessage}`
  );
};

/**
 * Scrape une seule équipe par son slug.
 */
const scrapeOne = async (strapi, teamSlug) => {
  const teamConfig = TEAMS_CONFIG.find((t) => t.teamSlug === teamSlug);
  if (!teamConfig) {
    throw new Error(`Équipe inconnue : ${teamSlug}`);
  }

  strapi.log.info(`[icbad-scraper] 🔄  Scraping ${teamConfig.teamLabel} — ${teamConfig.icbadUrl}`);

  try {
    const html = await fetchHtml(teamConfig.icbadUrl);
    const parsedData = parseIcbad(html, teamConfig.icbadTeamCode);
    await upsertTeam(strapi, teamConfig, parsedData);
    return { success: true, teamSlug, teamLabel: teamConfig.teamLabel };
  } catch (err) {
    await recordError(strapi, teamConfig, err.message);
    return { success: false, teamSlug, error: err.message };
  }
};

/**
 * Scrape toutes les équipes configurées, avec délai entre chaque requête.
 */
const scrapeAll = async (strapi) => {
  strapi.log.info('[icbad-scraper] 🚀  Début du scraping de toutes les équipes…');

  const results = [];

  for (let i = 0; i < TEAMS_CONFIG.length; i++) {
    const teamConfig = TEAMS_CONFIG[i];
    const result = await scrapeOne(strapi, teamConfig.teamSlug);
    results.push(result);

    // Pause entre les requêtes (sauf après la dernière)
    if (i < TEAMS_CONFIG.length - 1) {
      await sleep(FETCH_DELAY_MS);
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const errorCount = results.filter((r) => !r.success).length;

  strapi.log.info(
    `[icbad-scraper] 🏁  Scraping terminé — ${successCount} succès, ${errorCount} erreur(s)`
  );

  return results;
};

module.exports = { scrapeAll, scrapeOne, TEAMS_CONFIG };
