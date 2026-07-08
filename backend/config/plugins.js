module.exports = ({ env }) => ({
    'icbad-scraper': {
        enabled: true,
        resolve: './src/plugins/icbad-scraper',
    },
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'localhost'),
                port: env('SMTP_PORT', 1025),
                ignoreTLS: true,
                secure: false,
            },
            settings: {
                defaultFrom: 'no-reply@cltobadminton.fr',
                defaultReplyTo: 'no-reply@cltobadminton.fr',
            },
        },
    },
});