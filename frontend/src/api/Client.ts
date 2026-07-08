export const API_URL = import.meta.env.VITE_STRAPI_URL as string;

export async function fetchAPI(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`);

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || "Erreur API");
  }

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
