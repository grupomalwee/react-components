import { differenceInCalendarDays, format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

import type {
  CalendarEventAgenda,
  EventColorAgenda,
} from "@/components/ui/event-calendar-view/types";

export function getAutoColorAgenda(id: string): EventColorAgenda {
  const colors: EventColorAgenda[] = [
    "sky",
    "amber",
    "violet",
    "rose",
    "emerald",
    "orange",
    "green",
    "blue",
    "red",
    "purple",
    "indigo",
    "teal",
    "pink",
    "cyan",
    "lime",
    "fuchsia",
  ];

  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function getEventColorClassesAgenda(
  color?: EventColorAgenda | string,
  eventId?: string,
): string {
  let eventColor = color;

  if (!eventColor && eventId) {
    eventColor = getAutoColorAgenda(eventId);
  }

  if (!eventColor) {
    eventColor = "sky";
  }

  switch (eventColor) {
    case "sky":
      return "bg-sky-100 hover:bg-sky-200/80 text-sky-900 border border-sky-200/70 dark:bg-sky-500/25 dark:hover:bg-sky-500/35 dark:text-sky-50 dark:border-sky-400/30 transition-colors duration-150";
    case "amber":
      return "bg-amber-100 hover:bg-amber-200/80 text-amber-900 border border-amber-200/70 dark:bg-amber-500/25 dark:hover:bg-amber-500/35 dark:text-amber-50 dark:border-amber-400/30 transition-colors duration-150";
    case "violet":
      return "bg-violet-100 hover:bg-violet-200/80 text-violet-900 border border-violet-200/70 dark:bg-violet-500/25 dark:hover:bg-violet-500/35 dark:text-violet-50 dark:border-violet-400/30 transition-colors duration-150";
    case "rose":
      return "bg-rose-100 hover:bg-rose-200/80 text-rose-900 border border-rose-200/70 dark:bg-rose-500/25 dark:hover:bg-rose-500/35 dark:text-rose-50 dark:border-rose-400/30 transition-colors duration-150";
    case "emerald":
      return "bg-emerald-100 hover:bg-emerald-200/80 text-emerald-900 border border-emerald-200/70 dark:bg-emerald-500/25 dark:hover:bg-emerald-500/35 dark:text-emerald-50 dark:border-emerald-400/30 transition-colors duration-150";
    case "orange":
      return "bg-orange-100 hover:bg-orange-200/80 text-orange-900 border border-orange-200/70 dark:bg-orange-500/25 dark:hover:bg-orange-500/35 dark:text-orange-50 dark:border-orange-400/30 transition-colors duration-150";
    case "green":
      return "bg-green-100 hover:bg-green-200/80 text-green-900 border border-green-200/70 dark:bg-green-500/25 dark:hover:bg-green-500/35 dark:text-green-50 dark:border-green-400/30 transition-colors duration-150";
    case "blue":
      return "bg-blue-100 hover:bg-blue-200/80 text-blue-900 border border-blue-200/70 dark:bg-blue-500/25 dark:hover:bg-blue-500/35 dark:text-blue-50 dark:border-blue-400/30 transition-colors duration-150";
    case "red":
      return "bg-red-100 hover:bg-red-200/80 text-red-900 border border-red-200/70 dark:bg-red-500/25 dark:hover:bg-red-500/35 dark:text-red-50 dark:border-red-400/30 transition-colors duration-150";
    case "purple":
      return "bg-purple-100 hover:bg-purple-200/80 text-purple-900 border border-purple-200/70 dark:bg-purple-500/25 dark:hover:bg-purple-500/35 dark:text-purple-50 dark:border-purple-400/30 transition-colors duration-150";
    case "indigo":
      return "bg-indigo-100 hover:bg-indigo-200/80 text-indigo-900 border border-indigo-200/70 dark:bg-indigo-500/25 dark:hover:bg-indigo-500/35 dark:text-indigo-50 dark:border-indigo-400/30 transition-colors duration-150";
    case "teal":
      return "bg-teal-100 hover:bg-teal-200/80 text-teal-900 border border-teal-200/70 dark:bg-teal-500/25 dark:hover:bg-teal-500/35 dark:text-teal-50 dark:border-teal-400/30 transition-colors duration-150";
    case "pink":
      return "bg-pink-100 hover:bg-pink-200/80 text-pink-900 border border-pink-200/70 dark:bg-pink-500/25 dark:hover:bg-pink-500/35 dark:text-pink-50 dark:border-pink-400/30 transition-colors duration-150";
    case "cyan":
      return "bg-cyan-100 hover:bg-cyan-200/80 text-cyan-900 border border-cyan-200/70 dark:bg-cyan-500/25 dark:hover:bg-cyan-500/35 dark:text-cyan-50 dark:border-cyan-400/30 transition-colors duration-150";
    case "lime":
      return "bg-lime-100 hover:bg-lime-200/80 text-lime-900 border border-lime-200/70 dark:bg-lime-500/25 dark:hover:bg-lime-500/35 dark:text-lime-50 dark:border-lime-400/30 transition-colors duration-150";
    case "fuchsia":
      return "bg-fuchsia-100 hover:bg-fuchsia-200/80 text-fuchsia-900 border border-fuchsia-200/70 dark:bg-fuchsia-500/25 dark:hover:bg-fuchsia-500/35 dark:text-fuchsia-50 dark:border-fuchsia-400/30 transition-colors duration-150";
    default:
      return "bg-sky-100 hover:bg-sky-200/80 text-sky-900 border border-sky-200/70 dark:bg-sky-500/25 dark:hover:bg-sky-500/35 dark:text-sky-50 dark:border-sky-400/30 transition-colors duration-150";
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
 * If neither `end` nor `duration` is provided, defaults to start + 60 minutes (1 hour).
 */
export function getEventEndDate(event: CalendarEventAgenda): Date | undefined {
  if (isValidDate(event.end)) return new Date(event.end as Date);
  const start = getEventStartDate(event);
  if (start && typeof event.duration === "number" && !isNaN(event.duration)) {
    return addMinutesToDateAgenda(start, event.duration);
  }
  // Default: 1 hour after start
  if (start && !event.allDay) {
    return addMinutesToDateAgenda(start, 60);
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

/**
 * Format event duration for tooltips
 */
export function formatDurationAgenda(event: CalendarEventAgenda): string {
  const start = getEventStartDate(event);
  const end = getEventEndDate(event);
  if (!start) return "";
  const fmt = (d: Date) => format(d, "d 'de' MMM", { locale: ptBR });
  if (!end || isSameDay(start, end)) {
    return (
      fmt(start) +
      (event.allDay ? " · Dia todo" : " · " + format(start, "HH:mm"))
    );
  }
  const days = differenceInCalendarDays(end, start) + 1;
  return `${fmt(start)} → ${fmt(end)} · ${days} dias`;
}

export function formatDurationAgendaDays(event: CalendarEventAgenda): string {
  const start = getEventStartDate(event);
  const end = getEventEndDate(event);
  if (!start) return "";
  const fmt = (d: Date) => format(d, "d 'de' MMM", { locale: ptBR });
  if (!end || isSameDay(start, end)) {
    return (
      fmt(start) +
      (event.allDay ? " · Dia todo" : " · " + format(start, "HH:mm"))
    );
  }
  const days = differenceInCalendarDays(end, start) + 1;
  return `${days} dias`;
}
