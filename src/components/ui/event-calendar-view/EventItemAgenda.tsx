"use client";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { differenceInMinutes, format, isPast } from "date-fns";
import { useMemo } from "react";

import {
  type CalendarEventAgenda,
  getBorderRadiusClassesAgenda,
  getEventColorClassesAgenda,
  getEventStartDate,
  getEventEndDate,
} from "@/components/ui/event-calendar-view/";
import { cn } from "@/lib/utils";

const formatTimeWithOptionalMinutes = (date: Date) => {
  return format(date, "HH:mm");
};

interface EventWrapperProps {
  event: CalendarEventAgenda;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  children: React.ReactNode;
  currentTime?: Date;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  ariaLabel?: string;
}

function EventWrapper({
  event,
  isFirstDay = true,
  isLastDay = true,
  isDragging,
  onClick,
  className,
  children,
  currentTime,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
  ariaLabel,
}: EventWrapperProps) {
  const wrapperStart = getEventStartDate(event);
  const wrapperEnd = getEventEndDate(event);
  const hasValidTimeForWrapper = !!wrapperStart || !!wrapperEnd;

  const displayEnd = (() => {
    if (wrapperStart && wrapperEnd) {
      return currentTime
        ? new Date(
            new Date(currentTime).getTime() +
              (wrapperEnd.getTime() - wrapperStart.getTime())
          )
        : wrapperEnd;
    }
    if (wrapperStart && !wrapperEnd) {
      return currentTime ? new Date(currentTime) : wrapperStart;
    }
    if (!wrapperStart && wrapperEnd) {
      return currentTime ? new Date(currentTime) : wrapperEnd;
    }
    return undefined;
  })();

  const isEventInPast = displayEnd ? isPast(displayEnd) : false;

  const colorClasses = hasValidTimeForWrapper
    ? getEventColorClassesAgenda(event.color)
    : "bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 shadow-none";

  return (
    <button
      className={cn(
        "flex w-full select-none overflow-hidden px-3 py-1 text-left font-medium outline-none transition-transform duration-150 ease-out backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-dragging:cursor-grabbing data-past-event:line-through data-dragging:shadow-lg sm:px-3 rounded-lg shadow-sm hover:shadow-md border",
        colorClasses,
        getBorderRadiusClassesAgenda(isFirstDay, isLastDay),
        className
      )}
      data-dragging={isDragging || undefined}
      data-past-event={isEventInPast || undefined}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      aria-label={ariaLabel}
      type="button"
      {...dndListeners}
      {...dndAttributes}
    >
      {children}
    </button>
  );
}

interface EventItemProps {
  event: CalendarEventAgenda;
  view: "month" | "week" | "day" | "agenda";
  agendaOnly?: boolean;
  isDragging?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  showTime?: boolean;
  currentTime?: Date;
  isFirstDay?: boolean;
  isLastDay?: boolean;
  children?: React.ReactNode;
  className?: string;
  dndListeners?: SyntheticListenerMap;
  dndAttributes?: DraggableAttributes;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
}

