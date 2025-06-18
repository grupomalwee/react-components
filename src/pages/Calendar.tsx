"use client";


import * as React from "react";
import { CalendarBase } from "@/components/date-time-picker/calendar";
import { CardBase } from "@/components/ui/CardBase";
import { DateRange } from "react-day-picker";


export const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [multiple, setMultiple] = React.useState<Date[]>([]);


  return (
    <main className="p-8 flex flex-col gap-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Calendars</h1>
        <p className="text-muted-foreground"></p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Single Date</h3>
          <CardBase title="">
            <CalendarBase mode="single" selected={date} onSelect={setDate} />
          </CardBase>
        </div>


        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Range</h3>
          <CardBase title="">
            <CalendarBase mode="range" selected={range} onSelect={setRange} />
          </CardBase>
        </div>


        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Multiple Selection</h3>
          <CardBase title="">
            <CalendarBase
              mode="multiple"
              selected={multiple}
              onSelect={(val) => setMultiple(val || [])}
            />
          </CardBase>
        </div>


        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Disabled Dates</h3>
          <CardBase title="">
            <CalendarBase
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={[
                new Date(2025, 5, 20),
                new Date(2025, 5, 21),
                new Date(2025, 5, 22),
              ]}
            />
          </CardBase>
        </div>


        <div className="space-y-3">
          <h3 className="text-xl font-semibold">Inline Minimal </h3>
          <CardBase title="">
            <CalendarBase
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border-none shadow-none"
            />
          </CardBase>
        </div>
      </div>
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>


        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { CalendarBase } from "@/components/date-time-picker/calendar";";`}
            </code>
          </pre>
        </div>


        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<CardBase title="">
  <CalendarBase mode="single" selected={date} onSelect={setDate} />
</CardBase>`}
            </code>
          </pre>
        </div>
      </div>
    </main>
  );
};



