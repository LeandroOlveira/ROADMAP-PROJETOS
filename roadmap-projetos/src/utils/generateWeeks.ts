import { addWeeks, getMonday } from "./dateUtils"

export type Week = {
  date: Date
}

export function generateWeeks(start: Date, end: Date): Week[] {
  const weeks: Week[] = []

  let current = getMonday(start)

  while (current <= end) {
    weeks.push({ date: new Date(current) })
    current = addWeeks(current, 1)
  }

  return weeks
}
