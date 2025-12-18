"use client";

import {
  addHours,
  areIntervalsOverlapping,
  differenceInMinutes,
  eachHourOfInterval,
  format,
  getHours,
  getMinutes,
  isSameDay,
  startOfDay,
  endOfDay,
} from "date-fns";
import type React from "react";
import { useMemo } from "react";

import {
  EndHour,
  StartHour,
  WeekCellsHeight,
} from "@/components/event-calendar-view/constants";
import { cn } from "@/lib/utils";
import { CalendarEventAgenda } from "./types";
import { isMultiDayEvent } from "./utils";
import { useCurrentTimeIndicator } from "./hooks/use-current-time-indicator";
import { EventItem } from "./EventItem";
import { DroppableCell } from "./DroppableCell";
import { UndatedEvents } from "@/components/event-calendar-view";

interface DayViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect: (event: CalendarEventAgenda) => void;
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

export function DayView({
  currentDate,
  events,
  onEventSelect,
  showUndatedEvents,
}: DayViewProps) {
  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      end: addHours(dayStart, EndHour - 1),
      start: addHours(dayStart, StartHour),
    });
  }, [currentDate]);

  const dayEvents = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    const dayEnd = endOfDay(currentDate);

    return events
      .map((event) => {
        let eventStart: Date | undefined =
          event.start != null ? new Date(event.start as Date) : undefined;
        let eventEnd: Date | undefined =
          event.end != null ? new Date(event.end as Date) : undefined;

        if ((!eventStart || !eventEnd) && event.attend_date) {
          try {
            const ad = new Date(event.attend_date as Date);
            const hasTime =
              ad.getHours() !== 0 ||
              ad.getMinutes() !== 0 ||
              ad.getSeconds() !== 0 ||
              ad.getMilliseconds() !== 0;
            if (hasTime) {
              if (!eventStart) eventStart = ad;
              if (!eventEnd) eventEnd = addHours(ad, 1);
            }
          } catch {
            // ignore invalid attend_date
          }
        }

        return { event, eventStart, eventEnd } as const;
      })
      .filter(({ eventStart, eventEnd }) => !!eventStart && !!eventEnd)
      .filter(({ eventStart, eventEnd }) =>
        areIntervalsOverlapping(
          { start: eventStart as Date, end: eventEnd as Date },
          { start: dayStart, end: dayEnd }
        )
      )
      .map(({ event }) => event)
      .sort((a, b) => {
        const aStart = a.start
          ? new Date(a.start as Date).getTime()
          : a.attend_date
          ? new Date(a.attend_date as Date).getTime()
          : 0;
        const bStart = b.start
          ? new Date(b.start as Date).getTime()
          : b.attend_date
          ? new Date(b.attend_date as Date).getTime()
          : 0;
        return aStart - bStart;
      });
  }, [currentDate, events]);

  const allDayEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      return event.allDay || isMultiDayEvent(event);
    });
  }, [dayEvents]);

  const timeEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      return !event.allDay && !isMultiDayEvent(event);
    });
  }, [dayEvents]);

  // Process events to calculate positions
  const positionedEvents = useMemo(() => {
    const result: PositionedEvent[] = [];
    const dayStart = startOfDay(currentDate);

    // Sort events by start time and duration
    const sortedEvents = [...timeEvents].sort((a, b) => {
      const aStart = new Date(a.start as Date);
      const bStart = new Date(b.start as Date);
      const aEnd = new Date(a.end as Date);
      const bEnd = new Date(b.end as Date);

      // First sort by start time
      if (aStart < bStart) return -1;
      if (aStart > bStart) return 1;

      // If start times are equal, sort by duration (longer events first)
      const aDuration = differenceInMinutes(aEnd, aStart);
      const bDuration = differenceInMinutes(bEnd, bStart);
      return bDuration - aDuration;
    });

    // Track columns for overlapping events
    const columns: { event: CalendarEventAgenda; start: Date; end: Date }[][] = [];

    for (const event of sortedEvents) {
      let eventStart: Date | undefined =
        event.start != null ? new Date(event.start as Date) : undefined;
      let eventEnd: Date | undefined =
        event.end != null ? new Date(event.end as Date) : undefined;

      if ((!eventStart || !eventEnd) && event.attend_date) {
        try {
          const ad = new Date(event.attend_date as Date);
          const hasTime =
            ad.getHours() !== 0 ||
            ad.getMinutes() !== 0 ||
            ad.getSeconds() !== 0 ||
            ad.getMilliseconds() !== 0;
          if (hasTime) {
            if (!eventStart) eventStart = ad;
            if (!eventEnd) eventEnd = addHours(ad, 1);
          }
        } catch {
          // ignore invalid attend_date
        }
      }

      if (!eventStart || !eventEnd) continue;

      // Adjust start and end times if they're outside this day
      const adjustedStart = isSameDay(currentDate, eventStart)
        ? eventStart
        : dayStart;
      const adjustedEnd = isSameDay(currentDate, eventEnd)
        ? eventEnd
        : addHours(dayStart, 24);

      // Calculate top position and height
      const startHour =
        getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
      const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;

      const top = (startHour - StartHour) * WeekCellsHeight;
      const height = (endHour - startHour) * WeekCellsHeight;

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
              { end: c.end, start: c.start }
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
      currentColumn.push({ start: adjustedStart, end: adjustedEnd, event });

      // First column takes full width, others are indented by 10% and take 90% width
      const width = columnIndex === 0 ? 1 : 0.9;
      const left = columnIndex === 0 ? 0 : columnIndex * 0.1;

      result.push({
        event,
        height,
        left,
        top,
        width,
        zIndex: 10 + columnIndex,
      });
    }

    return result;
  }, [currentDate, timeEvents]);

  const handleEventClick = (event: CalendarEventAgenda, e: React.MouseEvent) => {
    e.stopPropagation();
    onEventSelect(event);
  };

  const showAllDaySection = allDayEvents.length > 0;
  const { currentTimePosition, currentTimeVisible } = useCurrentTimeIndicator(
    currentDate,
    "day"
  );

  return (
    <div className="contents" data-slot="day-view">
      {showAllDaySection && (
        <div className="border-border/70 border-t bg-muted/50">
          <div className="grid grid-cols-[3rem_1fr] sm:grid-cols-[4rem_1fr]">
            <div className="relative">
              <span className="absolute bottom-0 left-0 h-6 w-16 max-w-full pe-2 text-right text-[10px] text-muted-foreground/70 sm:pe-4 sm:text-xs">
                All day
              </span>
            </div>
            <div className="relative border-border/70 border-r p-1 last:border-r-0">
              {allDayEvents.map((event) => {
                const eventStart = new Date(
                  event.start ?? event.attend_date ?? event.end ?? Date.now()
                );
                const eventEnd = new Date(
                  event.end ?? event.attend_date ?? event.start ?? Date.now()
                );
                const isFirstDay = isSameDay(currentDate, eventStart);
                const isLastDay = isSameDay(currentDate, eventEnd);

                return (
                  <EventItem
                    event={event}
                    isFirstDay={isFirstDay}
                    isLastDay={isLastDay}
                    key={`spanning-${event.id}`}
                    onClick={(e) => handleEventClick(event, e)}
                    view="month"
                  >
                    {/* Always show the title in day view for better usability */}
                    <div>{event.title}</div>
                  </EventItem>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="grid flex-1 grid-cols-[3rem_1fr] overflow-hidden border-border/70 border-t sm:grid-cols-[4rem_1fr]">
        <div>
          {hours.map((hour, index) => (
            <div
              className="relative h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
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

        <div className="relative">
          {positionedEvents.map((positionedEvent) => {
            const evt = positionedEvent.event;
            const eventStart = new Date(
              evt.start ?? evt.attend_date ?? evt.end ?? Date.now()
            );
            const eventEnd = new Date(
              evt.end ?? evt.attend_date ?? evt.start ?? Date.now()
            );
            const isFirstDay = isSameDay(currentDate, eventStart);
            const isLastDay = isSameDay(currentDate, eventEnd);

            return (
              <div
                className="absolute z-10 px-0.5"
                key={positionedEvent.event.id}
                style={{
                  height: `${positionedEvent.height}px`,
                  left: `${positionedEvent.left * 100}%`,
                  top: `${positionedEvent.top}px`,
                  width: `${positionedEvent.width * 100}%`,
                  zIndex: positionedEvent.zIndex,
                }}
              >
                <EventItem
                  event={evt}
                  view="day"
                  isFirstDay={isFirstDay}
                  isLastDay={isLastDay}
                  onClick={(e) => handleEventClick(evt, e)}
                  showTime
                />
              </div>
            );
          })}

          {/* Current time indicator */}
          {currentTimeVisible && (
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

          {/* Time grid */}
          {hours.map((hour) => {
            const hourValue = getHours(hour);
            return (
              <div
                className="relative h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
                key={hour.toString()}
              >
                {/* Quarter-hour intervals */}
                {[0, 1, 2, 3].map((quarter) => {
                  const quarterHourTime = hourValue + quarter * 0.25;
                  return (
                    <DroppableCell
                      className={cn(
                        "absolute h-[calc(var(--week-cells-height)/4)] w-full",
                        quarter === 0 && "top-0",
                        quarter === 1 &&
                          "top-[calc(var(--week-cells-height)/4)]",
                        quarter === 2 &&
                          "top-[calc(var(--week-cells-height)/4*2)]",
                        quarter === 3 &&
                          "top-[calc(var(--week-cells-height)/4*3)]"
                      )}
                      date={currentDate}
                      id={`day-cell-${currentDate.toISOString()}-${quarterHourTime}`}
                      key={`${hour.toString()}-${quarter}`}
                      onClick={() => {
                        const startTime = new Date(currentDate);
                        startTime.setHours(hourValue);
                        startTime.setMinutes(quarter * 15);
                      }}
                      time={quarterHourTime}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <UndatedEvents
        events={events}
        onEventSelect={onEventSelect}
        show={showUndatedEvents}
      />
    </div>
  );
}
