"use client";

import { useMemo } from "react";
import type { CalendarEventAgenda } from "./types";
import { EventItemAgenda } from "./EventItemAgenda";

interface UndatedEventsProps {
  events: CalendarEventAgenda[];
  onEventSelect?: (event: CalendarEventAgenda, e?: React.MouseEvent) => void;
  className?: string;
  title?: string;
  show?: boolean;
}

const isValidDate = (d: unknown) => {
  try {
    const t = d instanceof Date ? d.getTime() : new Date(String(d)).getTime();
    return !isNaN(t);
  } catch {
    return false;
  }
};

export function UndatedEvents({
  events,
  onEventSelect,
  className,
  title = "Data de Atendimento não Prevista",
  show = true,
}: UndatedEventsProps) {
  const undatedEvents = useMemo(
    () => events.filter((e) => !(isValidDate(e.start) || isValidDate(e.end))),
    [events]
  );

  if (!show || undatedEvents.length === 0) return null;

  return (
    <div className={className}>
      <div className="relative border-border/70 border-t">
        <span className="-top-3 absolute left-0 flex h-6 items-center bg-background pe-4  sm:pe-4 text-md sm:text-lg">
          {title}
        </span>
        <div className="mt-6 space-y-2">
          {undatedEvents.map((event) => (
            <EventItemAgenda
              event={event}
              key={event.id}
              onClick={
                onEventSelect ? (e) => onEventSelect(event, e) : undefined
              }
              view="agenda"
              agendaOnly
              className="hover:shadow-none bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 border"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
