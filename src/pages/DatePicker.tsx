"use client";

import React from "react";
import { DateTimePicker } from "@/components/ui/picker/DateTimePicker";

export default function DatePickerPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <main className="p-8 flex flex-col">
      <div>
        <DateTimePicker label="Data e hora" date={date} onChange={setDate} />
      </div>
      <div>
        <DateTimePicker
          label="Data e hora"
          date={date}
          onChange={setDate}
          hideSeconds
        />
      </div>
      <div>
        <DateTimePicker
          label="Data e hora"
          date={date}
          onChange={setDate}
          hideSeconds
        />
      </div>
      <div>
        <DateTimePicker label="Data e hora" date={date} onChange={setDate} />
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`import { DateTimePicker } from "@/components/date-time-picker/DateTimePicker";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`<DateTimePicker
	label="Data e hora"
	date={date}
	onChange={setDate}
	hideSeconds // opcional
	hideHour // opcional
	hideMinute // opcional
/>`}</code>
          </pre>
        </div>
      </div>
    </main>
  );
}
