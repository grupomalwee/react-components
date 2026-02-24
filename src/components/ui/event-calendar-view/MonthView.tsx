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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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
  isMultiDayEventAgenda,
} from "@/components/ui/event-calendar-view/";
import { DefaultStartHourAgenda } from "@/components/ui/event-calendar-view/constants";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "../overlays/PopoverBase";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { MonthNowBadge } from "./MonthNowBadge";
import { computeMultiDayBars, MultiDayOverlay } from "./MonthMultiDayOverlay";

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

  const weekdays = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i);
        const short = format(date, "EEE", { locale: ptBR });
        return short.charAt(0).toUpperCase() + short.slice(1);
      }),
    [],
  );

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

  const todayColIndex = useMemo(() => new Date().getDay(), []);

  const [isMounted, setIsMounted] = useState(false);
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);
  const hoverLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((id: string | null) => {
    if (id !== null) {
      if (hoverLeaveTimerRef.current) {
        clearTimeout(hoverLeaveTimerRef.current);
        hoverLeaveTimerRef.current = null;
      }
      setHoveredEventId(id);
    } else {
      hoverLeaveTimerRef.current = setTimeout(() => {
        setHoveredEventId(null);
        hoverLeaveTimerRef.current = null;
      }, 150);
    }
  }, []);
  const { contentRef, getVisibleEventCount } = useEventVisibilityAgenda({
    eventGap: EventGapAgenda,
    eventHeight: EventHeightAgenda,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const eventsWithStart = useMemo(
    () =>
      events.filter((ev) => {
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
      }),
    [events],
  );

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    onEventSelect(event, e);
  };

  return (
    <div className="contents" data-slot="month-view">
      <div className="grid grid-cols-7 border-border/70 border-b">
        {weekdays.map((day, i) => {
          const isTodayCol = i === todayColIndex;
          return (
            <div
              key={day}
              className={cn(
                "py-1.5 px-1 text-center text-xs uppercase sm:tracking-wide leading-none transition-colors",
                isTodayCol
                  ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold"
                  : "bg-muted/5 text-muted-foreground/70",
              )}
            >
              <span className="hidden sm:inline">{day}</span>
              <span className="inline sm:hidden">{day.charAt(0)}</span>
            </div>
          );
        })}
      </div>

      <div className="grid flex-1 auto-rows-fr">
        {weeks.map((week, weekIndex) => {
          const multiDayBars = computeMultiDayBars(eventsWithStart, week);
          const maxSlot =
            multiDayBars.length > 0
              ? Math.max(...multiDayBars.map((b) => b.slot))
              : -1;
          const multiDayRowCount = maxSlot + 1;

          return (
            <div
              key={`week-${weekIndex}`}
              className="grid grid-cols-7 [&:last-child>*]:border-b-0 relative p-0"
            >
              {week.map((day, dayIndex) => {
                if (!day) return null;

                const isTodayCell = isToday(day);
                const isTodayCol = dayIndex === todayColIndex;
                const isCurrentMonth = isSameMonth(day, currentDate);
                const cellId = `month-cell-${day.toISOString()}`;

                const dayEvents = getEventsForDayAgenda(eventsWithStart, day);
                const spanningEvents = getSpanningEventsForDayAgenda(
                  eventsWithStart,
                  day,
                );
                const allDayEvents = [...spanningEvents, ...dayEvents];
                const allEvents = getAllEventsForDayAgenda(events, day);
                const isReferenceCell = weekIndex === 0 && dayIndex === 0;

                const visibleCount = isMounted
                  ? getVisibleEventCount(allDayEvents.length + multiDayRowCount)
                  : undefined;
                const visibleAfterMultiday =
                  visibleCount !== undefined
                    ? Math.max(0, visibleCount - multiDayRowCount)
                    : undefined;

                const singleEvents = sortEventsAgenda(allDayEvents).filter(
                  (e) => !isMultiDayEventAgenda(e),
                );
                const hasMore =
                  visibleAfterMultiday !== undefined &&
                  singleEvents.length > visibleAfterMultiday;
                const remainingCount = hasMore
                  ? singleEvents.length - (visibleAfterMultiday ?? 0)
                  : 0;

                return (
                  <div
                    key={day.toString()}
                    data-outside-cell={!isCurrentMonth || undefined}
                    data-today={isTodayCell || undefined}
                    className={cn(
                      "group border-border/70 border-r border-b last:border-r-0 transition-colors py-0.5 relative",
                      !isCurrentMonth && "bg-muted/20 text-muted-foreground/60",
                      isTodayCol &&
                        isCurrentMonth &&
                        !isTodayCell &&
                        "bg-blue-50/20 dark:bg-blue-950/10",
                      isTodayCell && "bg-blue-50/50 dark:bg-blue-950/20",
                      "hover:bg-muted/5",
                    )}
                  >
                    <DroppableCellAgenda
                      date={day}
                      id={cellId}
                      onClick={() => {
                        const t = new Date(day);
                        t.setHours(DefaultStartHourAgenda, 0, 0);
                      }}
                    >
                      <div
                        className={twMerge(
                          "mt-1 inline-flex w-6 h-6 sm:w-7 sm:h-7 items-center justify-center rounded-lg text-xs sm:text-sm font-semibold border",
                          isTodayCell
                            ? "bg-blue-500 text-white border-blue-500 shadow-sm shadow-blue-400/40"
                            : "text-muted-foreground border-transparent",
                        )}
                      >
                        {format(day, "d")}
                      </div>

                      {isTodayCell && <MonthNowBadge />}

                      <div
                        ref={isReferenceCell ? contentRef : null}
                        className="min-h-[calc((var(--event-height)+var(--event-gap))*2)] sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)] px-1 py-0.5 sm:py-1"
                      >
                        {Array.from({ length: multiDayRowCount }).map(
                          (_, si) => (
                            <div
                              key={`spacer-${si}`}
                              aria-hidden="true"
                              className="mt-[var(--event-gap)] h-[var(--event-height)] w-full"
                              style={{ opacity: 0, pointerEvents: "none" }}
                            />
                          ),
                        )}

                        {singleEvents.map((event, index) => {
                          if (!isMounted) return null;
                          const isHidden =
                            visibleAfterMultiday !== undefined &&
                            index >= visibleAfterMultiday;
                          const eventStart =
                            getEventStartDate(event) ??
                            getEventEndDate(event) ??
                            new Date();

                          return (
                            <div
                              key={event.id}
                              aria-hidden={isHidden ? "true" : undefined}
                              className="aria-hidden:hidden"
                            >
                              <EventItemAgenda
                                event={event}
                                isFirstDay
                                isLastDay
                                onClick={(e) => handleEventClick(event, e)}
                                view="month"
                              >
                                <span className="flex items-center gap-1 sm:gap-1.5 truncate text-[11px] relative z-10">
                                  {!event.allDay && (
                                    <span className="font-normal opacity-80 text-[10px] sm:text-[11px] bg-white/10 px-1 py-0.5 rounded-full">
                                      {format(eventStart, "HH:mm")}
                                    </span>
                                  )}
                                  <span className="font-semibold truncate">
                                    {event.title}
                                  </span>
                                </span>
                              </EventItemAgenda>
                            </div>
                          );
                        })}
                      </div>

                      {hasMore && (
                        <PopoverBase modal>
                          <PopoverTriggerBase asChild>
                            <button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Mostrar mais ${remainingCount} eventos`}
                              className="mt-[var(--event-gap)] flex h-[var(--event-height)] w-full select-none items-center overflow-hidden px-2 text-left text-[10px] text-muted-foreground outline-none rounded-md transition hover:bg-muted/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:text-xs"
                            >
                              <span className="font-semibold">
                                + {remainingCount} mais
                              </span>
                            </button>
                          </PopoverTriggerBase>
                          <PopoverContentBase
                            align="center"
                            className="max-w-52 p-3"
                            style={
                              {
                                "--event-height": `${EventHeightAgenda}px`,
                              } as React.CSSProperties
                            }
                          >
                            <div className="space-y-2">
                              <p className="font-semibold text-sm">
                                {format(day, "EEE d", { locale: ptBR })}
                              </p>
                              <div className="space-y-1">
                                {sortEventsAgenda(allEvents).map((event) => {
                                  const s =
                                    getEventStartDate(event) ??
                                    getEventEndDate(event) ??
                                    new Date();
                                  const e2 =
                                    getEventEndDate(event) ??
                                    getEventStartDate(event) ??
                                    new Date();
                                  return (
                                    <EventItemAgenda
                                      key={event.id}
                                      event={event}
                                      isFirstDay={isSameDay(day, s)}
                                      isLastDay={isSameDay(day, e2)}
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
                    </DroppableCellAgenda>
                  </div>
                );
              })}

              <MultiDayOverlay
                bars={multiDayBars}
                weekIndex={weekIndex}
                hoveredEventId={hoveredEventId}
                onHover={handleHover}
                onEventSelect={onEventSelect}
              />
            </div>
          );
        })}
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
