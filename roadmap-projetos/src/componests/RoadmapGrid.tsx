// src/components/RoadmapGrid.tsx
import {
  DndContext,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { roadmapMock } from '../data/roadmap.mock';
import { WeekDropZone } from './WeekDropZone';
import type { Agenda } from '../types/Roadmap';

const semanas = [
  '2026-01-05',
  '2026-01-12',
  '2026-01-19',
  '2026-01-26',
  '2026-02-02',
  '2026-02-09',
];

export function RoadmapGrid() {
  const [agendas, setAgendas] =
    useState<Agenda[]>(roadmapMock);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    setAgendas(prev =>
      prev.map(a =>
        a.id === active.id
          ? { ...a, semana: over.id as string }
          : a
      )
    );
  }

  const projetos = Array.from(
    new Set(agendas.map(a => a.projeto))
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <table className="border-collapse w-full text-sm">
        <thead>
          <tr>
            <th className="border p-2 text-left">Projeto</th>
            {semanas.map(s => (
              <th key={s} className="border p-2">
                {s}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {projetos.map(projeto => (
            <tr key={projeto}>
              <td className="border p-2 font-medium">
                {projeto}
              </td>

              {semanas.map(semana => {
                const agenda = agendas.find(
                  a =>
                    a.projeto === projeto &&
                    a.semana === semana
                );

                return (
                  <td key={semana}>
                    <WeekDropZone
                      id={semana}
                      agenda={agenda}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
}
