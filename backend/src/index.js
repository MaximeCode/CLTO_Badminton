'use strict';

/**
 * Active automatiquement find / findOne sur le rôle Public
 * pour toutes les APIs `api::*` (Content-Types applicatifs).
 *
 * En Strapi 5, une permission cochée = une ligne dans up_permissions.
 * Idempotent : ne crée que les permissions manquantes.
 */
async function enablePublicReadPermissions(strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
    populate: ['permissions'],
  });

  if (!publicRole) {
    strapi.log.warn('[permissions] Rôle Public introuvable — skip');
    return;
  }

  const existingActions = new Set(
    (publicRole.permissions ?? []).map((permission) => permission.action),
  );

  const actionMap = strapi
    .plugin('users-permissions')
    .service('users-permissions')
    .getActions({ defaultEnable: false });

  const toCreate = [];

  for (const [typeName, type] of Object.entries(actionMap)) {
    // Uniquement les Content-Types de l'app (pas les plugins)
    if (!typeName.startsWith('api::')) continue;

    for (const [controllerName, controller] of Object.entries(type.controllers ?? {})) {
      for (const actionName of Object.keys(controller)) {
        if (actionName !== 'find' && actionName !== 'findOne') continue;

        const action = `${typeName}.${controllerName}.${actionName}`;
        if (existingActions.has(action)) continue;

        toCreate.push({ action, role: publicRole.id });
      }
    }
  }

  if (toCreate.length === 0) {
    strapi.log.info('[permissions] Public: find/findOne déjà à jour');
    return;
  }

  await Promise.all(
    toCreate.map((data) =>
      strapi.db.query('plugin::users-permissions.permission').create({ data }),
    ),
  );

  strapi.log.info(
    `[permissions] Public: ${toCreate.length} permission(s) find/findOne activée(s)`,
  );
}

const ADMIN_CONTENT_ROLE_CODES = ['strapi-editor', 'strapi-author'];

/**
 * Synchronise les permissions de champs (RBAC admin) pour Editor / Author.
 *
 * Quand un nouveau champ est ajouté à un Content-Type déjà autorisé,
 * Strapi ne coche pas automatiquement la case correspondante dans
 * Settings → Administration panel → Roles. On réécrit `properties.fields`
 * avec la liste complète des champs (même logique que le core Strapi).
 *
 * Ne crée pas de nouvelles actions (create/read/update…) : uniquement
 * l’élargissement des champs sur les permissions déjà présentes.
 * Idempotent. Écrase une restriction manuelle volontaire sur certains champs.
 */
async function syncAdminRoleFieldPermissions(strapi) {
  const contentTypeService = strapi.service('admin::content-type');
  const permissionService = strapi.service('admin::permission');

  for (const code of ADMIN_CONTENT_ROLE_CODES) {
    const role = await strapi.db.query('admin::role').findOne({
      where: { code },
      populate: ['permissions'],
    });

    if (!role) {
      strapi.log.warn(`[permissions] Rôle admin "${code}" introuvable — skip`);
      continue;
    }

    let updatedCount = 0;

    for (const permission of role.permissions ?? []) {
      const { action, subject, properties } = permission;

      if (!subject?.startsWith('api::')) continue;
      if (!strapi.contentTypes[subject]) continue;
      // Pas encore de liste de champs = permission non concernée (ex. delete/publish)
      if (!Array.isArray(properties?.fields)) continue;

      const actionConfig = permissionService.actionProvider.get(action);
      const appliesToFields = actionConfig?.options?.applyToProperties?.includes('fields');
      if (!appliesToFields) continue;

      const allFields = contentTypeService.getNestedFields(strapi.contentTypes[subject], {
        components: strapi.components,
      });

      const currentFields = properties.fields;
      const sameLength = currentFields.length === allFields.length;
      const sameSet =
        sameLength &&
        allFields.every((field) => currentFields.includes(field));

      if (sameSet) continue;

      await strapi.db.query('admin::permission').update({
        where: { id: permission.id },
        data: {
          properties: {
            ...properties,
            fields: allFields,
          },
        },
      });

      updatedCount += 1;
    }

    if (updatedCount === 0) {
      strapi.log.info(`[permissions] Admin ${code}: champs déjà à jour`);
    } else {
      strapi.log.info(
        `[permissions] Admin ${code}: ${updatedCount} permission(s) champs synchronisée(s)`,
      );
    }
  }
}

/**
 * Assigne createdBy / updatedBy depuis l'utilisateur admin de la requête.
 *
 * Contexte : en Strapi 5 ces champs sont des relations `writable: false`.
 * Ils sont injectés par le Content Manager via setCreatorFields, mais :
 * - les lignes issues de la migration v4→v5 / anciennes créations ont souvent
 *   created_by_id NULL
 * - une publication clone le brouillon (y compris les NULL)
 * - l'update ne remplit jamais createdBy (seulement updatedBy)
 *
 * Ce lifecycle rattrape create + update (+ publish qui passe par create)
 * pour tous les content-types applicatifs / plugins.
 */
