import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressBase,
  ProgressSegmentsBase,
  ProgressPanelsBase,
  ProgressCirclesBase,
} from '../components/ui/ProgressBase';
import { Download } from 'phosphor-react';
import * as React from 'react';

const meta: Meta<typeof ProgressBase> = {
  title: 'Components/ProgressBase',
  component: ProgressBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProgressBase>;

export const Default: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div className=" w-full px-6 py-10 flex flex-col gap-10 bg-background">
        <section className="flex flex-col gap-6">
          <ProgressBase
            value={progress}
            className="w-full"
            label="Download "
            leftIcon={<Download />}
          />
          <ProgressSegmentsBase segments={10} value={progress} label="Segment" />
          <ProgressPanelsBase
            steps={["Briefing", "Design", "Dev", "Deploy"]}
            currentStep={2}
            label="Panels"
          />
          <ProgressCirclesBase
            steps={["Login", "Endereço", "Pagamento", "Felicidade"]}
            currentStep={2}
            label="Circle"
          />
        </section>
      </div>
    );
  },
};
