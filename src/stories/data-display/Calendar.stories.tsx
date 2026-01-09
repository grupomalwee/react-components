import "../../style/global.css";
import type { Meta } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import {
  CalendarBase,
  CalendarPopover,
} from "../../components/ui/picker/calendar";
import { useState } from "react";

const meta: Meta<typeof CalendarBase> = {
  title: "data/Calendar",
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
  return <CalendarBase mode="single" selected={date} onSelect={setDate} hidden={{ before: new Date(2025,5,15), after: new Date(2025,5,30) }} data-testid="calendar-limits" />;
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
          hidden={{
            before: new Date(2025, 5, 15),
            after: new Date(2025, 5, 30),
          }}
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
          onSelect={(d) => setSelectedDate(d ?? undefined)}
        />
      </div>
    );
  },
};
