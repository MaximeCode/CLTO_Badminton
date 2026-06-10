'use strict';

/**
 * icbad-parser.js
 *
 * Parse le HTML d'une page IcBAD (tableau/poule) et retourne un objet structuré
 * contenant le classement, les rencontres et les bonus/pénalités.
 *
 * @param {string} html       - HTML brut de la page icbad.ffbad.org
 * @param {string} cltoCode   - Sigle de l'équipe CLTO ex: '45-CLTO-1'
 * @returns {object}          - { competitionName, ranking, matches, bonuses }
 */

const parseIcbad = (html, cltoCode) => {
  // cheerio est requis dynamiquement pour supporter CommonJS et ESM
  const cheerio = require('cheerio');
  const $ = cheerio.load(html);

  // ─── Nom de la compétition ────────────────────────────────────────────────
  const competitionName = $('h1').first().text().trim();

  // ─── Classement ───────────────────────────────────────────────────────────
  const ranking = [];

  $('table.classement-poule tbody tr').each((_, row) => {
    const $row = $(row);

    // Ignorer la ligne d'entête (th)
    if ($row.find('th').length > 0) return;

    const cells = $row.find('td');
    if (cells.length < 4) return;

    const position = parseInt($(cells[0]).text().trim(), 10);
    if (isNaN(position)) return;

    // Logo : img src ou null
    const logoImg = $row.find('td.table-logo-club img');
    const logoUrl = logoImg.length ? logoImg.attr('src') : null;

    // Nom + code d'équipe
    const teamCell = $row.find('td.nom-equipe a');
    const teamName = teamCell.text().trim();
    // Code entre parenthèses ex: (45-CLTO-1)
    const codeMatch = teamName.match(/\(([^)]+)\)$/);
    const teamCode = codeMatch ? codeMatch[1] : '';
    const teamNameClean = teamName.replace(/\s*\([^)]*\)$/, '').trim();

    // Détecter la classe de la ligne (promotion / relegation / '')
    const rowClass = $row.attr('class') || '';

    // Colonnes stats — indices fixes dans le DOM IcBAD
    // th: # | logo | Équipes | J | G | N | P | F | B+ | P- | Pts | M+/- | S+/- | P+/-
    //    0     1        2      3   4   5   6   7   8    9    10     11     12    13
    const getText = (idx) => $(cells[idx]).text().trim();
    const toInt   = (idx) => parseInt(getText(idx), 10) || 0;

    ranking.push({
      position,
      teamName: teamNameClean,
      teamCode,
      logoUrl,
      rowClass,           // 'promotion' | 'relegation' | ''
      played:     toInt(3),
      won:        toInt(4),
      draw:       toInt(5),
      lost:       toInt(6),
      forfeit:    toInt(7),
      bonusPlus:  toInt(8),
      bonusMinus: toInt(9),
      points:     toInt(10),
      matchDiff:  toInt(11),
      setDiff:    toInt(12),
      ptsDiff:    toInt(13),
      isClto:     teamCode === cltoCode,
    });
  });

  // ─── Rencontres ───────────────────────────────────────────────────────────
  const matches = [];
  let currentJournee = 0;

  // Les rencontres sont dans la deuxième table uk-table (après classement)
  // On identifie les blocs journée par les <th colspan="7"> contenant "J0X"
  const matchTable = $('table.uk-table').not('.classement-poule').first();

  matchTable.find('tbody tr').each((_, row) => {
    const $row = $(row);

    // En-tête de journée
    const th = $row.find('th[colspan="7"]');
    if (th.length) {
      const jText = th.text().trim(); // "J01", "J02", …
      const jNum  = parseInt(jText.replace('J', ''), 10);
      if (!isNaN(jNum)) currentJournee = jNum;
      return;
    }

    // Ligne de rencontre desktop (uk-visible@m)
    if (!$row.hasClass('uk-visible@m') && !$row.hasClass('clickable-row')) return;
    if ($row.hasClass('uk-hidden@m')) return;

    const cells = $row.find('td');
    if (cells.length < 5) return;

    // Lien + date
    const dateLink = $(cells[0]).find('a.row-link');
    const icbadMatchUrl = dateLink.attr('href') || null;
    const dateRaw = dateLink.text().trim(); // "Le 27/09 à 16:00"
    const dateParsed = parseDateRaw(dateRaw);

    // Lieu
    const venue = $(cells[1]).text().trim();

    // Équipe domicile
    const homeCell = $(cells[2]);
    const homeName = homeCell.text().trim();
    const homeCodeMatch = homeName.match(/\(([^)]+)\)$/);
    const homeCode = homeCodeMatch ? homeCodeMatch[1] : homeName;
    const homeNameClean = homeName.replace(/\s*\([^)]*\)$/, '').trim();
    const homeResult = getResultClass(homeCell.attr('class'));

    // Score
    const scoreText = $(cells[3]).text().trim(); // "3 - 5"
    const scoreParts = scoreText.split('-').map((s) => parseInt(s.trim(), 10));
    const homeScore = isNaN(scoreParts[0]) ? null : scoreParts[0];
    const awayScore = isNaN(scoreParts[1]) ? null : scoreParts[1];

    // Équipe extérieure
    const awayCell = $(cells[4]);
    const awayName = awayCell.text().trim();
    const awayCodeMatch = awayName.match(/\(([^)]+)\)$/);
    const awayCode = awayCodeMatch ? awayCodeMatch[1] : awayName;
    const awayNameClean = awayName.replace(/\s*\([^)]*\)$/, '').trim();

    // Bonus marker (*)
    const hasBonus = cells.length >= 6 && $(cells[5]).text().trim() === '*';

    // Résultat du point de vue CLTO
    let result = 'other';
    const upcoming = homeScore === null;
    if (upcoming) {
      result = 'upcoming';
    } else if (homeCode === cltoCode) {
      result = homeScore > awayScore ? 'win' : homeScore === awayScore ? 'draw' : 'loss';
    } else if (awayCode === cltoCode) {
      result = awayScore > homeScore ? 'win' : awayScore === homeScore ? 'draw' : 'loss';
    }

    const involvesClto = homeCode === cltoCode || awayCode === cltoCode;

    matches.push({
      journee:      currentJournee,
      date:         dateParsed.date,
      time:         dateParsed.time,
      dateRaw,
      venue,
      homeTeam:     homeNameClean,
      homeCode,
      awayTeam:     awayNameClean,
      awayCode,
      homeScore,
      awayScore,
      result,
      hasBonus,
      icbadMatchUrl,
      involvesClto,
    });
  });

  // ─── Bonus & Pénalités ────────────────────────────────────────────────────
  const bonuses = [];
  let bonusJournee = 0;

  // Troisième table (bonus/pénalités)
  const bonusTables = $('table.uk-table').not('.classement-poule');
  const bonusTable  = bonusTables.length >= 2 ? bonusTables.eq(1) : null;

  if (bonusTable) {
    bonusTable.find('tbody tr').each((_, row) => {
      const $row = $(row);

      const th = $row.find('th');
      if (th.length) {
        const jNum = parseInt(th.text().trim().replace('J', ''), 10);
        if (!isNaN(jNum)) bonusJournee = jNum;
        return;
      }

      const cells = $row.find('td');
      if (cells.length < 5) return;

      const category = $(cells[0]).text().trim();     // "Classement général : Bonus offensif"
      const teamName = $(cells[1]).text().trim();
      const matchup  = $(cells[2]).text().trim();     // "45-CLTO-1 / 78-BML-1"
      const valueLink = $(cells[3]).find('a');
      const value    = parseInt(valueLink.text().trim(), 10) || 0;
      const icbadMatchUrl = valueLink.attr('href') || null;
      const type     = $(cells[4]).text().trim();     // "Bonus offensif" / "Match forfait (…)"

      // Détecter si concerne le CLTO
      const involvesClto = matchup.includes(cltoCode);

      bonuses.push({
        journee:      bonusJournee,
        category,
        teamName,
        matchup,
        value,
        type,
        icbadMatchUrl,
        involvesClto,
      });
    });
  }

  return { competitionName, ranking, matches, bonuses };
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse "Le 27/09 à 16:00" → { date: "2025-09-27", time: "16:00" }
 * On infère l'année depuis la saison courante (sept–juin)
 */
const parseDateRaw = (raw) => {
  const match = raw.match(/(\d{2})\/(\d{2})\s+à\s+(\d{2}:\d{2})/);
  if (!match) return { date: null, time: null };

  const day   = match[1];
  const month = parseInt(match[2], 10);
  const time  = match[3];

  // Les saisons commencent en septembre : mois >= 9 → année N, sinon N+1
  const now        = new Date();
  const baseYear   = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  const year       = month >= 9 ? baseYear : baseYear + 1;

  const date = `${year}-${String(month).padStart(2, '0')}-${day}`;
  return { date, time };
};

/**
 * Extrait win / draw / loss depuis les classes CSS IcBAD
 * ic-win / ic-draw / ic-loose
 */
const getResultClass = (cssClass = '') => {
  if (cssClass.includes('ic-win'))   return 'win';
  if (cssClass.includes('ic-draw'))  return 'draw';
  if (cssClass.includes('ic-loose')) return 'loss';
  return null;
};

module.exports = { parseIcbad };
