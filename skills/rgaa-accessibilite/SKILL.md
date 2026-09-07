---
name: rgaa-accessibilite
description: >-
  Applique une méthode RGAA 4 (accessibilité web) : checklist générale
  (quoi / pourquoi / comment) et patterns React/Vite/Tailwind issus des
  chantiers clavier-focus, images-CMS et navigation-statut. À utiliser
  uniquement quand l'utilisateur demande explicitement ce skill RGAA /
  accessibilité (copié dans skills/rgaa-accessibilite/).
disable-model-invocation: true
---

# RGAA — Accessibilité web (portable)

Skill **opt-in**. Ne l’appliquer que si l’utilisateur le demande (ou @ ce dossier).

## Avant de coder

1. Inspecter le working tree (`git status` / diff).
2. Confirmer le périmètre (pages, stack, contraintes DA).
3. **Ne pas changer les couleurs sans confirmation du développeur** (contraste 3.2 inclus). Proposer des alternatives hors palette (texte adjacent, structure, `aria-*`) si besoin.
4. Attendre un go explicite avant d’implémenter.

## Références dans ce skill

- Détail des chantiers B / C / D + recettes React : [reference-chantiers-bcd.md](reference-chantiers-bcd.md)
- Sur un projet déjà audité : lire aussi l’audit local s’il existe (`docs/rgaa-*.md`).

## Ordre de chantier recommandé

| Priorité | Chantier | Critères RGAA (clair) | Objectif |
| -------- | -------- | --------------------- | -------- |
| A | Contraste | **3.2** Contraste des composants d’interface | Couleurs — **bloqué sans OK développeur** |
| B | Clavier & focus | **10.7** Visibilité du focus, **10.13** Contenu masqué, **12.8** Ordre de tabulation, **12.9** Piège clavier, **12.11** Contenu au survol/focus | Navigation clavier sûre |
| C | Images & liens | **1.1–1.3** Textes alternatifs, **1.2** Décoratives, **6.1** Liens explicites | Alt + CTA compréhensibles |
| D | Navigation & statut | **12.3 / 12.6** Plan du site, **8.4** Titre de page, **7.5** Messages de statut | Orientation + feedback AT |

---

## Checklist accessibilité générale

Pour chaque item : **quoi** → **pourquoi** → **comment** (générique + React/Vite/Tailwind).

### Structure & langue

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| `lang` sur `<html>` | **8.3** Langue de la page | `lang="fr"` dans `index.html` |
| Un `<h1>` pertinent / page | **9.1** Titres | PageHero / titre de page unique ; ne pas sauter de niveaux sans raison |
| Landmarks | **12.6** Zones | `<header>`, `<main id="main-content">`, `<nav aria-label>`, `<footer>` |
| Skip-link | Accès rapide au contenu | Lien « Aller au contenu » → `#main-content`, visible au focus |

### Clavier & focus (chantier B)

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Focus visible | **10.7** | Jamais `outline-none` / `outline-hidden` sans `focus-visible:ring-*` (Tailwind) |
| Escape + retour focus | **12.9** | Menus, modales, accordéons : Escape ferme ; focus sur le déclencheur |
| Contenu au focus = au hover | **12.11** | Dropdowns / emails : `onFocus` / `onBlur` + ouverture clavier |
| Pas de focus dans `aria-hidden` | **10.13** | Skeletons décoratifs : pas de liens/boutons ; sinon `tabIndex={-1}` + retirer `aria-hidden` quand visible |
| Ordre de tabulation | **12.8** | Ordre DOM = ordre visuel ; éviter `tabIndex` > 0 |

**Recette Tailwind focus :**

```txt
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2
```

### Images & médias (chantier C)

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Alt informatif | **1.1 / 1.3** | Décrire le contenu utile ; fallback front si CMS vide |
| Décoratives | **1.2** | `alt=""` + idéalement `aria-hidden` |
| Pas d’alt poubelle | **1.3** | Éviter « image », « photo1 », nom de fichier |
| Icônes lucide | Bruit AT | `aria-hidden` si le texte adjacent suffit ; sinon `aria-label` sur le contrôle |

### Liens & CTA (chantier C)

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Libellé explicite | **6.1** | Pas « En savoir plus » / « Cliquez ici » seuls |
| Lien-carte | **6.1** | Si le titre est **dans** le même `<Link>`, un « Lire l’article » peut suffire |
| CTA isolé | **6.1** | Enrichir via `aria-label` : « En savoir plus : {contexte} » |

### Navigation & titres de page (chantier D)

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Plan du site HTML | **12.3 / 12.6** | Page `/plan-du-site` listant les routes + lien footer (en plus du `sitemap.xml`) |
| Titre de page unique | **8.4** | Composant Seo / `document.title` : `{Page} \| {Site}` |
| `aria-current="page"` | Orientation | Lien actif dans la nav |

### Scripts, chargements, erreurs (chantier D)

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Loader | **7.5** Messages de statut | `role="status"` (+ texte visible ou `sr-only`) |
| Erreur | **7.5** | `role="alert"` (visible de préférence) |
| Carrousel | **7.1** | Boutons prev/next, `aria-roledescription`, `prefers-reduced-motion` |
| Modale / lightbox | **12.9** | Escape, focus trap (Radix Dialog OK), titre accessible |

### Formulaires

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Labels liés | **11.1** | `<label htmlFor>` / `aria-labelledby` |
| Erreurs | **11.10 / 7.5** | Message lié au champ + `role="alert"` si global |
| Focus champs | **10.7** | `focus:outline-none` → ajouter `focus:ring-2` |

### Motion & zoom

| Quoi | Pourquoi | Comment |
| ---- | -------- | ------- |
| Reduced motion | **13.7** / confort | Respecter `prefers-reduced-motion` (Framer / CSS) |
| Zoom 200 % | **10.4 / 10.11** | Pas de perte d’info ; éviter largeurs fixes bloquantes |

---

## Workflow agent (nouveau projet)

1. Inventaire : `outline-none`, `aria-hidden`, loaders, `<Seo>` / titles, `sitemap`, images CMS, « En savoir plus ».
2. Proposer un plan par chantiers A→D (A = couleurs seulement avec OK développeur).
3. Implémenter après go : d’abord focus/clavier, puis alt/liens, puis plan du site + status.
4. Documenter dans l’audit projet si présent.
5. Revalidation : clavier (Tab / Escape), zoom 200 %, outil contraste, rgaa-checker si dispo.

## Anti-patterns

- Changer la palette « pour le contraste » sans confirmation.
- `outline-none` seul.
- Boutons focusables dans un parent `aria-hidden`.
- Alt = nom de fichier.
- CTA générique sans contexte.
- Erreur API silencieuse (console only) sans `role="alert"`.
- Plan du site = uniquement `sitemap.xml`.

## Copie vers un autre projet

Copier le dossier `skills/rgaa-accessibilite/` à la racine du repo cible.  
Pour que Cursor le voie comme skill projet : optionnellement le placer aussi sous `.cursor/skills/rgaa-accessibilite/` **dans ce repo uniquement**, ou @ le `SKILL.md` à la demande.
