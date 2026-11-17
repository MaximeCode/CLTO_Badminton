// backend/src/api/form-contact/controllers/form-contact.js
'use strict';

const { buildContactEmail } = require('../templates_js/form-contact');
const { ALLOWED_SUBJECTS } = require('../templates_js/form-contact-utils');

const MIN_SUBMIT_DELAY_MS = 3000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function fakeSuccess(ctx) {
  return ctx.send({ message: 'Email envoyé avec succès' });
}

function validatePayload(body) {
  const name = asString(body?.name);
  const email = asString(body?.email);
  const phone = asString(body?.phone);
  const subject = asString(body?.subject);
  const message = asString(body?.message);

  if (name.length < 2 || name.length > 120) {
    return { ok: false, error: 'Nom invalide.' };
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: 'Email invalide.' };
  }
  if (phone.length > 40) {
    return { ok: false, error: 'Téléphone invalide.' };
  }
  if (!ALLOWED_SUBJECTS.includes(subject)) {
    return { ok: false, error: 'Sujet invalide.' };
  }
  if (message.length < 10 || message.length > 5000) {
    return { ok: false, error: 'Message invalide.' };
  }

  return { ok: true, data: { name, email, phone, subject, message } };
}

function isBotSubmission(body) {
  const website = asString(body?.website);
  if (website.length > 0) {
    return { bot: true, reason: 'honeypot' };
  }

  const startedAt = Number(body?.formStartedAt);
  if (!Number.isFinite(startedAt)) {
    return { bot: true, reason: 'missing-started-at' };
  }

  const now = Date.now();
  const elapsed = now - startedAt;

  if (elapsed < MIN_SUBMIT_DELAY_MS) {
    return { bot: true, reason: 'too-fast' };
  }
  if (elapsed > MAX_FORM_AGE_MS || startedAt > now + 60_000) {
    return { bot: true, reason: 'invalid-started-at' };
  }

  return { bot: false };
}

module.exports = {
  async send(ctx) {
    const body = ctx.request.body || {};

    const botCheck = isBotSubmission(body);
    if (botCheck.bot) {
      strapi.log.warn(`[form-contact] bot blocked (${botCheck.reason})`);
      return fakeSuccess(ctx);
    }

    const validation = validatePayload(body);
    if (!validation.ok) {
      return ctx.badRequest(validation.error);
    }

    const { name, email, phone, subject, message } = validation.data;
    const { html, text } = buildContactEmail({
      name,
      email,
      phone,
      subject,
      message,
    });

    try {
      await strapi.plugins['email'].services.email.send({
        to: process.env.NODE_ENV === 'production' ? process.env.SMTP_TO : process.env.SMTP_MAIL_RECIPIENT,
        from: process.env.SMTP_FROM || 'no-reply@cltobadminton.fr',
        replyTo: email,
        subject: `Nouveau message du formulaire de contact — ${subject} — ${name}`,
        text,
        html,
      });
      ctx.send({ message: 'Email envoyé avec succès' });
    } catch (error) {
      console.error('[LOG] sendmail: Erreur lors de l\'envoi de l\'email', error);
      return ctx.internalServerError('Erreur lors de l\'envoi de l\'email');
    }
  },
};
