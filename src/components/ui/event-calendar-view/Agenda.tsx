"use client";

import {
  format,
  isToday,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

import {
  type CalendarEventAgenda,
  EventItemAgenda,
  getAgendaEventsForDayAgenda,
  UndatedEvents,
} from "@/components/ui/event-calendar-view";
import { CalendarIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect?: (event: CalendarEventAgenda, e?: React.MouseEvent) => void;
  showUndatedEvents?: boolean;
}

export function Agenda({
  currentDate,
  events,
  onEventSelect,
  showUndatedEvents = true,
}: AgendaViewProps) {
  const isValidDate = (d: unknown) => {
    try {
      const t = d instanceof Date ? d.getTime() : new Date(String(d)).getTime();
      return !isNaN(t);
    } catch {
      return false;
    }
  };

  const datedEvents = useMemo(
    () => events.filter((e) => isValidDate(e.start) || isValidDate(e.end)),
    [events]
  );

  const undatedEvents = useMemo(
    () => events.filter((e) => !(isValidDate(e.start) || isValidDate(e.end))),
    [events]
  );

  const days = useMemo(() => {
    const start = startOfMonth(new Date(currentDate));
    const end = endOfMonth(new Date(currentDate));
    return eachDayOfInterval({ start, end });
  }, [currentDate]);

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (onEventSelect) onEventSelect(event, e);
  };

  const hasEvents = days.some(
    (day) => getAgendaEventsForDayAgenda(datedEvents, day).length > 0
  );

  return (
    <div className="border-border/70 border-t px-4">
      {!hasEvents && !(showUndatedEvents && undatedEvents.length > 0) ? (
        <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center px-4">
          <CalendarIcon className="mb-2 text-muted-foreground/50" size={32} />
          <h3 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl min-w-0 truncate sm:whitespace-normal">
            Nenhum evento encontrado
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base md:text-md max-w-prose">
            Não há eventos agendados para este período.
          </p>
        </div>
      ) : (
        <>
          {days.map((day) => {
            const dayEvents = getAgendaEventsForDayAgenda(datedEvents, day);

            if (dayEvents.length === 0) return null;

            return (
              <div
                className={twMerge(
                  "relative my-12 border-border/70 border-t",
                  isToday(day) ? "border-blue-200" : ""
                )}
                key={day.toString()}
              >
                <span
                  className={twMerge(
                    "-top-3 absolute left-0 flex h-6 items-center bg-background pe-4 uppercase data-today:font-extrabold sm:pe-4 text-sm sm:text-base md:text-lg font-bold min-w-0",
                    isToday(day) ? "text-blue-500" : ""
                  )}
                  data-today={isToday(day) || undefined}
                >
                  {(() => {
                    const s = format(day, "d MMM, EEEE", { locale: ptBR });
                    return s
                      .split(" ")
                      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
                      .join(" ");
                  })()}
                  {isToday(day) ? " - Hoje" : ""}
                </span>
                <div className="mt-6 space-y-2">
                  {dayEvents.map((event) => (
                    <EventItemAgenda
                      event={event}
                      key={event.id}
                      onClick={
                        onEventSelect
                          ? (e) => handleEventClick(event, e)
                          : undefined
                      }
                      view="agenda"
                      className={
                        onEventSelect
                          ? undefined
                          : "hover:shadow-none hover:scale-100"
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <UndatedEvents
            events={events}
            onEventSelect={onEventSelect}
            show={showUndatedEvents}
            className="my-12"
          />
        </>
      )}
    </div>
  );
}
