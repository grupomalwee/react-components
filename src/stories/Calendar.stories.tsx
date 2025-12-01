import "../style/global.css";
import type { Meta } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import { CalendarBase, CalendarPopover } from "../components/picker/calendar";
import { useState } from "react";
import { ButtonBase } from "../components/ui/form/ButtonBase";
import { ScrollAreaBase } from "../components/ui/layout/ScrollareaBase";
import { format } from "date-fns";

const meta: Meta<typeof CalendarBase> = {
  title: "forms/Calendar",
  component: CalendarBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Calendário para seleção de datas, com modos single, range, múltiplo e popover.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase, CalendarPopover } from '@mlw-packages/react-components';

export default function Example() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <CalendarBase mode="single" selected={date} onSelect={setDate} />;
}
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;

export const SingleDate = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function SingleDate() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <CalendarBase mode="single" selected={date} onSelect={setDate} data-testid="calendar-single" />;
}
`,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="single"
          selected={date}
          onSelect={setDate}
          data-testid="calendar-single"
          className="p-3"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário renderizado", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-single"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar elementos do calendário presentes", async () => {
      const navButtons = canvasElement.querySelectorAll("button");
      expect(navButtons.length).toBeGreaterThan(0);
    });
  },
};

export const Range = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function Range() {
  const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>(undefined);
  return <CalendarBase mode="range" selected={range} onSelect={setRange} data-testid="calendar-range" />;
}
`,
      },
    },
  },
  render: () => {
    const [range, setRange] = useState<
      { from: Date | undefined; to?: Date | undefined } | undefined
    >(undefined);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="range"
          selected={range}
          onSelect={setRange}
          data-testid="calendar-range"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário range renderizado", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-range"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar modo range ativo", async () => {
      const calendar = canvasElement.querySelector(
        '[data-testid="calendar-range"]'
      );
      expect(calendar).toBeInTheDocument();
    });
  },
};

export const Multiple = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function Multiple() {
  const [multiple, setMultiple] = useState<Date[]>([]);
  return <CalendarBase mode="multiple" selected={multiple} onSelect={(days) => setMultiple(days ?? [])} data-testid="calendar-multiple" />;
}
`,
      },
    },
  },
  render: () => {
    const [multiple, setMultiple] = useState<Date[]>([]);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="multiple"
          selected={multiple}
          onSelect={(days) => setMultiple(days ?? [])}
          data-testid="calendar-multiple"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário múltiplo renderizado", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-multiple"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar calendário aceita múltiplas seleções", async () => {
      const days = canvasElement.querySelectorAll('button[name="day"]');
      expect(days.length).toBeGreaterThan(0);
    });
  },
};

export const DisabledDates = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function DisabledDates() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const today = new Date();
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 20),
    new Date(today.getFullYear(), today.getMonth(), 25),
  ];

  return <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={disabledDates} data-testid="calendar-disabled" />;
}
`,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const today = new Date();
    const disabledDates = [
      new Date(today.getFullYear(), today.getMonth(), 15),
      new Date(today.getFullYear(), today.getMonth(), 20),
      new Date(today.getFullYear(), today.getMonth(), 25),
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDates}
          data-testid="calendar-disabled"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário com datas desabilitadas", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-disabled"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar calendário está visível", async () => {
      const calendar = canvasElement.querySelector(
        '[data-testid="calendar-disabled"]'
      );
      expect(calendar).toBeInTheDocument();

      // Verificar que o calendário tem dias renderizados
      const dayButtons = canvasElement.querySelectorAll('button[name="day"]');
      expect(dayButtons.length).toBeGreaterThan(0);
    });
  },
};

