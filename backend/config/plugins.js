module.exports = ({ env }) => ({
    'icbad-scraper': {
        enabled: true,
        resolve: './src/plugins/icbad-scraper',
    },
    upload: {
        config: {
            // Garantit la génération des variantes Sharp (srcSet côté front)
            breakpoints: {
                xlarge: 1920,
                large: 1000,
                medium: 750,
                small: 500,
                thumbnail: 245,
            },
        },
    },
    email: {
        config: {
            provider: 'nodemailer',
            providerOptions: {
                host: env('SMTP_HOST', 'localhost'),
                port: env.int('SMTP_PORT', 1025),
                auth: env('SMTP_USERNAME')
                    ? {
                        user: env('SMTP_USERNAME'),
                        pass: env('SMTP_PASSWORD'),
                    }
                    : undefined,
                ignoreTLS: env.bool('SMTP_IGNORE_TLS', env('SMTP_HOST', 'localhost') === 'localhost'),
                secure: env.bool('SMTP_SECURE', false),
            },
            settings: {
                defaultFrom: env('SMTP_FROM', 'no-reply@cltobadminton.fr'),
                defaultReplyTo: 'contact@cltobadminton.fr',
            },
        },
    },
});
