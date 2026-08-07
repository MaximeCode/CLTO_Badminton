import { useEffect, useState } from "react";
import { getBandeauByPage } from "@/api/strapi/bandeau";

/**
 * Charge l'URL du bandeau Strapi pour une page (titre figé = champ `page`).
 */
export function useBandeauImage(page: string): string | undefined {
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const bandeau = await getBandeauByPage(page);
        if (!cancelled) {
          const url = bandeau?.image_bandeau?.url;
          setImageUrl(url || undefined);
        }
      } catch (error) {
        console.error(`Error loading bandeau for page "${page}":`, error);
        if (!cancelled) setImageUrl(undefined);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page]);

  return imageUrl;
}
