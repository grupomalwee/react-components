import type { ReactNode } from "react";

export type CalendarViewAgenda = "month" | "week" | "day" | "agenda";

export interface CalendarEventAgenda {
  id: string;
  title: string;
  description?: ReactNode;
  start?: Date | null;
  end?: Date | null;
  attend_date?: Date | null;
  allDay?: boolean;
  color?: EventColorAgenda;
  location?: string;
}

export type EventColorAgenda =
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
