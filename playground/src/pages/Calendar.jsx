"use client";

import React, { useState } from "react";
import { CalendarBase } from "@lib";

export const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

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
