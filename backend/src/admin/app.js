import { Pencil, CheckCircle } from '@strapi/icons';
import { mountEnvBanner } from './EnvBanner';

export default {
  register(app) {
    if (!('widgets' in app)) return;

    app.widgets.register([
      {
        icon: Pencil,
        title: {
          id: 'enhanced-homepage.widget.last-edited.title',
          defaultMessage: 'Last edited entries',
        },
        component: async () => {
          const { EnhancedLastEditedWidget } = await import('./widgets/RecentEntriesWidgets');
          return EnhancedLastEditedWidget;
        },
        id: 'enhanced-last-edited',
        permissions: [{ action: 'plugin::content-manager.explorer.read' }],
      },
      {
        icon: CheckCircle,
        title: {
          id: 'enhanced-homepage.widget.last-published.title',
          defaultMessage: 'Last published entries',
        },
        component: async () => {
          const { EnhancedLastPublishedWidget } = await import('./widgets/RecentEntriesWidgets');
          return EnhancedLastPublishedWidget;
        },
        id: 'enhanced-last-published',
        permissions: [{ action: 'plugin::content-manager.explorer.read' }],
      },
    ]);
  },
  config: {
    locales: [
      'fr',
    ],
    translations: {
      fr: {

        // ─── Globals & standalone keys ───────────────────────────────────────────
        "cancel": "Annuler",
        "Prestations": "Prestations",
        "User": "Utilisateur",
        "search.placeholder": "Rechercher",
        "list.asset.at.finished": "Chargement terminé.",

        // ─── enhanced-homepage widgets ───────────────────────────────────────────
        "enhanced-homepage.widget.last-edited.title": "Dernières entrées éditées",
        "enhanced-homepage.widget.last-published.title": "Dernières entrées publiées",
        "enhanced-homepage.widget.column.title": "Titre",
        "enhanced-homepage.widget.column.type": "Type",
        "enhanced-homepage.widget.column.status": "Statut",
        "enhanced-homepage.widget.column.createdBy": "Créé par",
        "enhanced-homepage.widget.column.createdAt": "Créé le",
        "enhanced-homepage.widget.column.updatedBy": "Modifié par",
        "enhanced-homepage.widget.column.updatedAt": "Modifié",
        "enhanced-homepage.widget.column.publishedAt": "Publié",

        // ─── app.* ───────────────────────────────────────────────────────────────
        "app.components.LeftMenuLinkContainer.settings": "Paramètres",
        "app.components.UpsellBanner.button.ended": "Conserver le plan Growth",
        "app.components.UpsellBanner.intro.ended": "Votre essai est terminé\u00a0: ",
        "app.components.UpsellBanner.text.ended": "Conservez l\u2019acc\u00e8s aux fonctionnalit\u00e9s Growth en passant au plan payant.",
        "app.utils.drag": "Faire glisser",

        // ─── chat.* (AI assistant) ────────────────────────────────────────────────
        "chat.header.default-title": "Nouvelle conversation",
        "chat.input.strapi-ai-can-make-errors": "Strapi AI peut faire des erreurs.",
        "chat.tooltips.close-chat": "Fermer le chat",
        "chat.tooltips.create-chat": "Nouvelle conversation",
        "chat.tooltips.open-chat": "Ouvrir le chat",

        // ─── chat.code-upload.* (Import from computer modal) ─────────────────────
        "chat.code-upload.continue-button": "Continuer",
        "chat.code-upload.description": "Importez des fichiers depuis votre ordinateur pour les utiliser dans votre projet.",
        "chat.code-upload.drop-zone": "Glissez-déposez vos fichiers ici",
        "chat.code-upload.drop-zone-browse": "Parcourir les fichiers",
        "chat.code-upload.drop-zone-folder": "Glissez-déposez un dossier ici",
        "chat.code-upload.drop-zone.or": "ou",
        "chat.code-upload.edit-files": "Modifier les fichiers",
        "chat.code-upload.file-placeholder": "Sélectionner un fichier",
        "chat.code-upload.header": "Importer depuis l'ordinateur",
        "chat.code-upload.import-button": "Importer",
        "chat.code-upload.step1-title": "Sélectionner les fichiers",
        "chat.code-upload.step2-title": "Aperçu des fichiers",
        "chat.code-upload.title": "Importer des fichiers",
        "chat.code-upload.upload-button": "Parcourir",

        // ─── chat.figma-upload.* (Import from Figma modal) ───────────────────────
        "chat.figma-upload.cancel": "Annuler",
        "chat.figma-upload.description": "Demandez à transformer vos designs en schémas en joignant un lien vers un ou plusieurs cadres de vos fichiers Figma. (Max 15 cadres)",
        "chat.figma-upload.edit-token": "Modifier le jeton API",
        "chat.figma-upload.error": "Erreur lors de l'importation",
        "chat.figma-upload.header": "Importer depuis Figma",
        "chat.figma-upload.import-button": "Importer",
        "chat.figma-upload.retry": "Réessayer",
        "chat.figma-upload.save-token": "Enregistrer le jeton API",
        "chat.figma-upload.step1-title": "Saisir l'URL Figma",
        "chat.figma-upload.step2-title": "Aperçu des images",
        "chat.figma-upload.success": "Importation réussie",
        "chat.figma-upload.title": "Importer un design Figma",
        "chat.figma-upload.token-button": "Enregistrer",
        "chat.figma-upload.token-button.cancel": "Annuler",
        "chat.figma-upload.token-button.error": "Erreur lors de l'enregistrement",
        "chat.figma-upload.token-button.loading": "Enregistrement en cours...",
        "chat.figma-upload.token-button.retry": "Réessayer",
        "chat.figma-upload.token-button.success": "Enregistrement réussi",
        "chat.figma-upload.token-description": "Entrez votre jeton API Figma pour accéder à vos fichiers.",
        "chat.figma-upload.token-help": "Comment obtenir mon jeton API Figma ?",
        "chat.figma-upload.token-help-button": "Obtenir mon jeton API",
        "chat.figma-upload.token-help-button.cancel": "Annuler",
        "chat.figma-upload.token-help-button.error": "Erreur lors de l'obtention du jeton API",
        "chat.figma-upload.token-help-button.loading": "Obtention du jeton API en cours...",
        "chat.figma-upload.token-help-button.retry": "Réessayer",
        "chat.figma-upload.token-help-button.success": "Obtention du jeton API réussie",
        "chat.figma-upload.token-help-description": "Rendez-vous sur le site de Figma pour obtenir votre jeton API. (https://www.figma.com/developers/api)",
        "chat.figma-upload.token-placeholder": "Saisir le jeton API Figma",
        "chat.figma-upload.token-title": "Jeton API Figma",
        "chat.figma-upload.url-placeholder": "Saisir l'URL Figma",

        // ─── cloud.* ─────────────────────────────────────────────────────────────
        "cloud.plugin.name": "Déploiement",

        // ─── common.* (partagé entre les modales) ────────────────────────────────
        "common.back": "Retour",
        "common.cancel": "Annuler",
        "common.confirm": "Confirmer",
        "common.error": "Erreur",
        "common.finish": "Terminer",
        "common.next": "Suivant",
        "common.retry": "Réessayer",
        "common.success": "Réussite",

        // ─── content-manager.* ───────────────────────────────────────────────────
        "content-manager.plugin.name": "Gestionnaire de contenu",
        "content-manager.containers.list.table-headers.status": "Statut",
        "content-manager.content-types.plugin::users-permissions.user.blocked": "Bloqué",
        "content-manager.content-types.plugin::users-permissions.user.confirmed": "Confirmé",
        "content-manager.content-types.plugin::users-permissions.user.createdAt": "Créé le",
        "content-manager.content-types.plugin::users-permissions.user.createdBy": "Créé par",
        "content-manager.content-types.plugin::users-permissions.user.email": "Email",
        "content-manager.content-types.plugin::users-permissions.user.id": "ID",
        "content-manager.content-types.plugin::users-permissions.user.isActive": "Actif",
        "content-manager.content-types.plugin::users-permissions.user.lastLogin": "Dernière connexion",
        "content-manager.content-types.plugin::users-permissions.user.localizations": "Localisations",
        "content-manager.content-types.plugin::users-permissions.user.localizations.create": "Créer une localisation",
        "content-manager.content-types.plugin::users-permissions.user.localizations.delete": "Supprimer la localisation",
        "content-manager.content-types.plugin::users-permissions.user.localizations.edit": "Modifier la localisation",
        "content-manager.content-types.plugin::users-permissions.user.localizations.view": "Voir la localisation",
        "content-manager.content-types.plugin::users-permissions.user.password": "Mot de passe",
        "content-manager.content-types.plugin::users-permissions.user.role": "Rôle",
        "content-manager.content-types.plugin::users-permissions.user.updatedAt": "Mis à jour le",
        "content-manager.content-types.plugin::users-permissions.user.updatedBy": "Mis à jour par",
        "content-manager.content-types.plugin::users-permissions.user.username": "Nom d'utilisateur",

        // ─── content-type-builder.* ───────────────────────────────────────────────
        "content-type-builder.plugin.name": "Gestionnaire des types de contenu",
        "content-type-builder.attribute.null.description": "Un type pour la modélisation des données",
        "content-type-builder.contentType.draftAndPublish.description": "Permet de rédiger une version préliminaire d'une entrée avant sa publication",
        "content-type-builder.contentType.draftAndPublish.label": "Rédiger et publier",
        "content-type-builder.search.placeholder": "Rechercher",
        "content-type-builder.table.content.create-first-content-type.import-figma": "Importer depuis Figma",

        // ─── form.button.* (boutons génériques de modales) ───────────────────────
        "form.button.back": "Retour",
        "form.button.cancel": "Annuler",
        "form.button.confirm": "Confirmer",
        "form.button.finish": "Terminer",
        "form.button.next": "Suivant",

        // ─── form.attribute.* (détails dans les forms) ───────────────────────
        "form.attribute.condition.apply": "Activer ou désactiver les paramètres d'un champ en fonction de la valeur d'un autre champ de type booléen ou énumération.",
        "form.attribute.condition.no-fields": "Aucun champ trouvé",

        // ─── global.* ────────────────────────────────────────────────────────────
        "global.more.actions": "Plus d'actions",
        "global.plugins.strapi-cloud": "Déploiement Strapi",
        "global.plugins.strapi-cloud.description": "Instructions pour déployer votre projet local sur Strapi Cloud",

        // ─── i18n.* ──────────────────────────────────────────────────────────────
        "i18n.CheckboxConfirmation.Modal.title": "Activer la localisation pour ce type de contenu",

        // ─── plugin::* (plugin identifiers) ──────────────────────────────────────
        "plugin::users-permissions.user": "Utilisateur",

        // ─── review-workflows.* ──────────────────────────────────────────────────
        "review-workflows.plugin.name": "Workflows de révision",

        // ─── Settings.* ──────────────────────────────────────────────────────────
        "Settings.application.admin-seats": "Nombre d'utilisateurs administrateurs",
        "Settings.application.ai-usage": "Utilisation de l'IA",
        "Settings.application.header": "Application",
        "Settings.application.header.author": "Auteur de l'application",
        "Settings.application.header.author.email": "Email de l'auteur",
        "Settings.application.header.author.logo": "Logo de l'auteur",
        "Settings.application.header.author.logo.height": "Hauteur du logo de l'auteur",
        "Settings.application.header.author.logo.url": "URL du logo de l'auteur",
        "Settings.application.header.author.logo.width": "Largeur du logo de l'auteur",
        "Settings.application.header.author.name": "Nom de l'auteur",
        "Settings.application.header.author.website": "Site web de l'auteur",
        "Settings.application.header.description": "Description de l'application",
        "Settings.application.header.keywords": "Mots clés de l'application",
        "Settings.application.header.title": "Titre de l'application",

        // ─── upload.* (Médiathèque) ───────────────────────────────────────────────
        "upload.config.title": "Configurer l'affichage - Médiathèque",
        "upload.form.input.label.folder-location": "Emplacement du dossier",
        "upload.form.input.label.folder-location-default-button": "Emplacement par défaut",
        "upload.form.input.label.folder-location-default-button.cancel": "Annuler",
        "upload.form.input.label.folder-location-default-button.error": "Erreur lors de l'emplacement par défaut",
        "upload.form.input.label.folder-location-default-button.loading": "Emplacement par défaut en cours...",
        "upload.form.input.label.folder-location-default-button.retry": "Réessayer",
        "upload.form.input.label.folder-location-default-button.success": "Emplacement par défaut réussi",
        "upload.form.input.label.folder-location-default-description": "Emplacement par défaut pour les nouveaux dossiers.",
        "upload.form.input.label.folder-location-default-label": "Emplacement par défaut",
        "upload.form.input.label.folder-name": "Nom du dossier",
        "upload.modal.folder.create.button": "Créer",
        "upload.modal.folder.create.button.cancel": "Annuler",
        "upload.modal.folder.create.button.error": "Erreur lors de la création",
        "upload.modal.folder.create.button.loading": "Création en cours...",
        "upload.modal.folder.create.button.retry": "Réessayer",
        "upload.modal.folder.create.button.success": "Création réussie",
        "upload.modal.folder.create.description": "Créez un dossier pour organiser vos fichiers.",
        "upload.modal.folder.create.submit": "Créer",
        "upload.modal.folder.create.title": "Créer un dossier",

        // ─── users-permissions.* ─────────────────────────────────────────────────
        "users-permissions.List.button.roles": "Ajouter un nouveau rôle",

        // ─── widget.* ────────────────────────────────────────────────────────────
        "widget.deploy-now.button": "Déployer",
        "widget.deploy-now.button.cancel": "Annuler",
        "widget.deploy-now.button.error": "Erreur lors du déploiement",
        "widget.deploy-now.button.loading": "Déploiement en cours...",
        "widget.deploy-now.button.retry": "Réessayer",
        "widget.deploy-now.button.success": "Déploiement réussi",
        "widget.deploy-now.description": "Déployez votre application sur le cloud pour la rendre disponible à tous.",
        "widget.deploy-now.title": "Déployer maintenant",

        // ─── window.* ────────────────────────────────────────────────────────────
        "window.confirm.close-modal.file": "Vos données non sauvegardées seront perdues. Fermer la fenêtre ?",
        "window.confirm.close-modal.file.button": "Fermer",
        "window.confirm.close-modal.file.button.cancel": "Annuler",
        "window.confirm.close-modal.file.button.error": "Erreur lors de la fermeture",
        "window.confirm.close-modal.file.button.loading": "Fermeture en cours...",
        "window.confirm.close-modal.file.button.retry": "Réessayer",
        "window.confirm.close-modal.file.button.success": "Fermeture réussie",
        "window.confirm.close-modal.file.description": "Voulez-vous vraiment fermer la fenêtre ?",
      },
    },
  },
  bootstrap() {
    mountEnvBanner();
  },
};