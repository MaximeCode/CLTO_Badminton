export function formatTime(time: string): string {
  const [h, m] = time.split(":");
  const hours = parseInt(h, 10);
  const minutes = parseInt(m, 10);
  return minutes === 0 ? `${hours}h` : `${hours}h${m}`;
}

export function joinDays(days: string[]): string {
  if (days.length === 0) return "";
  if (days.length === 1) return days[0];
  return `${days.slice(0, -1).join(", ")} et ${days[days.length - 1]}`;
}
