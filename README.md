# Site web — CLTO Badminton Orléans

Site vitrine du **CLTO Badminton Orléans** ([cltobadminton.fr](https://cltobadminton.fr)).

## Objectif

Présenter le club, son organisation et ses activités auprès des adhérents et du grand public : actualités, vie du club, créneaux, publics (jeunes, adultes, vétérans), interclubs, adhésion et contact.

Le contenu éditorial est géré via un CMS, afin que les membres du club puissent mettre à jour le site sans modifier le code.

## Stack technique

| Couche          | Technologie                                               |
| --------------- | --------------------------------------------------------- |
| Frontend        | React 18, TypeScript, Vite, Tailwind CSS v4, React Router |
| Backend / CMS   | Strapi 5                                                  |
| Base de données | MySQL                                                     |
| Runtime         | Node.js 20 à 24 (recommandé : 22)                         |

Structure du dépôt :

```plaintext
frontend/   # Application web (SPA)
backend/    # API & admin Strapi
```

## Prérequis

- Node.js `>= 20` et `<= 24`
- npm
- MySQL (pour le backend)

## Installation et démarrage local

### 1. Backend (Strapi)

```bash
cd backend
cp .env.example .env
npm install
npm run develop
```

Renseigner au minimum dans `backend/.env` : secrets Strapi, accès MySQL, et éventuellement la config SMTP.

Admin / API : [http://localhost:1337](http://localhost:1337)

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Dans `frontend/.env` :

| Variable                           | Rôle                                                           |
| ---------------------------------- | -------------------------------------------------------------- |
| `VITE_STRAPI_URL`                  | URL de l’API Strapi (ex. `http://localhost:1337`)              |
| `VITE_ORGANIGRAMME_IN_MAINTENANCE` | `true` / `false` — affiche la page organigramme en maintenance |

Frontend : [http://localhost:5173](http://localhost:5173)

### Build de production (frontend)

```bash
cd frontend
npm run build
```

Les fichiers sont générés dans `frontend/dist/`.

## Crédits

- **Club** — CLTO Badminton Orléans
- **Textes** — rédigés par les membres du club
- **Images** — libres de droits ou internes au club ; propriété du club (y compris les images fournies par les membres)
