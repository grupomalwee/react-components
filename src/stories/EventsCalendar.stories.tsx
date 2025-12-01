import { Meta, StoryObj } from "@storybook/react-vite";
import { DayPickerProvider } from "react-day-picker";
import { ThemeProviderBase } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { useState } from "react";
import { addDays, setHours, setMinutes, subDays } from "date-fns";
import {
  CalendarEvent,
  EventCalendar,
  CalendarView,
} from "@/components/event-calendar";

const sampleEvents: CalendarEvent[] = [
  {
    allDay: true,
    color: "sky",
    description: "Strategic planning for next year",
    end: subDays(new Date(), 23),
    id: "1",
    location: "Main Conference Hall",
    start: subDays(new Date(), 24),
    title: "Annual Planning",
  },
  {
    color: "amber",
    description: "Submit final deliverables",
    end: setMinutes(setHours(subDays(new Date(), 9), 15), 30),
    id: "2",
    location: "Office",
    start: setMinutes(setHours(subDays(new Date(), 9), 13), 0),
    title: "Project Deadline",
  },
  {
    allDay: true,
    color: "orange",
    description: "Strategic planning for next year",
    end: subDays(new Date(), 13),
    id: "3",
    location: "Main Conference Hall",
    start: subDays(new Date(), 13),
    title: "Quarterly Budget Review",
  },
  {
    color: "sky",
    description: "Weekly team sync",
    end: setMinutes(setHours(new Date(), 11), 0),
    id: "4",
    location: "Conference Room A",
    start: setMinutes(setHours(new Date(), 10), 0),
    title: "Team Meeting",
  },
  {
    color: "emerald",
    description: "Discuss new project requirements",
    end: setMinutes(setHours(addDays(new Date(), 1), 13), 15),
    id: "5",
    location: "Downtown Cafe",
    start: setMinutes(setHours(addDays(new Date(), 1), 12), 0),
    title: "Lunch with Client",
  },
  {
    allDay: true,
    color: "violet",
    description: "New product release",
    end: addDays(new Date(), 6),
    id: "6",
    start: addDays(new Date(), 3),
    title: "Product Launch",
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

const meta: Meta<typeof EventCalendar> = {
  title: "data/Event Calendar",
  component: EventCalendar,
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
    layout: "fullscreen",
  },
  argTypes: {
    initialView: {
      control: { type: "select" },
      options: ["month", "week", "day", "agenda"],
      description: "View inicial do calendário",
    },
    onEventAdd: { action: "onEventAdd" },
    onEventUpdate: { action: "onEventUpdate" },
    onEventDelete: { action: "onEventDelete" },
  },
};

export default meta;

type Story = StoryObj<typeof EventCalendar>;

function Wrapper(props: { initialView?: CalendarView } = {}) {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);

  const handleEventAdd = (event: CalendarEvent) =>
    setEvents((s) => [...s, event]);

  const handleEventUpdate = (updatedEvent: CalendarEvent) =>
    setEvents((s) =>
      s.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );

  const handleEventDelete = (eventId: string) =>
    setEvents((s) => s.filter((ev) => ev.id !== eventId));

  return (
    <EventCalendar
      events={events}
      initialView={props.initialView || undefined}
      onEventAdd={(e) => handleEventAdd(e)}
      onEventDelete={(id) => handleEventDelete(id)}
      onEventUpdate={(ev) => handleEventUpdate(ev)}
    />
  );
}

export const Playground: Story = {
  render: (args) => <Wrapper initialView={args.initialView} />,
  args: {
    initialView: "month",
  },
};

export const MonthViewExample: Story = {
  render: () => <Wrapper />,
  name: "Mês",
};

export const WeekViewExample: Story = {
  render: () => <Wrapper initialView="week" />,
  name: "Semana",
};

export const DayViewExample: Story = {
  render: () => <Wrapper initialView="day" />,
  name: "Dia",
};

export const AgendaViewExample: Story = {
  render: () => <Wrapper initialView="agenda" />,
  name: "Agenda",
};

export const ManyEvents: Story = {
  render: () => {
    // create many events to stress layout
    const many = Array.from({ length: 40 }).map((_, i) => {
      const start = addDays(new Date(), i % 7);
      return {
        id: String(100 + i),
        title: `Evento ${i + 1}`,
        start: setMinutes(setHours(start, 9 + (i % 8)), 0),
        end: setMinutes(setHours(start, 10 + (i % 8)), 0),
        color: ["sky", "amber", "emerald", "violet", "rose", "orange"][i % 6],
      } as CalendarEvent;
    });

    return <EventCalendar events={many} initialView="week" />;
  },
  name: "Muitos eventos",
};
