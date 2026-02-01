import type { AgendaType } from "../../types/Roadmap"

type Props = {
  agendas: AgendaType[]
}

export default function RoadmapLegend({ agendas }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-center text-sm">
      {agendas.map(agenda => (
        <div
          key={agenda.id}
          className="flex items-center gap-2"
        >
          <span
            className={`w-3 h-3 rounded-full ${agenda.cor}`}
          />
          <span className="font-medium text-gray-700">
            {agenda.nome}
          </span>
        </div>
      ))}
    </div>
  )
}