function registerCreatorFieldsLifecycle(strapi) {
  const hasCreatorFields = (model) =>
    Boolean(model?.attributes?.createdBy && model?.attributes?.updatedBy);

  const isManagedContentUid = (uid) =>
    typeof uid === 'string' &&
    (uid.startsWith('api::') || uid.startsWith('plugin::'));

  const getRequestUserId = () => strapi.requestContext.get()?.state?.user?.id;

  const hasCreatorValue = (data) =>
    data.createdBy != null || data.created_by_id != null;

  const hasUpdaterValue = (data) =>
    data.updatedBy != null || data.updated_by_id != null;

  strapi.db.lifecycles.subscribe({
    async beforeCreate(event) {
      const { model, params } = event;
      if (!isManagedContentUid(model?.uid) || !hasCreatorFields(model)) return;

      const userId = getRequestUserId();
      if (!userId || !params?.data) return;

      if (!hasCreatorValue(params.data)) {
        params.data.createdBy = userId;
      }
      if (!hasUpdaterValue(params.data)) {
        params.data.updatedBy = userId;
      }
    },

    async beforeUpdate(event) {
      const { model, params } = event;
      if (!isManagedContentUid(model?.uid) || !hasCreatorFields(model)) return;

      const userId = getRequestUserId();
      if (!userId || !params?.data) return;

      // Toujours tracer le dernier éditeur
      params.data.updatedBy = userId;

      // Backfill createdBy si la ligne en base est encore NULL
      const rowId = params.where?.id;
      if (!rowId || hasCreatorValue(params.data)) return;

      try {
        const tableName = model.collectionName;
        if (!tableName) return;

        const row = await strapi.db.connection(tableName)
          .where({ id: rowId })
          .first('created_by_id');

        if (row && row.created_by_id == null) {
          params.data.createdBy = userId;
        }
      } catch (err) {
        strapi.log.warn(
          `[creator-fields] Impossible de backfiller createdBy sur ${model.uid}#${rowId}: ${err.message}`,
        );
      }
    },
  });
}

/**
 * Répare les lignes historiques où created_by_id / updated_by_id sont NULL.
 * Idempotent. Préfère recopier updated_by_id → created_by_id, sinon admin #1.
 */
async function backfillMissingCreatorFields(strapi) {
  const adminUsers = await strapi.db.query('admin::user').findMany({
    select: ['id'],
    orderBy: { id: 'asc' },
    limit: 1,
  });
  const fallbackAdminId = adminUsers[0]?.id;
  if (!fallbackAdminId) {
    strapi.log.warn('[creator-fields] Aucun admin — backfill skip');
    return;
  }

  let repaired = 0;

  for (const uid of Object.keys(strapi.contentTypes)) {
    const contentType = strapi.contentTypes[uid];
    if (!uid.startsWith('api::') && !uid.startsWith('plugin::')) continue;
    if (!contentType?.attributes?.createdBy || !contentType?.attributes?.updatedBy) continue;

    const tableName = contentType.collectionName;
    if (!tableName) continue;

    try {
      const knex = strapi.db.connection;

      // updated_by présent → s'en servir pour created_by
      const fromUpdated = await knex(tableName)
        .whereNull('created_by_id')
        .whereNotNull('updated_by_id')
        .update({
          created_by_id: knex.ref('updated_by_id'),
        });

      // les deux NULL → premier admin
      const fromFallback = await knex(tableName)
        .whereNull('created_by_id')
        .whereNull('updated_by_id')
        .update({
          created_by_id: fallbackAdminId,
          updated_by_id: fallbackAdminId,
        });

      const count = Number(fromUpdated || 0) + Number(fromFallback || 0);
      if (count > 0) {
        repaired += count;
        strapi.log.info(`[creator-fields] ${uid}: ${count} ligne(s) réparée(s)`);
      }
    } catch (err) {
      strapi.log.warn(`[creator-fields] Backfill ${uid} ignoré: ${err.message}`);
    }
  }

  if (repaired === 0) {
    strapi.log.info('[creator-fields] Backfill: rien à réparer');
  } else {
    strapi.log.info(`[creator-fields] Backfill: ${repaired} ligne(s) au total`);
  }
}

module.exports = {
  register({ strapi }) {
    registerCreatorFieldsLifecycle(strapi);
  },

  async bootstrap({ strapi }) {
    await enablePublicReadPermissions(strapi);
    await syncAdminRoleFieldPermissions(strapi);
    await backfillMissingCreatorFields(strapi);
  },
};
