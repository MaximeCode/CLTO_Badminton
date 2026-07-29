module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),

    sessions: {
      // Durée du jeton d'accès : 8 heures (C CELUI LA QUI FAUT CHANGER !!!)
      accessTokenLifespan: 8 * 60 * 60,

      // Durée maximale du refresh token : 30 jours
      maxRefreshTokenLifespan: 30 * 24 * 60 * 60,

      // Suppression du refresh token après 7 jours d'inactivité
      idleRefreshTokenLifespan: 7 * 24 * 60 * 60,

      // Durée maximale absolue d'une session : 30 jours
      maxSessionLifespan: 30 * 24 * 60 * 60,

      // Déconnexion après 8 heures d'inactivité
      idleSessionLifespan: 8 * 60 * 60,
    },
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  url: "/admin",
});
