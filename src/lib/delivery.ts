export function getEstimatedDeliveryDate(): string {
  const start = addBusinessDays(new Date(), 3);
  const end = addBusinessDays(new Date(), 5);
  return `${formatShortDate(start)} – ${formatShortDate(end)}`;
}

function addBusinessDays(date: Date, days: number): Date {
  const result = new Date(date);
  let added = 0;
  while (added < days) {
    result.setDate(result.getDate() + 1);
    const d = result.getDay();
    if (d !== 0 && d !== 6) added++;
  }
  return result;
}

function formatShortDate(d: Date): string {
  const months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}
