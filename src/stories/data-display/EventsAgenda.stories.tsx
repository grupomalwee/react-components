import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeProviderBase } from "@/components/theme/theme-provider";
import { motion } from "framer-motion";
import { useState } from "react";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import { toast } from "sonner";
import {
  CalendarEventAgenda,
  EventDetailModalAgenda,
} from "@/components/ui/event-calendar-view/";
import {
  EventAgenda,
  type EventCalendarProps,
} from "@/components/ui/event-calendar-view/EventAgenda";
import type { EventColorAgenda } from "@/components/ui/event-calendar-view/types";

const sampleEvents: CalendarEventAgenda[] = [
  {
    allDay: true,
    color: "sky",
    description: "Strategic planning for next year",
    end: subDays(new Date(), 23),
    id: "1",
    location: "Main Conference Hall",
    start: subDays(new Date(), 24),
    title: "Acme Corp - Malwee",
  },
  {
    color: "amber",
    description: "Submit final deliverables",
    end: setMinutes(setHours(subDays(new Date(), 9), 15), 30),
    id: "2",
    location: "Office",
    start: setMinutes(setHours(subDays(new Date(), 9), 13), 0),
    title: "Acme Corp - Emfim",
  },
  {
    allDay: true,
    color: "orange",
    description: "Strategic planning for next year",
    end: subDays(new Date(), 13),
    id: "3",
    location: "Main Conference Hall",
    start: subDays(new Date(), 13),
    title: "Acme Corp - Malwee Kids",
  },
  {
    color: "sky",
    description: "Weekly team sync",
    end: setMinutes(setHours(new Date(), 11), 0),
    id: "4",
    location: "Conference Room A",
    start: setMinutes(setHours(new Date(), 10), 0),
    title: "Acme Corp - carinhoso",
  },
  {
    color: "emerald",
    description: "Discuss new project requirements",
    end: setMinutes(setHours(addDays(new Date(), 1), 13), 15),
    id: "5",
    location: "Downtown Cafe",
    start: setMinutes(setHours(addDays(new Date(), 1), 12), 0),
    title: "Acme Corp - Lunch with Client",
  },
  {
    allDay: true,
    color: "violet",
    description: "New product release",
    end: addDays(new Date(), 6),
    id: "6",
    start: addDays(new Date(), 3),
    title: "Acme Corp - Product Launch",
  },
  {
    color: "rose",
    description: "Discuss about new clients",
    end: setMinutes(setHours(addDays(new Date(), 5), 14), 45),
    id: "7",
    location: "Downtown Cafe",
    start: setMinutes(setHours(addDays(new Date(), 4), 14), 30),
    title: "Sales Conference",
  },
  {
    color: "orange",
    description: "Weekly team sync",
    end: setMinutes(setHours(addDays(new Date(), 5), 10), 30),
    id: "8",
    location: "Conference Room A",
    start: setMinutes(setHours(addDays(new Date(), 5), 9), 0),
    title: "Team Meeting",
  },
  {
    color: "sky",
    description: "Weekly team sync",
    end: setMinutes(setHours(addDays(new Date(), 5), 15), 30),
    id: "9",
    location: "Conference Room A",
    start: setMinutes(setHours(addDays(new Date(), 5), 14), 0),
    title: "Review contracts",
  },
  {
    color: "amber",
    description: "Weekly team sync",
    end: setMinutes(setHours(addDays(new Date(), 5), 11), 0),
    id: "10",
    location: "Conference Room A",
    start: setMinutes(setHours(addDays(new Date(), 5), 9), 45),
    title: "Team Meeting",
  },
  {
    color: "emerald",
    description: "Quarterly marketing planning",
    end: setMinutes(setHours(addDays(new Date(), 9), 15), 30),
    id: "11",
    location: "Marketing Department",
    start: setMinutes(setHours(addDays(new Date(), 9), 10), 0),
    title: "Marketing Strategy Session",
  },
  {
    allDay: true,
    color: "sky",
    description: "Presentation of yearly results",
    end: addDays(new Date(), 17),
    id: "12",
    location: "Grand Conference Center",
    start: addDays(new Date(), 17),
    title: "Annual Shareholders Meeting",
  },
  {
    color: "rose",
    description: "Brainstorming for new features",
    end: setMinutes(setHours(addDays(new Date(), 27), 17), 0),
    id: "13",
    location: "Innovation Lab",
    start: setMinutes(setHours(addDays(new Date(), 26), 9), 0),
    title: "Product Development Workshop",
  },
];

