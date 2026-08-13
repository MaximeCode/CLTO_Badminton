import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { Suspense, useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

import { getContact } from '@/api/strapi/contact';
import type { Contact } from '@/types/contactType';
import { ContactContext } from '@/app/contexts/ContactContext';

function RouteFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-3 text-primary" role="status">
      <Loader2 className="h-8 w-8 animate-spin text-secondary" aria-hidden />
      <span>Chargement…</span>
    </div>
  );
}

export function Layout() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        const data = await getContact();
        setContact(data);
      } catch (error) {
        console.error('Error loading contact data:', error);
        setLoadError(
          error instanceof Error ? error.message : 'Impossible de charger les coordonnées.',
        );
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <ContactContext.Provider value={contact}>
        <ScrollToTop />
        <Header />
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
