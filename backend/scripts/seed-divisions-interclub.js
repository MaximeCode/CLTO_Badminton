'use strict';

/**
 * One-shot : initialise toutes les divisions interclub (publiées).
 *
 * Usage (depuis backend/) :
 *   node scripts/seed-divisions-interclub.js
 *
 * Prérequis : Strapi doit pouvoir démarrer (DB + .env OK).
 * Ne pas relancer si des divisions existent déjà (Nom_court unique).
 */

const { createStrapi } = require('@strapi/strapi');

const UID = 'api::divisions-interclub.divisions-interclub';

const DIVISIONS = [
  { Nom_court: 'N1', Nom_complet: 'Nationale 1', Ordre: 11 },
  { Nom_court: 'N2', Nom_complet: 'Nationale 2', Ordre: 12 },
  { Nom_court: 'N3', Nom_complet: 'Nationale 3', Ordre: 13 },
  { Nom_court: 'PreNat', Nom_complet: 'Pré Nationale', Ordre: 14 },
  { Nom_court: 'R1', Nom_complet: 'Régionale 1', Ordre: 21 },
  { Nom_court: 'R2', Nom_complet: 'Régionale 2', Ordre: 22 },
  { Nom_court: 'R3', Nom_complet: 'Régionale 3', Ordre: 23 },
  { Nom_court: 'PreReg', Nom_complet: 'Pré Régionale', Ordre: 24 },
  { Nom_court: 'D1', Nom_complet: 'Départementale 1', Ordre: 31 },
  { Nom_court: 'D2', Nom_complet: 'Départementale 2', Ordre: 32 },
  { Nom_court: 'D3', Nom_complet: 'Départementale 3', Ordre: 33 },
  { Nom_court: 'D4', Nom_complet: 'Départementale 4', Ordre: 34 },
];

async function main() {
  const strapi = await createStrapi().load();

  try {
    for (const division of DIVISIONS) {
      const created = await strapi.documents(UID).create({
        data: division,
        status: 'published',
      });

      console.log(
        `✓ ${division.Nom_court} → ${division.Nom_complet} (Ordre ${division.Ordre}) [${created.documentId}]`
      );
    }

    console.log(`\n${DIVISIONS.length} divisions créées et publiées.`);
  } finally {
    await strapi.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
