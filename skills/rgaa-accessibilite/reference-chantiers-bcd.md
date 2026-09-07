# Référence — Chantiers B, C, D (retour d’expérience CLTO)

Notes concrètes issues d’un site React + Vite + Tailwind + CMS (Strapi).  
À adapter au projet cible ; les noms de fichiers CLTO sont des **exemples**.

---

## Chantier A (rappel) — Contraste **3.2**

- **Ne pas changer les couleurs sans confirmation du développeur.**
- Un doré / accent de marque peut échouer en texte sur fond clair (~2,5:1) tout en restant OK en déco / boutons selon le design.
- Alternatives hors palette : ne pas utiliser la couleur seule pour l’info ; renforcer structure, labels, icônes + texte.

---

## Chantier B — Clavier & focus

**Critères :** **10.7** Visibilité de la prise de focus · **10.13** Contenu masqué / `aria-hidden` · **12.8** Ordre de tabulation · **12.9** Piège au clavier · **12.11** Contenu apparaissant au survol ou au focus.

### Ce qui a été fait (patterns)

1. **Constante de focus** réutilisée sur Header / Footer / CTAs :

```ts
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2";
```

2. **Header**
   - `keydown` Escape : ferme le sous-menu ouvert puis le menu mobile.
   - Restaure le focus sur le bouton déclencheur (`aria-controls`) ou le burger (`ref`).
   - Anneaux `focus-visible` sur logo, liens, boutons dropdown, CTAs, menu mobile.
   - Icônes Chevron / Menu / X en `aria-hidden`.

3. **Footer**
   - Escape ferme les accordéons mobile.
   - Focus ring sur toggles et liens réseaux (fond sombre → `ring-offset-footer` si token dispo).

4. **Hero / carrousels**
   - Focus ring sur CTA, prev/next, indicateurs (`role="tablist"`).
   - Loader : `aria-busy` + `role="status"`.

5. **Formulaires** (`Contact`, `Avis`, etc.)
   - Remplacer `focus:outline-none` seul par `focus:outline-none focus:ring-2 focus:ring-primary/30`.

6. **MobileCarousel**
   - Idem : plus de `focus:outline-none` nu.

7. **Organigramme / hover→focus**
   - Carte focusable ; email révélé au focus ; `tabIndex={-1}` + `aria-hidden` quand replié ; `mailto` avec ring au focus.

### Checklist B sur un nouveau projet

- [ ] Grep `outline-none` / `outline-hidden` → chaque occurrence a un ring / outline alternatif
- [ ] Menus & dialogs : Escape + focus restore
- [ ] Aucun focusable sous `aria-hidden={true}`
- [ ] Contenu « hover only » aussi disponible au focus clavier

---

## Chantier C — Images & contenus CMS

**Critères :** **1.1** Image pourvue d’une alternative · **1.2** Image décorative · **1.3** Pertinence de l’alternative · **6.1** Lien explicite.

### Helpers front (à recréer / porter)

Dans un util média (ex. `utils/media.ts`) :

| Fonction | Rôle |
| -------- | ---- |
| `resolveMediaAlt(media, contextFallback?)` | Priorité : `alternativeText` CMS (si non générique) → contexte page (titre) → nom fichier nettoyé → fallback site |
| `isGenericLinkLabel(label)` | Détecte « En savoir plus », « Cliquez ici », « Lire la suite », etc. |
| `accessibleLinkLabel(label, context)` | Enrichit un CTA générique : `En savoir plus : {titre}` |

`ResponsiveImage` :

- Props : `alt?`, `altFallback?`, `decorative?`
- `decorative` → `alt=""` + `aria-hidden`
- Sinon `alt` trim → sinon `resolveMediaAlt(media, altFallback)`

### Branchage typique

