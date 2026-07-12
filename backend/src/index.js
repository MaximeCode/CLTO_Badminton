"use strict";

const PUBLIC_CONTENT_ACTIONS = [
  "api::historique.historique.find",
  "api::historique.historique.findOne",
  "api::contact.contact.find",
  "api::faq.faq.find",
  "api::gymnase.gymnase.find",
  "api::article.article.find",
  "api::article.article.findOne",
  "api::categorie.categorie.find",
  "api::page-adherer.page-adherer.find",
];

async function ensurePublicPermissions(strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({
      where: { type: "public" },
      populate: ["permissions"],
    });

  if (!publicRole) return;

  const existingActions = new Set(
    (publicRole.permissions || []).map((permission) => permission.action),
  );

  await Promise.all(
    PUBLIC_CONTENT_ACTIONS.filter((action) => !existingActions.has(action)).map(
      (action) =>
        strapi.db.query("plugin::users-permissions.permission").create({
          data: {
            action,
            role: publicRole.id,
          },
        }),
    ),
  );
}

module.exports = {
  async bootstrap({ strapi }) {
    await ensurePublicPermissions(strapi);
  },
};
