# README SEO — CLTO Badminton Orléans

Document de suivi SEO du site (frontend Vite + React Router + Strapi).

> Fichier volontairement exclu du dépôt Git (voir `.gitignore`) : usage interne / équipe projet.

**Dernière mise à jour :** 27 juillet 2026  
**Stack concernée :** `frontend/` (SPA Vite 100 %, pas de SSR / prerender pour le moment)

---

## 1. Objectifs SEO

Le site doit se positionner notamment sur :

| Mot-clé             | Priorité | Statut (après correctifs code)                                                                           |
| ------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `clto`              | Haute    | Bien présent (marque, header, footer, nombreuses pages)                                                  |
| `badminton orléans` | Haute    | Renforcé dans meta, sous-titres et textes UI ; encore perfectible côté contenus CMS                      |
| `club orléans`      | Moyenne  | Quasi absent en expression exacte ; formulations proches ajoutées (*club … à Orléans*, *club orléanais*) |

Variantes utiles (non obligatoires) : *badminton Orléans Loiret*, *inscription badminton Orléans*, *cours badminton Orléans*, *club badminton orléans*.

---

## 2. Inventaire des pages (routes frontend)

Source : `frontend/src/app/routes.tsx` (à resynchroniser si les routes évoluent).

| Route                    | Page                 |
| ------------------------ | -------------------- |
| `/`                      | Accueil              |
| `/actualites`            | Liste des actualités |
| `/actualite/:documentId` | Article              |
| `/historique`            | Historique           |
| `/galerie`               | Galerie              |
| `/palmares`              | Palmarès             |
| `/organigramme`          | Organigramme         |
| `/agenda`                | Agenda               |
| `/gymnases`              | Gymnases             |
| `/creneaux`              | Créneaux             |
| `/interclub`             | Interclubs           |
| `/projet-club`           | Projet club          |
| `/documents`             | Documents            |
| `/jeunes-loisirs`        | Jeunes loisirs       |
| `/jeunes-competiteurs`   | Jeunes compétiteurs  |
| `/adultes-loisirs`       | Adultes loisirs      |
| `/adultes-competiteurs`  | Adultes compétiteurs |
| `/vieilles-plumes`       | Vétérans             |
| `/contact`               | Contact              |
| `/faq`                   | FAQ                  |
| `/stages`                | Stages               |
| `/adherer`               | Adhérer              |
| `*`                      | 404                  |

**Écart connu (à corriger) :** au moment de la rédaction, les pages suivantes **n’avaient pas encore** le composant `<Seo />` :

- `AgendaPage`
- `GaleriePage`
- `PalmaresPage`

Les autres pages listées ci-dessus l’avaient. Re-vérifier avec une recherche `<Seo` dans `frontend/src/app/pages/`.

---

## 3. Analyse initiale (constats avant correctifs)

### 3.1 Technique (SPA)

- Un seul `<title>` global dans `index.html` pour toutes les routes.
- Pas de meta description, peu / pas d’Open Graph.
- Pas de canonical dynamique.
- Pas de `robots.txt` utile / sitemap.
- `site.webmanifest` avec `name` / `short_name` vides.

### 3.2 Hiérarchie des titres

| Problème         | Exemple                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| Pas de h1        | `ProjetClub` (PageHero sans `title`, contenu en h2)                               |
| Double h1        | `AdhererPage` (PageHero + titre d’intro Strapi en h1)                             |
| Sauts de niveaux | Créneaux / Actualités (h1 → h3), footer en h4, sous-titres homepage en h4 sous h2 |
| h1 peu pertinent | Interclubs : titre du carrousel = nom d’équipe                                    |
| Risque CMS       | `BlocksRenderer` pouvait rendre des h1 alors que la page en avait déjà un         |

### 3.3 Images / accessibilité SEO

- Heroes (`Hero`, `PageHero`) en `background-image` CSS → **aucun `alt`**.
- Partenaires : `alt={logo.url}` (URL technique, non descriptive).
- Auteur d’article : alt générique (« Auteur de l’article »).
- Logos souvent « CLTO Badminton » sans « Orléans ».

### 3.4 Mots-clés (avant)

