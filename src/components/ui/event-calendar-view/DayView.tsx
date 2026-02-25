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
import {
  getEventStartDate,
  getEventEndDate,
  formatDurationAgenda,
} from "./utils";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/feedback";
import { MapPinIcon } from "@phosphor-icons/react";

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
          new Date(b.start as Date | string | number).getTime(),
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

    // --- 2-pass algorithm ---
    type EventLayout = {
      event: CalendarEventAgenda;
      adjustedStart: Date;
      adjustedEnd: Date;
      top: number;
      height: number;
      col: number;
      totalCols: number;
    };

    const columns: { start: Date; end: Date }[][] = [];
    const layouts: EventLayout[] = [];

    for (const event of sortedEvents) {
      const eventStart =
        getEventStartDate(event) ?? getEventEndDate(event) ?? new Date();
      const rawEnd =
        getEventEndDate(event) ?? getEventStartDate(event) ?? new Date();
      const eventEnd =
        rawEnd <= eventStart
          ? new Date(eventStart.getTime() + 30 * 60 * 1000)
          : rawEnd;

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
      const height = Math.max(
        (endHour - startHour) * WeekCellsHeightAgenda,
        24,
      );

      let col = 0;
      while (true) {
        const colSlots = columns[col] ?? [];
        const hasConflict = colSlots.some((slot) =>
          areIntervalsOverlapping(
            { start: adjustedStart, end: adjustedEnd },
            { start: slot.start, end: slot.end },
            { inclusive: false },
          ),
        );
        if (!hasConflict) break;
        col++;
      }
      if (!columns[col]) columns[col] = [];
      columns[col].push({ start: adjustedStart, end: adjustedEnd });
      layouts.push({
        event,
        adjustedStart,
        adjustedEnd,
        top,
        height,
        col,
        totalCols: 0,
      });
    }

    // Pass 2: determine totalCols per cluster
    for (const layout of layouts) {
      let maxCol = layout.col;
      for (const other of layouts) {
        if (other === layout) continue;
        if (
          areIntervalsOverlapping(
            { start: layout.adjustedStart, end: layout.adjustedEnd },
            { start: other.adjustedStart, end: other.adjustedEnd },
            { inclusive: false },
          )
        ) {
          maxCol = Math.max(maxCol, other.col);
        }
      }
      layout.totalCols = maxCol + 1;
    }

    return layouts.map(
      ({ event, top, height, col, totalCols }) =>
        ({
          event,
          top,
          height,
          left: col / totalCols,
          width: 1 / totalCols,
          zIndex: 10 + col,
        }) as PositionedEvent,
    );
  }, [currentDate, timeEvents]);

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent,
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
            <div className="relative border-border/70 border-r flex items-center justify-center p-1">
              <span className="text-center text-[10px] text-muted-foreground/70 sm:text-xs">
                Todo Dia
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
                  <TooltipProviderBase
                    delayDuration={400}
                    key={`spanning-${event.id}`}
                  >
                    <TooltipBase>
                      <TooltipTriggerBase asChild>
                        <div className="w-full">
                          <EventItemAgenda
                            event={event}
                            isFirstDay={isFirstDay}
                            isLastDay={isLastDay}
                            onClick={(e) => handleEventClick(event, e)}
                            view="month"
                          >
                            <div>{event.title}</div>
                          </EventItemAgenda>
                        </div>
                      </TooltipTriggerBase>
                      <TooltipContentBase side="top">
                        <p className="font-semibold truncate max-w-[200px]">
                          {event.title}
                        </p>
                        <p className="opacity-80 mt-0.5 leading-snug">
                          {formatDurationAgenda(event)}
                        </p>
                        {event.location && (
                          <p className="opacity-60 mt-0.5 truncate text-[11px] max-w-[200px] flex items-center gap-1">
                            <MapPinIcon size={14} /> {event.location}
                          </p>
                        )}
                      </TooltipContentBase>
                    </TooltipBase>
                  </TooltipProviderBase>
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
                <span className="-top-3 absolute left-0 flex h-6 w-16 max-w-full items-center justify-end bg-background pe-1 sm:pe-4 text-[9px] sm:text-xs text-muted-foreground/70">
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
                <TooltipProviderBase delayDuration={400}>
                  <TooltipBase>
                    <TooltipTriggerBase asChild>
                      <div className="size-full">
                        <EventItemAgenda
                          event={evt}
                          view="day"
                          isFirstDay={isFirstDay}
                          isLastDay={isLastDay}
                          onClick={(e) => handleEventClick(evt, e)}
                          showTime
                        />
                      </div>
                    </TooltipTriggerBase>
                    <TooltipContentBase
                      side="top"
                      sideOffset={6}
                      className="max-w-[220px] space-y-0.5"
                    >
                      <p className="font-semibold text-sm leading-snug">
                        {evt.title}
                      </p>
                      <p className="text-xs opacity-90">
                        {formatDurationAgenda(evt)}
                      </p>
                      {evt.location && (
                        <p className="text-xs flex items-center gap-2">
                          <MapPinIcon size={15} /> {evt.location}
                        </p>
                      )}
                      {evt.description && (
                        <p className="text-xs opacity-75 line-clamp-2">
                          {evt.description}
                        </p>
                      )}
                    </TooltipContentBase>
                  </TooltipBase>
                </TooltipProviderBase>
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
                          "top-[calc(var(--week-cells-height)/4*3)]",
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
