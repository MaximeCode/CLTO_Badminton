import { fetchAPI } from "../Client";
import type { SearchResult } from "@/types/searchType";

export async function searchContent(q: string): Promise<SearchResult[]> {
  const trimmed = q.trim();
  if (trimmed.length < 2) return [];

  const { data } = await fetchAPI(
    `/api/search?q=${encodeURIComponent(trimmed)}`
  );

  if (!Array.isArray(data)) return [];
  return data as SearchResult[];
}
