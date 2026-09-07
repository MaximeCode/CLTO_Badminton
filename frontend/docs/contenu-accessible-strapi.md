# Contenu accessible — guide Strapi (CLTO)

Référentiel : RGAA 4 (images 1.x, liens 6.1).  
Le front applique des **fallbacks** si un champ est vide, mais un bon contenu CMS reste indispensable.

## Images (média Strapi)

### Champ « Texte alternatif » (`alternativeText`)

| Cas                            | Que renseigner                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------- |
| Photo informative              | Décrire le contenu utile (ex. « Match minimes en salle — volant en jeu »)        |
| Portrait                       | Prénom, nom, fonction (ex. « Steve Bandou-Naitoll, président »)                  |
| Logo partenaire                | Nom de l’organisation (ex. « Logo Ville d’Orléans »)                             |
| Décorative (séparateur, motif) | Laisser **vide** — le front pourra traiter le cas ; en doute, décrire brièvement |

### À éviter

- « image », « photo », « IMG_4521 », nom de fichier brut
- Répéter toute une légende déjà affichée à côté (caption) sans valeur ajoutée
- Texte marketing long dans l’alt (réservé au corps de page)

### Légende (`caption`)

Utile pour préciser une image dans un article (Blocks). Ce n’est **pas** un substitut de l’alt : renseigner les deux si l’image porte de l’information.

## Liens & boutons (CTA)

### Libellés explicites (critère 6.1)

| À éviter seul  | Préférer                                                |
| -------------- | ------------------------------------------------------- |
| En savoir plus | En savoir plus sur les stages d’été                     |
| Cliquez ici    | Consulter le règlement intérieur                        |
| Lire la suite  | (OK si le titre de l’article est **dans le même lien**) |
| Voir plus      | Voir le calendrier des compétitions                     |

### Heroes (carrousel)

Le champ `libelle_btn` doit décrire la destination.  
Si le libellé reste générique (« En savoir plus »), le site complète automatiquement avec le **titre** de la slide pour les lecteurs d’écran — mieux vaut tout de même un libellé métier clair pour tout le monde.

## Checklist rapide avant publication

1. Chaque image informative a un `alternativeText` en français.
2. Aucun alt du type « image » / nom de fichier.
3. Chaque CTA décrit la page ou l’action cible.
4. Les titres de liens externes (PDF, HelloAsso…) indiquent le format ou la destination si utile (« Télécharger le flyer PDF »).
