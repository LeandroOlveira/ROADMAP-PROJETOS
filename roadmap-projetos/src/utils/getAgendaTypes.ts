import type { Project, AgendaType } from "../types/Roadmap"

export function getAgendaTypes(projects: Project[]): AgendaType[] {
  const map = new Map<string, AgendaType>()

  projects.forEach(project => {
    project.agendas.forEach(agenda => {
      if (!map.has(agenda.id)) {
        map.set(agenda.id, {
          id: agenda.id,
          nome: agenda.nome,
          cor: agenda.cor
        })
      }
    })
  })

  return Array.from(map.values())
}
