import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ProgressBase,
  ProgressSegmentsBase,
  ProgressPanelsBase,
  ProgressCirclesBase,
} from '../components/ui/ProgressBase';
import { DownloadIcon } from '@phosphor-icons/react';
import * as React from 'react';

const meta: Meta<typeof ProgressBase> = {
  title: 'feedback/Progress',
  component: ProgressBase,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Progress para feedback visual de etapas, downloads e processos.'
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
type Story = StoryObj<typeof ProgressBase>;

export const Default: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(13);
    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '32px 0' }}>
        <div className=" w-full px-6 py-10 flex flex-col gap-10 bg-background">
        <section className="flex flex-col gap-6">
          <ProgressBase
            value={progress}
            className="w-full"
            label="DownloadIcon "
            leftIcon={<DownloadIcon />}
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
      </div>
    );
  },
};
