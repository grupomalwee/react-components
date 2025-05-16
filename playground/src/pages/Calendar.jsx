"use client";

import React, { useState } from "react";
import { CalendarBase } from "@lib";

export const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="my-8 mx-5"><div className="mt-5 ml-5 flex gap-5 h-96 p-3 rounded-sm">
        <CalendarBase
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3">Documentação</h3>
      <div className="border-t-2 border-gray-300 mb-4"></div>

      <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
        <h5 className="font-medium mb-2">Como importar:</h5>
        <pre className="bg-gray-900 p-3 rounded-sm">
          <code>
            {`import { CalendarBase } from "@lib";`}
          </code>
        </pre>
      </div>

      <div className="bg-gray-800 text-white p-4 rounded-md">
        <h5 className="font-medium mb-2">Como usar:</h5>
        <pre className="bg-gray-900 p-3 rounded-sm">
          <code>
            {`<CalendarBase
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border shadow"
/>`}
          </code>
        </pre>
      </div>

      
    </div>
  );
};