- Hero : `resolveMediaAlt(slide.media, titre + site)` ; CTA avec `aria-label` si libellé générique
- Listes d’actus / galerie / partenaires / événements / blocks CMS : toujours passer par le helper
- Cartes déjà titrées dans le lien : libellé visible « Lire l’article » OK (le nom accessible inclut le titre)

### Contenu CMS (rédaction)

Guide type (ex. `frontend/docs/contenu-accessible-strapi.md`) :

- Alt en français, descriptif
- Interdit : « image », « photo », `IMG_4521.jpg`
- CTA métier plutôt que générique
- Le fallback front **ne remplace pas** un bon CMS

### Checklist C

- [ ] Helper alt central + usage sur tous les `<img>` / wrappers média
- [ ] Grep « En savoir plus » / « Cliquez ici » / « Lire la suite »
- [ ] Guide court pour les rédacteurs CMS
- [ ] Décoratives : `alt=""` (+ `aria-hidden` si besoin)

---

## Chantier D — Navigation & statut

**Critères :** **12.3** Plan du site · **12.6** Zones de regroupement / navigation cohérente · **8.4** Titre de page · **7.5** Messages de statut.

### Plan du site HTML

1. Constante structurée des sections/liens (ex. `constants/siteMap.ts`) — miroir de la nav.
2. Page `/plan-du-site` : listes par rubrique, Seo dédié, lien vers `sitemap.xml` pour les bots.
3. Lien **Plan du site** dans le footer (à côté mentions / confidentialité).
4. Ajouter l’URL dans `public/sitemap.xml`.

### Titres de page (`Seo`)

- Accueil : titre = nom du site (`absoluteTitle` si besoin).
- Autres : `buildTitle("Créneaux")` → `Créneaux | Nom du site`.
- Harmoniser les pages oubliées (légales, publics, événements…).
- FAQ : préférer « Foire aux questions » au seul « FAQ » si plus clair.
- Titre aligné sur le libellé de nav quand c’est possible (ex. Organigramme).

### Messages de statut

| Situation | Rôle | Notes |
| --------- | ---- | ----- |
| Chargement liste / skeleton | `role="status"` | Texte visible ou `sr-only` |
| Erreur API / formulaire | `role="alert"` | **Visible** de préférence (éviter `sr-only` seul) |
| Suspense route | `role="status"` | Ex. « Chargement… » |
| Succès envoi formulaire | `role="status"` optionnel | Ou message dans le bouton si déjà annoncé |

### Checklist D

- [ ] Route + page plan du site + lien footer
- [ ] Toutes les routes publiques ont un `<Seo title=…>` unique
- [ ] Grep `Chargement` / `loadError` / `Loader2` → status ou alert
- [ ] Erreurs plus seulement dans `console.error`

---

## Recettes React / Vite / Tailwind (synthèse)

```tsx
// Focus
className={`… ${FOCUS_RING}`}

// Escape menu
useEffect(() => {
  if (!open) return;
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    setOpen(false);
    triggerRef.current?.focus();
  };
  document.addEventListener("keydown", onKey);
  return () => document.removeEventListener("keydown", onKey);
}, [open]);

// Loader / erreur
<p role="status">Chargement…</p>
<p role="alert">{error}</p>

// CTA générique
<a aria-label={accessibleLinkLabel(cta, title)}>{cta} →</a>
```

- **Radix Dialog** : Escape / focus souvent déjà gérés — vérifier le titre (`DialogTitle` / `sr-only`).
- **Framer Motion** : désactiver ou réduire les animations si `prefers-reduced-motion: reduce`.
- **Vite SPA** : titres via effet client (`document.title`) + bon fallback dans `index.html`.

---

## Ordre d’implémentation conseillé (hors couleurs)

1. Inventaire grep (outline, aria-hidden, En savoir plus, loadError, Seo manquant).
2. Chantier B (focus / Escape).
3. Chantier C (alt helpers + CTA).
4. Chantier D (plan du site + Seo + status/alert).
5. Revalidation manuelle + outil auto si dispo.
