export function getOrdinalSuffix(day: number): string {
  const rest = `${day % 10}`;
  if ((day >= 11 && day <= 13) || !["1", "2", "3"].includes(rest)) return `${day}th`;

  const suffix: Record<string, string> = {
    "1": `${day}st`,
    "2": `${day}nd`,
    "3": `${day}rd`,
  };
  return suffix[rest];
}
