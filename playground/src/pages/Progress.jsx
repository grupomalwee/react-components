"use client";

import * as React from "react";
import { ProgressBase } from "@lib";

export const ProgressPage = () => {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Progress Bar 100% */}
      <div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
        <ProgressBase value={progress} className="w-full" />
      </div>

      {/* Progress Bars with different widths */}
      <div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
        <ProgressBase value={progress} className="w-[20%]" />
        <ProgressBase value={progress} className="w-[50%]" />
        <ProgressBase value={progress} className="w-[70%]" />
        <ProgressBase value={progress} className="w-[90%]" />
      </div>

      {/* Documentation Section */}
      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        {/* Code Block for Importing */}
        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import * as React from "react";
import { ProgressBase } from "@/components/ui/ProgressBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
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
    </div>
  );
};
