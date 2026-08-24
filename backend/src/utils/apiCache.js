'use strict';

/**
 * Cache mémoire TTL pour réponses API publiques (réduit la charge DB).
 */
const store = new Map();

function getCached(key, ttlMs, fetcher) {
  const now = Date.now();
  const entry = store.get(key);

  if (entry?.value !== undefined && entry.expiresAt > now) {
    return Promise.resolve(entry.value);
  }

  if (entry?.promise) {
    return entry.promise;
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

function clearApiCache(key) {
  if (key) {
    store.delete(key);
    return;
  }
  store.clear();
}

module.exports = { getCached, clearApiCache };
