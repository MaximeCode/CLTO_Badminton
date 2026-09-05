module.exports = ({ env }) => ({
    // Widgets admin : Dernières entrées éditées / publiées avec Créé par et Créé le
    'enhanced-homepage': {
        enabled: true,
        resolve: './src/plugins/enhanced-homepage',
    },
    'icbad-scraper': {
        enabled: true,
        resolve: './src/plugins/icbad-scraper',
    },
    // WebP à l’upload + conversion bulk médiathèque (admin : Settings → Media WebP & migration)
    'strapi-media-webp-convertor': {
        enabled: true,
        config: {
            webpQuality: 82,
            webpConversionEnabled: true,
            // PDFs du club (documents) : validation ok, pas de blocage trop strict
            pdfValidationEnabled: true,
            maxPdfSizeMb: 50,
            blockPdfActiveContent: false,
        },
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
