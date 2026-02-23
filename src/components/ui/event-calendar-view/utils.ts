import { isSameDay } from "date-fns";

import type {
  CalendarEventAgenda,
  EventColorAgenda,
} from "@/components/ui/event-calendar-view/types";

/**
 * Get CSS classes for event colors
 */
export function getEventColorClassesAgenda(
  color?: EventColorAgenda | string,
): string {
  const eventColor = color || "sky";

  switch (eventColor) {
    case "sky":
      return "bg-sky-100 hover:bg-sky-200 text-sky-900 border dark:bg-sky-500/30 dark:hover:bg-sky-500/40 dark:text-sky-50 dark:border-sky-400/40 shadow-sky-500/15  hover:shadow-sky-500/25 transition-all duration-200";
    case "amber":
      return "bg-amber-100 hover:bg-amber-200 text-amber-900 border dark:bg-amber-500/30 dark:hover:bg-amber-500/40 dark:text-amber-50 dark:border-amber-400/40 shadow-amber-500/15  hover:shadow-amber-500/25 transition-all duration-200";
    case "violet":
      return "bg-violet-100 hover:bg-violet-200 text-violet-900 border dark:bg-violet-500/30 dark:hover:bg-violet-500/40 dark:text-violet-50 dark:border-violet-400/40 shadow-violet-500/15  hover:shadow-violet-500/25 transition-all duration-200";
    case "rose":
      return "bg-rose-100 hover:bg-rose-200 text-rose-900 border dark:bg-rose-500/30 dark:hover:bg-rose-500/40 dark:text-rose-50 dark:border-rose-400/40  shadow-rose-500/15  hover:shadow-rose-500/25 transition-all duration-200";
    case "emerald":
      return "bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border dark:bg-emerald-500/30 dark:hover:bg-emerald-500/40 dark:text-emerald-50 dark:border-emerald-400/40  shadow-emerald-500/15  hover:shadow-emerald-500/25 transition-all duration-200";
    case "orange":
      return "bg-orange-100 hover:bg-orange-200 text-orange-900 border dark:bg-orange-500/30 dark:hover:bg-orange-500/40 dark:text-orange-50 dark:border-orange-400/40  shadow-orange-500/15  hover:shadow-orange-500/25 transition-all duration-200";
    default:
      return "bg-sky-100 hover:bg-sky-200 text-sky-900 border dark:bg-sky-500/30 dark:hover:bg-sky-500/40 dark:text-sky-50 dark:border-sky-400/40  shadow-sky-500/15  hover:shadow-sky-500/25 transition-all duration-200";
  }
}

/**
 * Get CSS classes for border radius based on event position in multi-day events
 */
export function getBorderRadiusClassesAgenda(
  isFirstDay: boolean,
  isLastDay: boolean,
): string {
  if (isFirstDay && isLastDay) {
    return "rounded"; // Both ends rounded
  }
  if (isFirstDay) {
    return "rounded-l rounded-r-none"; // Only left end rounded
  }
  if (isLastDay) {
    return "rounded-r rounded-l-none"; // Only right end rounded
  }
  return "rounded-none"; // No rounded corners
}

/**
 * Check if an event is a multi-day event
 */
export function isMultiDayEventAgenda(event: CalendarEventAgenda): boolean {
  const eventStart = getEventStartDate(event);
  const eventEnd = getEventEndDate(event);
  if (!eventStart || !eventEnd) return !!event.allDay;
  // Compare full dates, not just day of month, to handle cross-month events
  return event.allDay || !isSameDay(eventStart, eventEnd);
}

/**
 * Filter events for a specific day
 */
export function getEventsForDayAgenda(
  events: CalendarEventAgenda[],
  day: Date,
): CalendarEventAgenda[] {
  return events
    .filter((event) => {
      const eventStart = getEventStartDate(event);
      return eventStart ? isSameDay(day, eventStart) : false;
    })
    .sort((a, b) => getEventStartTimestamp(a) - getEventStartTimestamp(b));
}