const meta: Meta<typeof EventAgenda> = {
  title: "data/Event Agenda",
  component: EventAgenda,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProviderBase>
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <motion.div
            initial={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.32 }}
            style={{ width: "100%" }}
          >
            <Story />
          </motion.div>
        </div>
      </ThemeProviderBase>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "Calendário de eventos com múltiplas visualizações (mês, semana, dia, agenda). Permite adicionar, editar e deletar eventos.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function Example() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
    layout: "fullscreen",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
  },
  argTypes: {
    initialView: {
      control: { type: "select" },
      options: ["year", "month", "week", "day", "agenda"],
      description: "View inicial do calendário",
    },
    onEventUpdate: { action: "onEventUpdate" },
  },
};

export default meta;

type Story = StoryObj<typeof EventAgenda>;

const Wrapper = ({
  initialView = "week",
  showYearView = false,
  ...args
}: Partial<EventCalendarProps>) => {
  const [events, setEvents] = useState<CalendarEventAgenda[]>(sampleEvents);

  const handleUpdate = (updatedEvent: CalendarEventAgenda) => {
    setEvents((prev) =>
      prev.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev)),
    );
  };

  return (
    <div className="h-[600px] p-4 text-foreground bg-background">
      <EventAgenda
        events={events}
        onEventUpdate={handleUpdate}
        initialView={initialView}
        showYearView={showYearView}
        {...args}
      />
    </div>
  );
};

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function Playground() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      initialView="month"
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
  },
  render: (args) => <Wrapper initialView={args.initialView} />,
  args: {
    initialView: "month",
  },
};

export const MonthViewExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function MonthViewExample() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
  },
  render: () => <Wrapper />,
  name: "Mês",
};

export const WeekViewExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function WeekViewExample() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      initialView="week"
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
  },
  render: () => <Wrapper initialView="week" />,
  name: "Semana",
};

export const DayViewExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function DayViewExample() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      initialView="day"
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
  },
  render: () => <Wrapper initialView="day" />,
  name: "Dia",
};

export const AgendaViewExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function AgendaViewExample() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventAgenda
      events={events}
      initialView="agenda"
      onEventAdd={handleEventAdd}
      onEventDelete={handleEventDelete}
      onEventUpdate={handleEventUpdate}
    />
  );
}
`,
      },
    },
  },
  render: () => <Wrapper initialView="agenda" />,
  name: "Agenda",
};

export const YearViewExample: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function YearViewExample() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  return (
    <EventAgenda
      events={events}
      initialView="year"
      showYearView={true}
    />
  );
}
`,
      },
    },
  },
  args: {
    showYearView: true,
  },
  render: (args) => <Wrapper initialView="year" {...args} />,
  name: "Ano",
};

export const ManyEvents: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';
import { addDays, setHours, setMinutes } from 'date-fns';

export default function ManyEvents() {
  // create many events to stress layout
  const many = Array.from({ length: 40 }).map((_, i) => {
    const start = addDays(new Date(), i % 7);
    return {
      id: String(100 + i),
      title: \`Evento \${i + 1}\`,
      start: setMinutes(setHours(start, 9 + (i % 8)), 0),
      end: setMinutes(setHours(start, 10 + (i % 8)), 0),
      color: ["sky", "amber", "emerald", "violet", "rose", "orange"][i % 6],
    } as CalendarEvent;
  });

  return <EventAgenda events={many} initialView="week" />;
}
`,
      },
    },
  },
  render: () => {
    const many = Array.from({ length: 40 }).map((_, i) => {
      const start = addDays(new Date(), i % 7);
      return {
        id: String(100 + i),
        title: `Evento ${i + 1}`,
        start: setMinutes(setHours(start, 9 + (i % 8)), 0),
        end: setMinutes(setHours(start, 10 + (i % 8)), 0),
        color: ["sky", "amber", "emerald", "violet", "rose", "orange"][i % 6],
      } as CalendarEventAgenda;
    });

    return <EventAgenda events={many} initialView="week" />;
  },
  name: "Muitos eventos",
};

