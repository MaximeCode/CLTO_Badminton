export const API_URL = import.meta.env.VITE_STRAPI_URL as string;
export const API_GESTION_URL = import.meta.env.VITE_API_GESTION_URL as string;

export async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API");
  }

  return data;
}

/**
 * Normalise la réponse gestion (tableau ou nombre brut) en `{ data: ... }`.
 */
function asGestionPayload(payload: unknown): { data: unknown } {
  if (typeof payload === "number" && Number.isFinite(payload)) {
    return { data: payload };
  }
  if (typeof payload === "string" && payload !== "" && Number.isFinite(Number(payload))) {
    return { data: Number(payload) };
  }
  if (Array.isArray(payload)) {
    return { data: payload };
  }
  if (payload && typeof payload === "object" && "data" in payload) {
    const inner = (payload as { data: unknown }).data;
    if (typeof inner === "number" && Number.isFinite(inner)) {
      return { data: inner };
    }
    if (Array.isArray(inner)) {
      return { data: inner };
    }
  }
  throw new Error("Réponse API gestion invalide (tableau ou nombre attendu).");
}

// PP / PROD - nécessite CORS autorisé pour l'origine du front
export async function fetchAPIGestion(endpoint: string) {
  const response = await fetch(`${API_GESTION_URL}${endpoint}`);
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `API gestion a renvoyé du non-JSON (${response.status}). Vérifiez l'URL ou le CORS.`
    );
  }

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message || "Erreur API gestion");
  }

  return asGestionPayload(payload);
}

// DEV - fichiers dans frontend/public/data/<endpoint>.json
/// 1. tester la route dans le navigateur
/// 2. créer frontend/public/data/<endpoint>.json et y coller les données
export async function fetchFakeAPIGestion(endpoint: string) {
  const response = await fetch(`/data/${endpoint}.json`);

  if (!response.ok) {
    throw new Error(
      `Fichier mock introuvable : /data/${endpoint}.json (placez-le dans frontend/public/data/)`
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json") && !contentType.includes("text/json")) {
    throw new Error(
      `Mock /data/${endpoint}.json inaccessible (HTML reçu). Vérifiez que le fichier est dans frontend/public/data/.`
    );
  }

  const payload = await response.json();
  return asGestionPayload(payload);
}

export async function PostAPI(endpoint: string, formData: any) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API");
  }
  return data;
}
