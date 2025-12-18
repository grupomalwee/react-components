"use client";

import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  isSameMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  AgendaDaysToShowAgenda,
  Agenda,
  CalendarDndProviderAgenda,
  type CalendarEventAgenda,
  type CalendarViewAgenda,
  DayViewAgenda,
  EventGapAgenda,
  EventHeightAgenda,
  MonthViewAgenda,
  WeekCellsHeightAgenda,
  WeekViewAgenda,
} from "@/components/event-calendar-view";
import { cn } from "@/lib/utils";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { ButtonBase } from "../ui/form/ButtonBase";
import { Select } from "@/components/selects/Select";

export interface EventCalendarProps {
  events?: CalendarEventAgenda[];
  onEventUpdate?: (event: CalendarEventAgenda) => void;
  className?: string;
  initialView?: CalendarViewAgenda;
  initialDate?: Date;
  
}

export function EventAgenda({
  events = [],
  onEventUpdate,
  className,
  initialView = "month",
  initialDate,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(
    (initialDate && new Date(initialDate)) || new Date()
  );
  const [view, setView] = useState<CalendarViewAgenda>(initialView);

  // Basic navigation helpers
  const goPrevious = () => {
    if (view === "month") setCurrentDate((d) => subMonths(d, 1));
    else if (view === "week") setCurrentDate((d) => subWeeks(d, 1));
    else if (view === "day") setCurrentDate((d) => addDays(d, -1));
    else if (view === "agenda")
      setCurrentDate((d) => addDays(d, -AgendaDaysToShowAgenda));
  };

  const goNext = () => {
    if (view === "month") setCurrentDate((d) => addMonths(d, 1));
    else if (view === "week") setCurrentDate((d) => addWeeks(d, 1));
    else if (view === "day") setCurrentDate((d) => addDays(d, 1));
    else if (view === "agenda")
      setCurrentDate((d) => addDays(d, AgendaDaysToShowAgenda));
  };

  const handleEventSelect = (event: CalendarEventAgenda) => {
    // keep simple: open dialog handled elsewhere
    console.log("Event selected:", event);
  };

  const handleEventUpdate = (updatedEvent: CalendarEventAgenda) => {
    onEventUpdate?.(updatedEvent);
    const startDate = updatedEvent.start ?? new Date();
    toast(`Evento "${updatedEvent.title}" movido`, {
      description: format(startDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR }),
      position: "bottom-left",
    });
  };

  const viewLabel = (v: CalendarViewAgenda, condensed = false) => {
    const labels: Record<string, { full: string; short: string }> = {
      month: { full: "Mês", short: "M" },
      week: { full: "Semana", short: "S" },
      day: { full: "Dia", short: "D" },
      agenda: { full: "Agenda", short: "A" },
    };
    const entry = labels[v] || { full: v, short: v };
    return condensed ? entry.short : entry.full;
  };

  const viewTitle = useMemo(() => {
    const capitalize = (s: string) =>
      s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    if (view === "month")
      return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
    if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      if (isSameMonth(start, end))
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      const s1 = capitalize(format(start, "MMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }
    if (view === "day")
      return format(currentDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
    if (view === "agenda") {
      const start = currentDate;
      const end = addDays(currentDate, AgendaDaysToShowAgenda - 1);
      if (isSameMonth(start, end))
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      const s1 = capitalize(format(start, "MMMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }
    return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
  }, [currentDate, view]);

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1 px-6 py-2",
        className
      )}
      style={
        {
          "--event-gap": `${EventGapAgenda}px`,
          "--event-height": `${EventHeightAgenda}px`,
          "--week-cells-height": `${WeekCellsHeightAgenda}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProviderAgenda onEventUpdate={handleEventUpdate}>
        <div className="flex items-center justify-between p-2 sm:p-4">
          <div className="flex items-center gap-1 sm:gap-4">
            <div className="flex items-center sm:gap-2">
              <ButtonBase
                aria-label="Anterior"
                onClick={goPrevious}
                size="icon"
                variant="ghost"
              >
                <CaretLeftIcon aria-hidden size={16} />
              </ButtonBase>
              <ButtonBase
                aria-label="Próximo"
                onClick={goNext}
                size="icon"
                variant="ghost"
              >
                <CaretRightIcon aria-hidden size={16} />
              </ButtonBase>
            </div>
            <h2 className="font-semibold text-md sm:text-xl">{viewTitle}</h2>
          </div>

          <div className="flex items-center gap-2">
            <Select<CalendarViewAgenda>
              selected={view}
              onChange={(v) => {
                setView(v);
              }}
              items={(
                ["month", "week", "day", "agenda"] as CalendarViewAgenda[]
              ).map((v) => ({
                label: viewLabel(v),
                value: v,
              }))}
              className="gap-2 px-3 py-1.5 max-[479px]:h-8"
              placeholder={viewLabel(view)}
            />
          </div>
        </div>

        <div
          className="flex flex-1 flex-col transition-all duration-200 ease-in-out"
          aria-live="polite"
        >
          {view === "month" && (
            <MonthViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
          {view === "week" && (
            <WeekViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
          {view === "day" && (
            <DayViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
          {view === "agenda" && (
            <Agenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
            />
          )}
        </div>
      </CalendarDndProviderAgenda>
    </div>
  );
}
