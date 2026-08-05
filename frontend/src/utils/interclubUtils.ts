import type { Divisions } from "@/types/divisionsType";
import type { InterclubTeamSummary } from "@/types/interclubType";

export function getDivisionLabel(division: Divisions | null | undefined) {
  if (!division) return "";
  return division.Nom_complet || division.Nom_court;
}

/** Couleur d'accent dérivée du niveau (N / R / D), sans liste de codes en dur */
export function getDivisionAccentColor(nomCourt: string | null | undefined) {
  if (!nomCourt) return "#0153b6";
  const code = nomCourt.toUpperCase();
  if (code.startsWith("PRENAT") || code.startsWith("N")) return "#dc2626";
  if (code.startsWith("PREREG") || code.startsWith("R")) return "#0153b6";
  if (code.startsWith("D")) return "#16a34a";
  return "#0153b6";
}

export function sortTeamsByDivision(teams: InterclubTeamSummary[]) {
  return [...teams].sort((a, b) => {
    const orderA = a.divisions_interclub?.Ordre ?? 999;
    const orderB = b.divisions_interclub?.Ordre ?? 999;
    return orderA - orderB;
  });
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
    const divisionLabel = getDivisionLabel(first.divisions_interclub);

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
