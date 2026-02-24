"use client";

import {
  differenceInCalendarDays,
  format,
  isSameDay,
  max,
  min,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import type React from "react";

import {
  EventItemAgenda,
  CalendarEventAgenda,
  getEventStartDate,
  getEventEndDate,
  isMultiDayEventAgenda,
} from "@/components/ui/event-calendar-view/";
import { cn } from "@/lib/utils";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/feedback/TooltipBase";
import { CaretLeftIcon, CaretRightIcon, MapPinIcon } from "@phosphor-icons/react";

export interface MultiDayBar {
  event: CalendarEventAgenda;
  colStart: number;
  colSpan: number;
  isFirstDay: boolean;
  isLastDay: boolean;
  slot: number;
}

function clampToWeek(date: Date, weekStart: Date, weekEnd: Date): Date {
  return max([min([date, weekEnd]), weekStart]);
}

function dayCol(date: Date, weekStart: Date): number {
  const diff = Math.round(
    (date.getTime() - weekStart.getTime()) / (1000 * 60 * 60 * 24),
  );
  return Math.max(0, Math.min(6, diff));
}

export function computeMultiDayBars(
  events: CalendarEventAgenda[],
  weekDays: Date[],
): MultiDayBar[] {
  const weekStart = weekDays[0];
  const weekEnd = weekDays[6];

  const multiDayEvents = events.filter((ev) => {
    if (!isMultiDayEventAgenda(ev)) return false;
    const start = getEventStartDate(ev);
    const end = getEventEndDate(ev) ?? start;
    if (!start || !end) return false;
    return start <= weekEnd && end >= weekStart;
  });

  const sorted = [...multiDayEvents].sort((a, b) => {
    const aS = getEventStartDate(a) ?? new Date(0);
    const bS = getEventStartDate(b) ?? new Date(0);
    const aE = getEventEndDate(a) ?? aS;
    const bE = getEventEndDate(b) ?? bS;
    const diff = bE.getTime() - bS.getTime() - (aE.getTime() - aS.getTime());
    return diff !== 0 ? diff : aS.getTime() - bS.getTime();
  });

  const slotOccupancy: boolean[][] = [];
  const bars: MultiDayBar[] = [];

  for (const event of sorted) {
    const evStart = getEventStartDate(event)!;
    const evEnd = getEventEndDate(event) ?? evStart;
    const cStart = clampToWeek(evStart, weekStart, weekEnd);
    const cEnd = clampToWeek(evEnd, weekStart, weekEnd);
    const sc = dayCol(cStart, weekStart);
    const ec = dayCol(cEnd, weekStart);

    let slot = 0;
    for (;;) {
      if (!slotOccupancy[slot]) slotOccupancy[slot] = Array(7).fill(false);
      let free = true;
      for (let c = sc; c <= ec; c++) {
        if (slotOccupancy[slot][c]) {
          free = false;
          break;
        }
      }
      if (free) {
        for (let c = sc; c <= ec; c++) slotOccupancy[slot][c] = true;
        break;
      }
      slot++;
    }

    bars.push({
      event,
      colStart: sc,
      colSpan: ec - sc + 1,
      isFirstDay: isSameDay(cStart, evStart),
      isLastDay: isSameDay(cEnd, evEnd),
      slot,
    });
  }

  return bars;
}

function formatDuration(event: CalendarEventAgenda): string {
  const start = getEventStartDate(event);
  const end = getEventEndDate(event);
  if (!start) return "";
  const fmt = (d: Date) => format(d, "d 'de' MMM", { locale: ptBR });
  if (!end || isSameDay(start, end)) {
    return (
      fmt(start) +
      (event.allDay ? " · Dia todo" : " · " + format(start, "HH:mm"))
    );
  }
  const days = differenceInCalendarDays(end, start) + 1;
  return `${fmt(start)} → ${fmt(end)} · ${days} dias`;
}

interface MultiDayOverlayProps {
  bars: MultiDayBar[];
  weekIndex: number;
  hoveredEventId: string | null;
  onHover: (id: string | null) => void;
  onEventSelect: (event: CalendarEventAgenda, e: React.MouseEvent) => void;
}

export function MultiDayOverlay({
  bars,
  weekIndex,
  hoveredEventId,
  onHover,
  onEventSelect,
}: MultiDayOverlayProps) {
  if (bars.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none mt-1">
      {bars.map((bar) => {
        const { event, colStart, colSpan, isFirstDay, isLastDay, slot } = bar;
        const isHovered = hoveredEventId === event.id;
        const eventStart =
          getEventStartDate(event) ?? getEventEndDate(event) ?? new Date();
        const continuesFromPrev = !isFirstDay;
        const continuesToNext = !isLastDay;

        return (
          <TooltipProviderBase
            key={`bar-${event.id}-w${weekIndex}`}
            delayDuration={400}
          >
            <TooltipBase>
              <TooltipTriggerBase asChild>
                <div
                  className="absolute pointer-events-auto px-1"
                  style={{
                    left: continuesFromPrev
                      ? `${(colStart / 7) * 100}%`
                      : `calc(${(colStart / 7) * 100}% + 3px)`,
                    right: continuesToNext
                      ? `${100 - ((colStart + colSpan) / 7) * 100}%`
                      : `calc(${100 - ((colStart + colSpan) / 7) * 100}% + 3px)`,
                    top: `calc(34px + ${slot} * (var(--event-height) + var(--event-gap)) + var(--event-gap))`,
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => onHover(event.id)}
                  onMouseLeave={() => onHover(null)}
                >
                  <EventItemAgenda
                    event={event}
                    isFirstDay={isFirstDay}
                    isLastDay={isLastDay}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventSelect(event, e);
                    }}
                    view="month"
                    className={cn("w-full", isHovered && "[filter:brightness(0.92)]")}
                  >
                    <span className="flex items-center gap-0.5 w-full min-w-0">
                      {continuesFromPrev && (
                        <span className="shrink-0 opacity-50 leading-none mr-0.5 flex items-center">
                          <CaretLeftIcon size={10} weight="bold" />
                        </span>
                      )}

                      {!event.allDay && isFirstDay && (
                        <span className="shrink-0 font-normal opacity-75 text-[10px] bg-white/15 px-1 py-0.5 rounded-full leading-none">
                          {format(eventStart, "HH:mm")}
                        </span>
                      )}

                      <span className="font-semibold text-[11px] sm:text-xs truncate min-w-0 leading-none flex-1">
                        {event.title}
                      </span>

                      {isFirstDay &&
                        (() => {
                          const evStart = getEventStartDate(event);
                          const evEnd = getEventEndDate(event);
                          if (!evStart || !evEnd) return null;
                          const totalDays =
                            differenceInCalendarDays(evEnd, evStart) + 1;
                          if (totalDays < 2) return null;
                          return (
                            <span className="shrink-0 font-bold leading-none text-[10px] opacity-55 ml-0.5">
                              {totalDays}d
                            </span>
                          );
                        })()}

                      {continuesToNext && (
                        <span className="shrink-0 opacity-50 leading-none ml-0.5 flex items-center">
                          <CaretRightIcon size={10} weight="bold" />
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
                  {formatDuration(event)}
                </p>
                {event.location && (
                  <p className="opacity-60 mt-0.5 truncate text-[11px] max-w-[200px]">
                    <MapPinIcon size={15} /> {event.location}
                  </p>
                )}
              </TooltipContentBase>
            </TooltipBase>
          </TooltipProviderBase>
        );
      })}
    </div>
  );
}
