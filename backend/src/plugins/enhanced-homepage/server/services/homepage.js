'use strict';

const { contentTypes } = require('@strapi/utils');

const MAX_DOCUMENTS = 4;

/**
 * Homepage service aligned with content-manager's native one, with:
 * - createdAt / createdBy
 * - single-type titles = content-type displayName (not mainField / id)
 */
module.exports = ({ strapi }) => {
  const metadataService = strapi.plugin('content-manager').service('document-metadata');
  const permissionService = strapi.admin.services.permission;
  const permissionCheckerService = strapi.plugin('content-manager').service('permission-checker');

  const getPermissionChecker = (uid) =>
    permissionCheckerService.create({
      userAbility: strapi.requestContext.get()?.state.userAbility,
      model: uid,
    });

  const getConfiguration = async (contentTypeUids) => {
    const coreStore = strapi.db.query('strapi::core-store');
    const rawConfigurations = await coreStore.findMany({
      where: {
        key: {
          $in: contentTypeUids.map(
            (contentType) =>
              `plugin_content_manager_configuration_content_types::${contentType}`,
          ),
        },
      },
    });

    return rawConfigurations.map((rawConfiguration) => JSON.parse(rawConfiguration.value));
  };

  const getPermittedContentTypes = async () => {
    const userId = strapi.requestContext.get()?.state?.user?.id;
    if (!userId) return [];

    const readPermissions = await permissionService.findMany({
      where: {
        role: { users: { id: userId } },
        action: 'plugin::content-manager.explorer.read',
      },
    });

    return readPermissions.map((permission) => permission.subject).filter(Boolean);
  };

  const getContentTypesMeta = (allowedContentTypeUids, configurations) => {
    return allowedContentTypeUids.map((uid) => {
      const configuration = configurations.find((config) => config.uid === uid);
      const contentType = strapi.contentType(uid);
      const fields = ['documentId', 'updatedAt', 'createdAt'];

      const hasDraftAndPublish = contentTypes.hasDraftAndPublish(contentType);
      if (hasDraftAndPublish) {
        fields.push('publishedAt');
      }

      const mainField = configuration?.settings?.mainField;
      // Single types use displayName as title — no need to fetch mainField
      if (contentType.kind !== 'singleType' && mainField && mainField !== 'documentId') {
        fields.push(mainField);
      }

      const isLocalized = contentType.pluginOptions?.i18n?.localized;
      if (isLocalized) {
        fields.push('locale');
      }

      return {
        fields,
        mainField: mainField || 'documentId',
        contentType,
        hasDraftAndPublish,
        uid,
      };
    });
  };

  const formatUserName = (user) => {
    if (!user) return null;
    const fullName = [user.firstname, user.lastname].filter(Boolean).join(' ').trim();
    return fullName || user.username || user.email || null;
  };

  const resolveTitle = (document, meta) => {
    // Single types have one entry: show the content-type label, not mainField (phone, id, …)
    if (meta.contentType.kind === 'singleType') {
      return meta.contentType.info.displayName;
    }

    const mainField = meta.mainField;
    if (!mainField || mainField === 'documentId' || mainField === 'id') {
      return document.documentId;
    }

    const value = document[mainField];
    if (value == null || value === '') {
      return document.documentId;
    }

    return String(value);
  };

  const toIso = (value) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  };

  const formatDocuments = (documents, meta) => {
    return documents.map((document) => ({
      documentId: document.documentId,
      locale: document.locale ?? null,
      updatedAt: toIso(document.updatedAt),
      createdAt: toIso(document.createdAt),
      createdBy: formatUserName(document.createdBy),
      updatedBy: formatUserName(document.updatedBy),
      title: resolveTitle(document, meta),
      publishedAt: meta.hasDraftAndPublish ? toIso(document.publishedAt) : null,
      contentTypeUid: meta.uid,
      contentTypeDisplayName: meta.contentType.info.displayName,
      kind: meta.contentType.kind,
    }));
  };

  const addStatusToDocuments = async (documents) => {
    return Promise.all(
      documents.map(async (recentDocument) => {
        const hasDraftAndPublish = contentTypes.hasDraftAndPublish(
          strapi.contentType(recentDocument.contentTypeUid),
        );

        const { availableStatus } = await metadataService.getMetadata(
          recentDocument.contentTypeUid,
          recentDocument,
          {
            availableStatus: hasDraftAndPublish,
            availableLocales: false,
          },
        );

        const status = metadataService.getStatus(recentDocument, availableStatus);

        return {
          ...recentDocument,
          status: hasDraftAndPublish ? status : undefined,
        };
      }),
    );
  };

  const queryLastDocuments = async (additionalQueryParams = {}, draftAndPublishOnly = false) => {
    const permittedContentTypes = await getPermittedContentTypes();
    const allowedContentTypeUids = draftAndPublishOnly
      ? permittedContentTypes.filter((uid) =>
        contentTypes.hasDraftAndPublish(strapi.contentType(uid)),
      )
      : permittedContentTypes;

    const configurations = await getConfiguration(allowedContentTypeUids);
    const contentTypesMeta = getContentTypesMeta(allowedContentTypeUids, configurations);

    const recentDocuments = await Promise.all(
      contentTypesMeta.map(async (meta) => {
        const permissionQuery = await getPermissionChecker(meta.uid).sanitizedQuery.read({
          limit: MAX_DOCUMENTS,
          fields: meta.fields,
          ...additionalQueryParams,
          locale: '*',
        });

        // Keep creator fields regardless of sanitized populate shape (array | object | undefined)
        const existingPopulate = permissionQuery.populate;
        let populate;
        if (Array.isArray(existingPopulate)) {
          populate = [...new Set([...existingPopulate, 'createdBy', 'updatedBy'])];
        } else if (existingPopulate && typeof existingPopulate === 'object') {
          populate = { ...existingPopulate, createdBy: true, updatedBy: true };
        } else {
          populate = { createdBy: true, updatedBy: true };
        }

        const docs = await strapi.documents(meta.uid).findMany({
          ...permissionQuery,
          populate,
        });
        return formatDocuments(docs, meta);
      }),
    );

    const sortKey = additionalQueryParams.sort;

    return recentDocuments
      .flat()
      .sort((a, b) => {
        switch (sortKey) {
          case 'publishedAt:desc':
            if (!a.publishedAt || !b.publishedAt) return 0;
            return b.publishedAt.localeCompare(a.publishedAt);
          case 'updatedAt:desc':
            if (!a.updatedAt || !b.updatedAt) return 0;
            return b.updatedAt.localeCompare(a.updatedAt);
          default:
            return 0;
        }
      })
      .slice(0, MAX_DOCUMENTS);
  };

  return {
    async getRecentlyPublishedDocuments() {
      const docs = await queryLastDocuments(
        { sort: 'publishedAt:desc', status: 'published' },
        true,
      );
      return addStatusToDocuments(docs);
    },

    async getRecentlyUpdatedDocuments() {
      const docs = await queryLastDocuments({ sort: 'updatedAt:desc' });
      return addStatusToDocuments(docs);
    },
  };
};
