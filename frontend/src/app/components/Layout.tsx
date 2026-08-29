import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { EnvBanner } from './EnvBanner';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Suspense, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { getContact } from '@/api/strapi/contact';
import type { Contact } from '@/types/contactType';
import { ContactContext } from '@/app/contexts/ContactContext';
import { hideLcpPrerender } from '@/utils/hideLcpPrerender';
import { readBootstrapJson } from '@/utils/buildBootstrap';

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-3 text-primary" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-secondary" aria-hidden />
      <span>Chargement…</span>
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const [contact, setContact] = useState<Contact | null>(
    () => readBootstrapJson<Contact>('contact-bootstrap'),
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (location.pathname !== '/') {
      hideLcpPrerender();
    }
  }, [location.pathname]);

  useEffect(() => {
    let cancelled = false;
    const hasBootstrap = !!readBootstrapJson<Contact>('contact-bootstrap');

    async function loadData() {
      try {
        if (!cancelled) setLoadError(null);
        const data = await getContact();
        if (!cancelled) setContact(data);
      } catch (error) {
        if (cancelled || hasBootstrap) return;
        console.error('Error loading contact data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les coordonnées.',
        );
      }
    }

    if (hasBootstrap) {
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => loadData(), { timeout: 5000 });
        return () => {
          cancelled = true;
          window.cancelIdleCallback(id);
        };
      }
      const timer = globalThis.setTimeout(loadData, 3000);
      return () => {
        cancelled = true;
        globalThis.clearTimeout(timer);
      };
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <ContactContext.Provider value={contact}>
        <ScrollToTop />
        <div className="sticky top-0 z-50">
          <EnvBanner />
          <Header />
        </div>
        <main id="main-content">
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        {loadError && (
          <div className="p-4 mb-4 text-sm text-red-500 bg-red-100" role="alert">
            <span className="font-medium">Erreur lors du chargement des coordonnées:</span> {loadError}
          </div>
        )}
      </ContactContext.Provider>
    </div>
  );
}
