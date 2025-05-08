import { ButtonBase } from "@lib";
import { InputBase } from "@lib";
import { LabelBase } from "@lib";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@lib";

export function PopoverPage() {
  return (
    <>
      <div className="mt-5 ml-5 flex gap-5 h-11 p-3 rounded-sm">
        <PopoverBase>
          <PopoverTriggerBase asChild>
            <ButtonBase variant="outline">Open popover</ButtonBase>
          </PopoverTriggerBase>
          <PopoverContentBase className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <LabelBase htmlFor="width">Width</LabelBase>
                  <InputBase
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <LabelBase htmlFor="maxWidth">Max. width</LabelBase>
                  <InputBase
                    id="maxWidth"
                    defaultValue="300px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <LabelBase htmlFor="height">Height</LabelBase>
                  <InputBase
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <LabelBase htmlFor="maxHeight">Max. height</LabelBase>
                  <InputBase
                    id="maxHeight"
                    defaultValue="none"
                    className="col-span-2 h-8"
                  />
                </div>
              </div>
            </div>
          </PopoverContentBase>
        </PopoverBase>
      </div>

      <div className="my-8 mx-5">
        <h3 className="text-xl font-semibold mb-3">Documentação</h3>
        <div className="border-t-2 border-gray-300 mb-4"></div>

        <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
          <h5 className="font-medium mb-2">Como importar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`import { ButtonBase } from "@/components/ui/ButtonBase";
import { InputBase } from "@/components/ui/InputBase";
import  LabelBase  from "@/components/ui/LabelBase";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/PopoverBase";`}
            </code>
          </pre>
        </div>

        <div className="bg-gray-800 text-white p-4 rounded-md">
          <h5 className="font-medium mb-2">Como usar:</h5>
          <pre className="bg-gray-900 p-3 rounded-sm">
            <code>
              {`<PopoverBase>
  <PopoverTriggerBase asChild>
    <ButtonBase variant="outline">Open popover</ButtonBase>
  </PopoverTriggerBase>
  <PopoverContentBase className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="width">Width</LabelBase>
          <InputBase
            id="width"
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="maxWidth">Max. width</LabelBase>
          <InputBase
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="height">Height</LabelBase>
          <InputBase
            id="height"
            defaultValue="25px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <LabelBase htmlFor="maxHeight">Max. height</LabelBase>
          <InputBase
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  </PopoverContentBase>
</PopoverBase>`}
            </code>
          </pre>
        </div>
      </div>
    </>
  );
}
