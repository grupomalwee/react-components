
import {  SelectBase, SelectContentBase, SelectGroupBase, SelectItemBase, SelectLabelBase, SelectTriggerBase, SelectValueBase } from "@/components/ui/SelectBase";
import {ScrollAreaBase} from "@/components/ui/ScrollareaBase"
import { cn } from "@/lib/utils";

export interface SelectItem<T extends string> {
  label: string;
  value: T;
}

interface DefaultSelectProps {
  placeholder: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}

interface SelectPropsWithItems<T extends string> extends DefaultSelectProps {
  items: SelectItem<T>[];
  groupItems?: never;
}

interface SelectPropsWithGroupItems<T extends string> extends DefaultSelectProps {
  items?: never;
  groupItems: {
    [key: string]: SelectItem<T>[];
  };
}

type SelectProps<T extends string> = SelectPropsWithItems<T> | SelectPropsWithGroupItems<T>;

export function Select<T extends string>({
  items,
  groupItems,
  placeholder,
  onChange,
  errorMessage,
}: SelectProps<T>) {
  return (
    <div>
      <SelectBase onValueChange={onChange}>
        <SelectTriggerBase
          className={cn(
            "flex h-12 w-full content-start text-lg shadow-md",
            errorMessage && "border-red-500",
          )}
        >
          <SelectValueBase placeholder={placeholder} />
        </SelectTriggerBase>

        <ScrollAreaBase>
          <SelectContentBase>
            {groupItems ? (
              <>
                {Object.keys(groupItems).map((key) => (
                  <SelectGroupBase key={key}>
                    <SelectLabelBase>{key}</SelectLabelBase>
                    {groupItems[key].map((item) => (
                      <SelectItemBase key={item.value} value={item.value}>
                        {item.label}
                      </SelectItemBase>
                    ))}
                  </SelectGroupBase>
                ))}
              </>
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
      </SelectBase>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
