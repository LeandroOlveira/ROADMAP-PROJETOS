import { useState } from "react"
import { DndContext } from "@dnd-kit/core"
import type {DragEndEvent} from "@dnd-kit/core"
import RoadmapHeader from "./RoadmapHeader"
import RoadmapRow from "./RoadmapRow"

import type { Project } from "../../types/Roadmap"
import { generateWeeks } from "../../utils/generateWeeks"
import { groupWeeksByMonth } from "../../utils/groupWeeksByMonth"

import RoadmapLegend from "./RoadmapLegend"
import { getAgendaTypes } from "../../utils/getAgendaTypes"

import { saveRoadmap, loadRoadmap } from "../../utils/roadmapStorage"
import { useEffect } from "react"


/* ===============================
   CONFIGURAÇÃO DE DATAS
================================ */
const startDate = new Date("2026-01-01")
const endDate = new Date("2026-03-15")

const weeks = generateWeeks(startDate, endDate)
const months = groupWeeksByMonth(weeks)

/* ===============================
   MOCK DE DADOS (FORA DO COMPONENTE)
================================ */
const initialProjects: Project[] = [
  {
    id: "1",
    nome: "IMPLANTAÇÃO ERP – CLIENTE X",
    agendas: [
      {
        id: "ind",
        nome: "Indústria",
        cor: "bg-orange-500",
        eventos: [
          {
            id: "e1",
            titulo: "Levantamento",
            startWeek: 0,
            endWeek: 2,
            cor: "bg-orange-500",
            agendaId: "ind"
          },
          {
            id: "e2",
            titulo: "Execução",
            startWeek: 3,
            endWeek: 5,
            cor: "bg-red-500",
            agendaId: "adm"
          }
        ]
      }
    ]
  }
]

/* ===============================
   COMPONENTE
================================ */
export default function Roadmap() {
  const [data, setData] = useState<Project[]>(() => {
  return loadRoadmap() ?? initialProjects
})

useEffect(() => {
  saveRoadmap(data)
}, [data])


  const agendaTypes = getAgendaTypes(data)

function handleDragEnd(event: DragEndEvent) {
  const { active, over, delta } = event

  if (!over) return

  const WEEK_WIDTH = 120
  const movedWeeks = Math.round(delta.x / WEEK_WIDTH)
  const targetAgendaId = over.id as string

  setData(prev =>
    prev.map(project => ({
      ...project,
      agendas: project.agendas.map(agenda => ({
        ...agenda,
        eventos: agenda.eventos
          ?.filter(ev => ev.id !== active.id)
      }))
    })).map(project => ({
      ...project,
      agendas: project.agendas.map(agenda => {
        if (agenda.id !== targetAgendaId) return agenda

        const draggedEvent = project.agendas
          .flatMap(a => a.eventos || [])
          .find(ev => ev.id === active.id)

        if (!draggedEvent) return agenda

        return {
          ...agenda,
          eventos: [
            ...(agenda.eventos || []),
            {
              ...draggedEvent,
              agendaId: agenda.id,
              startWeek: Math.max(0, draggedEvent.startWeek + movedWeeks),
              endWeek: Math.max(
                draggedEvent.startWeek + movedWeeks,
                draggedEvent.endWeek + movedWeeks
              )
            }
          ]
        }
      })
    }))
  )
}

  function handleResizeEvent(
  eventId: string,
  start: number,
  end: number
) {
  setData(prev =>
    prev.map(project => ({
      ...project,
      agendas: project.agendas.map(agenda => ({
        ...agenda,
        eventos: agenda.eventos?.map(ev =>
          ev.id === eventId
            ? { ...ev, startWeek: start, endWeek: end }
            : ev
        )
      }))
    }))
  )
}

  return (
    <div className="overflow-x-auto">
      <div className="min-w-max border border-gray-300 bg-white">
        <div className="p-4 border-b">
            <RoadmapLegend agendas={agendaTypes} />
        </div>
        <RoadmapHeader weeks={weeks} months={months} />

        <DndContext onDragEnd={handleDragEnd}>
          {data.map(project => (
            <div key={project.id}>
              <div className="bg-gray-100 font-semibold px-2 py-1 border-b">
                {project.nome}
              </div>

              {project.agendas.map(agenda => (
                <RoadmapRow
                key={agenda.id}
                agenda={agenda}
                weeksCount={weeks.length}
                onResizeEvent={handleResizeEvent}
                />
              ))}
            </div>
          ))}
        </DndContext>
      </div>
    </div>
  )
}
