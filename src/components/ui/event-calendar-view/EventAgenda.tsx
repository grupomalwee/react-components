"use client";

import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  endOfWeek,
  format,
  isSameMonth,
  startOfWeek,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import React, { useMemo, useState } from "react";
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
  YearViewAgenda,
} from "@/components/ui/event-calendar-view/";
import { cn } from "@/lib/utils";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { ButtonBase } from "../form/ButtonBase";
import { Select, type SelectItem } from "@/components/ui/selects/Select";

export interface EventCalendarProps {
  events?: CalendarEventAgenda[];
  onEventUpdate?: (event: CalendarEventAgenda) => void;
  className?: string;
  initialView?: CalendarViewAgenda;
  initialDate?: Date;
  optionsViewEvents?: CalendarViewAgenda[], 
  onClick?:
    | ((event: CalendarEventAgenda, e?: React.MouseEvent) => void)
    | React.ReactElement<ModalLikeProps>;
  showYearView?: boolean;
  noTime?: boolean;
  onlyDay?: boolean;
  onlyMonth?: boolean;
  onlyWeek?: boolean;
  onlyAgenda?: boolean;
  onlyYear?: boolean;
  allowCellClick?: boolean;
}

export interface ModalLikeProps {
  event?: CalendarEventAgenda;
  onClose?: () => void;
  [key: string]: unknown;
}

