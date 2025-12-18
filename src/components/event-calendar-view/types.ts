import type { ReactNode } from "react";

export type CalendarView = "month" | "week" | "day" | "agenda";

export interface CalendarEventAgenda {
  id: string;
  title: string;
  description?: ReactNode;
  start?: Date | null;
  end?: Date | null;
  attend_date?: Date | null;
  allDay?: boolean;
  color?: EventColor;
  location?: string;
}

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | "green"
  | "blue"
  | "red"
  | "purple";