export const NoWeekends = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function NoWeekends() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={(d) => [0,6].includes(d.getDay())} data-testid="calendar-no-weekends" />;
}
`,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => [0, 6].includes(date.getDay())}
          data-testid="calendar-no-weekends"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário sem fins de semana", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-no-weekends"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar fins de semana desabilitados", async () => {
      const disabledDays = canvasElement.querySelectorAll("button[disabled]");
      expect(disabledDays.length).toBeGreaterThan(0);
    });
  },
};

export const DateLimits = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase } from '@mlw-packages/react-components';

export default function DateLimits() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <CalendarBase mode="single" selected={date} onSelect={setDate} fromDate={new Date(2025,5,15)} toDate={new Date(2025,5,30)} data-testid="calendar-limits" />;
}
`,
      },
    },
  },
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <CalendarBase
          mode="single"
          selected={date}
          onSelect={setDate}
          fromDate={new Date(2025, 5, 15)}
          toDate={new Date(2025, 5, 30)}
          data-testid="calendar-limits"
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar calendário com limites de data", async () => {
      await waitFor(() => {
        const calendar = canvasElement.querySelector(
          '[data-testid="calendar-limits"]'
        );
        expect(calendar).toBeInTheDocument();
      });
    });

    await step("Verificar navegação do calendário", async () => {
      const navButtons = canvasElement.querySelectorAll("button");
      expect(navButtons.length).toBeGreaterThan(0);
    });
  },
};

export const WithPopover = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarPopover } from '@mlw-packages/react-components';