- **`clto`** : correctement utilisé dans l’UI partagée et plusieurs pages ; absent du contenu propre de certaines pages (Créneaux, Stages, Documents, espaces adultes, etc.).
- **`badminton orléans`** : surtout dans le title global ; « Orléans » rare dans le body (surtout Gymnases / Adhérer).
- **`club orléans`** : expression absente.

---

## 4. Modifications code effectuées

### 4.1 Fichiers créés

| Fichier                               | Rôle                                                                                               |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `frontend/src/app/components/Seo.tsx` | Mise à jour client de title, description, robots, Open Graph, Twitter, canonical ; support JSON-LD |
| `frontend/src/utils/seo.ts`           | Constantes `SITE_NAME`, `DEFAULT_DESCRIPTION`, helper `buildTitle()`                               |
| `frontend/public/robots.txt`          | Allow all + placeholder commentaire Sitemap                                                        |
| `README_SEO.md` (ce fichier)          | Documentation SEO (gitignoré)                                                                      |

### 4.2 Fichiers / zones modifiés (principaux)

- `frontend/index.html` — meta description + OG de secours
- `frontend/public/site.webmanifest` — nom / description / theme
- `frontend/src/app/components/PageHero.tsx` — image en `<img>` + `alt` / `imageAlt`
- `frontend/src/app/components/Hero.tsx` — image en `<img>` + `alt` ; Interclubs : slides en **h2** (plus h1)
- `frontend/src/app/components/BlocksRenderer.tsx` — prop `headingOffset` (ex. CMS h1 → h2 sous un h1 de page)
- `frontend/src/app/components/homePage_SectionTitle.tsx` — sous-titre en `<p>` (plus h4)
- `frontend/src/app/components/Footer.tsx` — titres de colonnes en `<p>` ; alts / copyright Orléans
- `frontend/src/app/components/Header.tsx` — alt / aria-label Orléans
- `frontend/src/app/components/Partners.tsx` + API / types partenaires — alt descriptif (alternativeText / name / fallback)
- `frontend/src/app/components/FeaturedNews.tsx` — titres latéraux en h3
- `frontend/src/app/components/InterclubRankings.tsx` — noms d’équipes en h3
- `frontend/src/app/components/MotPresident.tsx` / `MatchResults.tsx` — alts enrichis
- **Toutes les pages** sous `frontend/src/app/pages/**` — composant `<Seo … />` + sous-titres / textes enrichis là où pertinent

### 4.3 Correctifs structurels clés

1. **Meta par page** (SPA) via `Seo` — utile pour Google (JS) et le partage social ; le HTML initial reste le fallback `index.html`.
2. **Projet club** : h1 via `PageHero` + meta dédiée.
3. **Adhérer** : un seul h1 (hero) ; intro Strapi en h2 ; `headingOffset={1}` sur les blocs.
4. **Articles** : meta dynamique (titre + extrait + image) ; `headingOffset={1}` ; alt auteur nominatif.
5. **Interclubs** : `<h1 className="sr-only">Interclubs du CLTO Badminton Orléans</h1>` + slides en h2.
6. **JSON-LD** `SportsClub` sur l’accueil (`schema.org`).
7. **Créneaux / Actualités / Adultes CTA** : niveaux de titres réalignés.

### 4.4 Exemple d’usage `Seo`

```tsx
import { Seo } from '../components/Seo';

<Seo
  title="Créneaux"
  description="Créneaux et planning d'entraînement du CLTO Badminton Orléans…"
/>
```

Accueil :

```tsx
<Seo
  title={SITE_NAME}
  absoluteTitle
  description={DEFAULT_DESCRIPTION}
  jsonLd={homeJsonLd}
/>
```

404 : `noindex`.

---

## 5. État des mots-clés après correctifs code

| Mot-clé             | Présence code / UI                                         | Suffisant pour ranker ?                           |
| ------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| `clto`              | Oui (marque + meta + nombreuses pages)                     | Oui côté technique ; maintenir dans CMS           |
| `badminton orléans` | Meta, sous-titres, descriptions, JSON-LD                   | Non seul — il faut du contenu éditorial récurrent |
| `club orléans`      | Formulations proches, pas d’expression exacte systématique | Non — à renforcer éditorialement                  |

