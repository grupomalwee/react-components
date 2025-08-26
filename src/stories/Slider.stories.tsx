import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SlideBase } from '../components/ui/SliderBase';
import { useState } from 'react';
import { SunIcon, LadderIcon } from '@phosphor-icons/react';

const meta: Meta<typeof SlideBase> = {
  title: 'overlays/Slider',
  component: SlideBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Slider para seleção de valores, com orientação horizontal, vertical e ícones.'
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
type Story = StoryObj<typeof SlideBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <div style={{ width: 320 }}>
        <SlideBase defaultValue={[50]} max={100} step={1} />
      </div>
    </div>
  ),
};

export const SliderHorizontal: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([20]);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className="flex flex-col gap-2 w-64">
          <SlideBase
            label="Volume"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>Value: {value[0]}</span>
        </div>
      </div>
    );
  },
};

export const SliderHorizontalIcon: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([50]);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className="flex items-center gap-3 w-64">
          <SunIcon size={24} />
          <SlideBase
            className="flex-1 h-6 rounded-ful"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>{value[0]}%</span>
        </div>
      </div>
    );
  },
};

export const SliderVertical: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([75]);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className="flex flex-col gap-2 h-40">
          <SlideBase
            label="Vertical Slider"
            orientation="vertical"
            className="h-32 w-6 rounded-md"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={1}
          />
          <span>{value[0]}</span>
        </div>
      </div>
    );
  },
};

export const SliderSteps: Story = {
  render: () => {
    const [value, setValue] = useState<number[]>([20]);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className="flex flex-col gap-2 w-64">
          <SlideBase
            label="Slider com Steps"
            className="w-full h-4 rounded-md"
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={25}
            rightIcon={<LadderIcon />}
          />
        </div>
      </div>
    );
  },
};
