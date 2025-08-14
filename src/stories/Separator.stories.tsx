import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SeparatorBase } from '../components/ui/SeparatorBase';

const meta: Meta<typeof SeparatorBase> = {
  title: 'Components/SeparatorBase',
  component: SeparatorBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SeparatorBase>;

export const Default: Story = {
  name: 'Exemplo com múltiplas seções',
  render: () => (
    <div className="p-5">
      <h1>Section 1</h1>
      <p>This is the first section content.</p>
      <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
      <h1>Section 2</h1>
      <p>This is the second section content.</p>
      <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
      <h1>Section 3</h1>
      <p>This is the third section content.</p>
    </div>
  ),
};
