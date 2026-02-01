import type { Week } from "./generateWeeks"

export type MonthGroup = {
  label: string
  weeks: Week[]
}

export function groupWeeksByMonth(weeks: Week[]): MonthGroup[] {
  const map = new Map<string, Week[]>()

  weeks.forEach(week => {
    const key = `${week.date.getFullYear()}-${week.date.getMonth()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(week)
  })

  return Array.from(map.values()).map(weeks => ({
    label: weeks[0].date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric"
    }),
    weeks
  }))
}
