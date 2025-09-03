"use client";

import { SlideBase } from "@/components/ui/SliderBase";
import { useState } from "react";
import { SunIcon,  LadderIcon } from "@phosphor-icons/react";

export const SliderPage = () => {
  const [value1, setValue1] = useState<number[]>([20]);
  const [value2, setValue2] = useState<number[]>([50]);
  const [value3, setValue3] = useState<number[]>([75]);

  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="flex flex-col gap-2 w-64">
        <SlideBase
          label="Volume"
          value={value1}
          onValueChange={setValue1}
          max={100}
          min={0}
          step={1}
        />

        <span>Value: {value1[0]}</span>
      </div>

      <div className="flex items-center gap-3 w-64">
        <SunIcon size={24} />
        <SlideBase
          className="flex-1 h-6 rounded-ful"
          value={value2}
          onValueChange={setValue2}
          max={100}
          min={0}
          step={1}
        />

        <span>{value2[0]}%</span>
      </div>

      <div className="flex flex-col  gap-2 h-40">
        <SlideBase
          label="Vertical Slider"
          orientation="vertical"
          className="h-32 w-6 rounded-md"
          value={value3}
          onValueChange={setValue3}
          max={100}
          min={0}
          step={1}
        />
        <span>{value3[0]}</span>
      </div>

      <div className="flex flex-col gap-2 w-64">
        <SlideBase
          label="Slider com Steps"
          className="w-full h-4 rounded-md"
          value={value1}
          onValueChange={setValue1}
          max={100}
          min={0}
          step={25}
          rightIcon={<LadderIcon />}
        />
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`import { SlideBase } from "@/components/ui/SliderBase";`}</code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>{`<SlideBase
  className="w-32 h-4"
  value={[value]} // array de números
  onValueChange={setValue} // recebe array
  max={100}
  min={0}
  step={1}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
