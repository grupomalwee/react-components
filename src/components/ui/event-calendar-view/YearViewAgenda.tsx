"use client";

import {
  eachMonthOfInterval,
  endOfYear,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import type { CalendarEventAgenda } from "./types";
import { getEventStartDate } from "./utils";

interface YearViewProps {
  currentDate: Date;
  events: CalendarEventAgenda[];
  onMonthSelect: (date: Date) => void;
}

export function YearViewAgenda({
  currentDate,
  events,
  onMonthSelect,
}: YearViewProps) {
  const start = startOfYear(currentDate);
  const end = endOfYear(currentDate);

  const months = useMemo(() => {
    return eachMonthOfInterval({ start, end });
  }, [start, end]);

  const eventDates = useMemo(() => {
    return new Set(
      events
        .map((e) => getEventStartDate(e))
        .filter((d): d is Date => !!d)
        .map((d) => format(d, "yyyy-MM-dd")),
    );
  }, [events]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 overflow-y-auto max-h-[calc(100vh-200px)] lg:max-h-[750px] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
      {months.map((month) => (
        <div
          key={month.toString()}
          className="flex flex-col p-4 rounded-lg border border-border/70 bg-card hover:bg-muted/5 transition-colors cursor-pointer group"
          onClick={() => onMonthSelect(month)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm capitalize text-foreground group-hover:text-primary transition-colors">
              {format(month, "MMMM", { locale: ptBR })}
            </h3>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
              Detalhes
            </span>
          </div>
          <MonthMiniGrid month={month} eventDates={eventDates} />
        </div>
      ))}
    </div>
  );
}

function MonthMiniGrid({
  month,
  eventDates,
}: {
  month: Date;
  eventDates: Set<string>;
}) {
  const days = useMemo(() => {
    const monthStart = startOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const daysArr = [];
    const curr = new Date(calendarStart);
    for (let i = 0; i < 42; i++) {
      daysArr.push(new Date(curr));
      curr.setDate(curr.getDate() + 1);
    }
    return daysArr;
  }, [month]);

  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="grid grid-cols-7 gap-y-1 text-[11px]">
      {weekdays.map((wd, i) => (
        <div
          key={`${wd}-${i}`}
          className="text-center font-medium text-muted-foreground/70 py-1"
        >
          {wd}
        </div>
      ))}
      {days.map((day) => {
        const isCurrentMonth = day.getMonth() === month.getMonth();
        const dateStr = format(day, "yyyy-MM-dd");
        const hasEvent = eventDates.has(dateStr);
        const isDayToday = isToday(day);

        return (
          <div
            key={day.toString()}
            className={cn(
              "relative flex items-center justify-center p-1 rounded-sm aspect-square transition-colors",
              !isCurrentMonth && "opacity-0 pointer-events-none",
              isDayToday && "bg-blue-500 text-white font-semibold rounded-lg",
              isCurrentMonth &&
                !isDayToday &&
                "hover:bg-muted/50 text-foreground",
            )}
          >
            {isCurrentMonth && format(day, "d")}
            {isCurrentMonth && hasEvent && !isDayToday && (
              <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
            )}
          </div>
        );
      })}
    </div>
  );
}
