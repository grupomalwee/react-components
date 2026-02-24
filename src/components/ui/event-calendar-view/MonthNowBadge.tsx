"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

export function MonthNowBadge() {
  const [time, setTime] = useState(() => format(new Date(), "HH:mm"));

  useEffect(() => {
    const id = setInterval(() => setTime(format(new Date(), "HH:mm")), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="inline-flex items-center gap-1 mt-1 px-1.5 z-50 rounded-full bg-blue-500/10 dark:bg-blue-400 border border-blue-300 dark:border-blue-500" />
  );
}
