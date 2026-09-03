const { buildAvisEmail } = require('../templates_js/form-avis');

module.exports = {
  async send(ctx) {
    const { name, email, message } = ctx.request.body;
    const trimmedMessage = String(message ?? '').trim();

    if (!trimmedMessage) {
      return ctx.badRequest('Le champ avis est obligatoire.');
    }

    const recipient = process.env.AVIS_EMAIL;
    if (!recipient) {
      console.error('[LOG] form-avis: AVIS_EMAIL non configuré');
      return ctx.internalServerError('Configuration email avis manquante');
    }

    const { html, text, visitorName } = buildAvisEmail({
      name,
      email,
      message: trimmedMessage,
    });

    const trimmedEmail = String(email ?? '').trim();
    const mailOptions = {
      to: recipient,
      from: process.env.SMTP_FROM || 'no-reply@cltobadminton.fr',
      subject: `Nouvel avis visiteur — ${visitorName}`,
      text,
      html,
    };

    if (trimmedEmail) {
      mailOptions.replyTo = trimmedEmail;
    }

    try {
      await strapi.plugins['email'].services.email.send(mailOptions);
      ctx.send({ message: 'Avis envoyé avec succès' });
      console.info('[LOG] form-avis:', { name: name || null, email: trimmedEmail || null });
    } catch (error) {
      console.error("[LOG] form-avis: Erreur lors de l'envoi de l'email", error);
      return ctx.internalServerError("Erreur lors de l'envoi de l'email");
    }
  },
};
