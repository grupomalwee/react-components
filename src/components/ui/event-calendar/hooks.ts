import { createContext, useContext } from "react";
import type { UniqueIdentifier } from "@dnd-kit/core";
import type { CalendarEvent } from "@/components/ui/event-calendar";

// Define the context type
export type CalendarDndContextType = {
  activeEvent: CalendarEvent | null;
  activeId: UniqueIdentifier | null;
  activeView: "month" | "week" | "day" | null;
  currentTime: Date | null;
  eventHeight: number | null;
  isMultiDay: boolean;
  multiDayWidth: number | null;
  dragHandlePosition: {
    x?: number;
    y?: number;
    data?: {
      isFirstDay?: boolean;
      isLastDay?: boolean;
    };
  } | null;
};

// Create the context
export const CalendarDndContext = createContext<CalendarDndContextType>({
  activeEvent: null,
  activeId: null,
  activeView: null,
  currentTime: null,
  dragHandlePosition: null,
  eventHeight: null,
  isMultiDay: false,
  multiDayWidth: null,
});

// Hook to use the context
export const useCalendarDnd = () => useContext(CalendarDndContext);
