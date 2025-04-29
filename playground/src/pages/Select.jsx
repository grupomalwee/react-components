"use client";

import {
  SelectBase,
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@lib";

export const SelectPage = () => {
  return (
    <div>
      {/* Select Component Example */}
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <SelectBase>
          <SelectTriggerBase className="w-[180px]">
            <SelectValueBase placeholder="Select a fruit" />
          </SelectTriggerBase>
          <SelectContentBase>
            <SelectGroupBase>
              <SelectLabelBase>Fruits</SelectLabelBase>
              <SelectItemBase value="apple">Apple</SelectItemBase>
              <SelectItemBase value="banana">Banana</SelectItemBase>
              <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
              <SelectItemBase value="grapes">Grapes</SelectItemBase>
              <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
            </SelectGroupBase>
          </SelectContentBase>
        </SelectBase>
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
  SelectBase,
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectTriggerBase,
  SelectValueBase
} from "@/components/ui/SelectBase";`}
            </code>
          </pre>
        </div>

        {/* Code Block for Usage */}
        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<SelectBase>
  <SelectTriggerBase className="w-[180px]">
    <SelectValueBase placeholder="Select a fruit" />
  </SelectTriggerBase>
  <SelectContentBase>
    <SelectGroupBase>
      <SelectLabelBase>Fruits</SelectLabelBase>
      <SelectItemBase value="apple">Apple</SelectItemBase>
      <SelectItemBase value="banana">Banana</SelectItemBase>
      <SelectItemBase value="blueberry">Blueberry</SelectItemBase>
      <SelectItemBase value="grapes">Grapes</SelectItemBase>
      <SelectItemBase value="pineapple">Pineapple</SelectItemBase>
    </SelectGroupBase>
  </SelectContentBase>
</SelectBase>`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
