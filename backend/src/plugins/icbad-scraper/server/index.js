'use strict';

const contentTypes = require('./content-types');
const controllers = require('./controllers');
const services = require('./services');
const icbadRoutes = require('./routes/icbad-scraper');

/**
 * server/index.js — Strapi v5
 *
 * ⚠️  IMPORTANT : Strapi v5 attend que server/index.js exporte UNE FONCTION
 *     qui retourne l'objet du plugin. PAS un objet direct.
 *
 * La fonction reçoit { strapi } en paramètre pour register et bootstrap.
 */
module.exports = () => ({
  contentTypes,
  controllers,
  services,
  routes: {
    'icbad-scraper': {
      type: 'content-api',
      routes: icbadRoutes,
    },
  },

  /**
   * register — appelé avant le bootstrap.
   * Enregistre le cron job nocturne (02h30, Europe/Paris).
   */
  register({ strapi }) {
    // ADD icbad-scraper plugin into documentation
    if (strapi.plugin('documentation')) {
      strapi
        .plugin('documentation')
        .service('override')
        .registerOverride({
          paths: {
            '/icbad-scraper/teams': {
              get: {
                tags: ['Icbad-scraper'],
                summary: 'Liste toutes les équipes interclubs',
                responses: { 200: { description: 'OK' } },
              },
            },
            '/icbad-scraper/teams/{slug}': {
              get: {
                tags: ['Icbad-scraper'],
                summary: 'Détail d\'une équipe interclub',
                responses: { 200: { description: 'OK' } },
                parameters: [
                  {
                    name: 'slug',
                    in: 'path',
                    required: true,
                    description: 'Slug de l\'équipe interclub',
                  },
                ],
              },
            },
            '/icbad-scraper/scrape': {
              post: {
                tags: ['Icbad-scraper'],
                summary: 'Déclenche le scraping de toutes les équipes',
                responses: { 200: { description: 'OK' } },
              },
            },
            '/icbad-scraper/scrape/{slug}': {
              post: {
                tags: ['Icbad-scraper'],
                summary: 'Déclenche le scraping d\'une équipe',
                responses: { 200: { description: 'OK' } },
                parameters: [
                  {
                    name: 'slug',
                    in: 'path',
                    required: true,
                    description: 'Slug de l\'équipe interclub',
                  },
                ],
              },
            },
          },
        });
    }

    // CRON
    strapi.cron.add({
      // In Strapi v5, when using the { task, options } form, the key is a
      // task name (not the cron expression). The schedule rule must be in
      // options.rule, otherwise node-schedule fires every minute by default.
      'icbad-nightly-scraping': {
        task: async ({ strapi: _strapi }) => {
          _strapi.log.info('[icbad-scraper] ⏰  Cron nocturne — scraping IcBAD');
          const { scrapeAll } = _strapi
            .plugin('icbad-scraper')
            .service('scraper');
          await scrapeAll(_strapi);
        },
        options: {
          // ┌───── minute (0–59)
          // │  ┌───── heure (0–23)
          // │  │  ┌───── jour du mois (1–31)
          // │  │  │  ┌───── mois (1–12)
          // │  │  │  │  ┌───── jour de la semaine (0–7, 0=dim)
          // 0  2  *  *  *   → tous les jours à 02h00
          rule: '0 2 * * *',
          tz: 'Europe/Paris',
        },
      },
    });
  },

  /**
   * bootstrap — appelé après l'init complète de Strapi.
   * Lance un scraping initial si la base est vide.
   */
  async bootstrap({ strapi }) {
    const uid = 'plugin::icbad-scraper.interclub-team';

    try {
      const count = await strapi.documents(uid).count(); // Fetch the number of items in the plugin collection

      if (count === 0) {
        strapi.log.info(
          '[icbad-scraper] 🆕  Base vide — scraping initial dans 5s…'
        );
        const { scrapeAll } = strapi
          .plugin('icbad-scraper')
          .service('scraper');

        setTimeout(() => {
          scrapeAll(strapi).catch((err) => {
            strapi.log.error('[icbad-scraper] Erreur scraping initial :', err.message);
          });
        }, 5000);
      } else {
        strapi.log.info(
          `[icbad-scraper] ✅  ${count} équipe(s) déjà en base.`
        );
      }
    } catch (err) {
      strapi.log.error('[icbad-scraper] bootstrap error:', err.message);
    }
  },
});