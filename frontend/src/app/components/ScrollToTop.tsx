import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Laisser useSearchHighlight gérer le scroll vers l'ancre.
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
