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

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";

import {
  AgendaDaysToShow,
  AgendaView,
  CalendarDndProvider,
  type CalendarEvent,
  type CalendarView,
  DayView,
  EventGap,
  EventHeight,
  MonthView,
  WeekCellsHeight,
  WeekView,
} from "@/components/event-calendar-view";
import { cn } from "@/lib/utils";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuShortcutBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";
import {
  CalendarIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  Check,
} from "@phosphor-icons/react";
import { ButtonBase } from "../ui/form/ButtonBase";

export interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventUpdate?: (event: CalendarEvent) => void;
  className?: string;
  initialView?: CalendarView;
  mode?: "agenda-only";
  /** Optional initial date for the calendar (used by stories/tests) */
  initialDate?: Date;
}

export function EventAgenda({
  events = [],
  onEventUpdate,
  className,
  initialView = "month",
  mode,
  initialDate,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(
    (initialDate && new Date(initialDate)) || new Date()
  );
  const [view, setView] = useState<CalendarView>(initialView);
  const [isFading, setIsFading] = useState(false);

  const FADE_DURATION = 220;

  const changeView = useCallback(
    (next: CalendarView) => {
      if (mode === "agenda-only") return;
      if (next === view) return;
      setIsFading(true);
      window.setTimeout(() => {
        setView(next);
        requestAnimationFrame(() => setIsFading(false));
      }, FADE_DURATION);
    },
    [view, mode]
  );
  const [isPaging, setIsPaging] = useState(false);
  const [pageDirection, setPageDirection] = useState<"left" | "right" | null>(
    null
  );
  const PAGE_DURATION = 200;

  const pageTransition = useCallback(
    (applyDateChange: () => void, direction: "left" | "right") => {
      setIsPaging(true);
      setPageDirection(direction);
      window.setTimeout(() => {
        applyDateChange();
        requestAnimationFrame(() => {
          setIsPaging(false);
          setPageDirection(null);
        });
      }, PAGE_DURATION);
    },
    []
  );
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        isEventDialogOpen ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      if (mode === "agenda-only") return; // disable keyboard shortcuts in agenda-only

      switch (e.key.toLowerCase()) {
        case "m":
          changeView("month");
          break;
        case "w":
        case "s":
          changeView("week");
          break;
        case "d":
          changeView("day");
          break;
        case "a":
          changeView("agenda");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEventDialogOpen, changeView, mode]);

  // If running in agenda-only mode, force agenda view on mount
  useEffect(() => {
    if (mode === "agenda-only") setView("agenda");
  }, [mode]);

  const handlePrevious = () => {
    pageTransition(() => {
      if (view === "month") {
        setCurrentDate(subMonths(currentDate, 1));
      } else if (view === "week") {
        setCurrentDate(subWeeks(currentDate, 1));
      } else if (view === "day") {
        setCurrentDate(addDays(currentDate, -1));
      } else if (view === "agenda") {
        setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
      }
    }, "right");
  };

  const handleNext = () => {
    pageTransition(() => {
      if (view === "month") {
        setCurrentDate(addMonths(currentDate, 1));
      } else if (view === "week") {
        setCurrentDate(addWeeks(currentDate, 1));
      } else if (view === "day") {
        setCurrentDate(addDays(currentDate, 1));
      } else if (view === "agenda") {
        setCurrentDate(addDays(currentDate, AgendaDaysToShow));
      }
    }, "left");
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventSelect = (event: CalendarEvent) => {
    console.log("Event selected:", event);
    setIsEventDialogOpen(true);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    onEventUpdate?.(updatedEvent);

    const startDate = updatedEvent.start ?? new Date();

    toast(`Evento "${updatedEvent.title}" movido`, {
      description: format(startDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR }),
      position: "bottom-left",
    });
  };

  const viewTitle = useMemo(() => {
    const capitalize = (s: string) =>
      s && s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s;

    if (view === "month") {
      return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
    }

    if (view === "week") {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      if (isSameMonth(start, end)) {
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      }
      const s1 = capitalize(format(start, "MMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }

    if (view === "day") {
      const dayNum = format(currentDate, "d", { locale: ptBR });
      const month = capitalize(format(currentDate, "MMMM", { locale: ptBR }));
      const year = format(currentDate, "yyyy", { locale: ptBR });

      const short = `${dayNum} de ${month} de ${year}`;

      return (
        <>
          <span aria-hidden="true" className="min-[480px]:hidden">
            {short}
          </span>
          <span aria-hidden="true" className="max-[479px]:hidden min-md:hidden">
            {short}
          </span>
        </>
      );
    }

    if (view === "agenda") {
      const start = currentDate;
      const end = addDays(currentDate, AgendaDaysToShow - 1);

      if (isSameMonth(start, end)) {
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      }
      const s1 = capitalize(format(start, "MMMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }

    return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
  }, [currentDate, view]);

  const calendarContent = (
    <>
      <div
        className={cn(
          "flex items-center justify-between p-2 sm:p-4",
          className
        )}
      >
        <div className="flex items-center gap-1 sm:gap-4">
          <ButtonBase
            className="max-[479px]:aspect-square max-[479px]:p-0!"
            onClick={handleToday}
            variant="outline"
          >
            <CalendarIcon
              aria-hidden="true"
              className="min-[480px]:hidden"
              size={16}
            />
            <span className="max-[479px]:sr-only">Hoje</span>
          </ButtonBase>

          <div className="flex items-center sm:gap-2">
            <ButtonBase
              aria-label="Anterior"
              onClick={handlePrevious}
              size="icon"
              variant="ghost"
            >
              <CaretLeftIcon aria-hidden="true" size={16} />
            </ButtonBase>
            <ButtonBase
              aria-label="Próximo"
              onClick={handleNext}
              size="icon"
              variant="ghost"
            >
              <CaretRightIcon aria-hidden="true" size={16} />
            </ButtonBase>
          </div>
          <h2 className="font-semibold text-xl">{viewTitle}</h2>
        </div>
        <div className="flex items-center gap-2">
          <>
            <DropDownMenuBase>
              <DropDownMenuTriggerBase asChild>
                <ButtonBase
                  className="gap-2 px-3 py-1.5 max-[479px]:h-8"
                  variant="outline"
                >
                  <span className="flex items-center gap-2">
                    <span className="hidden min-[480px]:inline-block">
                      {(() => {
                        const labels: Record<string, string> = {
                          month: "Mês",
                          week: "Semana",
                          day: "Dia",
                          agenda: "Agenda",
                        };
                        return labels[view] || view;
                      })()}
                    </span>
                    <span className="min-[480px]:hidden">
                      {(() => {
                        const labels: Record<string, string> = {
                          month: "M",
                          week: "S",
                          day: "D",
                          agenda: "A",
                        };
                        return labels[view] || view;
                      })()}
                    </span>
                  </span>
                  <CaretDownIcon
                    aria-hidden="true"
                    className="-me-1 opacity-60"
                    size={16}
                  />
                </ButtonBase>
              </DropDownMenuTriggerBase>

              {mode === "agenda-only" ? null : (
                <DropDownMenuContentBase
                  align="end"
                  className="min-w-32 rounded-md p-1"
                >
                  <DropDownMenuItemBase
                    onClick={() => changeView("month")}
                    className={cn(
                      "flex items-center justify-between gap-2 px-3 py-2 rounded",
                      view === "month"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span> Mês </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {view === "month" ? (
                        <Check aria-hidden className="opacity-80" size={14} />
                      ) : (
                        <DropDownMenuShortcutBase>M</DropDownMenuShortcutBase>
                      )}
                    </div>
                  </DropDownMenuItemBase>

                  <DropDownMenuItemBase
                    onClick={() => changeView("week")}
                    className={cn(
                      "flex items-center justify-between gap-2 px-3 py-2 rounded",
                      view === "week"
                    )}
                  >
                    <div className="flex items-center gap-2">Semana</div>
                    <div className="flex items-center gap-2">
                      {view === "week" ? (
                        <Check aria-hidden className="opacity-80" size={14} />
                      ) : (
                        <DropDownMenuShortcutBase>S</DropDownMenuShortcutBase>
                      )}
                    </div>
                  </DropDownMenuItemBase>

                  <DropDownMenuItemBase
                    onClick={() => changeView("day")}
                    className={cn(
                      "flex items-center justify-between gap-2 px-3 py-2 rounded",
                      view === "day"
                    )}
                  >
                    <div className="flex items-center gap-2">Dia</div>
                    <div className="flex items-center gap-2">
                      {view === "day" ? (
                        <Check aria-hidden className="opacity-80" size={14} />
                      ) : (
                        <DropDownMenuShortcutBase>D</DropDownMenuShortcutBase>
                      )}
                    </div>
                  </DropDownMenuItemBase>

                  <DropDownMenuItemBase
                    onClick={() => changeView("agenda")}
                    className={cn(
                      "flex items-center justify-between gap-2 px-3 py-2 rounded",
                      view === "agenda"
                    )}
                  >
                    <div className="flex items-center gap-2">Agenda</div>
                    <div className="flex items-center gap-2">
                      {view === "agenda" ? (
                        <Check aria-hidden className="opacity-80" size={14} />
                      ) : (
                        <DropDownMenuShortcutBase>A</DropDownMenuShortcutBase>
                      )}
                    </div>
                  </DropDownMenuItemBase>
                </DropDownMenuContentBase>
              )}
            </DropDownMenuBase>
          </>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-200 ease-in-out",
          isFading
            ? "opacity-0 -translate-y-2 pointer-events-none"
            : isPaging
            ? pageDirection === "left"
              ? "-translate-x-4 opacity-0 pointer-events-none"
              : "translate-x-4 opacity-0 pointer-events-none"
            : "opacity-100 translate-y-0"
        )}
        aria-live="polite"
      >
        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onEventSelect={handleEventSelect}
          />
        )}
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventSelect={handleEventSelect}
          />
        )}
        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventSelect={handleEventSelect}
          />
        )}
        {view === "agenda" && (
          <AgendaView
            currentDate={currentDate}
            events={events}
            onEventSelect={handleEventSelect}
          />
        )}
      </div>
    </>
  );

  return (
    <div
      className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1 px-6"
      style={
        {
          "--event-gap": `${EventGap}px`,
          "--event-height": `${EventHeight}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={handleEventUpdate}>
        {calendarContent}
      </CalendarDndProvider>
    </div>
  );
}
