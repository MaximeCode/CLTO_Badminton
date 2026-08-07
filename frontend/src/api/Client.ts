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

// PP / PROD
export async function fetchAPIGestion(endpoint: string) {
  const response = await fetch(`${API_GESTION_URL}${endpoint}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API");
  }

  return data;
}

// DEV
/// 1. tester la route dans le navigateur
/// 2. créer le fichier data/endpoint.json et copier les données
export async function fetchFakeAPIGestion(endpoint: string) {
  const response = await fetch(`/data/${endpoint}.json`);
  const data = await response.json();
  return data;
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
