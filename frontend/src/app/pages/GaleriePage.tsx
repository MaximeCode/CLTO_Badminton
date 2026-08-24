import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { PageHero } from "../components/PageHero"
import { Seo } from "../components/Seo";
import { useBandeauImage } from '@/hooks/useBandeauImage';
import { BANDEAU_PAGES } from '@/constants/bandeauPages';
import { Section } from "../components/Section";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { Galerie } from "@/types/galerieType";
import type { Categorie } from "@/types/categoriesType";
import { getFlickrPlayerSrc, getGalerie } from "@/api/strapi/galerie";
import { getGalerieCategories } from "@/api/strapi/galerie-categories";
import { stringifyDate } from "@/utils/formatDate";

export function GaleriePage() {
  const bandeauImage = useBandeauImage(BANDEAU_PAGES.GALERIE);

  const [albums, setAlbums] = useState<Galerie[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Galerie | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | "all">("all");

  useEffect(() => {
    async function loadData() {
      try {
        setLoadError(null);
        setLoading(true);
        setAlbums(await getGalerie());
        setCategories(await getGalerieCategories());
      } catch (error) {
        console.error("Error loading galerie:", error);
        setLoadError(
          error instanceof Error ? error.message : "Impossible de charger la galerie."
        );
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!selectedAlbum) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedAlbum(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedAlbum]);

  const playerSrc = selectedAlbum ? getFlickrPlayerSrc(selectedAlbum.url_album) : null;

  const filteredAlbums =
    selectedCategoryId === "all"
      ? albums
      : albums.filter((album) => album.galerie_categorie?.id === selectedCategoryId);

  return (
    <>
      <Seo
        title="Galerie"
        description="Galerie photos du CLTO Badminton Orléans : albums des événements du club."
      />
      <PageHero
        title="GALERIE"
        subtitle="Les albums photos des événements du CLTO Badminton"
        image={bandeauImage}
      />

      <Section className="bg-white">
        {loading && (
          <p className="text-center text-gray-500">Chargement des albums…</p>
        )}

        {loadError && (
          <p className="text-center text-red-600">{loadError}</p>
        )}

        {!loading && !loadError && albums.length === 0 && (
          <p className="text-center text-gray-500">Aucun album pour le moment.</p>
        )}

        {!loading && !loadError && categories.length > 0 && (
          <>
            <h2 className="font-primary text-2xl md:text-3xl text-primary mb-4">Filtrer par catégorie :</h2>
            <nav
              aria-label="Catégories de la galerie"
              className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3"
            >
              <button
                type="button"
                onClick={() => setSelectedCategoryId("all")}
                aria-pressed={selectedCategoryId === "all"}
                className={[
                  "rounded-md border-2 px-4 py-2 font-primary text-md transition-all duration-200 sm:px-2 sm:text-lg",
                  selectedCategoryId === "all"
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-primary/15 bg-white text-primary hover:border-secondary hover:text-secondary",
                ].join(" ")}
              >
                Toutes
              </button>
              {categories.map((category) => {
                const isActive = selectedCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategoryId(category.id)}
                    aria-pressed={isActive}
                    className={[
                      "rounded-md border-2 px-4 py-2 font-primary text-md transition-all duration-200 sm:px-2 sm:text-lg",
                      isActive
                        ? "border-secondary bg-secondary text-white shadow-sm"
                        : "border-primary/15 bg-white text-primary hover:border-secondary hover:text-secondary",
                    ].join(" ")}
                  >
                    {category.libelle}
                  </button>
                );
              })}
            </nav>
          </>
        )}

        {!loading && !loadError && albums.length > 0 && filteredAlbums.length === 0 && (
          <p className="text-center text-gray-500">Aucun album dans cette catégorie.</p>
        )}

        {!loading && !loadError && filteredAlbums.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAlbums.map((album, index) => (
              <motion.button
                key={album.id}
                type="button"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => setSelectedAlbum(album)}
                className="group text-left overflow-hidden rounded-xl border border-primary/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-secondary/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={album.vignette.url}
                    alt={album.titre}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <time
                    dateTime={album.date}
                    className="text-sm text-secondary font-medium"
                  >
                    {stringifyDate(album.date, "numeric", "long", "numeric")}
                  </time>
                  <h3 className="mt-1 font-primary text-xl md:text-2xl text-primary group-hover:text-secondary transition-colors">
                    {album.titre}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 font-medium">Voir l&apos;album</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </Section>

      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={selectedAlbum.titre}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/70"
              aria-label="Fermer l'album"
              onClick={() => setSelectedAlbum(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-primary/10 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <h3 className="font-primary text-xl sm:text-2xl text-primary truncate">
                    {selectedAlbum.titre}
                  </h3>
                  <time
                    dateTime={selectedAlbum.date}
                    className="mt-0.5 block text-sm text-secondary"
                  >
                    {stringifyDate(selectedAlbum.date, "numeric", "long", "numeric")}
                  </time>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAlbum(null)}
                  className="shrink-0 rounded-md p-2 text-primary transition-colors hover:bg-primary/10"
                  aria-label="Fermer"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="bg-gray-100">
                {playerSrc ? (
                  <iframe
                    src={playerSrc}
                    title={selectedAlbum.titre}
                    className="h-[50vh] w-full sm:h-[60vh] md:h-170"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="px-6 py-16 text-center">
                    <p className="text-gray-600 mb-4">
                      Impossible d&apos;afficher cet album Flickr (URL invalide).
                    </p>
                    <a
                      href={selectedAlbum.url_album}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary underline hover:opacity-80"
                    >
                      Ouvrir le lien
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
