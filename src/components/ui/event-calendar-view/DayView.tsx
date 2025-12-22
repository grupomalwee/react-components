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
} from "date-fns";
import type React from "react";
import { useMemo } from "react";

import {
  EndHourAgenda,
  StartHourAgenda,
  WeekCellsHeightAgenda,
} from "@/components/ui/event-calendar-view/constants";
import { cn } from "@/lib/utils";
import { CalendarEventAgenda } from "./types";
import { isMultiDayEventAgenda } from "./utils";
import { useCurrentTimeIndicatorAgenda } from "./hooks/use-current-time-indicator";
import { EventItemAgenda } from "./EventItemAgenda";
import { DroppableCellAgenda } from "./DroppableCell";
import { UndatedEvents } from "@/components/ui/event-calendar-view/";
import { getEventStartDate, getEventEndDate } from "./utils";

interface DayViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect: (event: CalendarEventAgenda, e?: React.MouseEvent) => void;
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

export function DayViewAgenda({
  currentDate,
  events,
  onEventSelect,
  showUndatedEvents,
}: DayViewProps) {
  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      end: addHours(dayStart, EndHourAgenda - 1),
      start: addHours(dayStart, StartHourAgenda),
    });
  }, [currentDate]);

  const dayEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (event.start == null) return false;
        const eventStart = getEventStartDate(event) ?? new Date();
        const eventEnd =
          getEventEndDate(event) ?? getEventStartDate(event) ?? new Date();
        return (
          isSameDay(currentDate, eventStart) ||
          isSameDay(currentDate, eventEnd) ||
          (currentDate > eventStart && currentDate < eventEnd)
        );
      })
      .sort(
        (a, b) =>
          new Date(a.start as Date | string | number).getTime() -
          new Date(b.start as Date | string | number).getTime()
      );
  }, [currentDate, events]);

  const allDayEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      return event.allDay || isMultiDayEventAgenda(event);
    });
  }, [dayEvents]);

  const timeEvents = useMemo(() => {
    return dayEvents.filter((event) => {
      return !event.allDay && !isMultiDayEventAgenda(event);
    });
  }, [dayEvents]);

  const positionedEvents = useMemo(() => {
    const result: PositionedEvent[] = [];
    const dayStart = startOfDay(currentDate);

    const sortedEvents = [...timeEvents].sort((a, b) => {
      const aStart = getEventStartDate(a) ?? getEventEndDate(a) ?? new Date();
      const bStart = getEventStartDate(b) ?? getEventEndDate(b) ?? new Date();
      const aEnd = getEventEndDate(a) ?? getEventStartDate(a) ?? new Date();
      const bEnd = getEventEndDate(b) ?? getEventStartDate(b) ?? new Date();

      if (aStart < bStart) return -1;
      if (aStart > bStart) return 1;

      const aDuration = differenceInMinutes(aEnd, aStart);
      const bDuration = differenceInMinutes(bEnd, bStart);
      return bDuration - aDuration;
    });

    const columns: { event: CalendarEventAgenda; start: Date; end: Date }[][] =
      [];

    for (const event of sortedEvents) {
      const eventStart =
        getEventStartDate(event) ?? getEventEndDate(event) ?? new Date();
      const eventEnd =
        getEventEndDate(event) ?? getEventStartDate(event) ?? new Date();

      const adjustedStart = isSameDay(currentDate, eventStart)
        ? eventStart
        : dayStart;
      const adjustedEnd = isSameDay(currentDate, eventEnd)
        ? eventEnd
        : addHours(dayStart, 24);

      const startHour =
        getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
      const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;

      const top = (startHour - StartHourAgenda) * WeekCellsHeightAgenda;
      const height = (endHour - startHour) * WeekCellsHeightAgenda;

      let columnIndex = 0;
      let placed = false;

      while (!placed) {
        const col = columns[columnIndex] || [];
        if (col.length === 0) {
          columns[columnIndex] = col;
          placed = true;
        } else {
          const overlaps = col.some((c) => {
            const cStart =
              getEventStartDate(c.event) ??
              getEventEndDate(c.event) ??
              new Date();
            const cEnd =
              getEventEndDate(c.event) ??
              getEventStartDate(c.event) ??
              new Date();
            return areIntervalsOverlapping(
              { end: adjustedEnd, start: adjustedStart },
              { end: cEnd, start: cStart }
            );
          });

          if (!overlaps) {
            placed = true;
          } else {
            columnIndex++;
          }
        }
      }

      const currentColumn = columns[columnIndex] || [];
      columns[columnIndex] = currentColumn;
      currentColumn.push({
        end: adjustedEnd,
        event,
        start: adjustedStart,
      });

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

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    onEventSelect(event, e);
  };

  const showAllDaySection = allDayEvents.length > 0;
  const { currentTimePosition, currentTimeVisible } =
    useCurrentTimeIndicatorAgenda(currentDate, "day");

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
                const eventStart = getEventStartDate(event);
                const eventEnd =
                  getEventEndDate(event) ?? getEventStartDate(event);
                const isFirstDay = eventStart
                  ? isSameDay(currentDate, eventStart)
                  : false;
                const isLastDay = eventEnd
                  ? isSameDay(currentDate, eventEnd)
                  : false;

                return (
                  <EventItemAgenda
                    event={event}
                    isFirstDay={isFirstDay}
                    isLastDay={isLastDay}
                    key={`spanning-${event.id}`}
                    onClick={(e) => handleEventClick(event, e)}
                    view="month"
                  >
                    <div>{event.title}</div>
                  </EventItemAgenda>
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
            const eventStart = new Date(evt.start ?? evt.end ?? Date.now());
            const eventEnd = new Date(evt.end ?? evt.start ?? Date.now());
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
                <EventItemAgenda
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

          {hours.map((hour) => {
            const hourValue = getHours(hour);
            return (
              <div
                className="relative h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
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
