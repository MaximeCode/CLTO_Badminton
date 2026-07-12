import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { useState, useEffect } from 'react';

import { getContact } from '@/api/strapi/contact';
import type { Contact } from '@/types/contactType';
import { ContactContext } from '@/app/contexts/ContactContext';

export function Layout() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Fetch contact data
  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        // console.log('Loading contact data...');
        const data = await getContact();
        // console.log('Contact data loaded:', data);
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
      <ContactContext.Provider value={contact}>
        <ScrollToTop />
        <Header />
        <Outlet />
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
