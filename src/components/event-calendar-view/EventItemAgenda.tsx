"use client";

import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { differenceInMinutes, format, isPast } from "date-fns";
import { useMemo } from "react";

import {
  type CalendarEventAgenda,
  getBorderRadiusClassesAgenda,
  getEventColorClassesAgenda,
  addHoursToDateAgenda,
  normalizeAttendDate,
} from "@/components/event-calendar-view";
import { cn } from "@/lib/utils";
import { ClockUserIcon } from "@phosphor-icons/react";

const formatTimeWithOptionalMinutes = (date: Date) => {
  return format(date, "HH:mm");
};

const isValidDate = (d: unknown) => {
  try {
    const dt = d instanceof Date ? d : new Date(String(d));
    return !isNaN(dt.getTime());
  } catch {
    return false;
  }
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
  const hasValidTimeForWrapper =
    (isValidDate(event.start) && isValidDate(event.end)) ||
    isValidDate(event.attend_date);

  const displayEnd = (() => {
    // Prefer start/end when available
    if (isValidDate(event.start) && isValidDate(event.end)) {
      return currentTime
        ? new Date(
            new Date(currentTime).getTime() +
              (new Date(event.end as Date).getTime() -
                new Date(event.start as Date).getTime())
          )
        : new Date(event.end as Date);
    }
    // Fallback to attend_date + 1 hour when only attend_date exists
    if (isValidDate(event.attend_date)) {
      const start = normalizeAttendDate(event.attend_date as Date);
      return start ? addHoursToDateAgenda(start, 1) : undefined;
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
        "flex w-full select-none overflow-hidden px-3 py-1 text-left font-medium outline-none transition-transform duration-150 ease-out backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring data-dragging:cursor-grabbing data-past-event:line-through data-dragging:shadow-lg sm:px-3 rounded-lg shadow-sm hover:shadow-md ",
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
  currentTime?: Date; // For updating time during drag
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
  // Use the provided currentTime (for dragging) or the event's actual time
  const hasValidTime =
    (isValidDate(event.start) && isValidDate(event.end)) ||
    isValidDate(event.attend_date);

  const colorClasses = hasValidTime
    ? getEventColorClassesAgenda(eventColor)
    : "bg-gray-200/50 hover:bg-gray-200/40 text-gray-900/80 dark:bg-gray-700/25 dark:text-gray-200/90 shadow-none";

  const displayStart = useMemo(() => {
    if (!hasValidTime) return undefined;
    if (isValidDate(event.start))
      return currentTime || new Date(event.start as Date);
    if (isValidDate(event.attend_date))
      return currentTime || normalizeAttendDate(event.attend_date as Date);
    return undefined;
  }, [currentTime, event.start, event.attend_date, hasValidTime]);

  const displayEnd = useMemo(() => {
    if (!hasValidTime) return undefined;
    if (isValidDate(event.end)) {
      return currentTime
        ? new Date(
            new Date(currentTime).getTime() +
              (new Date(event.end as Date).getTime() -
                new Date(event.start as Date).getTime())
          )
        : new Date(event.end as Date);
    }
    // fallback to attend_date + 1 hour
    if (isValidDate(event.attend_date)) {
      const start = normalizeAttendDate(event.attend_date as Date);
      return start ? addHoursToDateAgenda(start, 1) : undefined;
    }
    return undefined;
  }, [currentTime, event.start, event.end, event.attend_date, hasValidTime]);

  // Calculate event duration in minutes
  const durationMinutes = useMemo(() => {
    if (!hasValidTime || !displayStart || !displayEnd) return 0;
    return differenceInMinutes(displayEnd, displayStart);
  }, [displayStart, displayEnd, hasValidTime]);

  const getEventTime = () => {
    if (!hasValidTime) return "";
    if (event.allDay) return "All day";

    // For short events (less than 45 minutes), only show start time
    if (durationMinutes < 45) {
      return formatTimeWithOptionalMinutes(displayStart as Date);
    }

    // For longer events, show both start and end time
    return `${formatTimeWithOptionalMinutes(
      displayStart as Date
    )} - ${formatTimeWithOptionalMinutes(displayEnd as Date)}`;
  };

  // Compute an accessible label for the event button
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
          "mt-[var(--event-gap)] h-[var(--event-height)] items-center text-[10px] sm:text-xs",
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
          <span className="flex items-center gap-2 truncate">
            {!event.allDay && hasValidTime && displayStart && (
              <span className="truncate font-normal opacity-80 sm:text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-[11px]">
                {formatTimeWithOptionalMinutes(displayStart as Date)}
              </span>
            )}
            <span
              className={cn(
                "truncate",
                agendaOnly ? "font-bold text-lg" : "font-medium"
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
      >
        {durationMinutes < 45 ? (
          <div className="flex items-center justify-between w-full">
            <div className={cn("truncate text-lg")}>{event.title}</div>
            {showTime && hasValidTime && displayStart && (
              <span className="ml-2 inline-block bg-white/10 px-2 py-0.5 rounded-full text-[11px] opacity-90">
                {formatTimeWithOptionalMinutes(displayStart as Date)}
              </span>
            )}
          </div>
        ) : (
          <>
            <div className={cn("truncate font-medium text-lg")}>
              {event.title}
            </div>
            {showTime && hasValidTime && (
              <div className="truncate font-normal opacity-70 sm:text-[15px]">
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
          "flex w-full flex-col gap-2 rounded-lg p-3 text-left outline-none transition-shadow duration-150 ease-out hover:bg-white/3 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
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
        <div className={cn("font-medium", agendaOnly ? "text-lg" : "text-sm")}>
          {event.title}
        </div>
        <div
          className={cn(
            "opacity-70 flex items-center gap-2",
            agendaOnly ? "text-sm" : "text-xs"
          )}
        >
          {event.location && (
            <span className="opacity-80 flex items-center gap-1">
              -<span className="truncate">{event.location}</span>
            </span>
          )}
        </div>
        {event.description && (
          <div
            className={cn(
              "my-1 opacity-90",
              agendaOnly ? "text-md" : "text-xs"
            )}
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
        <div className={cn("font-bold text-lg")}>{event.title}</div>
        <div className={cn("opacity-90 flex items-center gap-2 text-lg")}>
          {event.allDay ? (
            <span>Dia todo</span>
          ) : (
            <span className="uppercase font-semibold flex items-center gap-2">
              {formatTimeWithOptionalMinutes(displayStart as Date)}
              <span className="opacity-70">-</span>
              {formatTimeWithOptionalMinutes(displayEnd as Date)}
              <ClockUserIcon />
            </span>
          )}
        </div>
      </div>

      {event.description && (
        <div
          className={cn("my-1 opacity-90 flex text-md")}
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
