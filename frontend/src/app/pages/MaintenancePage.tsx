import { useEffect, useRef } from 'react';
import { Link, isRouteErrorResponse, useRouteError } from 'react-router';
import { motion } from 'motion/react';
import { Home, Mail, Wrench } from 'lucide-react';
import { Seo } from '../components/Seo';
import { PostAPI } from '@/api/Client';
import { getPublicSiteEnv } from '../components/EnvBanner';

function extractErrorDetails(error: unknown): {
  message: string;
  stack: string;
} {
  if (isRouteErrorResponse(error)) {
    return {
      message: `${error.status} ${error.statusText}${error.data ? ` — ${String(error.data)}` : ''}`,
      stack: '',
    };
  }
  if (error instanceof Error) {
    return {
      message: error.message || error.name || 'Erreur inconnue',
      stack: error.stack || '',
    };
  }
  return {
    message: String(error ?? 'Erreur inconnue'),
    stack: '',
  };
}

function reportKey(url: string, message: string): string {
  return `clto.errorReported:${url}|${message}`;
}

async function reportProductionError(details: {
  url: string;
  message: string;
  stack: string;
}) {
  // Uniquement en production publique (hors local / preprod)
  if (getPublicSiteEnv() !== null) return;

  const key = reportKey(details.url, details.message);
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch {
    // sessionStorage indisponible : on envoie quand même
  }

  try {
    await PostAPI('/api/report-error', {
      url: details.url,
      message: details.message,
      stack: details.stack,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      occurredAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Impossible de signaler l’erreur :', err);
  }
}

export function MaintenancePage() {
  const error = useRouteError();
  const reported = useRef(false);
  const { message, stack } = extractErrorDetails(error);

  useEffect(() => {
    if (reported.current) return;
    reported.current = true;
    void reportProductionError({
      url: typeof window !== 'undefined' ? window.location.href : '',
      message,
      stack,
    });
  }, [message, stack]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-linear-to-br from-primary to-footer px-4 py-10 sm:px-6 sm:py-14">
      <Seo
        title="Maintenance"
        description="Cette page est temporairement indisponible. Le CLTO Badminton Orléans revient très bientôt."
        noindex
      />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-md text-center sm:max-w-lg"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 220 }}
          className="mb-5 flex justify-center sm:mb-7"
        >
          <div className="rounded-full bg-white/10 p-3.5 sm:p-5">
            <Wrench className="text-secondary size-8 sm:size-12" aria-hidden />
          </div>
        </motion.div>

        <h1
          className="mb-3 text-[1.65rem] leading-snug text-white tracking-wide sm:mb-4 sm:text-4xl sm:tracking-wider md:text-5xl"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Oups… Petit problème technique
        </h1>

        <p className="mx-auto mb-7 max-w-sm text-base leading-relaxed text-white/80 sm:mb-8 sm:max-w-md sm:text-lg">
          Nous travaillons à son rétablissement.
          <br className="hidden sm:block" /> Merci de votre patience.
          <span className="mt-2 block text-sm text-white/70 sm:mt-3 sm:text-base">
            Si le problème persiste, n&apos;hésitez pas à nous écrire.
          </span>
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3.5 text-white transition-all duration-200 hover:bg-secondary-accent group sm:px-7 sm:py-3.5"
          >
            <Home size={18} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span>Retour à l&apos;accueil</span>
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/35 bg-white/5 px-5 py-3.5 text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 group sm:px-7 sm:py-3.5"
          >
            <Mail size={18} className="shrink-0 transition-transform group-hover:-translate-x-0.5" />
            <span>Contactez-nous</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
