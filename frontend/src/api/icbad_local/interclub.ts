import { API_URL, fetchAPI } from "@/api/Client";
import type { InterclubTeamSummary } from "@/types/interclubType";
import { sortTeamsByDivision } from "@/utils/interclubUtils";
import { cachedFetch } from "@/utils/cachedFetch";
import { mapMedia } from "@/utils/media";

function mapTeam(team: InterclubTeamSummary): InterclubTeamSummary {
  const rawUrl = team.image?.url ?? "";
  const absolute = rawUrl.startsWith("http") ? rawUrl : `${API_URL}${rawUrl}`;
  const mapped = mapMedia(team.image as never);
  return {
    ...team,
    image: {
      ...mapped,
      url: mapped.url || absolute,
    },
  };
}

export async function getInterclubTeams() {
  return cachedFetch("icbad-teams", async () => {
    const data = await fetchAPI("/api/icbad-scraper/teams");
    const teams = (data.data as InterclubTeamSummary[]).map(mapTeam);
    return sortTeamsByDivision(teams);
  }, 60_000);
}

export async function getInterclubTeam(slug: string) {
  const data = await fetchAPI(`/api/icbad-scraper/teams/${slug}`);
  return mapTeam(data.data as InterclubTeamSummary);
}
