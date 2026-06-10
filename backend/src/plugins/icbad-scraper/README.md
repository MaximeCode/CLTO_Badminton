# Plugin `icbad-scraper` — Strapi v5

Scrape les données interclubs depuis [icbad.ffbad.org](https://icbad.ffbad.org)
et les expose via une API REST Strapi consommable depuis Next.js / React.

---

## Structure des fichiers

```
src/plugins/icbad-scraper/
├── package.json
├── strapi-server.js                   ← Point d'entrée Strapi
└── server/
    ├── index.js                       ← register (cron + doc Swagger) + bootstrap
    ├── content-types/
    │   ├── index.js
    │   └── interclub-team/
    │       └── schema.json            ← Collection Strapi
    ├── controllers/
    │   ├── index.js
    │   └── interclub.js               ← Endpoints REST
    ├── routes/
    │   └── icbad-scraper.js           ← Routes content-api (tableau plat, Strapi v5)
    ├── services/
    │   ├── index.js
    │   └── scraper.js                 ← Logique scraping + upsert
    └── utils/
        └── icbad-parser.js            ← Parser HTML cheerio
```

---

## Installation

### 1. Copier le plugin dans votre projet Strapi

```bash
cp -r icbad-scraper  votre-projet-strapi/src/plugins/
```

### 2. Installer les dépendances

Depuis la **racine de votre projet Strapi** :

```bash
npm install cheerio node-fetch@2
```

> `node-fetch@2` est requis car Strapi v5 tourne encore en CommonJS.
> La v3 de node-fetch est ESM-only et incompatible sans configuration supplémentaire.

### 3. Déclarer le plugin dans `config/plugins.js`

```js
// config/plugins.js
module.exports = ({ env }) => ({
  'icbad-scraper': {
    enabled: true,
    resolve: './src/plugins/icbad-scraper',
  },
});
```

### 4. Configurer le fuseau horaire du cron (optionnel)

```js
// config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true,
  },
});
```

Le cron est configuré sur **Europe/Paris** et tourne à **02h00** chaque nuit.

### 5. ⚠️  Renseigner les URLs et codes des équipes

Ouvrez `server/services/scraper.js` et complétez `TEAMS_CONFIG` :

```js
const TEAMS_CONFIG = [
  {
    teamSlug:      'clto-n2',
    teamLabel:     'CLTO N2',
    division:      'N2',
    icbadTeamCode: '45-CLTO-1',          // Sigle exact dans IcBAD
    icbadUrl:      'https://icbad.ffbad.org/competition/2500383/tableau/14022',
    season:        '2025-2026',
  },
  {
    teamSlug:      'clto-n3',
    teamLabel:     'CLTO N3',
    division:      'N3',
    icbadTeamCode: '45-CLTO-2',          // ← À adapter
    icbadUrl:      'https://icbad.ffbad.org/competition/XXXX/tableau/YYYY',
    season:        '2025-2026',
  },
  // … idem pour R2, D1-A, D1-B, D2-A, D2-B, D3
];
```

**Pour trouver le bon `icbadTeamCode`** : ouvrez la page IcBAD de la poule,
cherchez le nom du CLTO dans le classement — le code est entre parenthèses :
ex `Cercle Laïque des Tourelles Orléans Badminton **(45-CLTO-1)**`.

---

## Endpoints API

> ⚠️ Strapi v5 préfixe automatiquement les routes content-api d'un plugin avec
> `/api/<nom-du-plugin>` — d'où le préfixe `/api/icbad-scraper/` ci-dessous.

### Lecture publique (front Next.js)

| Méthode | URL                              | Description                                     |
| ------- | -------------------------------- | ----------------------------------------------- |
| `GET`   | `/api/icbad-scraper/teams`       | Résumé de toutes les équipes (sans JSON lourds) |
| `GET`   | `/api/icbad-scraper/teams/:slug` | Données complètes d'une équipe                  |

**Slugs disponibles :** `clto-n2`, `clto-n3`, `clto-r2`, `clto-d1a`, `clto-d1b`, `clto-d2a`, `clto-d2b`, `clto-d3`

#### Exemple de réponse `/api/icbad-scraper/teams`

```json
{
  "data": [
    {
      "teamSlug": "clto-n2",
      "teamLabel": "CLTO N2",
      "division": "N2",
      "competitionName": "Poule 6",
      "season": "2025-2026",
      "cltoPosition": 2,
      "cltoPoints": 41,
      "cltoPlayed": 10,
      "cltoWon": 6,
      "cltoDraw": 2,
      "cltoLost": 2,
      "cltoBonusPlus": 3,
      "cltoBonusMinus": 0,
      "cltoMatchDiff": 22,
      "cltoSetDiff": 42,
      "cltoPtsDiff": 299,
      "lastScrapedAt": "2025-10-15T02:00:00.000Z",
      "scrapeError": null
    }
  ]
}
```

#### Exemple de réponse `/api/icbad-scraper/teams/clto-n2`

```json
{
  "data": {
    "teamSlug": "clto-n2",
    "ranking": [
      {
        "position": 1,
        "teamName": "Club Alenconnais Badminton",
        "teamCode": "61-CAB-1",
        "logoUrl": "https://poona.ffbad.org/download/logo/...",
        "rowClass": "promotion",
        "played": 10, "won": 7, "draw": 2, "lost": 1,
        "forfeit": 0, "bonusPlus": 0, "bonusMinus": 0,
        "points": 42, "matchDiff": 20, "setDiff": 31, "ptsDiff": 147,
        "isClto": false
      },
      {
        "position": 2,
        "teamName": "Cercle Laïque des Tourelles Orléans Badminton",
        "teamCode": "45-CLTO-1",
        "isClto": true,
        "points": 41,
        ...
      }
    ],
    "matches": [
      {
        "journee": 1,
        "date": "2025-09-27",
        "time": "16:00",
        "homeTeam": "Bayard Argentan Badminton",
        "homeCode": "61-BABA-1",
        "awayTeam": "Cercle Laïque des Tourelles Orléans Badminton",
        "awayCode": "45-CLTO-1",
        "homeScore": 3,
        "awayScore": 5,
        "result": "win",
        "involvesClto": true,
        "icbadMatchUrl": "https://icbad.ffbad.org/rencontre/710836"
      }
    ],
    "bonuses": [
      {
        "journee": 2,
        "category": "Classement général : Bonus offensif",
        "teamName": "Cercle Laïque des Tourelles Orléans Badminton",
        "matchup": "45-CLTO-1 / 78-BML-1",
        "value": 1,
        "type": "Bonus offensif",
        "involvesClto": true
      }
    ]
  }
}
```

### Déclenchement manuel

| Méthode | URL                               | Description               |
| ------- | --------------------------------- | ------------------------- |
| `POST`  | `/api/icbad-scraper/scrape`       | Scrape toutes les équipes |
| `POST`  | `/api/icbad-scraper/scrape/:slug` | Scrape une équipe         |

Ces routes nécessitent une authentification content-api : un **API Token**
Strapi (Paramètres → API Tokens) passé en header `Authorization: Bearer <token>`.

### Documentation Swagger

Le plugin de documentation Strapi ne détecte pas les routes custom automatiquement.
Un override est enregistré dans `server/index.js` (`register()`) pour que les
4 routes apparaissent dans Swagger sous le tag **Icbad-scraper**.

Pour vérifier les routes réellement enregistrées :

```bash
npx strapi routes:list
```

---

## Comportement du scraping

| Moment          | Déclencheur                            | Description                                    |
| --------------- | -------------------------------------- | ---------------------------------------------- |
| Boot Strapi     | Automatique                            | Si la base est vide, scraping initial après 5s |
| Cron            | Tous les jours à 02h00 Europe/Paris    | Mise à jour complète                           |
| Manuel          | `POST /api/icbad-scraper/scrape`       | Immédiat, arrière-plan                         |
| Manuel unitaire | `POST /api/icbad-scraper/scrape/:slug` | Synchrone, retour JSON                         |

En cas d'erreur de scraping (réseau, parsing), les données précédentes sont
**conservées** en base et seul le champ `scrapeError` est mis à jour.

---

## Utilisation dans Next.js

```js
// lib/interclubs.js
export async function getInterclubTeams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/icbad-scraper/teams`,
    { next: { revalidate: 3600 } }   // ISR : revalide toutes les heures
  );
  const json = await res.json();
  return json.data;
}

export async function getInterclubTeam(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/icbad-scraper/teams/${slug}`,
    { next: { revalidate: 3600 } }
  );
  const json = await res.json();
  return json.data;
}
```

---

## Utilisation dans Vite.js

```js
// api/icbad_local/interclub.ts
export async function getInterclubTeams() {
  const data = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/icbad-scraper/teams`);
  return data.data;
}

export async function getInterclubTeam(slug: string) {
  const data = await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/icbad-scraper/teams/${slug}`);
  return data.data;
}
```

---

## Mise à jour de saison

Chaque année en septembre, mettez à jour dans `scraper.js` :
1. Le champ `season` de chaque équipe dans `TEAMS_CONFIG`
2. Les `icbadUrl` pointant vers les nouvelles poules IcBAD
3. Les `icbadTeamCode` si les équipes ont changé de division
