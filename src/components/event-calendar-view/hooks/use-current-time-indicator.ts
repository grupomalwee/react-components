"use client";

import { endOfWeek, isSameDay, isWithinInterval, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";

import { EndHourAgenda, StartHourAgenda } from "@/components/event-calendar-view/constants";

export function useCurrentTimeIndicatorAgenda(
  currentDate: Date,
  view: "day" | "week"
) {
  const [currentTimePosition, setCurrentTimePosition] = useState<number>(0);
  const [currentTimeVisible, setCurrentTimeVisible] = useState<boolean>(false);

  useEffect(() => {
    const calculateTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = (hours - StartHourAgenda) * 60 + minutes;
      const dayStartMinutes = 0; // 12am
      const dayEndMinutes = (EndHourAgenda - StartHourAgenda) * 60; 

      const position =
        ((totalMinutes - dayStartMinutes) / (dayEndMinutes - dayStartMinutes)) *
        100;

      let isCurrentTimeVisible = false;

      if (view === "day") {
        isCurrentTimeVisible = isSameDay(now, currentDate);
      } else if (view === "week") {
        const startOfWeekDate = startOfWeek(currentDate, { locale: ptBR });
        const endOfWeekDate = endOfWeek(currentDate, { locale: ptBR });
        isCurrentTimeVisible = isWithinInterval(now, {
          end: endOfWeekDate,
          start: startOfWeekDate,
        });
      }

      setCurrentTimePosition(position);
      setCurrentTimeVisible(isCurrentTimeVisible);
    };

    // Calculate immediately
    calculateTimePosition();

    // Update every minute
    const interval = setInterval(calculateTimePosition, 60000);

    return () => clearInterval(interval);
  }, [currentDate, view]);

  return { currentTimePosition, currentTimeVisible };
}
