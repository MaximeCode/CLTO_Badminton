export const API_URL = import.meta.env.VITE_STRAPI_URL as string;

export async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API");
  }

  return data;
}
