'use strict';

const COMPONENT_UID = 'contenu-page.liste-txt';
const TABLE = 'components_contenu_page_liste_txts';

/** UIDs + noms d'attributs qui portent ce composant (repeatable). */
const PARENTS = [
  {
    uid: 'api::parametre-globaux.parametre-globaux',
    field: 'creneaux_complets',
  },
  {
    uid: 'api::page-formation.page-formation',
    field: 'les_avantages',
  },
];

const LIBELLE_MAX = 255;

/**
 * Titre accordion admin : copie tronquée de contenu (string, éligible Entry title).
 */
function buildLibelle({ contenu } = {}) {
  const text = typeof contenu === 'string' ? contenu.trim() : '';
  if (!text) return '';
  if (text.length <= LIBELLE_MAX) return text;
  return `${text.slice(0, LIBELLE_MAX - 3)}...`;
}

function syncListeTxtLibellesInData(data, field) {
  if (!data || !Array.isArray(data[field])) return;

  data[field] = data[field].map((item) => {
    if (!item || typeof item !== 'object') return item;
    return {
      ...item,
      libelle: buildLibelle(item),
    };
  });
}

/**
 * Remplit libelle avant create/update des parents qui utilisent liste-txt.
 */
function registerListeTxtLibelleMiddleware(strapi) {
  strapi.documents.use(async (context, next) => {
    if (
      (context.action === 'create' || context.action === 'update') &&
      context.params?.data
    ) {
      for (const parent of PARENTS) {
        if (context.uid === parent.uid) {
          syncListeTxtLibellesInData(context.params.data, parent.field);
        }
      }
    }

    return next();
  });
}

/**
 * Rattrape les lignes existantes après ajout de la colonne.
 */
async function backfillListeTxtLibelles(strapi) {
  const knex = strapi.db.connection;

  try {
    const hasTable = await knex.schema.hasTable(TABLE);
    if (!hasTable) return;

    const hasColumn = await knex.schema.hasColumn(TABLE, 'libelle');
    if (!hasColumn) {
      strapi.log.warn('[liste-txt] Colonne libelle absente — backfill skip');
      return;
    }

    const rows = await knex(TABLE).select('id', 'contenu', 'libelle');
    let updated = 0;

    for (const row of rows) {
      const next = buildLibelle(row);
      if ((row.libelle || '') === next) continue;

      await knex(TABLE).where({ id: row.id }).update({ libelle: next });
      updated += 1;
    }

    if (updated === 0) {
      strapi.log.info('[liste-txt] Backfill libelle: rien à faire');
    } else {
      strapi.log.info(`[liste-txt] Backfill libelle: ${updated} ligne(s)`);
    }
  } catch (err) {
    strapi.log.warn(`[liste-txt] Backfill libelle ignoré: ${err.message}`);
  }
}

/**
 * Force Entry title = libelle et retire le champ du layout d'édition.
 */
async function ensureListeTxtEntryTitle(strapi) {
  const componentsService = strapi.plugin('content-manager').service('components');
  const component = componentsService.findComponent(COMPONENT_UID);

  if (!component) {
    strapi.log.warn('[liste-txt] Composant introuvable — config skip');
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
    strapi.log.info('[liste-txt] Entry title déjà = libelle');
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
          description: 'Généré automatiquement depuis contenu',
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

  strapi.log.info('[liste-txt] Entry title configuré sur libelle');
}

module.exports = {
  buildLibelle,
  registerListeTxtLibelleMiddleware,
  backfillListeTxtLibelles,
  ensureListeTxtEntryTitle,
};
