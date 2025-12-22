"use client";

import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type React from "react";
import { useEffect, useMemo, useState } from "react";

import {
  DroppableCellAgenda,
  EventGapAgenda,
  EventHeightAgenda,
  EventItemAgenda,
  getAllEventsForDayAgenda,
  getEventsForDayAgenda,
  getSpanningEventsForDayAgenda,
  sortEventsAgenda,
  useEventVisibilityAgenda,
  UndatedEvents,
  CalendarEventAgenda,
  getEventStartDate,
  getEventEndDate,
} from "@/components/event-calendar-view";
import { DefaultStartHourAgenda } from "@/components/event-calendar-view/constants";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "../ui/overlays/PopoverBase";
import { twMerge } from "tailwind-merge";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect: (event: CalendarEventAgenda, e?: React.MouseEvent) => void;
  showUndatedEvents?: boolean;
}

export function MonthViewAgenda({
  currentDate,
  events,
  onEventSelect,
  showUndatedEvents,
}: MonthViewProps) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

    return eachDayOfInterval({ end: calendarEnd, start: calendarStart });
  }, [currentDate]);

  const weekdays = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i);
      const short = format(date, "EEE", { locale: ptBR });
      return short.charAt(0).toUpperCase() + short.slice(1);
    });
  }, []);

  const weeks = useMemo(() => {
    const result: Date[][] = [];
    let week: Date[] = [];

    for (let i = 0; i < days.length; i++) {
      week.push(days[i]);
      if (week.length === 7 || i === days.length - 1) {
        result.push(week);
        week = [];
      }
    }

    return result;
  }, [days]);

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onEventSelect(event, e);
  };

  const [isMounted, setIsMounted] = useState(false);
  const { contentRef, getVisibleEventCount } = useEventVisibilityAgenda({
    eventGap: EventGapAgenda,
    eventHeight: EventHeightAgenda,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="contents" data-slot="month-view">
      <div className="grid grid-cols-7 border-border/70 border-b">
        {weekdays.map((day) => (
          <div
            className="py-1 px-1 text-center text-muted-foreground/70 text-xs uppercase sm:tracking-wide bg-muted/5 leading-none"
            key={day}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="inline sm:hidden">{day.charAt(0)}</span>
          </div>
        ))}
      </div>
      <div className="grid flex-1 auto-rows-fr">
        {weeks.map((week, weekIndex) => (
          <div
            className="grid grid-cols-7 [&:last-child>*]:border-b-0"
            key={`week-${weekIndex}`}
          >
            {week.map((day, dayIndex) => {
              if (!day) return null;

              const eventsWithStart = events.filter((ev) => {
                try {
                  if (ev.start == null) return false;
                  const t =
                    ev.start instanceof Date
                      ? ev.start.getTime()
                      : new Date(String(ev.start)).getTime();
                  return !isNaN(t);
                } catch {
                  return false;
                }
              });

              const dayEvents = getEventsForDayAgenda(eventsWithStart, day);
              const spanningEvents = getSpanningEventsForDayAgenda(
                eventsWithStart,
                day
              );
              const isCurrentMonth = isSameMonth(day, currentDate);
              const cellId = `month-cell-${day.toISOString()}`;
              const allDayEvents = [...spanningEvents, ...dayEvents];
              const allEvents = getAllEventsForDayAgenda(events, day);

              const isReferenceCell = weekIndex === 0 && dayIndex === 0;
              const visibleCount = isMounted
                ? getVisibleEventCount(allDayEvents.length)
                : undefined;
              const hasMore =
                visibleCount !== undefined &&
                allDayEvents.length > visibleCount;
              const remainingCount = hasMore
                ? allDayEvents.length - visibleCount
                : 0;

              return (
                <div
                  className="group border-border/70 border-r border-b last:border-r-0 data-outside-cell:bg-muted/25 data-outside-cell:text-muted-foreground/70 hover:bg-muted/5 transition-colors p-1 sm:p-2"
                  data-outside-cell={!isCurrentMonth || undefined}
                  data-today={isToday(day) || undefined}
                  key={day.toString()}
                >
                  <DroppableCellAgenda
                    date={day}
                    id={cellId}
                    onClick={() => {
                      const startTime = new Date(day);
                      startTime.setHours(DefaultStartHourAgenda, 0, 0);
                    }}
                  >
                    <div
                      className={twMerge(
                        `mt-1 inline-flex w-6 h-6 sm:w-7 sm:h-7 items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-muted-foreground`,
                        isToday(day) ? "bg-blue-500 text-white" : ""
                      )}
                    >
                      {format(day, "d")}
                    </div>
                    <div
                      className="min-h-[calc((var(--event-height)+var(--event-gap))*2)] sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)] px-1 py-0.5 sm:py-1"
                      ref={isReferenceCell ? contentRef : null}
                    >
                      {sortEventsAgenda(allDayEvents).map((event, index) => {
                        const eventStart =
                          getEventStartDate(event) ??
                          getEventEndDate(event) ??
                          new Date();
                        const eventEnd =
                          getEventEndDate(event) ??
                          getEventStartDate(event) ??
                          new Date();
                        const isFirstDay = isSameDay(day, eventStart);
                        const isLastDay = isSameDay(day, eventEnd);

                        const isHidden =
                          isMounted && visibleCount && index >= visibleCount;

                        if (!visibleCount) return null;

                        if (!isFirstDay) {
                          // Show a compact visible label for spanning events instead of invisible content
                          return (
                            <div
                              aria-hidden={isHidden ? "true" : undefined}
                              className="aria-hidden:hidden"
                              key={`spanning-${event.id}-${day
                                .toISOString()
                                .slice(0, 10)}`}
                            >
                              <EventItemAgenda
                                event={event}
                                isFirstDay={isFirstDay}
                                isLastDay={isLastDay}
                                onClick={(e) => handleEventClick(event, e)}
                                view="month"
                              >
                                <div className="flex items-center gap-1 truncate text-[12px] text-foreground">
                                  <span className="text-[11px] opacity-80">
                                    →
                                  </span>
                                  <span className="truncate font-medium">
                                    {event.title}
                                  </span>
                                </div>
                              </EventItemAgenda>
                            </div>
                          );
                        }

                        return (
                          <div
                            aria-hidden={isHidden ? "true" : undefined}
                            className="aria-hidden:hidden"
                            key={event.id}
                          >
                            <EventItemAgenda
                              event={event}
                              isFirstDay={isFirstDay}
                              isLastDay={isLastDay}
                              onClick={(e) => handleEventClick(event, e)}
                              view="month"
                            >
                              <span className="flex items-center gap-1 sm:gap-2 truncate text-[12px] text-foreground">
                                {!event.allDay && (
                                  <span className="truncate font-normal opacity-80 text-[10px] sm:text-[11px] bg-white/10 px-1 py-0.5 rounded-full">
                                    {format(eventStart, "HH:mm")}
                                  </span>
                                )}
                                <span className="truncate font-medium text-xs sm:text-sm">
                                  {event.title}
                                </span>
                              </span>
                            </EventItemAgenda>
                          </div>
                        );
                      })}

                      {hasMore && (
                        <PopoverBase modal>
                          <PopoverTriggerBase asChild>
                            <button
                              className="mt-[var(--event-gap)] flex h-[var(--event-height)] w-full select-none items-center overflow-hidden px-2 text-left text-[10px] text-muted-foreground outline-none backdrop-blur-md rounded-md transition hover:bg-muted/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:text-xs"
                              onClick={(e) => e.stopPropagation()}
                              type="button"
                              aria-label={`Show ${remainingCount} more events on ${format(
                                day,
                                "PPP",
                                { locale: ptBR }
                              )}`}
                            >
                              <span className="font-medium">
                                + {remainingCount}
                              </span>
                              <span className="sr-only"> more</span>
                            </button>
                          </PopoverTriggerBase>
                          <PopoverContentBase
                            align="center"
                            className="max-w-52 p-3"
                            style={
                              {
                                "--event-height": `${EventHeightAgenda}px`,
                              } as Record<string, string>
                            }
                          >
                            <div className="space-y-2">
                              <div className="font-medium text-sm">
                                {format(day, "EEE d", { locale: ptBR })}
                              </div>
                              <div className="space-y-1">
                                {sortEventsAgenda(allEvents).map((event) => {
                                  const eventStart =
                                    getEventStartDate(event) ??
                                    getEventEndDate(event) ??
                                    new Date();
                                  const eventEnd =
                                    getEventEndDate(event) ??
                                    getEventStartDate(event) ??
                                    new Date();
                                  const isFirstDay = isSameDay(day, eventStart);
                                  const isLastDay = isSameDay(day, eventEnd);

                                  return (
                                    <EventItemAgenda
                                      event={event}
                                      isFirstDay={isFirstDay}
                                      isLastDay={isLastDay}
                                      key={event.id}
                                      onClick={(e) =>
                                        handleEventClick(event, e)
                                      }
                                      view="month"
                                    />
                                  );
                                })}
                              </div>
                            </div>
                          </PopoverContentBase>
                        </PopoverBase>
                      )}
                    </div>
                  </DroppableCellAgenda>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <UndatedEvents
        events={events}
        onEventSelect={onEventSelect}
        className="my-12"
        show={showUndatedEvents}
      />
    </div>
  );
}
