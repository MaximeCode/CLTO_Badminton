import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";

const HIGHLIGHT_MS = 4500;
const FADE_MS = 700;
const RETRY_MS = 50;
const MAX_ATTEMPTS = 40;

export function searchElementId(type: string, documentId: string) {
  return `${type}-${documentId}`;
}

export function parseSearchHash(
  hash: string
): { type: string; documentId: string } | null {
  const raw = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!raw) return null;
  const dash = raw.indexOf("-");
  if (dash <= 0) return null;
  return {
    type: raw.slice(0, dash),
    documentId: raw.slice(dash + 1),
  };
}

/** Classes CSS pour l'encadrement (+ fondu éventuel). */
export function searchHighlightClass(
  isHighlighted: boolean,
  isFading: boolean
): string | undefined {
  if (!isHighlighted) return undefined;
  return isFading
    ? "search-result-highlight search-result-highlight--fade"
    : "search-result-highlight";
}

type UseSearchHighlightOptions = {
  /** DOM prêt (données chargées, bonne page de pagination, filtre OK). */
  ready?: boolean;
};

type UseSearchHighlightResult = {
  /** id DOM de l'élément à encadrer (`stage-xxx`, …). */
  highlightedId: string | null;
  /** Terme de recherche (`?q=`), pour surligner les mots. */
  searchQuery: string;
  /** True pendant l'animation de fondu avant retrait. */
  isFading: boolean;
};

/**
 * Scroll jusqu'à l'élément ciblé par le hash (`#stage-xxx`) et expose
 * l'id + la query pour un surlignage géré en React (className / <mark>).
 */
export function useSearchHighlight({
  ready = true,
}: UseSearchHighlightOptions = {}): UseSearchHighlightResult {
  const { hash, search } = useLocation();
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const handledRef = useRef<string | null>(null);

  const searchQuery = useMemo(() => {
    const params = new URLSearchParams(search);
    return (params.get("q") ?? "").trim();
  }, [search]);

  useEffect(() => {
    handledRef.current = null;
    setHighlightedId(null);
    setIsFading(false);
  }, [hash, search]);

  useEffect(() => {
    if (!ready || !hash) return;

    const parsed = parseSearchHash(hash);
    if (!parsed) return;

    const elementId = searchElementId(parsed.type, parsed.documentId);
    const handleKey = `${hash}|${search}|${elementId}`;
    if (handledRef.current === handleKey) return;

    let attempts = 0;
    let retryTimer = 0;
    let holdTimer = 0;
    let fadeTimer = 0;

    const tryScroll = () => {
      const el = document.getElementById(elementId);
      if (!el) {
        if (attempts < MAX_ATTEMPTS) {
          attempts += 1;
          retryTimer = window.setTimeout(tryScroll, RETRY_MS);
        }
        return;
      }

      handledRef.current = handleKey;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setIsFading(false);
      setHighlightedId(elementId);

      holdTimer = window.setTimeout(() => {
        setIsFading(true);
        fadeTimer = window.setTimeout(() => {
          setHighlightedId(null);
          setIsFading(false);
        }, FADE_MS);
      }, HIGHLIGHT_MS);
    };

    retryTimer = window.setTimeout(tryScroll, RETRY_MS);

    return () => {
      window.clearTimeout(retryTimer);
      window.clearTimeout(holdTimer);
      window.clearTimeout(fadeTimer);
    };
  }, [hash, search, ready]);

  return { highlightedId, searchQuery, isFading };
}
