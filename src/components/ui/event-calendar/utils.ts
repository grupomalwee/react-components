import { isSameDay } from "date-fns";
import { addHours } from "date-fns";

import type { CalendarEvent, EventColor } from "@/components/ui/event-calendar";

/**
 * Get CSS classes for event colors
 */
export function getEventColorClasses(color?: EventColor | string): string {
  const eventColor = color || "sky";

  switch (eventColor) {
    case "sky":
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
    case "amber":
      return "bg-amber-200/50 hover:bg-amber-200/40 text-amber-950/80 dark:bg-amber-400/25 dark:hover:bg-amber-400/20 dark:text-amber-200 shadow-amber-700/8";
    case "violet":
      return "bg-violet-200/50 hover:bg-violet-200/40 text-violet-950/80 dark:bg-violet-400/25 dark:hover:bg-violet-400/20 dark:text-violet-200 shadow-violet-700/8";
    case "rose":
      return "bg-rose-200/50 hover:bg-rose-200/40 text-rose-950/80 dark:bg-rose-400/25 dark:hover:bg-rose-400/20 dark:text-rose-200 shadow-rose-700/8";
    case "emerald":
      return "bg-emerald-200/50 hover:bg-emerald-200/40 text-emerald-950/80 dark:bg-emerald-400/25 dark:hover:bg-emerald-400/20 dark:text-emerald-200 shadow-emerald-700/8";
    case "orange":
      return "bg-orange-200/50 hover:bg-orange-200/40 text-orange-950/80 dark:bg-orange-400/25 dark:hover:bg-orange-400/20 dark:text-orange-200 shadow-orange-700/8";
    default:
      return "bg-sky-200/50 hover:bg-sky-200/40 text-sky-950/80 dark:bg-sky-400/25 dark:hover:bg-sky-400/20 dark:text-sky-200 shadow-sky-700/8";
  }
}

/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export function getBorderRadiusClasses(
  isFirstDay: boolean,
  isLastDay: boolean
): string {
  if (isFirstDay && isLastDay) {
    return "rounded-lg"; // Both ends rounded
  }
  if (isFirstDay) {
    return "rounded-l-lg rounded-r-none"; // Only left end rounded
  }
  if (isLastDay) {
    return "rounded-r-lg rounded-l-none"; // Only right end rounded
  }
  return "rounded-none"; // No rounded corners
}

/**
 * Check if an event is a multi-day event
 */
export function isMultiDayEvent(event: CalendarEvent): boolean {
  const eventStart = isValidDate(event.start)
    ? new Date(event.start as Date)
    : undefined;
  const eventEnd = isValidDate(event.end)
    ? new Date(event.end as Date)
    : undefined;
  if (!eventStart || !eventEnd) return !!event.allDay;
  return event.allDay || eventStart.getDate() !== eventEnd.getDate();
}

/**
 * Filter events for a specific day
 */
export function getEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events
    .filter((event) => {
      const eventStart = isValidDate(event.start)
        ? new Date(event.start as Date)
        : isValidDate(event.attend_date)
        ? new Date(event.attend_date as Date)
        : undefined;
      return eventStart ? isSameDay(day, eventStart) : false;
    })
    .sort((a, b) => getEventStartTimestamp(a) - getEventStartTimestamp(b));
}


export function sortEvents(events: CalendarEvent[]): CalendarEvent[] {
  return [...events].sort((a, b) => {
    const aIsMultiDay = isMultiDayEvent(a);
    const bIsMultiDay = isMultiDayEvent(b);

    if (aIsMultiDay && !bIsMultiDay) return -1;
    if (!aIsMultiDay && bIsMultiDay) return 1;

    return getEventStartTimestamp(a) - getEventStartTimestamp(b);
  });
}

export function getSpanningEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events.filter((event) => {
    if (!isMultiDayEvent(event)) return false;
    const eventStart = isValidDate(event.start)
      ? new Date(event.start as Date)
      : undefined;
    const eventEnd = isValidDate(event.end)
      ? new Date(event.end as Date)
      : undefined;
    if (!eventStart || !eventEnd) return false;

    // Only include if it's not the start day but is either the end day or a middle day
    return (
      !isSameDay(day, eventStart) &&
      (isSameDay(day, eventEnd) || (day > eventStart && day < eventEnd))
    );
  });
}

/**
 * Get all events visible on a specific day (starting, ending, or spanning)
 */
export function getAllEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events.filter((event) => {
    const eventStart = isValidDate(event.start)
      ? new Date(event.start as Date)
      : undefined;
    const eventEnd = isValidDate(event.end)
      ? new Date(event.end as Date)
      : undefined;
    if (!eventStart) return false;
    return (
      isSameDay(day, eventStart) ||
      (eventEnd ? isSameDay(day, eventEnd) : false) ||
      (eventEnd ? day > eventStart && day < eventEnd : false)
    );
  });
}

/**
 * Get all events for a day (for agenda view)
 */
export function getAgendaEventsForDay(
  events: CalendarEvent[],
  day: Date
): CalendarEvent[] {
  return events
    .filter((event) => {
      // prefer explicit start/end, fallback to attend_date
      const eventStart = isValidDate(event.start)
        ? new Date(event.start as Date)
        : isValidDate(event.attend_date)
        ? new Date(event.attend_date as Date)
        : undefined;

      const eventEnd = isValidDate(event.end)
        ? new Date(event.end as Date)
        : isValidDate(event.attend_date)
        ? addHours(new Date(event.attend_date as Date), 1)
        : undefined;

      if (!eventStart) return false;

      return (
        isSameDay(day, eventStart) ||
        (eventEnd ? isSameDay(day, eventEnd) : false) ||
        (eventEnd ? day > eventStart && day < eventEnd : false)
      );
    })
    .sort((a, b) => getEventStartTimestamp(a) - getEventStartTimestamp(b));
}

function isValidDate(d: unknown) {
  try {
    const t = d instanceof Date ? d.getTime() : new Date(String(d)).getTime();
    return !isNaN(t);
  } catch {
    return false;
  }
}

function getEventStartTimestamp(e: CalendarEvent) {
  if (isValidDate(e.start)) return new Date(e.start as Date).getTime();
  if (isValidDate(e.attend_date))
    return new Date(e.attend_date as Date).getTime();
  return Number.MAX_SAFE_INTEGER;
}

/**
 * Add hours to a date
 */
export function addHoursToDate(date: Date, hours: number): Date {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}