export const AgendaOnly: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function AgendaOnly() {
  const events: CalendarEvent[] = /* ... */ [];
  return <EventAgenda events={events} mode="agenda-only" initialView="agenda" />;
}
`,
      },
    },
  },
  render: () => <Wrapper initialView="agenda" />,
  name: "Agenda (somente visualização)",
};

export const AgendaWithUndated: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { EventAgenda, CalendarEvent } from '@mlw-packages/react-components';

export default function AgendaWithUndated() {
  const events: CalendarEvent[] = [
      {
      id: 'u1',
      title: 'Consulta sem data',
      description: 'Cliente sem agendamento definido',
      color: 'rose',
    },
    {
      id: 'u2',
      title: 'Retorno sem previsão',
      color: 'amber',
    },
  ];

  return <EventAgenda events={events} mode="agenda-only" initialView="agenda" />;
}
`,
      },
    },
  },
  render: () => {
    const events: CalendarEventAgenda[] = [
      {
        id: "u1",
        title: "Acme Corp - Malwee",
        start: new Date("2025-03-02T09:00:00.000Z"),
        color: "rose",
      },
      {
        id: "u2",
        title: "Acme Corp - Malwee",
        start: new Date("2025-03-02T14:00:00.000Z"),
        color: "amber",
      },
      {
        id: "u3",
        title: "Acme Corp - Malwee",
        color: "emerald",
      },
      {
        id: "u4",
        title: "Acme Corp - Malwee",
        color: "rose",
      },
      {
        id: "u5",
        title: "Acme Corp - Emfim",
        color: "rose",
      },
      {
        id: "u6",
        title: "Acme Corp - Malwee Kids",
        color: "rose",
      },
    ];

    return (
      <EventAgenda
        events={events}
        initialView="agenda"
        initialDate={new Date("2025-03-03T00:00:00.000Z")}
      />
    );
  },
  name: "Agenda — Datas não previstas",
};

export const ModalOnClick: Story = {
  render: () => {
    const events = sampleEvents.slice(0, 6);
    return <EventAgenda events={events} onClick={<EventDetailModalAgenda />} />;
  },
  name: "Abrir modal ao clicar",
};

export const CrowdedExample: Story = {
  render: () => {
    const today = new Date();
    const crowdedEvents: CalendarEventAgenda[] = [
      {
        id: "ad1",
        title: "Evento All-Day 1",
        allDay: true,
        start: today,
        end: today,
        color: "sky",
      },
      {
        id: "ad2",
        title: "Evento All-Day 2",
        allDay: true,
        start: today,
        end: today,
        color: "amber",
      },
      {
        id: "ad3",
        title: "Evento All-Day 3",
        allDay: true,
        start: today,
        end: today,
        color: "emerald",
      },
      {
        id: "ad4",
        title: "Evento All-Day 4",
        allDay: true,
        start: today,
        end: today,
        color: "rose",
      },
      {
        id: "ad5",
        title: "Evento All-Day 5",
        allDay: true,
        start: today,
        end: today,
        color: "violet",
      },

      // Multi-day events
      {
        id: "md1",
        title: "Multi-day 1 (3 dias)",
        start: subDays(today, 1),
        end: addDays(today, 1),
        color: "orange",
      },
      {
        id: "md2",
        title: "Multi-day 2 (5 dias)",
        start: subDays(today, 2),
        end: addDays(today, 2),
        color: "sky",
      },
      {
        id: "md3",
        title: "Multi-day 3 (Fim de semana)",
        start: addDays(today, 3),
        end: addDays(today, 5),
        color: "emerald",
      },

      // Timed events with massive overlap
      {
        id: "t1",
        title: "Overlapping 1",
        start: setMinutes(setHours(today, 9), 0),
        end: setMinutes(setHours(today, 11), 0),
        color: "sky",
      },
      {
        id: "t2",
        title: "Overlapping 2",
        start: setMinutes(setHours(today, 9), 30),
        end: setMinutes(setHours(today, 10), 30),
        color: "amber",
      },
      {
        id: "t3",
        title: "Overlapping 3",
        start: setMinutes(setHours(today, 10), 0),
        end: setMinutes(setHours(today, 12), 0),
        color: "emerald",
      },
      {
        id: "t4",
        title: "Overlapping 4",
        start: setMinutes(setHours(today, 10), 15),
        end: setMinutes(setHours(today, 11), 15),
        color: "rose",
      },
      {
        id: "t5",
        title: "Overlapping 5",
        start: setMinutes(setHours(today, 10), 30),
        end: setMinutes(setHours(today, 11), 30),
        color: "violet",
      },
      {
        id: "t6",
        title: "Overlapping 6",
        start: setMinutes(setHours(today, 11), 0),
        end: setMinutes(setHours(today, 13), 0),
        color: "orange",
      },
      {
        id: "t7",
        title: "Overlapping 7",
        start: setMinutes(setHours(today, 11), 30),
        end: setMinutes(setHours(today, 12), 30),
        color: "sky",
      },
      {
        id: "t8",
        title: "Overlapping 8",
        start: setMinutes(setHours(today, 12), 0),
        end: setMinutes(setHours(today, 14), 0),
        color: "amber",
      },
      {
        id: "t9",
        title: "Overlapping 9",
        start: setMinutes(setHours(today, 12), 15),
        end: setMinutes(setHours(today, 13), 15),
        color: "emerald",
      },
      {
        id: "t10",
        title: "Overlapping 10",
        start: setMinutes(setHours(today, 12), 30),
        end: setMinutes(setHours(today, 13), 30),
        color: "rose",
      },
    ];

    return <EventAgenda events={crowdedEvents} initialView="week" />;
  },
  name: "Exemplo Superlotado",
};

