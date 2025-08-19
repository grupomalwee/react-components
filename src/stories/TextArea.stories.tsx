import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextAreaBase } from '../components/ui/TextAreaBase';

const meta: Meta<typeof TextAreaBase> = {
  title: 'forms/TextArea',
  component: TextAreaBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextAreaBase>;

export const Default: Story = {
  render: () => <TextAreaBase placeholder="Digite algo..." />,
};
