import {
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectBase as SelectPrimitiveBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@/components/ui/SelectBase";
import { cn } from "@/lib/utils";
import { ScrollAreaBase } from "../ui/ScrollareaBase";

export interface SelectItem {
  label: string;
  value: string;
}

interface DefaultSelectProps {
  placeholder: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}

interface SelectPropsWithItems extends DefaultSelectProps {
  items: SelectItem[];
  groupItems?: never;
}

interface SelectPropsWithGroupItems extends DefaultSelectProps {
  items?: never;
  groupItems: {
    [key: string]: SelectItem[];
  };
}

type SelectProps = SelectPropsWithItems | SelectPropsWithGroupItems;

export function Select({
  items,
  groupItems,
  placeholder,
  onChange,
  errorMessage,
}: SelectProps) {
  return (
    <div>
      <SelectPrimitiveBase onValueChange={onChange}>
        <SelectTriggerBase
          className={cn(
            "flex h-12 w-full content-start text-lg shadow-md",
            errorMessage && "border-red-500"
          )}
        >
          <SelectValueBase placeholder={placeholder} />
        </SelectTriggerBase>

        <ScrollAreaBase>
          <SelectContentBase>
            {groupItems ? (
              Object.keys(groupItems).map((key) => (
                <SelectGroupBase key={key}>
                  <SelectLabelBase>{key}</SelectLabelBase>
                  {groupItems[key].map((item) => (
                    <SelectItemBase key={item.value} value={item.value}>
                      {item.label}
                    </SelectItemBase>
                  ))}
                </SelectGroupBase>
              ))
            ) : (
              <SelectGroupBase>
                {items.map((item) => (
                  <SelectItemBase key={item.value} value={item.value}>
                    {item.label}
                  </SelectItemBase>
                ))}
              </SelectGroupBase>
            )}
          </SelectContentBase>
        </ScrollAreaBase>
      </SelectPrimitiveBase>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