export const StressTestExample: Story = {
  render: () => {
    const today = new Date();
    const colors: EventColorAgenda[] = [
      "sky",
      "amber",
      "emerald",
      "violet",
      "rose",
      "orange",
    ];

    const stressEvents: CalendarEventAgenda[] = [
      // 20 All-day events on the same day
      ...Array.from({ length: 20 }).map(
        (_, i): CalendarEventAgenda => ({
          id: `stress-ad-${i}`,
          title: `Stress All-Day ${i + 1}`,
          allDay: true,
          start: today,
          end: today,
          color: colors[i % colors.length],
        }),
      ),

      // 10 Multi-day overlapping events
      ...Array.from({ length: 10 }).map(
        (_, i): CalendarEventAgenda => ({
          id: `stress-md-${i}`,
          title: `Stress Multi-day ${i + 1}`,
          start: subDays(today, i % 4),
          end: addDays(today, (i % 4) + 1),
          color: colors[(i + 2) % colors.length],
        }),
      ),

      // 100 Timed events distributed, with extreme overlaps
      ...Array.from({ length: 100 }).map((_, i) => {
        // Create clusters of overlaps
        const cluster = Math.floor(i / 10);
        const dayOffset = cluster % 3; // spread over 3 days
        const hour = 9 + (cluster % 8); // cluster around certain hours
        const minute = (i % 10) * 5; // offset slightly within the cluster

        const start = setMinutes(
          setHours(addDays(today, dayOffset - 1), hour),
          minute,
        );
        const end = setMinutes(
          setHours(addDays(today, dayOffset - 1), hour + 1),
          minute + 30,
        );

        return {
          id: `stress-t-${i}`,
          title: `Stress Timed ${i + 1} (Cluster ${cluster})`,
          start,
          end,
          color: colors[i % colors.length],
        } satisfies CalendarEventAgenda;
      }),
    ];

    return (
      <EventAgenda
        events={stressEvents}
        initialView="week"
        initialDate={today}
      />
    );
  },
  name: "Teste de Estresse",
};

