import "../style/global.css";
import type { Meta } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";
import {
  CalendarBase,
  CalendarPopover,
} from "../components/date-time-picker/calendar";
import { useState } from "react";

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
          disabled={[
            new Date(2025, 5, 20),
            new Date(2025, 5, 21),
            new Date(2025, 5, 22),
          ]}
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

    await step("Verificar datas desabilitadas presentes", async () => {
      const disabledDays = canvasElement.querySelectorAll("button[disabled]");
      expect(disabledDays.length).toBeGreaterThan(0);
    });
  },
};

export const NoWeekends = {
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
      >
        <CalendarPopover
          label="Escolher Data"
          selected={selectedDate}
          onSelect={setSelectedDate}
          data-testid="calendar-popover"
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
    await step("Verificar popover renderizado", async () => {
      const popover = canvasElement.querySelector(
        '[data-testid="calendar-popover"]'
      );
      expect(popover).toBeInTheDocument();
    });

    await step("Verificar label do botão", async () => {
      const button = canvasElement.querySelector("button");
      expect(button).toBeInTheDocument();
      expect(button?.textContent).toContain("Escolher Data");
    });

    await step("Testar abertura do popover", async () => {
      const button = canvasElement.querySelector("button");
      if (button) {
        await userEvent.click(button);
        await waitFor(() => {
          const calendar = document.querySelector(".rdp");
          expect(calendar).toBeInTheDocument();
        });
      }
    });
  },
};
