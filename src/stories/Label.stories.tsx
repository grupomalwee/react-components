import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import LabelBase from '../components/ui/LabelBase';

const meta: Meta<typeof LabelBase> = {
  title: 'forms/Label',
  component: LabelBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LabelBase>;

export const Default: Story = {
  render: () => <LabelBase htmlFor="input">Label de exemplo</LabelBase>,
};
