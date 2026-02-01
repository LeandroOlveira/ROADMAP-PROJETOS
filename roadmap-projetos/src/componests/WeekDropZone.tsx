// src/components/WeekDropZone.tsx
import { useDroppable } from '@dnd-kit/core';
import type { Agenda } from '../types/Roadmap';
import { AgendaDraggable } from './AgendaDraggable';

interface Props {
  id: string; // semana
  agenda?: Agenda;
}

export function WeekDropZone({ id, agenda }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`
        h-12 p-1 border
        ${isOver ? 'bg-blue-50' : ''}
      `}
    >
      {agenda && <AgendaDraggable agenda={agenda} />}
    </div>
  );
}