export const BusyWeek: Story = {
  render: () => {
    const mon = addDays(new Date(), -(new Date().getDay() - 1));
    const d = (offset: number) => addDays(mon, offset);
    const t = (day: number, h: number, m = 0) =>
      setMinutes(setHours(d(day), h), m);

    const events: CalendarEventAgenda[] = [
      {
        id: "ad2",
        title: "Onboarding — Ana Lima",
        allDay: true,
        start: d(0),
        end: d(1),
        color: "emerald",
        location: "RH - Sala 3",
      },
      {
        id: "ad3",
        title: "Feriado Municipal",
        allDay: true,
        start: d(2),
        end: d(2),
        color: "rose",
      },

      // ── Segunda (day 0) ──────────────────────────────────────────────
      {
        id: "m1",
        title: "Daily Standup",
        start: t(0, 9, 0),
        end: t(0, 9, 15),
        color: "sky",
        location: "Meet",
        description: "Sync rápido de 15 min",
      },
      {
        id: "m2",
        title: "Planejamento de Sprint",
        start: t(0, 9, 30),
        end: t(0, 11, 30),
        color: "amber",
        location: "Sala Ágil",
        description: "Definição de itens do backlog para o Sprint 42",
      },
      {
        id: "m3",
        title: "Design Review - Checkout",
        start: t(0, 10, 0),
        end: t(0, 11, 0),
        color: "violet",
        location: "Figma + Meet",
        description: "Review dos fluxos de checkout mobile",
      },
      {
        id: "m4",
        title: "1:1 com Gerente",
        start: t(0, 11, 0),
        end: t(0, 11, 45),
        color: "rose",
        location: "Sala Diretoria",
      },
      {
        id: "m5",
        title: "Almoço com Time",
        start: t(0, 12, 0),
        end: t(0, 13, 0),
        color: "emerald",
        location: "Restaurante térreo",
      },
      {
        id: "m6",
        title: "Refinamento do Backlog",
        start: t(0, 14, 0),
        end: t(0, 15, 30),
        color: "sky",
        location: "Sala Ágil",
      },
      {
        id: "m7",
        title: "Code Review - PR #284",
        start: t(0, 15, 0),
        end: t(0, 16, 0),
        color: "amber",
        description: "Revisão do refactor de autenticação",
      },
      {
        id: "m8",
        title: "Call com Fornecedor",
        start: t(0, 16, 30),
        end: t(0, 17, 15),
        color: "orange",
        location: "Zoom",
        description: "Negociação de termos de SLA",
      },

      // ── Terça (day 1) ────────────────────────────────────────────────
      {
        id: "t1",
        title: "Daily Standup",
        start: t(1, 9, 0),
        end: t(1, 9, 15),
        color: "sky",
        location: "Meet",
      },
      {
        id: "t2",
        title: "Workshop UX — Pesquisa com Usuários",
        start: t(1, 9, 30),
        end: t(1, 12, 0),
        color: "violet",
        location: "Auditório B",
        description: "Workshop de descoberta e pesquisa qualitativa",
      },
      {
        id: "t3",
        title: "Entrevista Técnica - Dev Backend",
        start: t(1, 10, 0),
        end: t(1, 11, 0),
        color: "rose",
        location: "Sala RH",
        description: "Entrevista técnica para vaga de backend sênior",
      },
      {
        id: "t4",
        title: "Sync com Produto",
        start: t(1, 13, 30),
        end: t(1, 14, 30),
        color: "amber",
        location: "Teams",
      },
      {
        id: "t5",
        title: "Apresentação OKRs Q2",
        start: t(1, 14, 0),
        end: t(1, 15, 30),
        color: "emerald",
        location: "Sala Ampla",
        description: "Apresentação dos resultados e metas para o Q2",
      },
      {
        id: "t6",
        title: "Revisão de Contrato",
        start: t(1, 16, 0),
        end: t(1, 17, 0),
        color: "orange",
        location: "Jurídico",
      },

      // ── Quarta (day 2) ───────────────────────────────────────────────
      {
        id: "q1",
        title: "Daily Standup",
        start: t(2, 9, 0),
        end: t(2, 9, 15),
        color: "sky",
        location: "Meet",
      },
      {
        id: "q2",
        title: "Reunião com CEO",
        start: t(2, 9, 30),
        end: t(2, 10, 30),
        color: "rose",
        location: "Sala Diretoria",
        description: "Alinhamento estratégico Q2",
      },
      {
        id: "q3",
        title: "Squad Meeting — Plataforma",
        start: t(2, 10, 0),
        end: t(2, 11, 30),
        color: "sky",
        location: "Slack Huddle",
      },
      {
        id: "q4",
        title: "Capacitação — AWS Cloud",
        start: t(2, 13, 0),
        end: t(2, 17, 0),
        color: "amber",
        location: "Online - Coursera",
        description: "Treinamento interno de certificação AWS",
      },
      {
        id: "q5",
        title: "Deploy em Produção",
        start: t(2, 15, 0),
        end: t(2, 15, 30),
        color: "emerald",
        description: "Release v3.12 — módulo de pagamentos",
      },

      // ── Quinta (day 3) ───────────────────────────────────────────────
      {
        id: "qui1",
        title: "Daily Standup",
        start: t(3, 9, 0),
        end: t(3, 9, 15),
        color: "sky",
        location: "Meet",
      },
      {
        id: "qui2",
        title: "Mentoria — Giovanna Santos",
        start: t(3, 9, 30),
        end: t(3, 10, 15),
        color: "violet",
        location: "Sala Quiet",
      },
      {
        id: "qui3",
        title: "Apresentação para Investidores",
        start: t(3, 10, 0),
        end: t(3, 12, 0),
        color: "rose",
        location: "Auditório Principal",
        description: "Deck de captação série B",
      },
      {
        id: "qui4",
        title: "Almoço com Investidor",
        start: t(3, 12, 0),
        end: t(3, 13, 30),
        color: "orange",
        location: "Restaurante Varanda",
      },
      {
        id: "qui5",
        title: "Retrospectiva do Sprint",
        start: t(3, 14, 0),
        end: t(3, 15, 0),
        color: "emerald",
        location: "Sala Ágil",
      },
      {
        id: "qui6",
        title: "Fechamento de Proposta",
        start: t(3, 15, 30),
        end: t(3, 17, 0),
        color: "amber",
        location: "Teams",
        description: "Proposta comercial para cliente Varejo",
      },

      // ── Sexta (day 4) ────────────────────────────────────────────────
      {
        id: "sex1",
        title: "Daily Standup",
        start: t(4, 9, 0),
        end: t(4, 9, 15),
        color: "sky",
        location: "Meet",
      },
      {
        id: "sex2",
        title: "Review Final - Sprint 42",
        start: t(4, 9, 30),
        end: t(4, 11, 0),
        color: "violet",
        location: "Sala Ágil",
        description: "Demo das entregas do sprint para stakeholders",
      },
      {
        id: "sex3",
        title: "Happy Hour do Time",
        start: t(4, 17, 0),
        end: t(4, 19, 0),
        color: "rose",
        location: "Bar do Escritório",
        description: "Comemoração das entregas da semana 🎉",
      },
    ];

    return <EventAgenda events={events} initialView="week" initialDate={mon} />;
  },
  name: "Semana Agitada",
};

