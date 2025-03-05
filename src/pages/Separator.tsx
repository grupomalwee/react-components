"use client";

import { SeparatorBase } from "@/components/ui/SeparatorBase";

export const SeparatorPage = () => {
  return (
    <div>
      {/* Separator Example */}
      <div className="p-5">
        <h1>Section 1</h1>
        <p>This is the first section content.</p>
        <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
        <h1>Section 2</h1>
        <p>This is the second section content.</p>
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
              {`import { SeparatorBase } from "@/components/ui/SeparatorBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<div className="p-5">
  <h1>Section 1</h1>
  <p>This is the first section content.</p>
  <SeparatorBase className="my-5 w-full border-t-2 border-gray-300" />
  <h1>Section 2</h1>
  <p>This is the second section content.</p>
</div>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
