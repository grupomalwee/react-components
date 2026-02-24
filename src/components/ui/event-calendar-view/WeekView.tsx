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
  EventHeightAgenda,
  EventGapAgenda,
  EventItemAgenda,
  isMultiDayEventAgenda,
  UndatedEvents,
  useCurrentTimeIndicatorAgenda,
  getEventStartDate,
  getEventEndDate,
  formatDurationAgenda,
  WeekCellsHeightAgenda,
} from "@/components/ui/event-calendar-view/";
import { EndHour, StartHour } from "@/components/ui/event-calendar/constants";
import { cn } from "@/lib/utils";
import { DraggableEvent } from "./DraggablaEvent";
import { computeMultiDayBars } from "./MonthMultiDayOverlay";
import {
  CaretLeftIcon,
  CaretRightIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import {
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
  TooltipProviderBase,
} from "@/components/ui/feedback";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onEventSelect: (event: CalendarEventAgenda, e?: React.MouseEvent) => void;
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
  totalCols: number;
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

  const hours = useMemo(() => {
    const dayStart = startOfDay(currentDate);
    return eachHourOfInterval({
      end: addHours(dayStart, EndHour - 1),
      start: addHours(dayStart, StartHour),
    });
  }, [currentDate]);

  const allDayEvents = useMemo(() => {
    const isValidStart = (ev: CalendarEventAgenda) => {
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
    };

    return events
      .filter((event) => {
        if (!isValidStart(event)) return false;
        return event.allDay || isMultiDayEventAgenda(event);
      })
      .filter((event) => {
        const eventStart = getEventStartDate(event);
        const eventEnd = getEventEndDate(event) ?? getEventStartDate(event);

        return days.some((day) => {
          if (eventStart && isSameDay(day, eventStart)) return true;
          if (eventEnd && isSameDay(day, eventEnd)) return true;
          if (eventStart && eventEnd && day > eventStart && day < eventEnd)
            return true;
          return false;
        });
      });
  }, [events, days]);

  const trueAllDayEvents = useMemo(
    () => allDayEvents.filter((e) => e.allDay),
    [allDayEvents],
  );

  const multiDayTimedEvents = useMemo(
    () => allDayEvents.filter((e) => !e.allDay),
    [allDayEvents],
  );

  const rowH = EventHeightAgenda + EventGapAgenda;

  const allDayBarData = useMemo(() => {
    const bars = computeMultiDayBars(trueAllDayEvents, days);
    const maxSlot = bars.length > 0 ? Math.max(...bars.map((b) => b.slot)) : 0;
    return { bars, sectionH: (maxSlot + 1) * rowH + EventGapAgenda * 2 };
  }, [trueAllDayEvents, days, rowH]);

  const multiDayBarData = useMemo(() => {
    const bars = computeMultiDayBars(multiDayTimedEvents, days);
    const maxSlot = bars.length > 0 ? Math.max(...bars.map((b) => b.slot)) : 0;
    return { bars, sectionH: (maxSlot + 1) * rowH + EventGapAgenda * 2 };
  }, [multiDayTimedEvents, days, rowH]);

  const processedDayEvents = useMemo(() => {
    const result = days.map((day) => {
      const dayEvents = events.filter((event) => {
        if (event.allDay || isMultiDayEventAgenda(event)) return false;
        if (event.start == null) return false;
        const eventStart = getEventStartDate(event);
        const eventEnd = getEventEndDate(event) ?? getEventStartDate(event);

        return (
          (eventStart ? isSameDay(day, eventStart) : false) ||
          (eventEnd ? isSameDay(day, eventEnd) : false) ||
          (eventStart && eventEnd ? eventStart < day && eventEnd > day : false)
        );
      });

      const sortedEvents = [...dayEvents].sort((a, b) => {
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

      const dayStart = startOfDay(day);

      // --- 2-pass algorithm ---
      // Pass 1: assign column index greedily
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
        // Ensure minimum height of 30 min
        const eventEnd =
          rawEnd <= eventStart
            ? new Date(eventStart.getTime() + 30 * 60 * 1000)
            : rawEnd;

        const adjustedStart = isSameDay(day, eventStart)
          ? eventStart
          : dayStart;
        const adjustedEnd = isSameDay(day, eventEnd)
          ? eventEnd
          : addHours(dayStart, 24);

        const startHour =
          getHours(adjustedStart) + getMinutes(adjustedStart) / 60;
        const endHour = getHours(adjustedEnd) + getMinutes(adjustedEnd) / 60;

        const top = (startHour - StartHour) * WeekCellsHeightAgenda;
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

      // Pass 2: for each event, determine how many columns its time-slot spans
      // by finding the cluster max column
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

      return layouts.map(({ event, top, height, col, totalCols }) => ({
        event,
        top,
        height,
        left: col / totalCols,
        width: 1 / totalCols,
        zIndex: 10 + col,
      })) as PositionedEvent[];
    });

    return result;
  }, [days, events]);

  const handleEventClick = (
    event: CalendarEventAgenda,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    onEventSelect(event, e);
  };

  const showAllDaySection = allDayEvents.length > 0;
  const { currentTimePosition, currentTimeVisible } =
    useCurrentTimeIndicatorAgenda(currentDate, "week");

  return (
    <div className="flex h-full flex-col overflow-hidden" data-slot="week-view">
      <div className="flex-1 overflow-auto">
        <div className="min-w-[600px] sm:min-w-full flex flex-col h-full">
          <div className="sticky top-0 z-30 grid grid-cols-8 border-border/70 border-b bg-background">
            <div className="py-2 text-center text-muted-foreground/70 text-[10px] sm:text-sm">
              <span className="">Horários</span>
            </div>
            {days.map((day) => (
              <div
                className="py-2 text-center text-muted-foreground/70 text-[10px] sm:text-sm data-today:font-medium data-today:text-foreground"
                data-today={isToday(day) || undefined}
                key={day.toString()}
              >
                <span aria-hidden="true" className="sm:hidden">
                  {format(day, "EEE", { locale: ptBR })[0]}{" "}
                  {format(day, "d", { locale: ptBR })}
                </span>
                <span className="hidden sm:inline md:hidden">
                  {format(day, "EEE d", { locale: ptBR })}
                </span>
                <span className="hidden md:inline">
                  {format(day, "EEE dd", { locale: ptBR })}
                </span>
              </div>
            ))}
          </div>

          {showAllDaySection && (
            <div className="border-border/70 border-b bg-muted/50">
              {trueAllDayEvents.length > 0 && (
                <div className="grid grid-cols-8">
                  <div className="relative border-border/70 border-r flex items-center justify-center p-1">
                    <span className="text-center text-[10px] text-muted-foreground/70 sm:text-xs">
                      Todo dia
                    </span>
                  </div>

                  <div
                    className="col-span-7 relative"
                    style={{ height: allDayBarData.sectionH }}
                  >
                    <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                      {days.map((day) => (
                        <div
                          key={day.toString()}
                          className="border-r last:border-r-0 border-border/70"
                          data-today={isToday(day) || undefined}
                        />
                      ))}
                    </div>

                    {allDayBarData.bars.map((bar) => {
                      const {
                        event,
                        colStart,
                        colSpan,
                        isFirstDay,
                        isLastDay,
                        slot,
                      } = bar;
                      const showTitle =
                        isFirstDay || (!isFirstDay && colStart === 0);

                      return (
                        <TooltipProviderBase delayDuration={400} key={event.id}>
                          <TooltipBase>
                            <TooltipTriggerBase asChild>
                              <div
                                className="absolute px-0.5"
                                style={{
                                  left: `calc(${(colStart / 7) * 100}% + 2px)`,
                                  width: `calc(${(colSpan / 7) * 100}% - 4px)`,
                                  top: EventGapAgenda + slot * rowH,
                                  height: EventHeightAgenda,
                                }}
                              >
                                <EventItemAgenda
                                  event={event}
                                  isFirstDay={isFirstDay}
                                  isLastDay={isLastDay}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEventClick(event, e);
                                  }}
                                  view="month"
                                  className="h-full"
                                >
                                  <span className="flex items-center gap-1 min-w-0 w-full">
                                    {!isFirstDay && colStart === 0 && (
                                      <span className="shrink-0 text-[11px] font-bold opacity-60">
                                        <CaretLeftIcon />
                                      </span>
                                    )}
                                    {showTitle && (
                                      <span className="truncate text-xs font-medium">
                                        {event.title}
                                      </span>
                                    )}
                                    {!isLastDay && colStart + colSpan === 7 && (
                                      <span className="shrink-0 ml-auto text-[11px] font-bold opacity-60">
                                        <CaretRightIcon />
                                      </span>
                                    )}
                                  </span>
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
              )}

              {multiDayTimedEvents.length > 0 && (
                <div
                  className={cn(
                    "grid grid-cols-8",
                    trueAllDayEvents.length > 0 && "border-t border-border/40",
                  )}
                >
                  <div className="relative border-border/70 border-r flex items-center justify-center p-1">
                    <span className="text-center text-[10px] text-muted-foreground/70 sm:text-xs">
                      Evento
                    </span>
                  </div>

                  <div
                    className="col-span-7 relative"
                    style={{ height: multiDayBarData.sectionH }}
                  >
                    <div className="absolute inset-0 grid grid-cols-7 pointer-events-none">
                      {days.map((day) => (
                        <div
                          key={day.toString()}
                          className="border-r last:border-r-0 border-border/70"
                          data-today={isToday(day) || undefined}
                        />
                      ))}
                    </div>

                    {multiDayBarData.bars.map((bar) => {
                      const {
                        event,
                        colStart,
                        colSpan,
                        isFirstDay,
                        isLastDay,
                        slot,
                      } = bar;
                      const eventStart = getEventStartDate(event) ?? new Date();
                      const showTitle =
                        isFirstDay || (!isFirstDay && colStart === 0);

                      return (
                        <TooltipProviderBase delayDuration={400} key={event.id}>
                          <TooltipBase>
                            <TooltipTriggerBase asChild>
                              <div
                                className="absolute px-0.5"
                                style={{
                                  left: `calc(${(colStart / 7) * 100}% + 2px)`,
                                  width: `calc(${(colSpan / 7) * 100}% - 4px)`,
                                  top: EventGapAgenda + slot * rowH,
                                  height: EventHeightAgenda,
                                }}
                              >
                                <EventItemAgenda
                                  event={event}
                                  isFirstDay={isFirstDay}
                                  isLastDay={isLastDay}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEventClick(event, e);
                                  }}
                                  view="month"
                                  className="h-full border-dashed"
                                >
                                  <span className="flex items-center gap-1 min-w-0 w-full">
                                    {!isFirstDay && colStart === 0 && (
                                      <span className="shrink-0 text-[11px] font-bold opacity-60">
                                        <CaretLeftIcon />
                                      </span>
                                    )}
                                    {showTitle && (
                                      <>
                                        {isFirstDay && (
                                          <span className="font-normal opacity-80 text-[10px] sm:text-[11px] bg-white/10 px-1 py-0.5 rounded-full">
                                            {format(eventStart, "HH:mm")}
                                          </span>
                                        )}
                                        <span className="truncate text-xs font-medium">
                                          {event.title}
                                        </span>
                                        {isFirstDay &&
                                          (() => {
                                            const evStart =
                                              getEventStartDate(event);
                                            const evEnd =
                                              getEventEndDate(event);
                                            if (!evStart || !evEnd) return null;
                                            const d =
                                              Math.round(
                                                (evEnd.getTime() -
                                                  evStart.getTime()) /
                                                  86400000,
                                              ) + 1;
                                            if (d < 2) return null;
                                            return (
                                              <span className="shrink-0 inline-flex items-end font-bold leading-none px-1 py-0.5 text-[10px]">
                                                {d}d
                                              </span>
                                            );
                                          })()}
                                      </>
                                    )}
                                    {!isLastDay && colStart + colSpan === 7 && (
                                      <span className="shrink-0 ml-auto text-[11px] font-bold opacity-60">
                                        <CaretRightIcon />
                                      </span>
                                    )}
                                  </span>
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
              )}
            </div>
          )}

          <div className="grid flex-1 grid-cols-8">
            <div className="grid auto-cols-fr border-border/70 border-r">
              {hours.map((hour, index) => (
                <div
                  className="relative min-h-[var(--week-cells-height)] border-border/70 border-b last:border-b-0"
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

            {days.map((day, dayIndex) => (
              <div
                className="relative grid auto-cols-fr border-border/70 border-r last:border-r-0"
                data-today={isToday(day) || undefined}
                key={day.toString()}
              >
                {(processedDayEvents[dayIndex] ?? []).map((positionedEvent) => {
                  const timeLabel = formatDurationAgenda(positionedEvent.event);

                  return (
                    <TooltipProviderBase key={positionedEvent.event.id}>
                      <TooltipBase delayDuration={250}>
                        <div
                          className="absolute z-10 px-0.5"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            height: `${positionedEvent.height}px`,
                            left: `${positionedEvent.left * 100}%`,
                            top: `${positionedEvent.top}px`,
                            width: `${positionedEvent.width * 100}%`,
                            zIndex: positionedEvent.zIndex,
                          }}
                        >
                          <TooltipTriggerBase asChild>
                            <div className="size-full">
                              <DraggableEvent
                                event={positionedEvent.event}
                                height={positionedEvent.height}
                                onClick={(e) =>
                                  handleEventClick(positionedEvent.event, e)
                                }
                                draggable={false}
                                showTime
                                view="week"
                                totalCols={positionedEvent.totalCols}
                              />
                            </div>
                          </TooltipTriggerBase>
                        </div>
                        <TooltipContentBase
                          side="right"
                          sideOffset={6}
                          className="max-w-[220px] space-y-0.5"
                        >
                          <p className="font-semibold text-sm leading-snug">
                            {positionedEvent.event.title}
                          </p>
                          <p className="text-xs opacity-90">{timeLabel}</p>
                          {positionedEvent.event.location && (
                            <p className="text-xs flex items-center gap-2">
                              <MapPinIcon size={15} />{" "}
                              {positionedEvent.event.location}
                            </p>
                          )}
                          {positionedEvent.event.description && (
                            <p className="text-xs opacity-75 line-clamp-2">
                              {positionedEvent.event.description}
                            </p>
                          )}
                        </TooltipContentBase>
                      </TooltipBase>
                    </TooltipProviderBase>
                  );
                })}
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
                                "top-[calc(var(--week-cells-height)/4*3)]",
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
        </div>
      </div>
      <UndatedEvents
        events={events}
        onEventSelect={onEventSelect}
        show={showUndatedEvents}
        className="my-4"
      />
    </div>
  );
}