export const BusyMonth: Story = {
  render: () => {
    const today = new Date();
    const y = today.getFullYear();
    const mo = today.getMonth();
    const md = (day: number) => new Date(y, mo, day);
    const mt = (day: number, h: number, m = 0) => new Date(y, mo, day, h, m);

    const events: CalendarEventAgenda[] = [
      {
        id: "ML-conf",
        title: "TechConf 2025",
        allDay: true,
        start: md(3),
        end: md(5),
        color: "violet" as EventColorAgenda,
        location: "Centro de Convenções SP",
      },
      {
        id: "ML-sprint1",
        title: "Sprint 43",
        allDay: true,
        start: md(6),
        end: md(17),
        color: "sky" as EventColorAgenda,
      },
      {
        id: "ML-ferias",
        title: "Férias — Carlos Mendes",
        allDay: true,
        start: md(10),
        end: md(16),
        color: "emerald" as EventColorAgenda,
      },
      {
        id: "ML-feriado1",
        title: "Feriado Nacional",
        allDay: true,
        start: md(15),
        end: md(15),
        color: "rose" as EventColorAgenda,
      },
      {
        id: "ML-sprint2",
        title: "Sprint 44",
        allDay: true,
        start: md(20),
        end: md(28),
        color: "sky" as EventColorAgenda,
      },
      {
        id: "ML-hackathon",
        title: "Hackathon Interno",
        allDay: true,
        start: md(22),
        end: md(23),
        color: "amber" as EventColorAgenda,
        location: "Escritório - Andar 4",
      },
      {
        id: "w1-1",
        title: "Kickoff do Mês",
        start: mt(2, 9),
        end: mt(2, 10),
        color: "amber" as EventColorAgenda,
        location: "Sala Grande",
      },
      {
        id: "w1-2",
        title: "1:1 Liderança",
        start: mt(2, 10, 30),
        end: mt(2, 11, 15),
        color: "rose" as EventColorAgenda,
      },
      {
        id: "w1-3",
        title: "TechConf: Abertura",
        start: mt(3, 9),
        end: mt(3, 12),
        color: "violet" as EventColorAgenda,
        location: "Auditório A",
      },
      {
        id: "w1-4",
        title: "TechConf: Workshop IA",
        start: mt(3, 14),
        end: mt(3, 17),
        color: "violet" as EventColorAgenda,
      },
      {
        id: "w1-5",
        title: "Almoço Executivo",
        start: mt(4, 12),
        end: mt(4, 13, 30),
        color: "orange" as EventColorAgenda,
        location: "Restaurante Varanda",
      },
      {
        id: "w1-6",
        title: "Revisão de Orçamento Q1",
        start: mt(5, 9),
        end: mt(5, 11),
        color: "rose" as EventColorAgenda,
      },
      {
        id: "w2-1",
        title: "Planning Sprint 43",
        start: mt(6, 9),
        end: mt(6, 11),
        color: "sky" as EventColorAgenda,
        location: "Sala Ágil",
      },
      {
        id: "w2-2",
        title: "Entrevista Técnica — Dev Sênior",
        start: mt(7, 10),
        end: mt(7, 11),
        color: "emerald" as EventColorAgenda,
        location: "Sala RH",
      },
      {
        id: "w2-3",
        title: "Reunião de Produto",
        start: mt(7, 14),
        end: mt(7, 15, 30),
        color: "amber" as EventColorAgenda,
      },
      {
        id: "w2-4",
        title: "Consulta Médica",
        start: mt(8, 9, 30),
        end: mt(8, 10, 30),
        color: "rose" as EventColorAgenda,
        description: "Check-up anual",
      },
      {
        id: "w2-5",
        title: "Workshop Design System",
        start: mt(8, 14),
        end: mt(8, 17),
        color: "violet" as EventColorAgenda,
        location: "Figma + Meet",
      },
      {
        id: "w2-6",
        title: "Apresentação para Parceiros",
        start: mt(9, 10),
        end: mt(9, 12),
        color: "orange" as EventColorAgenda,
      },
      {
        id: "w2-7",
        title: "Alinhamento de Roadmap",
        start: mt(9, 15),
        end: mt(9, 17),
        color: "indigo" as EventColorAgenda,
      },
      {
        id: "w2-8",
        title: "Happy Hour de Boas-vindas",
        start: mt(10, 18),
        end: mt(10, 20),
        color: "emerald" as EventColorAgenda,
        location: "Rooftop",
      },
      {
        id: "w3-1",
        title: "Mentoria Grupo",
        start: mt(13, 10),
        end: mt(13, 11, 30),
        color: "violet" as EventColorAgenda,
      },
      {
        id: "w3-2",
        title: "Curso Liderança Ágil — Módulo 2",
        start: mt(14, 9),
        end: mt(14, 12),
        color: "amber" as EventColorAgenda,
      },
      {
        id: "w3-3",
        title: "Demo para Cliente Varejo",
        start: mt(14, 14),
        end: mt(14, 15, 30),
        color: "orange" as EventColorAgenda,
        location: "Zoom",
      },
      {
        id: "w3-4",
        title: "Retrospectiva Sprint 43",
        start: mt(17, 14),
        end: mt(17, 15),
        color: "emerald" as EventColorAgenda,
      },
      {
        id: "w4-1",
        title: "Planning Sprint 44",
        start: mt(20, 9),
        end: mt(20, 11),
        color: "sky" as EventColorAgenda,
      },
      {
        id: "w4-2",
        title: "Reunião Board",
        start: mt(21, 9),
        end: mt(21, 11, 30),
        color: "rose" as EventColorAgenda,
        location: "Sala Conselho",
      },
      {
        id: "w4-3",
        title: "Almoço com Investidor",
        start: mt(21, 12),
        end: mt(21, 13, 30),
        color: "orange" as EventColorAgenda,
      },
      {
        id: "w4-4",
        title: "Hackathon — Abertura",
        start: mt(22, 9),
        end: mt(22, 10),
        color: "amber" as EventColorAgenda,
      },
      {
        id: "w4-5",
        title: "Hackathon — Pitches Finais",
        start: mt(22, 16),
        end: mt(22, 18),
        color: "amber" as EventColorAgenda,
        location: "Auditório",
      },
      {
        id: "w4-6",
        title: "Hackathon — Premiação",
        start: mt(23, 16),
        end: mt(23, 18),
        color: "amber" as EventColorAgenda,
      },
      {
        id: "w4-7",
        title: "Workshop Segurança & LGPD",
        start: mt(24, 9),
        end: mt(24, 12),
        color: "indigo" as EventColorAgenda,
      },
      {
        id: "w5-1",
        title: "Apresentação de Resultados do Mês",
        start: mt(27, 10),
        end: mt(27, 12),
        color: "rose" as EventColorAgenda,
      },
      {
        id: "w5-2",
        title: "Deploy Final do Mês",
        start: mt(28, 16, 30),
        end: mt(28, 17),
        color: "emerald" as EventColorAgenda,
      },
      {
        id: "w5-3",
        title: "Happy Hour de Encerramento",
        start: mt(28, 18),
        end: mt(28, 20),
        color: "rose" as EventColorAgenda,
        location: "Rooftop",
      },
    ];

    return (
      <EventAgenda
        events={events}
        initialView="month"
        initialDate={md(1)}
        onClick={<EventDetailModalAgenda />}
      />
    );
  },
  name: "Mês Agitado",
};

