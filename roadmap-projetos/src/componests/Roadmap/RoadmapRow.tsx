import { useDroppable } from "@dnd-kit/core"
import type { AgendaType } from "../../types/Roadmap"
import AgendaCard from "./AgendaCard"

type Props = {
  agenda: AgendaType
  weeksCount: number
  onResizeEvent: (eventId: string, start: number, end: number) => void
}

export default function RoadmapRow({
  agenda,
  weeksCount,
  onResizeEvent
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: agenda.id
  })

  return (
    <div
      ref={setNodeRef}
      className={`
        grid border-b border-gray-300 text-sm relative
        ${isOver ? "bg-blue-50" : ""}
      `}
      style={{ gridTemplateColumns: `200px repeat(${weeksCount}, 1fr)` }}
    >
      {/* Coluna fixa */}
      <div className="flex items-center gap-2 px-3 py-2 border-r bg-white sticky left-0 z-10">
        <span className={`w-3 h-3 rounded-full ${agenda.cor}`} />
        <span className="font-medium">{agenda.nome}</span>
      </div>

      {/* Grid base */}
      {Array.from({ length: weeksCount }).map((_, index) => (
        <div
          key={index}
          className="h-10 border-r border-dashed border-gray-300"
        />
      ))}

      {/* Cards pertencentes a esta agenda */}
      {agenda.eventos?.map(event => (
        <AgendaCard
          key={event.id}
          event={event}
          weeksCount={weeksCount}
          onResize={onResizeEvent}
        />
      ))}
    </div>
  )
}
