import { API_URL, fetchAPI } from "@/api/Client";
import type { InterclubTeamSummary } from "@/types/interclubType";
import { sortTeamsByDivision } from "@/utils/interclubUtils";

export async function getInterclubTeams() {
  const data = await fetchAPI("/api/icbad-scraper/teams");
  const teams = (data.data as InterclubTeamSummary[]).map((team: InterclubTeamSummary) => ({
    ...team,
    image: {
      url: `${API_URL}${team.image?.url ?? ""}`,
    },
  }));
  return sortTeamsByDivision(teams);
}

export async function getInterclubTeam(slug: string) {
  const data = await fetchAPI(`/api/icbad-scraper/teams/${slug}`);
  return {
    ...data.data,
    image: {
      url: `${API_URL}${data.data?.image?.url ?? ""}`,
    },
  } as InterclubTeamSummary;
}
