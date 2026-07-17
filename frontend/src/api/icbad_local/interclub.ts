import { API_URL, fetchAPI } from "@/api/Client";
import type { InterclubTeamSummary } from "@/types/interclubType";

/** Ordre d'affichage métier des divisions interclubs */
const DIVISION_ORDER = [
  "N1", "N2", "N3",
  "R1", "R2", "R3",
  "D1-A", "D1-B", "D2-A", "D2-B", "D3", "D4",
] as const;

function sortByDivision(teams: InterclubTeamSummary[]) {
  return [...teams].sort((a, b) => {
    const orderA = DIVISION_ORDER.indexOf(a.division as (typeof DIVISION_ORDER)[number]);
    const orderB = DIVISION_ORDER.indexOf(b.division as (typeof DIVISION_ORDER)[number]);
    return (orderA === -1 ? 999 : orderA) - (orderB === -1 ? 999 : orderB);
  });
}

export async function getInterclubTeams() {
  const data = await fetchAPI("/api/icbad-scraper/teams");
  const teams = (data.data as InterclubTeamSummary[]).map((team: InterclubTeamSummary) => ({
    ...team,
    image: {
      url: `${API_URL}${team.image?.url ?? ""}`,
    },
  }));
  return sortByDivision(teams);
}

export async function getInterclubTeam(slug: string) {
  const data = await fetchAPI(`/api/icbad-scraper/teams/${slug}`);
  return {
    ...data.data,
    image: {
      url: `${API_URL}${data.data?.image?.url ?? ""}`,
    },
  };
}
