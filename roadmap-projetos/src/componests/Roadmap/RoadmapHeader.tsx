import type { Week } from "../../utils/generateWeeks"
import type { MonthGroup } from "../../utils/groupWeeksByMonth"
import { formatDate } from "../../utils/dateUtils"

type Props = {
  weeks: Week[]
  months: MonthGroup[]
}

export default function RoadmapHeader({ weeks, months }: Props) {
  return (
    <>
      {/* Linha dos meses */}
      <div
        className="grid border-b bg-gray-200"
        style={{ gridTemplateColumns: `200px repeat(${weeks.length}, 1fr)` }}
      >
        <div className="border-r px-2 py-1 font-semibold">Projeto</div>

        {months.map(month => (
          <div
            key={month.label}
            className="text-center border-r font-semibold capitalize"
            style={{ gridColumn: `span ${month.weeks.length}` }}
          >
            {month.label}
          </div>
        ))}
      </div>

      {/* Linha das semanas */}
      <div
        className="grid border-b bg-gray-50"
        style={{ gridTemplateColumns: `200px repeat(${weeks.length}, 1fr)` }}
      >
        <div className="border-r px-2 py-1 font-semibold">Tipo</div>

        {weeks.map(w => (
          <div key={w.date.toISOString()} className="border-r text-center py-1 text-sm">
            {formatDate(w.date)}
          </div>
        ))}
      </div>
    </>
  )
}
