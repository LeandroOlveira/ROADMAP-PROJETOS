// src/components/AgendaDraggable.tsx
import { useDraggable } from '@dnd-kit/core';
import type { Agenda } from '../types/Roadmap';
import { agendaColors } from '../utils/agendaColors';

export function AgendaDraggable({ agenda }: { agenda: Agenda }) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: agenda.id,
      data: agenda,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
      className={`
        ${agendaColors[agenda.tipo]}
        ${agendaColors[agenda.status]}
        text-white text-xs rounded px-2 py-1
        cursor-grab active:cursor-grabbing
      `}
    >
      {agenda.label ?? agenda.tipo}
    </div>
  );
}
