// backend/src/api/form-contact/controllers/form-contact.js
const { buildContactEmail } = require('../templates_js/form-contact');

module.exports = {
    async send(ctx) {
        const { name, email, phone, subject, message } = ctx.request.body;
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
