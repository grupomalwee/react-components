"use client";

import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/TooltipBase";

export const TooltipPage = () => {
  return (
    <div>
      {/* Tooltip Example */}
      <div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
        <TooltipProviderBase>
          <TooltipBase>
            <TooltipTriggerBase>Hover</TooltipTriggerBase>
            <TooltipContentBase>
              <p>Add to library</p>
            </TooltipContentBase>
          </TooltipBase>
        </TooltipProviderBase>
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
              {`import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "@/components/ui/TooltipBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<TooltipProviderBase>
  <TooltipBase>
    <TooltipTriggerBase>Hover</TooltipTriggerBase>
    <TooltipContentBase>
      <p>Add to library</p>
    </TooltipContentBase>
  </TooltipBase>
</TooltipProviderBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