export const BusyYear: Story = {
  render: () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const colors: EventColorAgenda[] = [
      "sky",
      "amber",
      "violet",
      "rose",
      "emerald",
      "orange",
      "blue",
      "indigo",
      "pink",
    ];

    const generateEventsForYear = () => {
      const yearEvents: CalendarEventAgenda[] = [];
      // Generate 60 major projects (multiple days)
      for (let i = 0; i < 60; i++) {
        const month = i % 12;
        const startDay = 1 + ((i * 3) % 25);
        const duration = 2 + (i % 10);
        yearEvents.push({
          id: `year-proj-${i}`,
          title: `Projeto Estratégico ${String.fromCharCode(65 + (i % 26))}-${i}`,
          start: new Date(currentYear, month, startDay),
          end: new Date(currentYear, month, startDay + duration),
          allDay: true,
          color: colors[i % colors.length],
          location: "Escritório Central",
          description: `Acompanhamento do projeto estratégico com stakeholders.`,
        });
      }

      // Generate 300 timed events spread throughout the year
      for (let i = 0; i < 300; i++) {
        const month = i % 12;
        const day = 1 + (Math.floor(i / 10) % 28);
        const hour = 8 + (i % 12);
        const minute = (i % 4) * 15;
        yearEvents.push({
          id: `year-meeting-${i}`,
          title: `Reunião Recorrente #${i + 1}`,
          start: new Date(currentYear, month, day, hour, minute),
          end: new Date(currentYear, month, day, hour + 1, minute + 30),
          color: colors[(i + 2) % colors.length],
          location: i % 2 === 0 ? "Meet" : "Sala de Reuniões",
          description: "Sync de alinhamento periódico para controle de metas.",
        });
      }

      // Generate 150 all-day events (single day)
      for (let i = 0; i < 150; i++) {
        const month = i % 12;
        const day = 1 + (i % 28);
        yearEvents.push({
          id: `year-allday-${i}`,
          title: `Marco/Feriado ${i + 1}`,
          start: new Date(currentYear, month, day),
          end: new Date(currentYear, month, day),
          allDay: true,
          color: colors[(i + 5) % colors.length],
        });
      }

      // Generate 40 timed multiday events (labeled as "Evento")
      for (let i = 0; i < 40; i++) {
        const month = i % 12;
        const day = 1 + ((i * 5) % 25);
        yearEvents.push({
          id: `year-multiday-timed-${i}`,
          title: `Evento Especial Multi-dia ${i + 1}`,
          start: new Date(currentYear, month, day, 10, 0),
          end: new Date(currentYear, month, day + 2, 16, 30),
          color: colors[(i + 8) % colors.length],
          location: "Híbrido",
          description:
            "Evento que atravessa múltiplos dias mantendo horários específicos.",
        });
      }

      // 30 Undated events
      for (let i = 0; i < 30; i++) {
        yearEvents.push({
          id: `year-undated-${i}`,
          title: `Pendência Urgente #${i + 1}`,
          description: "Aguardando definição de cronograma.",
          color: "rose",
        });
      }

      return yearEvents;
    };

    const FullDemoWrapper = () => {
      const [events, setEvents] = useState<CalendarEventAgenda[]>(
        generateEventsForYear(),
      );

      const handleUpdate = (updated: CalendarEventAgenda) => {
        setEvents((prev) =>
          prev.map((ev) => (ev.id === updated.id ? updated : ev)),
        );
        toast.success(`Evento "${updated.title}" atualizado com sucesso!`);
      };

      return (
        <div className="space-y-4">
          <EventAgenda
            events={events}
            onEventUpdate={handleUpdate}
            onClick={<EventDetailModalAgenda />}
            initialView="month"
            showYearView={true}
          />
        </div>
      );
    };

    return <FullDemoWrapper />;
  },
  name: "Ano Completo",
};
