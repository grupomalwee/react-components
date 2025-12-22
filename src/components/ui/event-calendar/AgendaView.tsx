"use client";

import { addDays, format, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

import {
  AgendaDaysToShow,
  type CalendarEvent,
  EventItem,
  getAgendaEventsForDay,
} from "@/components/ui/event-calendar";
import { CalendarIcon } from "@phosphor-icons/react";

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventSelect?: (event: CalendarEvent) => void;
  showUndatedEvents?: boolean;
}

export function AgendaView({
  currentDate,
  events,
  onEventSelect,
  showUndatedEvents = false,
}: AgendaViewProps) {
  const isValidDate = (d: unknown) => {
    try {
      const t = d instanceof Date ? d.getTime() : new Date(String(d)).getTime();
      return !isNaN(t);
    } catch {
      return false;
    }
  };

  // Split events into dated and undated
  // Consider an event dated if it has at least one valid time (start OR end)
  const datedEvents = useMemo(
    () => events.filter((e) => isValidDate(e.start) || isValidDate(e.end)),
    [events]
  );

  // Consider undated only when neither start nor end is a valid date
  const undatedEvents = useMemo(
    () => events.filter((e) => !(isValidDate(e.start) || isValidDate(e.end))),
    [events]
  );

  const days = useMemo(() => {
    console.log("Agenda view updating with date:", currentDate.toISOString());
    return Array.from({ length: AgendaDaysToShow }, (_, i) =>
      addDays(new Date(currentDate), i)
    );
  }, [currentDate]);

  const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Agenda view event clicked:", event);
    if (onEventSelect) onEventSelect(event);
  };

  // Check if there are any days with events (only dated events are considered)
  const hasEvents = days.some(
    (day) => getAgendaEventsForDay(datedEvents, day).length > 0
  );

  return (
    <div className="border-border/70 border-t px-4">
      {!hasEvents && !(showUndatedEvents && undatedEvents.length > 0) ? (
        <div className="flex min-h-[70svh] flex-col items-center justify-center py-16 text-center">
          <CalendarIcon className="mb-2 text-muted-foreground/50" size={32} />
          <h3 className="font-medium text-lg">Nenhum evento encontrado</h3>
          <p className="text-muted-foreground">
            Não há eventos agendados para este período.
          </p>
        </div>
      ) : (
        <>
          {days.map((day) => {
            const dayEvents = getAgendaEventsForDay(datedEvents, day);

            if (dayEvents.length === 0) return null;

            return (
              <div
                className="relative my-12 border-border/70 border-t"
                key={day.toString()}
              >
                <span
                  className="-top-3 absolute left-0 flex h-6 items-center bg-background pe-4 text-[10px] uppercase data-today:font-medium sm:pe-4 sm:text-xs"
                  data-today={isToday(day) || undefined}
                >
                  {(() => {
                    const s = format(day, "d MMM, EEEE", { locale: ptBR });
                    return s
                      .split(" ")
                      .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
                      .join(" ");
                  })()}
                </span>
                <div className="mt-6 space-y-2">
                  {dayEvents.map((event) => (
                    <EventItem
                      event={event}
                      key={event.id}
                      onClick={
                        onEventSelect
                          ? (e) => handleEventClick(event, e)
                          : undefined
                      }
                      view="agenda"
                      agendaOnly={showUndatedEvents}
                      className={
                        onEventSelect
                          ? undefined
                          : "cursor-default hover:shadow-none hover:scale-100"
                      }
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {showUndatedEvents && undatedEvents.length > 0 && (
            <div className="relative my-12 border-border/70 border-t">
              <span className="-top-3 absolute left-0 flex h-6 items-center bg-background pe-4 text-[10px] uppercase sm:pe-4 sm:text-xs">
                Data de Atendimento não Prevista
              </span>
              <div className="mt-6 space-y-2">
                {undatedEvents.map((event) => (
                  <EventItem
                    event={event}
                    key={event.id}
                    onClick={
                      onEventSelect
                        ? (e) => handleEventClick(event, e)
                        : undefined
                    }
                    view="agenda"
                    agendaOnly={showUndatedEvents}
                    className={
                      showUndatedEvents
                        ? "cursor-default hover:shadow-none hover:scale-100 bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 shadow-none "
                        : onEventSelect
                        ? undefined
                        : "cursor-default hover:shadow-none hover:scale-100"
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
