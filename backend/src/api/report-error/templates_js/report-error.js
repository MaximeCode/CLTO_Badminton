'use strict';

const { BRAND } = require('../../form-contact/templates_js/form-contact-utils');

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(value, max) {
  const text = String(value ?? '');
  if (text.length <= max) return text;
  return `${text.slice(0, max)}…`;
}

function buildPlainText({ url, message, stack, userAgent, occurredAt }) {
  return [
    'Erreur site — CLTO Badminton',
    '',
    'Une erreur JavaScript est survenue sur le site.',
    '',
    `Date : ${occurredAt || '—'}`,
    `URL : ${url || '—'}`,
    `Message : ${message || '—'}`,
    `Navigateur : ${userAgent || '—'}`,
    '',
    'Stack :',
    stack || 'Non disponible',
  ].join('\n');
}

function buildErrorEmail({ url, message, stack, userAgent, occurredAt }) {
  const safeUrl = truncate(url, 500);
  const safeMessage = truncate(message, 500);
  const safeStack = truncate(stack, 4000);
  const safeUa = truncate(userAgent, 400);
  const safeDate = truncate(occurredAt, 80);

  const text = buildPlainText({
    url: safeUrl,
    message: safeMessage,
    stack: safeStack,
    userAgent: safeUa,
    occurredAt: safeDate,
  });

  const html = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Erreur site — CLTO Badminton</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.background};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.foreground};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
            <tr>
              <td style="background:${BRAND.headerGradient};padding:28px 32px;text-align:center;">
                <p style="margin:0;font-size:22px;font-weight:700;color:${BRAND.white};letter-spacing:0.04em;">
                  Erreur sur le site
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.5;color:${BRAND.foreground};">
                  Une erreur JavaScript est survenue sur le site en production. Les visiteurs voient la page de maintenance.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;font-weight:600;width:30%;">Date</td>
                    <td style="padding:10px 0 10px 12px;border-bottom:1px solid ${BRAND.border};font-size:15px;">${escapeHtml(safeDate || '—')}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;font-weight:600;">URL</td>
                    <td style="padding:10px 0 10px 12px;border-bottom:1px solid ${BRAND.border};font-size:15px;word-break:break-all;">${escapeHtml(safeUrl || '—')}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;font-weight:600;">Message</td>
                    <td style="padding:10px 0 10px 12px;border-bottom:1px solid ${BRAND.border};font-size:15px;font-weight:600;color:#b91c1c;">${escapeHtml(safeMessage || '—')}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.muted};font-size:13px;font-weight:600;">Navigateur</td>
                    <td style="padding:10px 0 10px 12px;border-bottom:1px solid ${BRAND.border};font-size:13px;word-break:break-all;">${escapeHtml(safeUa || '—')}</td>
                  </tr>
                </table>
                <p style="margin:24px 0 8px;font-size:13px;font-weight:600;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">Stack</p>
                <pre style="margin:0;padding:16px;background:${BRAND.background};border:1px solid ${BRAND.border};border-radius:8px;font-size:12px;line-height:1.45;white-space:pre-wrap;word-break:break-word;color:${BRAND.foreground};">${escapeHtml(safeStack || 'Non disponible')}</pre>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();

  return { html, text };
}

module.exports = { buildErrorEmail };
