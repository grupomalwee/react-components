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
  title: 'Components/SelectBase',
  component: SelectBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SelectBase>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
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
