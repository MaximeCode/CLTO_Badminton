import { format, isSameMonth, isSameYear, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

function formatDay(date: Date): string {
  const day = date.getDate();
  return day === 1 ? "1er" : String(day);
}

function formatMonthYear(date: Date): string {
  return format(date, "MMMM yyyy", { locale: fr });
}

function formatMonth(date: Date): string {
  return format(date, "MMMM", { locale: fr });
}

/** "Du 1er au 10 août 2026" | "Du 30 juillet au 5 août 2026" */
export function formatDateRange(debut: string | Date, fin: string | Date): string {
  const start = typeof debut === "string" ? parseISO(debut) : debut;
  const end = typeof fin === "string" ? parseISO(fin) : fin;

  if (isSameMonth(start, end) && isSameYear(start, end)) {
    // Du 1er au 10 août 2026
    return `Du ${formatDay(start)} au ${formatDay(end)} ${formatMonthYear(end)}`;
  }

  if (isSameYear(start, end)) {
    // Du 30 juillet au 5 août 2026
    return `Du ${formatDay(start)} ${formatMonth(start)} au ${formatDay(end)} ${formatMonthYear(end)}`;
  }

  // Années différentes
  return `Du ${formatDay(start)} ${formatMonthYear(start)} au ${formatDay(end)} ${formatMonthYear(end)}`;
}
