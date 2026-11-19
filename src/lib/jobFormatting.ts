export function formatSalary(min?: number | null, max?: number | null): string | null {
  if (min == null && max == null) return null;

  const format = (value: number) => value.toLocaleString('de-DE');
  if (min != null && max != null) return `${format(min)} – ${format(max)} €`;
  if (min != null) return `${format(min)} € ~`;
  return `~ ${format(max!)} €`;
}