export function EventAgenda({
  events = [],
  optionsViewEvents,
  onEventUpdate,
  className,
  initialView = "month",
  initialDate,
  onClick,
  showYearView = false,
  noTime = false,
  onlyDay,
  onlyMonth,
  onlyWeek,
  onlyAgenda,
  onlyYear,
  allowCellClick = true,
}: EventCalendarProps) {
  const lockedView: CalendarViewAgenda | undefined = onlyDay
    ? "day"
    : onlyMonth
      ? "month"
      : onlyWeek
        ? "week"
        : onlyAgenda
          ? "agenda"
          : onlyYear
            ? "year"
            : undefined;

  const [currentDate, setCurrentDate] = useState(
    (initialDate && new Date(initialDate)) || new Date(),
  );
  const [view, setView] = useState<CalendarViewAgenda>(
    lockedView || initialView,
  );
  const [selectedEvent, setSelectedEvent] =
    useState<CalendarEventAgenda | null>(null);

  const activeView = lockedView || view;

  const goPrevious = () => {
    if (activeView === "month") setCurrentDate((d) => subMonths(d, 1));
    else if (activeView === "week") setCurrentDate((d) => subWeeks(d, 1));
    else if (activeView === "day") setCurrentDate((d) => addDays(d, -1));
    else if (activeView === "agenda")
      setCurrentDate((d) => addDays(d, -AgendaDaysToShowAgenda));
    else if (activeView === "year") setCurrentDate((d) => subYears(d, 1));
  };

  const goNext = () => {
    if (activeView === "month") setCurrentDate((d) => addMonths(d, 1));
    else if (activeView === "week") setCurrentDate((d) => addWeeks(d, 1));
    else if (activeView === "day") setCurrentDate((d) => addDays(d, 1));
    else if (activeView === "agenda")
      setCurrentDate((d) => addDays(d, AgendaDaysToShowAgenda));
    else if (activeView === "year") setCurrentDate((d) => addYears(d, 1));
  };

  const handleEventSelect = (
    event: CalendarEventAgenda,
    e?: React.MouseEvent,
  ) => {
    try {
      if (typeof onClick === "function") {
        (onClick as (ev: CalendarEventAgenda, e?: React.MouseEvent) => void)(
          event,
          e,
        );
        return;
      }

      if (React.isValidElement(onClick)) {
        setSelectedEvent(event);
        return;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventUpdate = (updatedEvent: CalendarEventAgenda) => {
    if (updatedEvent.start == null) {
      console.warn(
        `Ignored update for event ${updatedEvent.id} because start is null`,
      );
      return;
    }

    onEventUpdate?.(updatedEvent);
    const startDate = new Date(updatedEvent.start as Date | string | number);
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
      year: { full: "Ano", short: "An" },
    };
    const entry = labels[v] || { full: v, short: v };
    return condensed ? entry.short : entry.full;
  };

  const viewTitle = useMemo(() => {
    const capitalize = (s: string) =>
      s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
    if (activeView === "month")
      return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
    if (activeView === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      if (isSameMonth(start, end))
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      const s1 = capitalize(format(start, "MMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }
    if (activeView === "day")
      return capitalize(
        format(currentDate, "EEEE, d 'de' MMMM", { locale: ptBR }),
      );
    if (activeView === "agenda") {
      const start = currentDate;
      return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
    }
    if (activeView === "year") {
      return format(currentDate, "yyyy");
    }
    return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
  }, [currentDate, activeView]);

  let availableViews: CalendarViewAgenda[];
  if(optionsViewEvents?.length == 0 || !optionsViewEvents)
    availableViews = showYearView
    ? ["year", "month", "week", "day", "agenda"]
    : ["month", "week", "day", "agenda"];
  else availableViews = [...new Set(optionsViewEvents.map((options) => options))];

  const selectItems: SelectItem<CalendarViewAgenda>[] = availableViews.map(
    (v) => ({
      label: viewLabel(v),
      value: v,
    }),
  );
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1 px-6 py-2 border-border",
        className,
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
          <div className="flex items-center gap-1 sm:gap-4 min-w-0">
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
            <h2 className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl min-w-0 truncate sm:whitespace-normal">
              {viewTitle}
            </h2>
          </div>

          {!lockedView && (
            <div className="flex items-center gap-2">
              <Select<CalendarViewAgenda>
                selected={activeView}
                onChange={(v) => {
                  setView(v);
                }}
                items={selectItems as SelectItem<CalendarViewAgenda>[]}
                placeholder={viewLabel(activeView)}
                className="min-w-24"
                hideClear={true}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col transition-all duration-200 ease-in-out">
          {activeView === "month" && (
            <MonthViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              noTime={noTime}
              onEventCreate={
                allowCellClick
                  ? (d: Date) =>
                      onEventUpdate?.({
                        start: d,
                        end: d,
                        title: "Novo Evento",
                        id: crypto.randomUUID(),
                      })
                  : undefined
              }
            />
          )}
          {activeView === "week" && (
            <WeekViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              noTime={noTime}
              onEventCreate={
                allowCellClick
                  ? (d: Date) =>
                      onEventUpdate?.({
                        start: d,
                        end: d,
                        title: "Novo Evento",
                        id: crypto.randomUUID(),
                      })
                  : undefined
              }
            />
          )}
          {activeView === "day" && (
            <DayViewAgenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              noTime={noTime}
              onEventCreate={
                allowCellClick
                  ? (d: Date) =>
                     console.log(d)
                  : undefined
              }
            />
          )}
          {activeView === "agenda" && (
            <Agenda
              currentDate={currentDate}
              events={events}
              onEventSelect={handleEventSelect}
              noTime={noTime}
              onEventCreate={
                allowCellClick
                  ? (d: Date) =>
                      onEventUpdate?.({
                        start: d,
                        end: d,
                        title: "Novo Evento",
                        id: crypto.randomUUID(),
                      })
                  : undefined
              }
            />
          )}
          {activeView === "year" && (
            <YearViewAgenda
              currentDate={currentDate}
              events={events}
              onMonthSelect={(monthDate: Date) => {
                setCurrentDate(monthDate);
                if (!lockedView) {
                  setView("month");
                }
              }}
            />
          )}
        </div>
      </CalendarDndProviderAgenda>
      {selectedEvent && React.isValidElement(onClick)
        ? React.cloneElement(onClick as React.ReactElement<ModalLikeProps>, {
            event: selectedEvent,
            onClose: () => setSelectedEvent(null),
            noTime,
          })
        : null}
    </div>
  );
}
