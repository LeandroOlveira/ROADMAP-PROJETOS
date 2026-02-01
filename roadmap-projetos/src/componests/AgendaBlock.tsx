import type { Agenda } from '../types/Roadmap';
import { agendaColors } from '../utils/agendaColors';

interface Props {
  agenda: Agenda;
}

export function AgendaBlock({ agenda }: Props) {
  return (
    <div
      className={`
        ${agendaColors[agenda.tipo]}
        ${agendaColors[agenda.status]}
        text-white text-xs rounded px-2 py-1
        cursor-pointer hover:brightness-110
      `}
      title={`${agenda.label ?? ''} | ${agenda.tipo}`}
    >
      {agenda.label ?? agenda.tipo}
    </div>
  );
}
