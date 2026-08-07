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

module.exports = {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    await enablePublicReadPermissions(strapi);
  },
};
