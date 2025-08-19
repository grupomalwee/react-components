import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SelectBase,
  SelectTriggerBase,
  SelectContentBase,
  SelectItemBase,
  SelectValueBase,
  SelectGroupBase,
  SelectLabelBase,
} from '../components/ui/SelectBase';
import * as React from 'react';

const meta: Meta<typeof SelectBase> = {
  title: 'selects/Select',
  component: SelectBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Select para seleção de opções, listas e agrupamentos.'
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
type Story = StoryObj<typeof SelectBase>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', padding: '32px 0' }}>
        <SelectBase open={open} onOpenChange={setOpen}>
          <SelectTriggerBase open={open} className="w-[180px]">
            <SelectValueBase placeholder="Select a fruit" />
          </SelectTriggerBase>
          <SelectContentBase>
            <SelectGroupBase>
              <SelectLabelBase>Fruits</SelectLabelBase>
              <SelectItemBase value="apple">Apple</SelectItemBase>
              <SelectItemBase value="banana">Banana</SelectItemBase>
              <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
              <SelectItemBase value="grapes">Grapes</SelectItemBase>
              <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
            </SelectGroupBase>
          </SelectContentBase>
        </SelectBase>
      </div>
    );
  },
};
