const { buildAvisEmail } = require('../templates_js/form-avis');

module.exports = {
  async send(ctx) {
    let { name, email, message } = ctx.request.body;

    // Type checking and max length validation
    if (name !== undefined && (typeof name !== 'string' || name.length > 255)) {
        return ctx.badRequest('Le nom est invalide ou trop long.');
    }
    if (email !== undefined && (typeof email !== 'string' || email.length > 255)) {
        return ctx.badRequest('L\'email est invalide ou trop long.');
    }
    if (typeof message !== 'string' || message.length > 5000 || message.trim() === '') {
        return ctx.badRequest('Le champ avis est obligatoire, invalide ou trop long.');
    }

    const trimmedMessage = message.trim();

    const recipient = process.env.AVIS_EMAIL;
    if (!recipient) {
      console.error('[LOG] form-avis: AVIS_EMAIL non configuré');
      return ctx.internalServerError('Configuration email avis manquante');
    }

    const cleanEmail = String(email ?? '').replace(/[\r\n]/g, '').trim();
    const cleanName = String(name ?? '').replace(/[\r\n]/g, '').trim();

    const { html, text, visitorName } = buildAvisEmail({
      name: cleanName,
      email: cleanEmail,
      message: trimmedMessage,
    });

    const mailOptions = {
      to: recipient,
      from: process.env.SMTP_FROM || 'no-reply@cltobadminton.fr',
      cc: process.env.AVIS_CC || 'no-reply@cltobadminton.fr',
      subject: `Nouvel avis visiteur — ${visitorName}`,
      text,
      html,
    };

    if (cleanEmail) {
      mailOptions.replyTo = cleanEmail;
    }

    try {
      await strapi.plugins['email'].services.email.send(mailOptions);
      ctx.send({ message: 'Avis envoyé avec succès' });
      console.info('[LOG] form-avis:', { name: cleanName || null, email: cleanEmail || null });
    } catch (error) {
      console.error("[LOG] form-avis: Erreur lors de l'envoi de l'email", error);
      return ctx.internalServerError("Erreur lors de l'envoi de l'email");
    }
  },
};
