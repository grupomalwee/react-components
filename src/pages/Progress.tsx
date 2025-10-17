"use client";

import * as React from "react";
import {
  ProgressBase,
  ProgressSegmentsBase,
  ProgressPanelsBase,
  ProgressCirclesBase,
} from "@/components/ui/ProgressBase";
import { DownloadIcon } from "@phosphor-icons/react";

export const ProgressPage = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full px-6 py-10 flex flex-col gap-10 bg-background">
      <section className="flex flex-col gap-6">
        <ProgressBase
          value={120}
          label="Download "
          leftIcon={<DownloadIcon />}
          showValue
          valuePosition="right"
          autocolor={[70, 100]}
          plusIndicator
        />
        <ProgressBase
          value={120}
          className="w-full "
          label="Download "
          leftIcon={<DownloadIcon />}
          showValue
          valuePosition="right"
          autocolor={[70, 100]}
        />
        <ProgressBase
          value={120}
          className="w-full"
          label="Download "
          leftIcon={<DownloadIcon />}
          showValue
          valuePosition="right"
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

      <section>
        <h3 className="text-2xl font-semibold mb-4">Documentação</h3>
        <div className="space-y-6">
          <div className="bg-zinc-900 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-zinc-800 p-3 rounded-sm overflow-x-auto">
              <code>
                {`import * as React from "react";
import { ProgressBase } from "@/components/ui/ProgressBase";`}
              </code>
            </pre>
          </div>

          <div className="bg-zinc-900 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Como usar:</h5>
            <pre className="bg-zinc-800 p-3 rounded-sm overflow-x-auto">
              <code>
                {`const [progress, setProgress] = React.useState(13);

React.useEffect(() => {
  const timer = setTimeout(() => setProgress(66), 500);
  return () => clearTimeout(timer);
}, []);

<ProgressBase value={progress} className="w-full" />
<ProgressBase value={progress} className="w-[20%]" />
<ProgressBase value={progress} className="w-[50%]" />
<ProgressBase value={progress} className="w-[70%]" />
<ProgressBase value={progress} className="w-[90%]" />`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
};
