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
              (wrapperEnd.getTime() - wrapperStart.getTime()),
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
    ? getEventColorClassesAgenda(event.color, event.id)
    : "bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 shadow-none ";

  return (
    <button
      className={cn(
        "flex w-full select-none text-left font-medium outline-none transition-colors duration-150 ease-out backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-dragging:cursor-grabbing data-past-event:line-through data-dragging:shadow-lg rounded-lg border",
        className?.includes("overflow-visible") ? "" : "overflow-hidden",
        colorClasses,
        getBorderRadiusClassesAgenda(isFirstDay, isLastDay),
        className,
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
  /** Number of overlapping columns in this time slot (week view only) */
  totalCols?: number;
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
  totalCols = 1,
}: EventItemProps) {
  const eventColor = event.color;
  const startDate = getEventStartDate(event);
  const endDate = getEventEndDate(event);
  const hasValidTime = !!startDate || !!endDate;

  const colorClasses = hasValidTime
    ? getEventColorClassesAgenda(eventColor, event.id)
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
              (startDate ? endDate.getTime() - startDate.getTime() : 0),
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
      displayStart as Date,
    )} - ${formatTimeWithOptionalMinutes(displayEnd as Date)}`;
  };
  let ariaLabel: string;
  if (!hasValidTime) {
    ariaLabel = event.title;
  } else if (event.allDay) {
    ariaLabel = `${event.title}, All day`;
  } else if (durationMinutes < 45) {
    ariaLabel = `${event.title}, ${formatTimeWithOptionalMinutes(
      displayStart as Date,
    )}`;
  } else {
    ariaLabel = `${event.title}, ${formatTimeWithOptionalMinutes(
      displayStart as Date,
    )} - ${formatTimeWithOptionalMinutes(displayEnd as Date)}`;
  }

  if (view === "month") {
    return (
      <EventWrapper
        className={cn(
          "mt-[var(--event-gap)] h-[var(--event-height)] items-center px-1.5 sm:px-3 py-1 sm:text-xs",
          className,
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
                  : "font-medium text-sm sm:text-base md:text-lg",
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
    const isCompact = durationMinutes < 45;
    const isDay = view === "day";

    const tier = isDay ? 1 : totalCols >= 5 ? 3 : totalCols >= 3 ? 2 : 1;

    if (tier === 3) {
      return (
        <button
          type="button"
          className={cn(
            "h-full w-full rounded border overflow-hidden cursor-pointer",
            colorClasses,
            className,
          )}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          aria-label={ariaLabel}
          {...dndListeners}
          {...dndAttributes}
        />
      );
    }

    // Tier 2: compact pill – title only in tiny text
    if (tier === 2) {
      return (
        <EventWrapper
          className={cn(
            "h-full px-1 py-0.5 overflow-hidden text-[9px]",
            isCompact ? "flex-row items-center" : "flex-col items-start",
            className,
          )}
          currentTime={currentTime}
          dndAttributes={dndAttributes}
          dndListeners={dndListeners}
          event={event}
          ariaLabel={ariaLabel}
          isFirstDay={isFirstDay}
          isLastDay={isLastDay}
          onClick={onClick}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          <span className="font-semibold leading-none truncate w-full block">
            {event.title}
          </span>
        </EventWrapper>
      );
    }

    // Tier 1: full layout
    return (
      <EventWrapper
        className={cn(
          "h-full py-0.5 px-1.5 overflow-hidden",
          isCompact ? "items-center flex-row" : "flex-col items-start",
          isDay ? "text-xs" : "text-[10px]",
          className,
        )}
        currentTime={currentTime}
        dndAttributes={dndAttributes}
        dndListeners={dndListeners}
        event={event}
        ariaLabel={ariaLabel}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {isCompact ? (
          <div className="flex items-center gap-1 w-full min-w-0 overflow-hidden">
            <span className="truncate font-semibold leading-none min-w-0">
              {event.title}
            </span>
            {showTime && hasValidTime && displayStart && (
              <span className="shrink-0 opacity-75 leading-none">
                {formatTimeWithOptionalMinutes(displayStart as Date)}
              </span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-0.5 w-full min-w-0 overflow-hidden h-full">
            <span className="font-semibold leading-snug truncate">
              {event.title}
            </span>
            {showTime && hasValidTime && (
              <span className="opacity-75 leading-none truncate">
                {getEventTime()}
              </span>
            )}
          </div>
        )}
      </EventWrapper>
    );
  }
  if (!hasValidTime) {
    return (
      <button
        className={cn(
          "flex w-full flex-col gap-2 rounded-lg p-3 text-left outline-none transition-shadow duration-150 ease-out hover:bg-white/3 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-past-event:line-through data-past-event:opacity-90 border-2 border-border",
          getEventColorClassesAgenda(eventColor, event.id),
          className,
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
              "font-bold text-sm sm:text-base md:text-lg min-w-0 truncate",
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
        className,
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
            "font-bold text-sm sm:text-base md:text-lg min-w-0 truncate",
          )}
        >
          {event.title}
        </div>
        <div
          className={cn(
            "opacity-90 flex items-center gap-2 text-sm sm:text-base md:text-lg min-w-0",
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
