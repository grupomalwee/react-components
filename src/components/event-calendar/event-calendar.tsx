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
  addHoursToDate,
  CalendarDndProvider,
  type CalendarEvent,
  type CalendarView,
  DayView,
  EventDialog,
  EventGap,
  EventHeight,
  MonthView,
  WeekCellsHeight,
  WeekView,
} from "@/components/event-calendar";
import { cn } from "@/lib/utils";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuShortcutBase,
  DropDownMenuTriggerBase,
} from "@/components/ui/navigation/DropDownMenuBase";
import {
  ArrowDownIcon,
  CaretLeft,
  CaretRight,
  CalendarIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { ButtonBase } from "../ui/form/ButtonBase";

export interface EventCalendarProps {
  events?: CalendarEvent[];
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (eventId: string) => void;
  className?: string;
  initialView?: CalendarView;
}

export function EventCalendar({
  events = [],
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  className,
  initialView = "month",
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(initialView);
  const [isFading, setIsFading] = useState(false);

  const FADE_DURATION = 220; // ms - keep in sync with Tailwind duration class

  const changeView = useCallback(
    (next: CalendarView) => {
      if (next === view) return;
      setIsFading(true);
      window.setTimeout(() => {
        setView(next);
        requestAnimationFrame(() => setIsFading(false));
      }, FADE_DURATION);
    },
    [view]
  );
  // pagination (previous/next) animation state
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
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  // Add keyboard shortcuts for view switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input, textarea or contentEditable element
      // or if the event dialog is open
      if (
        isEventDialogOpen ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable)
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "m":
          changeView("month");
          break;
        // aceitar tanto 'w' (inglês) quanto 's' (pt-BR para "semana")
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
  }, [isEventDialogOpen, changeView]);

  const handlePrevious = () => {
    // animate page transition (previous)
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
    // animate page transition (next)
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
    console.log("Event selected:", event); // Debug log
    setSelectedEvent(event);
    setIsEventDialogOpen(true);
  };

  const handleEventCreate = (startTime: Date) => {
    console.log("Creating new event at:", startTime); // Debug log

    // Snap to 15-minute intervals
    const minutes = startTime.getMinutes();
    const remainder = minutes % 15;
    if (remainder !== 0) {
      if (remainder < 7.5) {
        // Round down to nearest 15 min
        startTime.setMinutes(minutes - remainder);
      } else {
        // Round up to nearest 15 min
        startTime.setMinutes(minutes + (15 - remainder));
      }
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
    }

    const newEvent: CalendarEvent = {
      allDay: false,
      end: addHoursToDate(startTime, 1),
      id: "",
      start: startTime,
      title: "",
    };
    setSelectedEvent(newEvent);
    setIsEventDialogOpen(true);
  };

  const handleEventSave = (event: CalendarEvent) => {
    if (event.id) {
      onEventUpdate?.(event);
      // Show toast notification when an event is updated
      toast(`Evento "${event.title}" atualizado`, {
        description: format(new Date(event.start), "d 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
        position: "bottom-left",
      });
    } else {
      onEventAdd?.({
        ...event,
        id: Math.random().toString(36).substring(2, 11),
      });
      // Show toast notification when an event is added
      toast(`Evento "${event.title}" adicionado`, {
        description: format(new Date(event.start), "d 'de' MMMM 'de' yyyy", {
          locale: ptBR,
        }),
        position: "bottom-left",
      });
    }
    setIsEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEventDelete = (eventId: string) => {
    const deletedEvent = events.find((e) => e.id === eventId);
    onEventDelete?.(eventId);
    setIsEventDialogOpen(false);
    setSelectedEvent(null);

    // Show toast notification when an event is deleted
    if (deletedEvent) {
      toast(`Evento "${deletedEvent.title}" excluído`, {
        description: format(
          new Date(deletedEvent.start),
          "d 'de' MMMM 'de' yyyy",
          { locale: ptBR }
        ),
        position: "bottom-left",
      });
    }
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    onEventUpdate?.(updatedEvent);

    // Show toast notification when an event is updated via drag and drop
    toast(`Evento "${updatedEvent.title}" movido`, {
      description: format(
        new Date(updatedEvent.start),
        "d 'de' MMMM 'de' yyyy",
        { locale: ptBR }
      ),
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
      // build string parts so month name can be capitalized
      const dayNum = format(currentDate, "d", { locale: ptBR });
      const month = capitalize(format(currentDate, "MMMM", { locale: ptBR }));
      const year = format(currentDate, "yyyy", { locale: ptBR });

      const short = `${dayNum} de ${month} de ${year}`;
      const long = `${format(currentDate, "EEE", { locale: ptBR })}, ${dayNum} de ${month} de ${year}`;

      return (
        <>
          <span aria-hidden="true" className="min-[480px]:hidden">
            {short}
          </span>
          <span aria-hidden="true" className="max-[479px]:hidden min-md:hidden">
            {short}
          </span>
          <span className="max-md:hidden">{long}</span>
        </>
      );
    }

    if (view === "agenda") {
      const start = currentDate;
      const end = addDays(currentDate, AgendaDaysToShow - 1);

      if (isSameMonth(start, end)) {
        return capitalize(format(start, "MMMM yyyy", { locale: ptBR }));
      }
      const s1 = capitalize(format(start, "MMM", { locale: ptBR }));
      const s2 = capitalize(format(end, "MMM yyyy", { locale: ptBR }));
      return `${s1} - ${s2}`;
    }

    return capitalize(format(currentDate, "MMMM yyyy", { locale: ptBR }));
  }, [currentDate, view]);

  return (
    <div
      className="flex flex-col rounded-lg border has-data-[slot=month-view]:flex-1 p-6"
      style={
        {
          "--event-gap": `${EventGap}px`,
          "--event-height": `${EventHeight}px`,
          "--week-cells-height": `${WeekCellsHeight}px`,
        } as React.CSSProperties
      }
    >
      <CalendarDndProvider onEventUpdate={handleEventUpdate}>
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
                <CaretLeft aria-hidden="true" size={16} />
              </ButtonBase>
              <ButtonBase
                aria-label="Próximo"
                onClick={handleNext}
                size="icon"
                variant="ghost"
              >
                <CaretRight aria-hidden="true" size={16} />
              </ButtonBase>
            </div>
            <h2 className="font-semibold text-sm sm:text-lg md:text-xl">
              {viewTitle}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <DropDownMenuBase>
              <DropDownMenuTriggerBase asChild>
                <ButtonBase
                  className="gap-1.5 max-[479px]:h-8"
                  variant="outline"
                >
                  <span>
                    <span aria-hidden="true" className="min-[480px]:hidden">
                      {(() => {
                        const labels: Record<string, string> = {
                          month: "Mês",
                          week: "Semana",
                          day: "Dia",
                          agenda: "Agenda",
                        };
                        return (labels[view] || view).charAt(0).toUpperCase();
                      })()}
                    </span>
                    <span className="max-[479px]:sr-only">
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
                  </span>
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="-me-1 opacity-60"
                    size={16}
                  />
                </ButtonBase>
              </DropDownMenuTriggerBase>
              <DropDownMenuContentBase align="end" className="min-w-32">
                <DropDownMenuItemBase onClick={() => changeView("month")}>
                  Mês <DropDownMenuShortcutBase>M</DropDownMenuShortcutBase>
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => changeView("week")}>
                  Semana <DropDownMenuShortcutBase>S</DropDownMenuShortcutBase>
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => changeView("day")}>
                  Dia <DropDownMenuShortcutBase>D</DropDownMenuShortcutBase>
                </DropDownMenuItemBase>
                <DropDownMenuItemBase onClick={() => changeView("agenda")}>
                  Agenda <DropDownMenuShortcutBase>A</DropDownMenuShortcutBase>
                </DropDownMenuItemBase>
              </DropDownMenuContentBase>
            </DropDownMenuBase>
            <ButtonBase
              className="max-[479px]:aspect-square max-[479px]:p-0!"
              onClick={() => {
                setSelectedEvent(null); // Ensure we're creating a new event
                setIsEventDialogOpen(true);
              }}
              size="sm"
            >
              <PlusIcon
                aria-hidden="true"
                className="sm:-ms-1 opacity-60"
                size={16}
              />
              <span className="max-sm:sr-only">Novo evento</span>
            </ButtonBase>
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
              onEventCreate={handleEventCreate}
              onEventSelect={handleEventSelect}
            />
          )}
          {view === "week" && (
            <WeekView
              currentDate={currentDate}
              events={events}
              onEventCreate={handleEventCreate}
              onEventSelect={handleEventSelect}
            />
          )}
          {view === "day" && (
            <DayView
              currentDate={currentDate}
              events={events}
              onEventCreate={handleEventCreate}
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

        <EventDialog
          event={selectedEvent}
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false);
            setSelectedEvent(null);
          }}
          onDelete={handleEventDelete}
          onSave={handleEventSave}
        />
      </CalendarDndProvider>
    </div>
  );
}
