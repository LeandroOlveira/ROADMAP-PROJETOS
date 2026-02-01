import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import type { AgendaEvent } from "../../types/Roadmap"

type Props = {
  event: AgendaEvent
  weeksCount: number
  onResize: (id: string, start: number, end: number) => void
}

const WEEK_WIDTH = 120

export default function AgendaCard({ event, weeksCount, onResize }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: event.id
  })

  function startResize(
    e: React.PointerEvent,
    side: "left" | "right"
  ) {
    e.stopPropagation()

    const startX = e.clientX
    const originalStart = event.startWeek
    const originalEnd = event.endWeek

    function onMove(ev: PointerEvent) {
      const deltaX = ev.clientX - startX
      const deltaWeeks = Math.round(deltaX / WEEK_WIDTH)

      if (side === "left") {
        const newStart = Math.min(
          Math.max(0, originalStart + deltaWeeks),
          originalEnd
        )
        onResize(event.id, newStart, originalEnd)
      } else {
        const newEnd = Math.max(
          Math.min(weeksCount - 1, originalEnd + deltaWeeks),
          originalStart
        )
        onResize(event.id, originalStart, newEnd)
      }
    }

    function onUp() {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
  }

  const style = {
    transform: CSS.Translate.toString(transform),
    gridColumn: `${event.startWeek + 2} / ${event.endWeek + 3}`
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        ${event.cor}
        text-white
        text-xs
        rounded
        shadow
        h-8
        flex
        items-center
        relative
        cursor-grab
        active:cursor-grabbing
        select-none
      `}
    >
      {/* Handle esquerdo */}
      <div
        onPointerDown={e => startResize(e, "left")}
        className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-black/20 rounded-l"
      />

      <span className="px-3 truncate">{event.titulo}</span>

      {/* Handle direito */}
      <div
        onPointerDown={e => startResize(e, "right")}
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-black/20 rounded-r"
      />
    </div>
  )
}
