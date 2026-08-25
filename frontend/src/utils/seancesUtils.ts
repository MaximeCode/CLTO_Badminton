import { addDays, endOfWeek, format, parseISO, startOfWeek } from "date-fns";
import { fr } from "date-fns/locale";
import type { CreneauWeek, Seance } from "@/types/seancesType";

const WEEK_DAYS = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
] as const;

export function getDayNameFromDate(date: Date): string {
  // getDay(): 0=dimanche → index 6 ; 1=lundi → 0
  const index = (date.getDay() + 6) % 7;
  return WEEK_DAYS[index];
}

function buildWeek(weekStart: string, seances: Seance[] = []): CreneauWeek {
  const start = parseISO(weekStart);
  const end = endOfWeek(start, { weekStartsOn: 1 });
  const weekEnd = format(end, "yyyy-MM-dd");
  const label = `${format(start, "ddMM")} au ${format(end, "ddMM")}`;

  return {
    id: `${weekStart}_${weekEnd}`,
    label,
    period: `Semaine du ${format(start, "dd/MM/yyyy")} au ${format(end, "dd/MM/yyyy")}`,
    weekStart,
    weekEnd,
    seances,
  };
}

export function groupSeancesByWeek(seances: Seance[]): CreneauWeek[] {
  const byWeek = new Map<string, Seance[]>();

  for (const seance of seances) {
    const date = parseISO(seance.dateSeance);
    const weekStartDate = startOfWeek(date, { weekStartsOn: 1 });
    const key = format(weekStartDate, "yyyy-MM-dd");
    const list = byWeek.get(key) ?? [];
    list.push(seance);
    byWeek.set(key, list);
  }

  return [...byWeek.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([weekStart, weekSeances]) => buildWeek(weekStart, weekSeances));
}

/** Fusionne des semaines vides (ancres JSON) dans la liste des semaines. */
export function mergeEmptyWeeks(
  weeks: CreneauWeek[],
  emptyWeekStarts: string[],
): CreneauWeek[] {
  if (emptyWeekStarts.length === 0) return weeks;

  const byStart = new Map(weeks.map((week) => [week.weekStart, week]));

  for (const rawDate of emptyWeekStarts) {
    const weekStart = format(
      startOfWeek(parseISO(rawDate), { weekStartsOn: 1 }),
      "yyyy-MM-dd",
    );
    if (!byStart.has(weekStart)) {
      byStart.set(weekStart, buildWeek(weekStart, []));
    }
  }

  return [...byStart.values()].sort((a, b) =>
    a.weekStart.localeCompare(b.weekStart),
  );
}

export function getWeekDistance(date: Date, week: CreneauWeek): number {
  const start = parseISO(week.weekStart).getTime();
  const end = parseISO(week.weekEnd).getTime();
  const time = date.getTime();

  if (time < start) return start - time;
  if (time > end) return time - end;
  return 0;
}

/** Affiche une liste de personnes (entraîneurs, ouvreurs, …). */
export function formatPeople(names: string[], emptyLabel = "Non renseigné"): string {
  if (names.length === 0) return emptyLabel;
  return names.join(" / ");
}

/** @deprecated Préférer formatPeople */
export function formatLeader(entraineurs: string[]): string {
  return formatPeople(entraineurs);
}

export function addDaysToWeekStart(weekStart: string, dayIndex: number): Date {
  return addDays(parseISO(weekStart), dayIndex);
}

export function formatMonthYear(weekStart: string): string {
  return format(parseISO(weekStart), "MMMM yyyy", { locale: fr }).toUpperCase();
}

export { WEEK_DAYS };
