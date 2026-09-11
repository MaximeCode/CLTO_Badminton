// backend/src/api/form-contact/controllers/form-contact.js
const { buildContactEmail } = require('../templates_js/form-contact');

module.exports = {
    async send(ctx) {
        let { name, email, phone, subject, message } = ctx.request.body;

        // Type checking and max length validation
        if (typeof name !== 'string' || name.length > 255) {
            return ctx.badRequest('Le nom est invalide ou trop long.');
        }
        if (typeof email !== 'string' || email.length > 255) {
            return ctx.badRequest('L\'email est invalide ou trop long.');
        }
        if (phone !== undefined && (typeof phone !== 'string' || phone.length > 50)) {
            return ctx.badRequest('Le numéro de téléphone est invalide ou trop long.');
        }
        if (typeof subject !== 'string' || subject.length > 255) {
            return ctx.badRequest('Le sujet est invalide ou trop long.');
        }
        if (typeof message !== 'string' || message.length > 5000 || message.trim() === '') {
            return ctx.badRequest('Le message est invalide ou trop long.');
        }

        // Email and subject CRLF injection prevention
        const cleanName = name.replace(/[\r\n]/g, '');
        const cleanEmail = email.replace(/[\r\n]/g, '');
        const cleanSubject = subject.replace(/[\r\n]/g, '');

        const { html, text } = buildContactEmail({
            name: cleanName,
            email: cleanEmail,
            phone,
            subject: cleanSubject,
            message,
        });

        try {
            await strapi.plugins['email'].services.email.send({
                to: process.env.NODE_ENV === 'production' ? process.env.SMTP_TO : process.env.SMTP_MAIL_RECIPIENT,
                from: process.env.SMTP_FROM || 'no-reply@cltobadminton.fr',
                replyTo: cleanEmail,
                subject: `Nouveau message du formulaire de contact — ${cleanSubject} — ${cleanName}`,
                text,
                html,
            });
            ctx.send({ message: 'Email envoyé avec succès' });
            console.info({ name: cleanName, email: cleanEmail, phone, subject: cleanSubject });
        } catch (error) {
            console.error('[LOG] sendmail: Erreur lors de l\'envoi de l\'email', error);
            return ctx.internalServerError('Erreur lors de l\'envoi de l\'email');
        }
    },
};
