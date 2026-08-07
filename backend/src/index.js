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

module.exports = {
  register(/* { strapi } */) { },

  async bootstrap({ strapi }) {
    await enablePublicReadPermissions(strapi);
    await syncAdminRoleFieldPermissions(strapi);
  },
};