export function EventItemAgenda({
  event,
  view,
  onClick,
  showTime,
  currentTime,
  isFirstDay = true,
  isLastDay = true,
  children,
  className,
  dndListeners,
  dndAttributes,
  onMouseDown,
  onTouchStart,
  agendaOnly = false,
}: EventItemProps) {
  const eventColor = event.color;
  const startDate = getEventStartDate(event);
  const endDate = getEventEndDate(event);
  const hasValidTime = !!startDate || !!endDate;

  const colorClasses = hasValidTime
    ? getEventColorClassesAgenda(eventColor)
    : "bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 shadow-none";

  const displayStart = useMemo(() => {
    if (!hasValidTime) return undefined;
    if (startDate) return currentTime || startDate;
    if (endDate) return currentTime || endDate;
    return undefined;
  }, [currentTime, startDate, endDate, hasValidTime]);

  const displayEnd = useMemo(() => {
    if (!hasValidTime) return undefined;
    if (endDate) {
      return currentTime
        ? new Date(
            new Date(currentTime).getTime() +
              (startDate ? endDate.getTime() - startDate.getTime() : 0)
          )
        : endDate;
    }
    if (startDate) {
      return currentTime ? new Date(currentTime) : startDate;
    }
    return undefined;
  }, [currentTime, startDate, endDate, hasValidTime]);

  const durationMinutes = useMemo(() => {
    if (!hasValidTime || !displayStart || !displayEnd) return 0;
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd, hasValidTime]);

  const getEventTime = () => {
    if (!hasValidTime) return "";
    if (event.allDay) return "All day";

    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart as Date);
    }

    return `${formatTimeWithOptionalMinutes(
      displayStart as Date
    )} - ${formatTimeWithOptionalMinutes(displayEnd as Date)}`;
  };
  let ariaLabel: string;
  if (!hasValidTime) {
    ariaLabel = event.title;
  } else if (event.allDay) {
    ariaLabel = `${event.title}, All day`;
  } else if (durationMinutes < 45) {
    ariaLabel = `${event.title}, ${formatTimeWithOptionalMinutes(
      displayStart as Date
    )}`;
  } else {
    ariaLabel = `${event.title}, ${formatTimeWithOptionalMinutes(
      displayStart as Date
    )} - ${formatTimeWithOptionalMinutes(displayEnd as Date)}`;
  }

  if (view === "month") {
    return (
      <EventWrapper
        className={cn(
          "mt-[var(--event-gap)] h-[var(--event-height)] items-center sm:text-xs",
          className
        )}
        currentTime={currentTime}
        dndAttributes={dndAttributes}
        dndListeners={dndListeners}
        event={event}
        ariaLabel={ariaLabel}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        onClick={onClick}
      >
        {children || (
          <span className="flex items-center gap-2 truncate min-w-0">
            {!event.allDay && hasValidTime && displayStart && (
              <span className="truncate text-sm sm:text-base md:text-lg lg:text-xl opacity-80 bg-white/10 px-2 rounded-full min-w-0">
                {formatTimeWithOptionalMinutes(displayStart as Date)}
              </span>
            )}
            <span
              className={cn(
                "truncate min-w-0",
                agendaOnly
                  ? "font-bold text-sm sm:text-base md:text-lg"
                  : "font-medium text-sm sm:text-base md:text-lg"
              )}
            >
              {event.title}
            </span>
          </span>
        )}
      </EventWrapper>
    );
  }

  if (view === "week" || view === "day") {
    return (
      <EventWrapper
        className={cn(
          "py-1",
          durationMinutes < 45 ? "items-center" : "flex-col",
          view === "week" ? "text-[10px] sm:text-xs" : "text-xs",
          className
        )}
        currentTime={currentTime}
        dndAttributes={dndAttributes}
        dndListeners={dndListeners}
        event={event}
        ariaLabel={ariaLabel}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        onClick={onClick}
      >
        {durationMinutes < 45 ? (
          <div className="flex items-center justify-between w-full">
            <div
              className={cn("truncate text-sm sm:text-base md:text-lg min-w-0")}
            >
              {event.title}
            </div>
            {showTime && hasValidTime && displayStart && (
              <span className="ml-2 flex items-center gap-3 bg-white/10  py-0.5 rounded-full opacity-90 text-sm sm:text-base md:text-lg min-w-0">
                {formatTimeWithOptionalMinutes(displayStart as Date)}
              </span>
            )}
          </div>
        ) : (
          <>
            <div
              className={cn(
                "truncate font-medium text-sm sm:text-base md:text-lg min-w-0"
              )}
            >
              {event.title}
            </div>
            {showTime && hasValidTime && (
              <div className="truncate font-normal opacity-70 text-sm sm:text-base">
                <span className="inline-block bg-white/5 px-0.5 py-0.5 rounded-full">
                  {getEventTime()}
                </span>
              </div>
            )}
          </>
        )}
      </EventWrapper>
    );
  }
  if (!hasValidTime) {
    return (
      <button
        className={cn(
          "flex w-full flex-col gap-2 rounded-lg p-3 text-left outline-none transition-shadow duration-150 ease-out hover:bg-white/3 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-past-event:line-through data-past-event:opacity-90 border-2 border-border",
          getEventColorClassesAgenda(eventColor),
          className
        )}
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        type="button"
        {...dndListeners}
        {...dndAttributes}
      >
        <div className="flex w-full justify-between ">
          <div
            className={cn(
              "font-bold text-sm sm:text-base md:text-lg min-w-0 truncate"
            )}
          >
            {event.title}
          </div>
          <div className={cn("opacity-70 flex items-center gap-2")}>
            {event.location && (
              <span className="opacity-80 flex items-center gap-1 min-w-0">
                -<span className="truncate">{event.location}</span>
              </span>
            )}
          </div>
          {event.description && (
            <div
              className={cn("my-1 opacity-90")}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {event.description}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      className={cn(
        "flex w-full flex-col gap-2 rounded-lg p-3 text-left outline-none transition-shadow duration-150 ease-out hover:bg-white/3 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-past-event:line-through data-past-event:opacity-90 border-2 border-border",
        colorClasses,
        className
      )}
      data-past-event={isPast(displayEnd as Date) || undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      type="button"
      {...dndListeners}
      {...dndAttributes}
    >
      <div className="flex w-full justify-between ">
        <div
          className={cn(
            "font-bold text-sm sm:text-base md:text-lg min-w-0 truncate"
          )}
        >
          {event.title}
        </div>
        <div
          className={cn(
            "opacity-90 flex items-center gap-2 text-sm sm:text-base md:text-lg min-w-0"
          )}
        >
          {event.allDay ? (
            <span>Dia todo</span>
          ) : (
            <span className="uppercase font-semibold flex items-center gap-2 ">
              {formatTimeWithOptionalMinutes(displayStart as Date)}
            </span>
          )}
        </div>
      </div>

      {event.description && (
        <div
          className={cn("my-1 opacity-90 flex text-sm sm:text-base")}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {event.description}
        </div>
      )}
    </button>
  );
}
