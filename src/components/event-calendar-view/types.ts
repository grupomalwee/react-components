import type { ReactNode } from "react";

export type CalendarViewAgenda = "month" | "week" | "day" | "agenda";

export interface CalendarEventAgenda {
  id: string;
  title: string;
  description?: ReactNode;
  start?: Date | null;
  end?: Date | null;
  allDay?: boolean;
  color?: EventColorAgenda;
  location?: string;
  duration?: number;
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

export enum EventColorAgendaEnum {
  sky = "sky",
  amber = "amber",
  violet = "violet",
  rose = "rose",
  emerald = "emerald",
  orange = "orange",
  green = "green",
  blue = "blue",
  red = "red",
  purple = "purple",
}
