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
      <div className="mt-5 flex flex-col p-3 rounded-sm mb-5">
        <SelectBase>
          <SelectTriggerBase className="w-[180px] bg-white">
            <SelectValueBase placeholder="Select a fruit" />
          </SelectTriggerBase>
          <SelectContentBase className="bg-white">
            <SelectGroupBase className="bg-white">
              <SelectLabelBase className="bg-white">Fruits</SelectLabelBase>
              <SelectItemBase value="apple" className="bg-white">Apple</SelectItemBase>
            </SelectGroupBase>
          </SelectContentBase>
        </SelectBase>
      </div>

      <div className=" my-20 mx-5 ">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

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

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
{`<SelectBase>
  <SelectTriggerBase className="w-[180px] bg-white">
    <SelectValueBase placeholder="Select a fruit" />
  </SelectTriggerBase>
  <SelectContentBase className="bg-white">
    <SelectGroupBase className="bg-white">
      <SelectLabelBase className="bg-white">Fruits</SelectLabelBase>
      <SelectItemBase value="apple" className="bg-white">Apple</SelectItemBase>
      <SelectItemBase value="banana" className="bg-white">Banana</SelectItemBase>
      <SelectItemBase value="blueberry" className="bg-white">Blueberry</SelectItemBase>
      <SelectItemBase value="grapes" className="bg-white">Grapes</SelectItemBase>
      <SelectItemBase value="pineapple" className="bg-white">Pineapple</SelectItemBase>
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