**Verdict :** la base technique et les textes UI critiques sont en place. Le levier restant est surtout **éditorial (Strapi) + SEO local + sitemap / Search Console**, puis éventuellement **prerender** plus tard.

---

## 6. Recommandations & améliorations futures (hors code ou semi-code)

### 6.1 Priorité haute

1. **Contenu Strapi**
   - Slides hero : intégrer *CLTO* + *badminton à Orléans* dans titre ou description.
   - Articles : mention naturelle d’Orléans / CLTO quand pertinent.
   - Remplir `alternativeText` sur tous les médias (partenaires, vignettes, gymnases).
   - Ne pas utiliser de Heading 1 dans les blocs riches (le h1 de page existe déjà).
   - FAQ : enrichir / republier des réponses qui citent le club + Orléans.

2. **Google Search Console + sitemap**
   - Générer un `sitemap.xml` avec l’URL de production définitive.
   - Décommenter / renseigner la ligne `Sitemap:` dans `frontend/public/robots.txt`.
   - Créer la propriété Search Console (+ Bing) et soumettre le sitemap.

3. **SEO local**
   - Fiche **Google Business Profile** à jour (nom, adresse, horaires, photos, lien site).
   - Cohérence NAP (Name / Address / Phone) site ↔ réseaux ↔ annuaires.
   - Avis Google : solliciter et répondre.

### 6.2 Priorité moyenne

4. **Performance images**  
   Ex. bannière organigramme / bureau très lourde (~4 Mo en build) → compresser, WebP, dimensions adaptées (Core Web Vitals).

5. **Pages / articles piliers**  
   Ex. « Pratiquer le badminton à Orléans », « Rejoindre le CLTO » — plutôt que du bourrage de mots-clés partout.

6. **Netlinking**  
   FFBad, ligue, comité, mairie, partenaires, événements locaux.

7. **Analytics**  
   GA4 + Search Console ; suivre requêtes `clto`, `badminton orléans`, `club badminton orléans` ; conversions Adhérer / Contact / Créneaux.

### 6.3 Priorité basse / plus tard

8. **Prerender ou SSR**  
   Aujourd’hui : 100 % Vite SPA. Pour améliorer le HTML initial vu par certains crawlers / aperçus sociaux : prerender (plugin) ou migration partielle SSR — **non démarré**, décision produit à prendre.

9. **JSON-LD enrichi**  
   Téléphone, email, horaires, réseaux depuis Contact Strapi ; schema `FAQPage` quand la FAQ est stable.

10. **Gouvernance**  
    Checklist article (title, meta ~150–160 car., 1 h1, alts, 1 lien interne) ; revue trimestrielle ; figer l’URL canonique (`www` ou non).

---

## 7. Limites assumées (choix projet)

- **Pas de SSR / prerender** pour le moment → les meta sont injectées en JS après chargement.
- Les titres / descriptions des **héros CMS** dépendent encore des rédacteurs Strapi.
- Les **variantes de mots-clés** longues traînes ne sont pas toutes forcées dans le code (volontairement, pour éviter le keyword stuffing).

---

## 8. Checklist rapide avant mise en prod SEO

- [ ] URL de production figée (https, www ou non)
- [ ] `sitemap.xml` généré et déclaré dans `robots.txt`
- [ ] Search Console configurée
- [ ] Google Business Profile à jour
- [ ] Spot-check : title / description uniques sur Accueil, Adhérer, Créneaux, Contact, Gymnases
- [ ] Spot-check : 1 seul h1 par page, alts images critiques
- [ ] Compression des images hero / bandeaux lourds
- [ ] Alts médias renseignés dans Strapi

---

## 9. Contacts / ownership suggéré

| Sujet                                        | Qui                                 |
| -------------------------------------------- | ----------------------------------- |
| Correctifs front SEO (meta, titres, alts UI) | Dev frontend                        |
| Textes pages, articles, alts médias          | Éditeur Strapi / communication club |
| Google Business, avis, annuaires             | Bureau / communication              |
| Search Console, analytics, sitemap prod      | Dev + responsable digital           |

---

*Document généré suite à l’audit SEO frontend (juillet 2026). À mettre à jour à chaque vague de correctifs SEO.*