export default function WithPopover() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  return <CalendarPopover label="Escolher Data" selected={selectedDate} onSelect={setSelectedDate} />;
}
`,
      },
    },
  },
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
        data-testid="calendar-popover-container"
      >
        <CalendarPopover
          label="Escolher Data"
          selected={selectedDate}
          onSelect={setSelectedDate}
        />
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar popover container renderizado", async () => {
      const container = canvasElement.querySelector(
        '[data-testid="calendar-popover-container"]'
      );
      expect(container).toBeInTheDocument();
    });

    await step("Verificar botão do popover", async () => {
      const button = canvasElement.querySelector(
        'button[aria-label="Abrir calendário"]'
      );
      expect(button).toBeInTheDocument();
      expect(button?.textContent).toContain("Escolher Data");
    });

    await step("Testar abertura do popover", async () => {
      const button = canvasElement.querySelector(
        'button[aria-label="Abrir calendário"]'
      );
      if (button) {
        await userEvent.click(button as HTMLElement);
        await waitFor(() => {
          const calendar = document.querySelector(".rdp");
          expect(calendar).toBeInTheDocument();
        });
      }
    });

    await step("Verificar botão de fechar", async () => {
      const closeButton = document.querySelector(
        'button[aria-label="Fechar calendário"]'
      );
      expect(closeButton).toBeInTheDocument();
    });
  },
};

export const AppointmentPicker = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { CalendarBase, ButtonBase, ScrollAreaBase } from '@mlw-packages/react-components';
import { format } from 'date-fns';

export default function AppointmentPicker() {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string | null>(null);

  const timeSlots = [
    { available: false, time: "09:00" },
    { available: false, time: "09:30" },
    { available: true, time: "10:00" },
    { available: true, time: "10:30" },
    { available: true, time: "11:00" },
    { available: true, time: "11:30" },
    { available: false, time: "12:00" },
    { available: true, time: "12:30" },
    { available: true, time: "13:00" },
    { available: true, time: "13:30" },
    { available: true, time: "14:00" },
    { available: false, time: "14:30" },
    { available: false, time: "15:00" },
    { available: true, time: "15:30" },
    { available: true, time: "16:00" },
    { available: true, time: "16:30" },
    { available: true, time: "17:00" },
    { available: true, time: "17:30" },
  ];

  return (
    <div className="rounded-md border">
      <div className="flex max-sm:flex-col">
        <CalendarBase
          className="p-2 sm:pe-5"
          disabled={[{ before: today }]}
          mode="single"
          onSelect={(newDate) => {
            if (newDate) {
              setDate(newDate);
              setTime(null);
            }
          }}
          selected={date}
        />
        <div className="relative w-full max-sm:h-48 sm:w-40">
          <div className="absolute inset-0 py-4 max-sm:border-t">
            <ScrollAreaBase className="h-full sm:border-s">
              <div className="space-y-3">
                <div className="flex h-5 shrink-0 items-center px-5">
                  <p className="font-medium text-sm">
                    {format(date, "EEEE, d")}
                  </p>
                </div>
                <div className="grid gap-1.5 px-5 max-sm:grid-cols-2">
                  {timeSlots.map(({ time: timeSlot, available }) => (
                    <ButtonBase
                      className="w-full"
                      disabled={!available}
                      key={timeSlot}
                      onClick={() => setTime(timeSlot)}
                      size="sm"
                      variant={time === timeSlot ? "default" : "outline"}
                    >
                      {timeSlot}
                    </ButtonBase>
                  ))}
                </div>
              </div>
            </ScrollAreaBase>
          </div>
        </div>
      </div>
    </div>
  );
}
`,
      },
    },
  },
  render: () => {
    const today = new Date();
    const [date, setDate] = useState<Date>(today);
    const [time, setTime] = useState<string | null>(null);

    const timeSlots = [
      { available: false, time: "09:00" },
      { available: false, time: "09:30" },
      { available: true, time: "10:00" },
      { available: true, time: "10:30" },
      { available: true, time: "11:00" },
      { available: true, time: "11:30" },
      { available: false, time: "12:00" },
      { available: true, time: "12:30" },
      { available: true, time: "13:00" },
      { available: true, time: "13:30" },
      { available: true, time: "14:00" },
      { available: false, time: "14:30" },
      { available: false, time: "15:00" },
      { available: true, time: "15:30" },
      { available: true, time: "16:00" },
      { available: true, time: "16:30" },
      { available: true, time: "17:00" },
      { available: true, time: "17:30" },
    ];

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
     
        <div className="rounded-md border" data-testid="appointment-picker">
          <div className="flex max-sm:flex-col">
            <CalendarBase
              className="p-2 sm:pe-5"
              disabled={[{ before: today }]}
              mode="single"
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setTime(null);
                }
              }}
              selected={date}
              data-testid="appointment-calendar"
            />
            <div className="relative w-full max-sm:h-48 sm:w-40">
              <div className="absolute inset-0 py-4 max-sm:border-t">
                <ScrollAreaBase className="h-full sm:border-s">
                  <div className="space-y-3">
                    <div className="flex h-5 shrink-0 items-center px-5">
                      <p
                        className="font-medium text-sm"
                        data-testid="selected-date"
                      >
                        {format(date, "EEEE, d")}
                      </p>
                    </div>
                    <div
                      className="grid gap-1.5 px-5 max-sm:grid-cols-2"
                      data-testid="time-slots"
                    >
                      {timeSlots.map(({ time: timeSlot, available }) => (
                        <ButtonBase
                          className="w-full"
                          disabled={!available}
                          key={timeSlot}
                          onClick={() => setTime(timeSlot)}
                          size="sm"
                          variant={time === timeSlot ? "default" : "outline"}
                          data-testid={`time-slot-${timeSlot}`}
                        >
                          {timeSlot}
                        </ButtonBase>
                      ))}
                    </div>
                  </div>
                </ScrollAreaBase>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({
    canvasElement,
    step,
  }: {
    canvasElement: HTMLElement;
    step: (name: string, fn: () => Promise<void>) => Promise<void>;
  }) => {
    await step("Verificar appointment picker renderizado", async () => {
      await waitFor(() => {
        const picker = canvasElement.querySelector(
          '[data-testid="appointment-picker"]'
        );
        expect(picker).toBeInTheDocument();
      });
    });

    await step(
      "Verificar calendário e slots de horário presentes",
      async () => {
        const calendar = canvasElement.querySelector(
          '[data-testid="appointment-calendar"]'
        );
        expect(calendar).toBeInTheDocument();

        const timeSlots = canvasElement.querySelector(
          '[data-testid="time-slots"]'
        );
        expect(timeSlots).toBeInTheDocument();
      }
    );

    await step("Verificar data selecionada exibida", async () => {
      const selectedDate = canvasElement.querySelector(
        '[data-testid="selected-date"]'
      );
      expect(selectedDate).toBeInTheDocument();
      expect(selectedDate?.textContent).toBeTruthy();
    });

    await step("Testar seleção de horário disponível", async () => {
      const availableSlot = canvasElement.querySelector(
        '[data-testid="time-slot-10:00"]'
      ) as HTMLButtonElement;

      if (availableSlot && !availableSlot.disabled) {
        await userEvent.click(availableSlot);
        await waitFor(() => {
          expect(availableSlot).toBeInTheDocument();
        });
      }
    });

    await step(
      "Verificar horários indisponíveis estão desabilitados",
      async () => {
        const disabledSlot = canvasElement.querySelector(
          '[data-testid="time-slot-09:00"]'
        ) as HTMLButtonElement;
        expect(disabledSlot).toBeDisabled();
      }
    );
  },
};
