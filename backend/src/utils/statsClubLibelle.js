'use strict';

const COMPONENT_UID = 'stats.stats-club';
const TABLE = 'components_stats_stats_clubs';
const ACCUEIL_UID = 'api::accueil.accueil';

/**
 * Titre accordion admin : "2 - Services civiques accueillis"
 */
function buildLibelle({ chiffre, desc } = {}) {
  const parts = [];

  if (chiffre != null && chiffre !== '') {
    parts.push(String(chiffre));
  }

  const description = typeof desc === 'string' ? desc.trim() : '';
  if (description) {
    parts.push(description);
  }

  return parts.join(' - ');
}

function syncStatsClubLibellesInData(data) {
  if (!data || !Array.isArray(data.stats_club)) return;

  data.stats_club = data.stats_club.map((item) => {
    if (!item || typeof item !== 'object') return item;
    return {
      ...item,
      libelle: buildLibelle(item),
    };
  });
}

/**
 * Remplit libelle avant create/update Accueil (Content Manager + API).
 */
function registerStatsClubLibelleMiddleware(strapi) {
  strapi.documents.use(async (context, next) => {
    if (
      context.uid === ACCUEIL_UID &&
      (context.action === 'create' || context.action === 'update') &&
      context.params?.data
    ) {
      syncStatsClubLibellesInData(context.params.data);
    }

    return next();
  });
}

/**
 * Rattrape les lignes existantes après ajout de la colonne.
 */
async function backfillStatsClubLibelles(strapi) {
  const knex = strapi.db.connection;

  try {
    const hasTable = await knex.schema.hasTable(TABLE);
    if (!hasTable) return;

    const hasColumn = await knex.schema.hasColumn(TABLE, 'libelle');
    if (!hasColumn) {
      strapi.log.warn('[stats-club] Colonne libelle absente — backfill skip');
      return;
    }

    const rows = await knex(TABLE).select('id', 'chiffre', 'desc', 'libelle');
    let updated = 0;

    for (const row of rows) {
      const next = buildLibelle(row);
      if ((row.libelle || '') === next) continue;

      await knex(TABLE).where({ id: row.id }).update({ libelle: next });
      updated += 1;
    }

    if (updated === 0) {
      strapi.log.info('[stats-club] Backfill libelle: rien à faire');
    } else {
      strapi.log.info(`[stats-club] Backfill libelle: ${updated} ligne(s)`);
    }
  } catch (err) {
    strapi.log.warn(`[stats-club] Backfill libelle ignoré: ${err.message}`);
  }
}

/**
 * Force Entry title = libelle et retire le champ du layout d'édition
 * (valeur calculée, inutile à saisir à la main).
 */
async function ensureStatsClubEntryTitle(strapi) {
  const componentsService = strapi.plugin('content-manager').service('components');
  const component = componentsService.findComponent(COMPONENT_UID);

  if (!component) {
    strapi.log.warn('[stats-club] Composant introuvable — config skip');
    return;
  }

  const config = await componentsService.findConfiguration(component);
  const editLayout = (config.layouts?.edit ?? [])
    .map((row) => row.filter((field) => field.name !== 'libelle'))
    .filter((row) => row.length > 0);

  const currentMainField = config.settings?.mainField;
  const layoutUnchanged =
    JSON.stringify(editLayout) === JSON.stringify(config.layouts?.edit ?? []);

  if (currentMainField === 'libelle' && layoutUnchanged) {
    strapi.log.info('[stats-club] Entry title déjà = libelle');
    return;
  }

  await componentsService.updateConfiguration(component, {
    settings: {
      ...config.settings,
      mainField: 'libelle',
    },
    metadatas: {
      ...config.metadatas,
      libelle: {
        edit: {
          label: 'Libellé',
          description: 'Généré automatiquement (chiffre + description)',
          placeholder: '',
          visible: false,
          editable: false,
        },
        list: {
          label: 'Libellé',
          searchable: true,
          sortable: true,
        },
      },
    },
    layouts: {
      ...config.layouts,
      edit: editLayout,
    },
  });

  strapi.log.info('[stats-club] Entry title configuré sur libelle');
}

module.exports = {
  buildLibelle,
  registerStatsClubLibelleMiddleware,
  backfillStatsClubLibelles,
  ensureStatsClubEntryTitle,
};
