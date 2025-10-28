"use client";

import React, { useState } from "react";
import { CalendarBase, CalendarPopover } from "@/components/picker/calendar";
import { CardBase } from "@/components/ui/data/CardBase";
import { DateRange } from "react-day-picker";

export const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [range, setRange] = React.useState<DateRange | undefined>();
  const [multiple, setMultiple] = React.useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <main className="p-8 flex flex-col ">
      <div className="flex flex-wrap gap-6">
        <Card title="Single Date">
          <CalendarBase mode="single" selected={date} onSelect={setDate} />
        </Card>

        <Card title="Range">
          <CalendarBase mode="range" selected={range} onSelect={setRange} />
        </Card>

        <Card title="Multiple Selection">
          <CalendarBase
            mode="multiple"
            selected={multiple}
            onSelect={(val) => setMultiple(val || [])}
          />
        </Card>

        <Card title="Disabled Dates">
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
        </Card>

        <Card title="Inline Minimal">
          <CalendarBase
            mode="single"
            selected={date}
            onSelect={setDate}
            className="border-none shadow-none"
          />
        </Card>

        <Card title="No Weekends">
          <CalendarBase
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => {
              const day = date.getDay();
              return day === 0 || day === 6;
            }}
          />
        </Card>

        <Card title="Date Limits">
          <CalendarBase
            mode="single"
            selected={date}
            onSelect={setDate}
            fromDate={new Date(2025, 5, 15)}
            toDate={new Date(2025, 5, 30)}
          />
        </Card>

        <Card title="With Holidays">
          <CalendarBase
            mode="single"
            selected={date}
            onSelect={setDate}
            modifiers={{
              holiday: [
                new Date(2025, 0, 1), // Confraternização Universal
                new Date(2025, 2, 4), // Carnaval (terça)
                new Date(2025, 2, 5), // Quarta-feira de Cinzas
                new Date(2025, 3, 18), // Sexta-feira Santa
                new Date(2025, 3, 21), // Tiradentes
                new Date(2025, 4, 1), // Dia do Trabalho
                new Date(2025, 5, 19), // Corpus Christi
                new Date(2025, 8, 7), // Independência do Brasil
                new Date(2025, 9, 12), // Nossa Senhora Aparecida
                new Date(2025, 10, 2), // Finados
                new Date(2025, 10, 15), // Proclamação da República
                new Date(2025, 11, 25), // Natal
              ],
            }}
            modifiersClassNames={{
              holiday: "bg-red-500 text-white hover:bg-red-600",
            }}
          />
        </Card>
        <div className="">
          <h1 className="text-xl font-bold pb-3">Popover</h1>
          <CalendarPopover
            label="Escolher Data"
            selected={selectedDate}
            onSelect={setSelectedDate}
          />

          <p className="mt-4">
            Data selecionada:
            {selectedDate ? selectedDate.toLocaleDateString() : "Nenhuma"}
          </p>
        </div>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { CalendarBase } from "@/components/date-time-picker/calendar";`}
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

const Card = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div
    className="
      flex flex-col gap-3 
      flex-[1_1_23%] 
      max-w-[210px]
    "
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <CardBase title="">{children}</CardBase>
  </div>
);
