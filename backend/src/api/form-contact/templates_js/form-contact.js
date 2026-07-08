const { BRAND, formatSubject, buildPlainText } = require("./form-contact-utils");

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildFieldRow(label, value, { isLink = false, href = "" } = {}) {
  const safeValue = escapeHtml(value || "—");
  const valueHtml =
    isLink && href
      ? `<a href="${escapeHtml(href)}" style="color:${BRAND.blue};text-decoration:none;">${safeValue}</a>`
      : safeValue;

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid ${BRAND.border};vertical-align:top;width:38%;">
        <span style="font-size:13px;font-weight:600;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">
          ${escapeHtml(label)}
        </span>
      </td>
      <td style="padding:12px 0 12px 16px;border-bottom:1px solid ${BRAND.border};vertical-align:top;color:${BRAND.foreground};font-size:16px;line-height:1.5;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

function buildContactEmail({ name, email, phone, subject, message }) {
  const subjectLabel = formatSubject(subject);
  const safeMessage = escapeHtml(message || "Aucun message");

  const text = buildPlainText({
    name,
    email,
    phone,
    subject: subjectLabel,
    message,
  });

  const html = `
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nouveau message — CLTO Badminton</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.background};font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:${BRAND.foreground};">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.background};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background-color:${BRAND.white};border-radius:16px;overflow:hidden;border:1px solid ${BRAND.border};">
            <tr>
              <td style="background:${BRAND.headerGradient};padding:28px 32px;text-align:center;">
                <p style="margin:0 0 8px;font-family:Arial Black,Arial,sans-serif;font-size:28px;line-height:1.2;color:${BRAND.white};letter-spacing:0.08em;text-transform:uppercase;">
                  CLTO Badminton
                </p>
                <p style="margin:0;font-size:15px;line-height:1.5;color:rgba(255,255,255,0.88);">
                  Nouveau message du formulaire de contact
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:${BRAND.foreground};">
                  Bonjour,<br />
                  Un visiteur vient de remplir le formulaire de contact sur le site CLTO Badminton.
                </p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:24px;">
                  ${buildFieldRow("Nom", name)}
                  ${buildFieldRow("Email", email, { isLink: true, href: `mailto:${email}` })}
                  ${buildFieldRow("Téléphone", phone, { isLink: Boolean(phone), href: phone ? `tel:${phone}` : "" })}
                  ${buildFieldRow("Sujet", subjectLabel)}
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BRAND.background};border-radius:12px;">
                  <tr>
                    <td style="padding:20px 22px;">
                      <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:${BRAND.muted};text-transform:uppercase;letter-spacing:0.04em;">
                        Message
                      </p>
                      <p style="margin:0;font-size:16px;line-height:1.6;color:${BRAND.foreground};white-space:pre-wrap;">
                        ${safeMessage}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 32px 28px;">
                <table role="presentation" cellspacing="0" cellpadding="0" align="center">
                  <tr>
                    <td style="border-radius:999px;background-color:${BRAND.blue};">
                      <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: ${subjectLabel} — ${name}`)}"
                         style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:${BRAND.white};text-decoration:none;">
                        Répondre à ${escapeHtml(name)}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px;background-color:${BRAND.background};text-align:center;border-top:1px solid ${BRAND.border};">
                <p style="margin:0;font-size:12px;line-height:1.5;color:${BRAND.muted};">
                  Message envoyé depuis cltobadminton.fr
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { html, text, name, subjectLabel };
}

module.exports = {
  buildContactEmail,
};
