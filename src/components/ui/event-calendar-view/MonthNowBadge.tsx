"use client";

import { useState, useEffect } from "react";

export function MonthNowBadge() {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const calculatePosition = () => {
      const now = new Date();
      const minutes = now.getHours() * 60 + now.getMinutes();
      const totalMinutes = 24 * 60;
      setPosition((minutes / totalMinutes) * 100);
    };

    calculatePosition();
    const id = setInterval(calculatePosition, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 z-20"
      style={{ top: `${position}%` }}
    >
      <div className="relative flex items-center">
        <div className="-left-[3px] absolute size-1.5 rounded-full bg-blue-500" />
        <div className="h-px w-full bg-blue-500" />
      </div>
    </div>
  );
}
