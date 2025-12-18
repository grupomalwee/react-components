"use client";

import { useDroppable } from "@dnd-kit/core";

import { useCalendarDndAgenda } from '@/components/event-calendar-view';
import { cn } from '@/lib/utils';

interface DroppableCellProps {
  id: string;
  date: Date;
  time?: number; 
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function DroppableCellAgenda({
  id,
  date,
  time,
  children,
  className,
  onClick,
}: DroppableCellProps) {
  const { activeEvent } = useCalendarDndAgenda();

  const { setNodeRef, isOver } = useDroppable({
    data: {
      date,
      time,
    },
    id,
  });

  const formattedTime =
    time !== undefined
      ? `${Math.floor(time)}:${Math.round((time - Math.floor(time)) * 60)
          .toString()
          .padStart(2, "0")}`
      : null;

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden px-0.5 py-1 data-dragging:bg-accent sm:px-1",
        className,
      )}
      data-dragging={isOver && activeEvent ? true : undefined}
      onClick={onClick}
      ref={setNodeRef}
      title={formattedTime ? `${formattedTime}` : undefined}
    >
      {children}
    </div>
  );
}
