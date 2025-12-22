import "../../style/global.css";
import { Meta, StoryObj } from "@storybook/react-vite";
import { DayPickerProvider } from "react-day-picker";
import { ThemeProviderBase } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { useState } from "react";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import {
  CalendarEventAgenda,
  CalendarViewAgenda,
  EventAgenda,
} from "@/components/event-calendar-view";
import {
  ModalBase,
  ModalContentBase,
  ModalHeaderBase,
  ModalTitleBase,
  ModalDescriptionBase,
  ModalFooterBase,
} from "@/components/ui/feedback";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

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
      <DayPickerProvider initialProps={{}}>
        <ThemeProviderBase>
          <div
            style={{ padding: 24, display: "flex", justifyContent: "center" }}
          >
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
      </DayPickerProvider>
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
      options: ["month", "week", "day", "agenda"],
      description: "View inicial do calendário",
    },
    onEventUpdate: { action: "onEventUpdate" },
  },
};

export default meta;

type Story = StoryObj<typeof EventAgenda>;

function Wrapper(
  props: {
    initialView?: CalendarViewAgenda;
    mode?: "agenda-only" | "default";
  } = {}
) {
  const [events, setEvents] = useState<CalendarEventAgenda[]>(sampleEvents);

  const handleEventUpdate = (updatedEvent: CalendarEventAgenda) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  return (
    <EventAgenda
      events={events}
      initialView={props.initialView || undefined}
      onEventUpdate={(ev) => handleEventUpdate(ev)}
    />
  );
}

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

function EventDetailsModal({
  event,
  onClose,
}: {
  event?: CalendarEventAgenda;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <ModalBase
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) onClose?.();
      }}
    >
      <ModalContentBase size="sm">
        <ModalHeaderBase>
          <ModalTitleBase>
            {event?.title ?? "Detalhes do evento"}
          </ModalTitleBase>
          <ModalDescriptionBase>
            {event?.description ?? event?.location}
          </ModalDescriptionBase>
        </ModalHeaderBase>

        <div className="mt-3 space-y-2 text-sm">
          {event?.start ? (
            <div>Início: {event.start.toString()}</div>
          ) : (
            <div>Sem data definida</div>
          )}
          {event?.end && <div>Fim: {event.end.toString()}</div>}
        </div>

        <ModalFooterBase>
          <ButtonBase onClick={() => setOpen(false)}>Fechar</ButtonBase>
        </ModalFooterBase>
      </ModalContentBase>
    </ModalBase>
  );
}

export const ModalOnClick: Story = {
  render: () => {
    const events = sampleEvents.slice(0, 6);
    return <EventAgenda events={events} onClick={<EventDetailsModal />} />;
  },
  name: "Abrir modal ao clicar",
};
