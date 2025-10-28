import {
  SelectBase,
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectTriggerBase,
  SelectValueBase,
} from "@/components/ui/SelectBase";
import { ScrollAreaBase } from "@/components/ui/layout/ScrollareaBase";
import ErrorMessage, { ErrorMessageProps } from "@/components/ui/ErrorMessage";
import { cn } from "@/lib/utils";

export interface SelectItem<T extends string> {
  label: string;
  value: T;
}

interface DefaultSelectProps extends ErrorMessageProps {
  placeholder: string;
  onChange: (value: string) => void;
}

interface SelectTestIds {
  root?: string;
  base?: string;
  trigger?: string;
  value?: string;
  scrollarea?: string;
  content?: string;
  group?: string;
  label?: string;
  item?: (value: string) => string;
  error?: string;
}

interface SelectPropsWithItems<T extends string> extends DefaultSelectProps {
  items: SelectItem<T>[];
  groupItems?: never;
  testIds?: SelectTestIds;
}

interface SelectPropsWithGroupItems<T extends string>
  extends DefaultSelectProps {
  items?: never;
  groupItems: {
    [key: string]: SelectItem<T>[];
  };
  testIds?: SelectTestIds;
}

type SelectProps<T extends string> =
  | SelectPropsWithItems<T>
  | SelectPropsWithGroupItems<T>;

export function Select<T extends string>({
  items,
  groupItems,
  placeholder,
  onChange,
  error,
  testIds = {},
}: SelectProps<T>) {
  return (
    <div data-testid={testIds.root ?? "select-root"}>
      <SelectBase
        onValueChange={onChange}
        data-testid={testIds.base ?? "select-base"}
      >
        <SelectTriggerBase
          className={cn(
            "flex h-9 w-full content-start text-lg shadow-md",
            error && "border-red-500"
          )}
          data-testid={testIds.trigger ?? "select-trigger"}
        >
          <SelectValueBase
            placeholder={placeholder}
            data-testid={testIds.value ?? "select-value"}
          />
        </SelectTriggerBase>

        <ScrollAreaBase data-testid={testIds.scrollarea ?? "select-scrollarea"}>
          <SelectContentBase data-testid={testIds.content ?? "select-content"}>
            {groupItems ? (
              <>
                {Object.keys(groupItems).map((key) => (
                  <SelectGroupBase
                    key={key}
                    data-testid={testIds.group ?? "select-group"}
                  >
                    <SelectLabelBase
                      data-testid={testIds.label ?? "select-label"}
                    >
                      {key}
                    </SelectLabelBase>
                    {groupItems[key].map((item) => (
                      <SelectItemBase
                        key={item.value}
                        value={item.value}
                        data-testid={
                          testIds.item?.(item.value) ??
                          `select-item-${item.value}`
                        }
                      >
                        {item.label}
                      </SelectItemBase>
                    ))}
                  </SelectGroupBase>
                ))}
              </>
            ) : (
              <SelectGroupBase data-testid={testIds.group ?? "select-group"}>
                {items.map((item) => (
                  <SelectItemBase
                    key={item.value}
                    value={item.value}
                    data-testid={
                      testIds.item?.(item.value) ?? `select-item-${item.value}`
                    }
                  >
                    {item.label}
                  </SelectItemBase>
                ))}
              </SelectGroupBase>
            )}
          </SelectContentBase>
        </ScrollAreaBase>
      </SelectBase>

      <ErrorMessage error={error} />
    </div>
  );
}
