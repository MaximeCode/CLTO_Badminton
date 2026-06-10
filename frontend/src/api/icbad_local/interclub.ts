import { fetchAPI } from "@/api/Client";

export async function getInterclubTeams() {
  const data = await fetchAPI("/api/icbad-scraper/teams");
  return data.data;
}

export async function getInterclubTeam(slug: string) {
  const data = await fetchAPI(`/api/icbad-scraper/teams/${slug}`);
  return data.data;
}
