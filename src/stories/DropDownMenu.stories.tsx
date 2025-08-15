
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DropDownMenuBase,
  DropDownMenuTriggerBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuSeparatorBase,
} from '../components/ui/DropDownMenuBase';
import { Check, List } from 'phosphor-react';

const meta: Meta<typeof DropDownMenuBase> = {
  title: 'Components/DropDownMenu',
  component: DropDownMenuBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropDownMenuBase>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <DropDownMenuBase>
        <DropDownMenuTriggerBase className="flex items-center gap-2">
          Abrir menu
          <List />
        </DropDownMenuTriggerBase>
        <DropDownMenuContentBase align="end">
          <DropDownMenuLabelBase>My Account</DropDownMenuLabelBase>
          <DropDownMenuSeparatorBase />
          <DropDownMenuItemBase>Profile</DropDownMenuItemBase>
          <DropDownMenuItemBase>Billing</DropDownMenuItemBase>
          <DropDownMenuItemBase rightIcon={<Check />}>Team</DropDownMenuItemBase>
          <DropDownMenuItemBase leftIcon={<Check />}>Subscription</DropDownMenuItemBase>
        </DropDownMenuContentBase>
      </DropDownMenuBase>
    </div>
  ),
};
