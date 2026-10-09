import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { searchContent } from "@/api/strapi/search";
import { SITE_MAP_SECTIONS } from "@/constants/siteMap";
import type { SearchResult } from "@/types/searchType";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function normalizeForMatch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function filterStaticPages(query: string): SearchResult[] {
  const needle = normalizeForMatch(query);
  if (needle.length < MIN_QUERY_LENGTH) return [];

  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const section of SITE_MAP_SECTIONS) {
    for (const link of section.links) {
      if (seen.has(link.path)) continue;
      const haystack = normalizeForMatch(`${link.label} ${link.path}`);
      if (!haystack.includes(needle)) continue;
      seen.add(link.path);
      results.push({
        type: "page",
        title: link.label,
        url: link.path,
        group: "Pages",
      });
    }
  }

  return results;
}

function groupResults(results: SearchResult[]) {
  const groups = new Map<string, SearchResult[]>();
  for (const result of results) {
    const list = groups.get(result.group) ?? [];
    list.push(result);
    groups.set(result.group, list);
  }
  return groups;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [apiResults, setApiResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const requestIdRef = useRef(0);

  const pageResults = useMemo(() => filterStaticPages(query), [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setApiResults([]);
      setIsLoading(false);
      setHasError(false);
      requestIdRef.current += 1;
    }
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LENGTH) {
      setApiResults([]);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setHasError(false);

    const timer = window.setTimeout(async () => {
      try {
        const results = await searchContent(trimmed);
        if (requestId !== requestIdRef.current) return;
        setApiResults(results);
      } catch {
        if (requestId !== requestIdRef.current) return;
        setApiResults([]);
        setHasError(true);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [query]);

  const allResults = useMemo(
    () => [...pageResults, ...apiResults],
    [pageResults, apiResults]
  );
  const grouped = useMemo(() => groupResults(allResults), [allResults]);

  function handleSelect(url: string) {
    onOpenChange(false);
    navigate(url);
  }

  const showEmpty =
    query.trim().length >= MIN_QUERY_LENGTH &&
    !isLoading &&
    allResults.length === 0 &&
    !hasError;

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rechercher"
      description="Rechercher une page, un article, un stage ou un événement"
      shouldFilter={false}
      contentClassName="sm:max-w-2xl"
    >
      <CommandInput
        placeholder="Rechercher une ressource…"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[min(28rem,70vh)]">
        {query.trim().length < MIN_QUERY_LENGTH && (
          <p className="px-3 py-6 text-center text-sm text-muted-foreground">
            Saisissez au moins {MIN_QUERY_LENGTH} caractères…
          </p>
        )}

        {isLoading && (
          <p className="px-3 py-4 text-center text-sm text-muted-foreground">
            Recherche en cours…
          </p>
        )}

        {hasError && (
          <p className="px-3 py-4 text-center text-sm text-muted-foreground">
            La recherche est temporairement indisponible.
          </p>
        )}

        {showEmpty && <CommandEmpty>Aucun résultat</CommandEmpty>}

        {[...grouped.entries()].map(([group, items]) => (
          <CommandGroup
            key={group}
            heading={group}
            className="[&_[cmdk-group-heading]]:!text-primary"
          >
            {items.map((item) => (
              <CommandItem
                key={`${item.type}-${item.url}-${item.title}`}
                value={`${item.group} ${item.title} ${item.url}`}
                onSelect={() => handleSelect(item.url)}
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate font-medium">{item.title}</span>
                  {item.excerpt ? (
                    <span className="truncate text-xs text-muted-foreground">
                      {item.excerpt}
                    </span>
                  ) : null}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
}
