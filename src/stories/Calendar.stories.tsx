import "../style/global.css";
import type { Meta } from '@storybook/react-vite';
import { CalendarBase, CalendarPopover } from '../components/date-time-picker/calendar';
import { useState } from 'react';

const meta: Meta<typeof CalendarBase> = {
  title: 'forms/Calendar',
  component: CalendarBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Calendário para seleção de datas, com modos single, range, múltiplo e popover.'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f6f6f6' },
        { name: 'dark', value: '#222' }
      ]
    },
    layout: 'centered',
  },
};

export default meta;

export const SingleDate = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase mode="single" selected={date} onSelect={setDate} />
      </div>
    );
  },
};

export const Range = {
  render: () => {
    const [range, setRange] = useState<{ from: Date | undefined; to?: Date | undefined } | undefined>(undefined);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase mode="range" selected={range} onSelect={setRange} />
      </div>
    );
  },
};

export const Multiple = {
  render: () => {
    const [multiple, setMultiple] = useState<Date[]>([]);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase
          mode="multiple"
          selected={multiple}
          onSelect={(days) => setMultiple(days ?? [])}
        />
      </div>
    );
  },
};

export const DisabledDates = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={[new Date(2025, 5, 20), new Date(2025, 5, 21), new Date(2025, 5, 22)]} />
      </div>
    );
  },
};

export const NoWeekends = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase mode="single" selected={date} onSelect={setDate} disabled={(date) => [0, 6].includes(date.getDay())} />
      </div>
    );
  },
};

export const DateLimits = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarBase mode="single" selected={date} onSelect={setDate} fromDate={new Date(2025, 5, 15)} toDate={new Date(2025, 5, 30)} />
      </div>
    );
  },
};

export const WithPopover = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <CalendarPopover label="Escolher Data" selected={selectedDate} onSelect={setSelectedDate} />
      </div>
    );
  },
};
