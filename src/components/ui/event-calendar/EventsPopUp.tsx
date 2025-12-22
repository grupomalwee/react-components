"use client";

import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

import { type CalendarEvent, EventItem } from "@/components/ui/event-calendar";
import { XIcon } from "@phosphor-icons/react";

interface EventsPopupProps {
  date: Date;
  events: CalendarEvent[];
  position: { top: number; left: number };
  onClose: () => void;
  onEventSelect?: (event: CalendarEvent) => void;
}

export function EventsPopup({
  date,
  events,
  position,
  onClose,
  onEventSelect,
}: EventsPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  const handleEventClick = (event: CalendarEvent) => {
    if (onEventSelect) onEventSelect(event);
    onClose();
  };

  // Adjust position to ensure popup stays within viewport
  const adjustedPosition = useMemo(() => {
    const positionCopy = { ...position };

    // Check if we need to adjust the position to fit in the viewport
    if (popupRef.current) {
      const rect = popupRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Adjust horizontally if needed
      if (positionCopy.left + rect.width > viewportWidth) {
        positionCopy.left = Math.max(0, viewportWidth - rect.width);
      }

      // Adjust vertically if needed
      if (positionCopy.top + rect.height > viewportHeight) {
        positionCopy.top = Math.max(0, viewportHeight - rect.height);
      }
    }

    return positionCopy;
  }, [position]);

  return (
    <motion.div
      className="absolute z-50 max-h-96 w-80 overflow-auto rounded-md border bg-background shadow-lg"
      ref={popupRef}
      style={{
        left: `${adjustedPosition.left}px`,
        top: `${adjustedPosition.top}px`,
      }}
      initial={{ opacity: 0, scale: 0.98, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -6 }}
      transition={{ duration: 0.18 }}
    >
      <div className="sticky top-0 flex items-center justify-between border-b bg-background p-3">
        <h3 className="font-medium">
          {(() => {
            const dayNum = format(date, "d", { locale: ptBR });
            const month = format(date, "MMMM", { locale: ptBR });
            const year = format(date, "yyyy", { locale: ptBR });
            const monthCap = month.charAt(0).toUpperCase() + month.slice(1);
            return `${dayNum} de ${monthCap} de ${year}`;
          })()}
        </h3>
        <button
          aria-label="Fechar"
          className="rounded-full p-1 hover:bg-muted"
          onClick={onClose}
          type="button"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-2 p-3">
        {events.length === 0 ? (
          <div className="py-2 text-muted-foreground text-sm">
            Nenhum evento
          </div>
        ) : (
          events.map((event) => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const isFirstDay = isSameDay(date, eventStart);
            const isLastDay = isSameDay(date, eventEnd);

            const clickable = Boolean(onEventSelect);

            return (
              <div
                className={clickable ? "cursor-pointer" : "cursor-default"}
                key={event.id}
                onClick={clickable ? () => handleEventClick(event) : undefined}
              >
                <EventItem
                  event={event}
                  isFirstDay={isFirstDay}
                  isLastDay={isLastDay}
                  view="agenda"
                  className={
                    clickable
                      ? undefined
                      : "cursor-default hover:shadow-none hover:scale-100"
                  }
                />
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
