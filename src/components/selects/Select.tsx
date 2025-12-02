"use client";

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
}

interface DefaultSelectProps extends ErrorMessageProps {
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;

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

type NewSelectProps<T extends string> =
  | SelectPropsWithItems<T>
  | SelectPropsWithGroupItems<T>;

export function Select<T extends string>({
  items,
  groupItems,
  placeholder,
  onChange,
  error,
  testIds = {},
  disabled,
  selected,
  label,
  labelClassname,
  className
}: NewSelectProps<T> & {
  selected?: T | null;
  label?: string;
  labelClassname?: string;
}) {
  return (
    <div data-testid={testIds.root ?? "select-root"}>
      {label ? (
        <label className={cn("mb-1 block text-sm font-medium", labelClassname)}>
          {label}
        </label>
      ) : null}

      <SelectBase
        value={selected ?? undefined}
        onValueChange={(v: string) => onChange(v)}
        data-testid={testIds.base ?? "select-base"}
      >
        <SelectTriggerBase
          className={cn(
            "flex items-center gap-2 justify-between [&>div]:line-clamp-1 [&>span]:line-clamp-1 ",
            error && "border-red-500",
            className
          )}
          data-testid={testIds.trigger ?? "select-trigger"}
          disabled={disabled}
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
                          testIds.item?.(String(item.value)) ??
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
                {items!.map((item) => (
                  <SelectItemBase
                    key={item.value}
                    value={item.value}
                    data-testid={
                      testIds.item?.(String(item.value)) ??
                      `select-item-${item.value}`
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
