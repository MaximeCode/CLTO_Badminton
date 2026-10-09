'use strict';

const { buildErrorEmail } = require('../templates_js/report-error');

function asTrimmedString(value, max) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  return text.length > max ? text.slice(0, max) : text;
}

module.exports = {
  async send(ctx) {
    const recipient = process.env.ERROR_EMAIL;
    if (!recipient) {
      console.error('[LOG] report-error: ERROR_EMAIL non configuré');
      return ctx.internalServerError('Configuration email erreur manquante');
    }

    const body = ctx.request.body || {};
    const url = asTrimmedString(body.url, 500);
    const message = asTrimmedString(body.message, 500);
    const stack = asTrimmedString(body.stack, 4000);
    const userAgent = asTrimmedString(body.userAgent, 400);
    const occurredAt = asTrimmedString(body.occurredAt, 80);

    if (!message && !url) {
      return ctx.badRequest('Données d’erreur manquantes.');
    }

    const { html, text } = buildErrorEmail({
      url,
      message,
      stack,
      userAgent,
      occurredAt: occurredAt || new Date().toISOString(),
    });

    const pathHint = url ? url.replace(/^https?:\/\/[^/]+/, '') || '/' : 'page inconnue';

    try {
      await strapi.plugins['email'].services.email.send({
        to: recipient,
        from: process.env.SMTP_FROM || 'no-reply@cltobadminton.fr',
        subject: `Erreur site CLTO — ${message || pathHint}`,
        text,
        html,
      });
      ctx.send({ message: 'Erreur signalée' });
      console.info('[LOG] report-error:', { url: url || null, message: message || null });
    } catch (error) {
      console.error("[LOG] report-error: Erreur lors de l'envoi de l'email", error);
      return ctx.internalServerError("Erreur lors de l'envoi de l'email");
    }
  },
};
