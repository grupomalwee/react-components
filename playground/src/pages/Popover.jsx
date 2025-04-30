import { ButtonBase } from "@lib";
import { InputBase } from "@lib";
import { PopoverBase, PopoverContentBase, PopoverTriggerBase } from "@lib";

export function PopoverPage() {
  return (
    <div>
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
                  <InputBase
                    id="width"
                    defaultValue="100%"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputBase
                    id="maxWidth"
                    defaultValue="300px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <InputBase
                    id="height"
                    defaultValue="25px"
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
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
    </div>
  );
}
