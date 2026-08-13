/**
 * Cache mémoire minimal pour dédupliquer les requêtes API concurrentes / répétées.
 * Pas de dépendance externe (TanStack Query seulement si insuffisant plus tard).
 */

type CacheEntry<T> = {
  value?: T;
  expiresAt: number;
  promise?: Promise<T>;
};

const store = new Map<string, CacheEntry<unknown>>();

export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs = 30_000,
): Promise<T> {
  const now = Date.now();
  const existing = store.get(key) as CacheEntry<T> | undefined;

  if (existing?.value !== undefined && existing.expiresAt > now) {
    return existing.value;
  }

  if (existing?.promise) {
    return existing.promise;
  }

  const promise = fetcher()
    .then((value) => {
      store.set(key, { value, expiresAt: Date.now() + ttlMs });
      return value;
    })
    .catch((error) => {
      store.delete(key);
      throw error;
    });

  store.set(key, { expiresAt: 0, promise });
  return promise;
}

export function clearCachedFetch(key?: string) {
  if (key) {
    store.delete(key);
    return;
  }
  store.clear();
}
