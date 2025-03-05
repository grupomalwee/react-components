"use client";

import * as React from "react";
import { CalendarBase } from "@/components/date-time-picker/calendar";

export const CalenderPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="mt-5 ml-5 flex gap-5 h-96 p-3 rounded-sm">
      <CalendarBase
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    </div>
  );
};
