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
                port: env.int('SMTP_PORT', 1025),
                auth: env('SMTP_USERNAME')
                    ? {
                        user: env('SMTP_USERNAME'),
                        // Strip accidental quotes from env_file / docker parsing
                        pass: String(env('SMTP_PASSWORD', '')).replace(/^["']|["']$/g, ''),
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