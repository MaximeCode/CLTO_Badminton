import type { InterclubTeamSummary } from "@/types/interclubType";

export function formatDivision(division: string) {
  switch (division) {
    case "N1":
      return "Nationale 1";
    case "N2":
      return "Nationale 2";
    case "N3":
      return "Nationale 3";
    case "R1":
      return "Régionale 1";
    case "R2":
      return "Régionale 2";
    case "R3":
      return "Régionale 3";
    case "D1-A":
      return "Départementale 1";
    case "D1-B":
      return "Départementale 1";
    case "D2-A":
      return "Départementale 2";
    case "D2-B":
      return "Départementale 2";
    case "D3":
      return "Départementale 3";
    case "D4":
      return "Départementale 4";
    default:
      return division;
  }
}

/** Une entrée de menu par URL IcBAD ; les competitionName distincts sont joints (ex: poule A / poule B) */
export function groupTeamsByIcbadUrl(teams: InterclubTeamSummary[]) {
  const byUrl = new Map<string, InterclubTeamSummary[]>();

  for (const team of teams) {
    if (!team.icbadUrl) continue;
    const group = byUrl.get(team.icbadUrl) ?? [];
    group.push(team);
    byUrl.set(team.icbadUrl, group);
  }

  return [...byUrl.entries()].map(([icbadUrl, group]) => {
    const first = group[0];
    const divisionLabel = formatDivision(first.division);

    const poolsLabel = [
      ...new Set(
        group
          .map((t) => {
            const str = (t.competitionName ?? "").replace(/-/g, " ").trim();
            return str.split(" ")[1]; // A
          })
          .filter(Boolean)
      ),
    ].join(" / ");

    const label = [divisionLabel, poolsLabel]
      .filter(Boolean)
      .join(` - Poule${poolsLabel.length > 1 ? "s" : ""} `);

    return {
      key: first.teamSlug,
      icbadUrl,
      label,
    };
  });
}
