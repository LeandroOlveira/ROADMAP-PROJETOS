export type AgendaEvent = {
  id: string
  titulo: string
  startWeek: number
  endWeek: number
  cor: string
  agendaId: string   // 👈 NOVO
}


export type AgendaType = {
  id: string
  nome: string
  cor: string
  eventos?: AgendaEvent[]
}

export type Project = {
  id: string
  nome: string
  agendas: AgendaType[]
}