export function sortEventsAgenda(
  events: CalendarEventAgenda[],
): CalendarEventAgenda[] {
  return [...events].sort((a, b) => {
    const aIsMultiDay = isMultiDayEventAgenda(a);
    const bIsMultiDay = isMultiDayEventAgenda(b);

    if (aIsMultiDay && !bIsMultiDay) return -1;
    if (!aIsMultiDay && bIsMultiDay) return 1;

    return getEventStartTimestamp(a) - getEventStartTimestamp(b);
  });
}

export function getSpanningEventsForDayAgenda(
  events: CalendarEventAgenda[],
  day: Date,
): CalendarEventAgenda[] {
  return events.filter((event) => {
    if (!isMultiDayEventAgenda(event)) return false;
    const eventStart = getEventStartDate(event);
    const eventEnd = getEventEndDate(event);
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
export function getAllEventsForDayAgenda(
  events: CalendarEventAgenda[],
  day: Date,
): CalendarEventAgenda[] {
  return events.filter((event) => {
    const eventStart = getEventStartDate(event);
    const eventEnd = getEventEndDate(event);
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
export function getAgendaEventsForDayAgenda(
  events: CalendarEventAgenda[],
  day: Date,
): CalendarEventAgenda[] {
  return events
    .filter((event) => {
      // prefer explicit start/end, fallback to attend_date
      const eventStart = getEventStartDate(event);
      const eventEnd = getEventEndDate(event);

      if (!eventStart) return false;

      return (
        isSameDay(day, eventStart) ||
        (eventEnd ? isSameDay(day, eventEnd) : false) ||
        (eventEnd ? day > eventStart && day < eventEnd : false)
      );
    })
    .sort((a, b) => getEventStartTimestamp(a) - getEventStartTimestamp(b));
}

/**
 * Return the event start as a Date if possible
 */
export function getEventStartDate(
  event: CalendarEventAgenda,
): Date | undefined {
  if (isValidDate(event.start)) return new Date(event.start as Date);
  return undefined;
}

/**
 * Return the event end as a Date. If `end` is not provided but `duration` (minutes) is,
 * compute end = start + duration minutes.
 */
export function getEventEndDate(event: CalendarEventAgenda): Date | undefined {
  if (isValidDate(event.end)) return new Date(event.end as Date);
  const start = getEventStartDate(event);
  if (start && typeof event.duration === "number" && !isNaN(event.duration)) {
    return addMinutesToDateAgenda(start, event.duration);
  }
  return undefined;
}

function isValidDate(d: unknown) {
  try {
    const t = d instanceof Date ? d.getTime() : new Date(String(d)).getTime();
    return !isNaN(t);
  } catch {
    return false;
  }
}

function getEventStartTimestamp(e: CalendarEventAgenda) {
  const s = getEventStartDate(e);
  if (s) return s.getTime();
  return Number.MAX_SAFE_INTEGER;
}

export function normalizeAttendDate(d?: unknown): Date | undefined {
  if (d === undefined || d === null) return undefined;
  try {
    const dt = d instanceof Date ? d : new Date(String(d));
    if (isNaN(dt.getTime())) return undefined;
    // If the attend_date includes a time component (non-midnight), preserve it.
    if (
      dt.getHours() !== 0 ||
      dt.getMinutes() !== 0 ||
      dt.getSeconds() !== 0 ||
      dt.getMilliseconds() !== 0
    ) {
      return dt;
    }
    // Otherwise return a date-only (local midnight) value
    return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  } catch {
    return undefined;
  }
}

/**
 * Add hours to a date
 */
export function addMinutesToDateAgenda(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}

// Backwards-compatible helper in case other code relied on addHoursToDateAgenda
export function addHoursToDateAgenda(date: Date, hours: number): Date {
  return addMinutesToDateAgenda(date, Math.round(hours * 60));
}
