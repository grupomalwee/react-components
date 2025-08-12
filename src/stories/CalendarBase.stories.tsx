import "../style/global.css";
import type { Meta } from '@storybook/react-vite';
import { CalendarBase, CalendarPopover } from '../components/date-time-picker/calendar';
import { useState } from 'react';

const meta: Meta<typeof CalendarBase> = {
  title: 'Components/CalendarBase',
  component: CalendarBase,
  tags: ['autodocs'],
};

export default meta;

export const SingleDate = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <CalendarBase mode="single" selected={date} onSelect={setDate} />;
  },
};

export const Range = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined);
    return <CalendarBase mode="range" selected={range} onSelect={setRange} />;
  },
};

export const Multiple = {
  render: () => {
    const [multiple, setMultiple] = useState<Date[]>([]);
    return (
      <CalendarBase
        mode="multiple"
        selected={multiple}
        onSelect={(days) => setMultiple(days ?? [])}
      />
    );
  },
};

export const DisabledDates = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={[new Date(2025, 5, 20), new Date(2025, 5, 21), new Date(2025, 5, 22)]} />;
  },
};

export const NoWeekends = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={(date) => [0, 6].includes(date.getDay())} />;
  },
};

export const DateLimits = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <CalendarBase mode="single" selected={date} onSelect={setDate} fromDate={new Date(2025, 5, 15)} toDate={new Date(2025, 5, 30)} />;
  },
};

export const WithPopover = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return <CalendarPopover label="Escolher Data" selected={selectedDate} onSelect={setSelectedDate} />;
  },
};
