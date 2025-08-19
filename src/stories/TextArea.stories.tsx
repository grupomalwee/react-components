import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextAreaBase } from '../components/ui/TextAreaBase';

const meta: Meta<typeof TextAreaBase> = {
  title: 'forms/TextArea',
  component: TextAreaBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'TextArea para entrada de texto, comentários e formulários.'
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
type Story = StoryObj<typeof TextAreaBase>;

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
      <TextAreaBase placeholder="Digite algo..." />
    </div>
  ),
};
