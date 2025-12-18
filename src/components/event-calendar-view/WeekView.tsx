"use client";

import {
  addHours,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachDayOfInterval,
  eachHourOfInterval,
  endOfWeek,
  format,
  getHours,
  getMinutes,
  isBefore,
  isSameDay,
  isToday,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type React from "react";
import { useMemo } from "react";

import {
  type CalendarEventAgenda,
  DroppableCellAgenda,
  EventItemAgenda,
  isMultiDayEventAgenda,
  UndatedEvents,
  useCurrentTimeIndicatorAgenda,
  WeekCellsHeightAgenda,
} from "@/components/event-calendar-view";
import { EndHour, StartHour } from "@/components/event-calendar/constants";
import { cn } from "@/lib/utils";
import { DraggableEvent } from "./DraggablaEvent";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect: (event: CalendarEventAgenda) => void;
  onEventCreate?: (startTime: Date) => void;
  showUndatedEvents?: boolean;
}

interface PositionedEvent {
  event: CalendarEventAgenda;
  top: number;
  height: number;
  left: number;
  width: number;
  zIndex: number;
}

export function WeekViewAgenda({
  currentDate,
  events,
  onEventSelect,
  onEventCreate,
  showUndatedEvents,
}: WeekViewProps) {
  const days = useMemo(() => {
    const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(currentDate, { weekStartsOn: 0 });
    return eachDayOfInterval({ end: weekEnd, start: weekStart });
  }, [currentDate]);

  const weekStart = useMemo(
    () => startOfWeek(currentDate, { weekStartsOn: 0 }),
    [currentDate]
  );

  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      end: addHours(dayStart, EndHour - 1),
      start: addHours(dayStart, StartHour),
    });
  }, [currentDate]);

  // Get all-day events and multi-day events for the week
  const allDayEvents = useMemo(() => {
    return events
      .filter((event) => {
        return event.allDay || isMultiDayEventAgenda(event);
      })
      .filter((event) => {
        const eventStart = event.start
          ? new Date(event.start as Date | string | number)
          : event.end
          ? new Date(event.end as Date | string | number)
          : undefined;
        const eventEnd = event.end
          ? new Date(event.end as Date | string | number)
          : event.start
          ? new Date(event.start as Date | string | number)
          : undefined;

        return days.some((day) => {
          if (eventStart && isSameDay(day, eventStart)) return true;
          if (eventEnd && isSameDay(day, eventEnd)) return true;
          if (eventStart && eventEnd && day > eventStart && day < eventEnd)
            return true;
          return false;
        });
      });
  }, [events, days]);

  const processedDayEvents = useMemo(() => {
    const result = days.map((day) => {
      // Get events for this day that are not all-day events or multi-day events
      const dayEvents = events.filter((event) => {
        // Skip all-day events and multi-day events
        if (event.allDay || isMultiDayEventAgenda(event)) return false;

        const eventStart = new Date(event.start ?? event.end ?? Date.now());
        const eventEnd = new Date(event.end ?? event.start ?? Date.now());

        // Check if event is on this day
        return (
          isSameDay(day, eventStart) ||
          isSameDay(day, eventEnd) ||
          (eventStart < day && eventEnd > day)
        );
      });

      // Sort events by start time and duration
      const sortedEvents = [...dayEvents].sort((a, b) => {
        const aStart = new Date(a.start ?? a.end ?? Date.now());
        const bStart = new Date(b.start ?? b.end ?? Date.now());
        const aEnd = new Date(a.end ?? a.start ?? Date.now());
        const bEnd = new Date(b.end ?? b.start ?? Date.now());

        // First sort by start time
        if (aStart < bStart) return -1;
        if (aStart > bStart) return 1;

        // If start times are equal, sort by duration (longer events first)
        const aDuration = differenceInMinutes(aEnd, aStart);
        const bDuration = differenceInMinutes(bEnd, bStart);
        return bDuration - aDuration;
      });

      // Calculate positions for each event
      const positionedEvents: PositionedEvent[] = [];
      const dayStart = startOfDay(day);

      // Track columns for overlapping events
      const columns: { event: CalendarEventAgenda; end: Date }[][] = [];

      for (const event of sortedEvents) {
        const eventStart = new Date(event.start ?? event.end ?? Date.now());
        const eventEnd = new Date(event.end ?? event.start ?? Date.now());

        // Adjust start and end times if they're outside this day
        const adjustedStart = isSameDay(day, eventStart)
          ? eventStart
          : dayStart;
        const adjustedEnd = isSameDay(day, eventEnd)
          ? eventEnd
          : addHours(dayStart, 24);

        // Calculate top position and height
        const startHour =
          getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
        const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;

        // Adjust the top calculation to account for the new start time
        const top = (startHour - StartHour) * WeekCellsHeightAgenda;
        const height = (endHour - startHour) * WeekCellsHeightAgenda;

        // Find a column for this event
        let columnIndex = 0;
        let placed = false;

        while (!placed) {
          const col = columns[columnIndex] || [];
          if (col.length === 0) {
            columns[columnIndex] = col;
            placed = true;
          } else {
            const overlaps = col.some((c) =>
              areIntervalsOverlapping(
                { end: adjustedEnd, start: adjustedStart },
                {
                  end: new Date(c.event.end ?? c.event.start ?? Date.now()),
                  start: new Date(c.event.start ?? c.event.end ?? Date.now()),
                }
              )
            );

            if (!overlaps) {
              placed = true;
            } else {
              columnIndex++;
            }
          }
        }

        // Ensure column is initialized before pushing
        const currentColumn = columns[columnIndex] || [];
        columns[columnIndex] = currentColumn;
        currentColumn.push({ end: adjustedEnd, event });

        // Calculate width and left position based on number of columns
        const width = columnIndex === 0 ? 1 : 0.9;
        const left = columnIndex === 0 ? 0 : columnIndex * 0.1;

        positionedEvents.push({
          event,
          height,
          left,
          top,
          width,
          zIndex: 10 + columnIndex, // Higher columns get higher z-index
        });
      }

      return positionedEvents;
    });

    return result;
  }, [days, events]);

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onEventSelect(event);
  };

  const showAllDaySection = allDayEvents.length > 0;
  const { currentTimePosition, currentTimeVisible } =
    useCurrentTimeIndicatorAgenda(currentDate, "week");

  return (
    <div className="flex h-full flex-col" data-slot="week-view">
      <div className="sticky top-0 z-30 grid grid-cols-8 border-border/70 border-b bg-background">
        <div className="py-2 text-center text-muted-foreground/70 text-sm">
          <span className="max-[479px]:sr-only">{format(new Date(), "O")}</span>
        </div>
        {days.map((day) => (
          <div
            className="py-2 text-center text-muted-foreground/70 text-sm data-today:font-medium data-today:text-foreground"
            data-today={isToday(day) || undefined}
            key={day.toString()}
          >
            <span aria-hidden="true" className="sm:hidden">
              {format(day, "EEE", { locale: ptBR })[0]}{" "}
              {format(day, "d", { locale: ptBR })}
            </span>
            <span className="max-sm:hidden">
              {format(day, "EEE dd", { locale: ptBR })}
            </span>
          </div>
        ))}
      </div>

      {showAllDaySection && (
        <div className="border-border/70 border-b bg-muted/50">
          <div className="grid grid-cols-8">
            <div className="relative border-border/70 border-r">
              <span className="absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                Todo Dia
              </span>
            </div>
            {days.map((day, dayIndex) => {
              const dayAllDayEvents = allDayEvents.filter((event) => {
                const eventStart = event.start
                  ? new Date(event.start as Date | string | number)
                  : undefined;
                const eventEnd = event.end
                  ? new Date(event.end as Date | string | number)
                  : undefined;

                if (!eventStart && !eventEnd) return false;

                return (
                  (eventStart && isSameDay(day, eventStart)) ||
                  (eventStart &&
                    eventEnd &&
                    day > eventStart &&
                    day < eventEnd) ||
                  (eventEnd && isSameDay(day, eventEnd))
                );
              });

              return (
                <div
                  className="relative border-border/70 border-r p-1 last:border-r-0"
                  data-today={isToday(day) || undefined}
                  key={day.toString()}
                >
                  {dayAllDayEvents.map((event) => {
                    const eventStart = event.start
                      ? new Date(event.start as Date | string | number)
                      : undefined;
                    const eventEnd = event.end
                      ? new Date(event.end as Date | string | number)
                      : undefined;
                    const isFirstDay = eventStart
                      ? isSameDay(day, eventStart)
                      : false;
                    const isLastDay = eventEnd
                      ? isSameDay(day, eventEnd)
                      : false;

                    const isFirstVisibleDay = eventStart
                      ? dayIndex === 0 && isBefore(eventStart, weekStart)
                      : false;
                    const shouldShowTitle = isFirstDay || isFirstVisibleDay;

                    return (
                      <EventItemAgenda
                        event={event}
                        isFirstDay={isFirstDay}
                        isLastDay={isLastDay}
                        key={`spanning-${event.id}`}
                        onClick={(e) => handleEventClick(event, e)}
                        view="month"
                      >
                        <div
                          aria-hidden={!shouldShowTitle}
                          className={cn(
                            "truncate",
                            !shouldShowTitle && "invisible"
                          )}
                        >
                          {event.title}
                        </div>
                      </EventItemAgenda>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid flex-1 grid-cols-8 overflow-hidden">
        <div className="grid auto-cols-fr border-border/70 border-r">
          {hours.map((hour, index) => (
            <div
              className="relative min-h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
              key={hour.toString()}
            >
              {index > 0 && (
                <span className="-top-3 absolute left-0 flex h-6 w-16 max-w-full items-center justify-end bg-background pe-2 text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                  {format(hour, "HH:mm")}
                </span>
              )}
            </div>
          ))}
        </div>

        {days.map((day, dayIndex) => (
          <div
            className="relative grid auto-cols-fr border-border/70 border-r last:border-r-0"
            data-today={isToday(day) || undefined}
            key={day.toString()}
          >
            {(processedDayEvents[dayIndex] ?? []).map((positionedEvent) => (
              <div
                className="absolute z-10 px-0.5"
                key={positionedEvent.event.id}
                onClick={(e) => e.stopPropagation()}
                style={{
                  height: `${positionedEvent.height}px`,
                  left: `${positionedEvent.left * 100}%`,
                  top: `${positionedEvent.top}px`,
                  width: `${positionedEvent.width * 100}%`,
                  zIndex: positionedEvent.zIndex,
                }}
              >
                <div className="size-full">
                  <DraggableEvent
                    event={positionedEvent.event}
                    height={positionedEvent.height}
                    onClick={(e) => handleEventClick(positionedEvent.event, e)}
                    draggable={false}
                    showTime
                    view="week"
                  />
                </div>
              </div>
            ))}
            {currentTimeVisible && isToday(day) && (
              <div
                className="pointer-events-none absolute right-0 left-0 z-20"
                style={{ top: `${currentTimePosition}%` }}
              >
                <div className="relative flex items-center">
                  <div className="-left-1 absolute h-2 w-2 rounded-full bg-primary" />
                  <div className="h-[2px] w-full bg-primary" />
                </div>
              </div>
            )}
            {hours.map((hour) => {
              const hourValue = getHours(hour);
              return (
                <div
                  className="relative min-h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                  key={hour.toString()}
                >
                  {[0, 1, 2, 3].map((quarter) => {
                    const quarterHourTime = hourValue + quarter * 0.25;
                    return (
                      <DroppableCellAgenda
                        className={cn(
                          "absolute h-[calc(var(--week-cells-height)/4)] w-full",
                          quarter === 0 && "top-0",
                          quarter === 1 &&
                            "top-[calc(var(--week-cells-height)/4)]",
                          quarter === 2 &&
                            "top-[calc(var(--week-cells-height)/4*2)]",
                          quarter === 3 &&
                            "top-[calc(var(--week-cells-height)/4*)]"
                        )}
                        date={day}
                        id={`week-cell-${day.toISOString()}-${quarterHourTime}`}
                        key={`${hour.toString()}-${quarter}`}
                        onClick={() => {
                          const startTime = new Date(day);
                          startTime.setHours(hourValue);
                          startTime.setMinutes(quarter * 15);
                          if (onEventCreate) onEventCreate(startTime);
                        }}
                        time={quarterHourTime}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <UndatedEvents
        events={events}
        onEventSelect={onEventSelect}
        show={showUndatedEvents}
      />
    </div>
  );
}
