
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
  title: 'navigation/DropDownMenu',
  component: DropDownMenuBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'DropDownMenu para ações rápidas, navegação e seleção de opções.'
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
type Story = StoryObj<typeof DropDownMenuBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
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
    </div>
  ),
};
