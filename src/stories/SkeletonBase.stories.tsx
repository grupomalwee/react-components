import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkeletonBase } from '../components/ui/SkeletonBase';

const meta: Meta<typeof SkeletonBase> = {
  title: 'Components/SkeletonBase',
  component: SkeletonBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SkeletonBase>;

export const Default: Story = {
  render: () => <SkeletonBase style={{ width: 120, height: 24 }} />,
};

export const VariosSkeletons: Story = {
  name: 'Vários exemplos',
  render: () => (
    <div className="p-6 flex flex-col gap-10">
      <div className="flex gap-5">
        <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
        <SkeletonBase className="w-[350px] h-24 rounded-2xl" />
      </div>
      <div className="flex items-center gap-4">
        <SkeletonBase className="w-14 h-14 rounded-full" />
        <div className="flex flex-col gap-2">
          <SkeletonBase className="w-[200px] h-4 rounded-md" />
          <SkeletonBase className="w-[150px] h-4 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <SkeletonBase className="w-10 h-10 rounded-md" />
            <SkeletonBase className="w-full h-4 rounded-md" />
            <SkeletonBase className="w-[80px] h-4 rounded-md" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <SkeletonBase className="w-[100px] h-4 rounded" />
        <SkeletonBase className="w-full h-10 rounded-md" />
      </div>
      <div className="flex gap-4">
        <SkeletonBase className="w-[100px] h-10 rounded-md" />
        <SkeletonBase className="w-[150px] h-10 rounded-md" />
      </div>
      <SkeletonBase className="w-full h-[200px] rounded-xl" />
    </div>
  ),
};
