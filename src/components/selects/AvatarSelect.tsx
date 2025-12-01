"use client";

import { useId } from "react";
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

const Square = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex size-5 items-center justify-center rounded bg-muted font-medium text-muted-foreground text-xs",
      className
    )}
    data-square
  >
    {children}
  </span>
);

export interface AvatarSelectItem<T extends string> {
  label: string;
  value: T;
  avatar?: string;
  avatarClassName?: string;
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
  items: AvatarSelectItem<T>[];
  groupItems?: never;
  testIds?: SelectTestIds;
}

interface SelectPropsWithGroupItems<T extends string>
  extends DefaultSelectProps {
  items?: never;
  groupItems: {
    [key: string]: AvatarSelectItem<T>[];
  };
  testIds?: SelectTestIds;
}

type AvatarSelectProps<T extends string> =
  | SelectPropsWithItems<T>
  | SelectPropsWithGroupItems<T>;

export function AvatarSelect<T extends string>({
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
  className,
}: AvatarSelectProps<T> & {
  selected?: T | null;
  label?: string;
  labelClassname?: string;
}) {
  const id = useId();

  const renderItem = (item: AvatarSelectItem<T>) => {
    const avatarContent = item.avatar ?? item.label.charAt(0).toUpperCase();

    return (
      <>
        <Square className={item.avatarClassName}>{avatarContent}</Square>
        <span className="truncate">{item.label}</span>
      </>
    );
  };

  return (
    <div data-testid={testIds.root ?? "avatar-select-root"}>
      {label ? (
        <label
          htmlFor={id}
          className={cn("mb-1 block text-sm font-medium", labelClassname)}
        >
          {label}
        </label>
      ) : null}

      <SelectBase
        value={selected ?? undefined}
        onValueChange={(v: string) => onChange(v)}
        data-testid={testIds.base ?? "avatar-select-base"}
      >
        <SelectTriggerBase
          id={id}
          className={cn(
            " [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0",
            error && "border-red-500",
            className
          )}
          data-testid={testIds.trigger ?? "avatar-select-trigger"}
          disabled={disabled}
        >
          <SelectValueBase
            placeholder={placeholder}
            data-testid={testIds.value ?? "avatar-select-value"}
          />
        </SelectTriggerBase>

        <ScrollAreaBase
          data-testid={testIds.scrollarea ?? "avatar-select-scrollarea"}
        >
          <SelectContentBase
            className="[&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8"
            data-testid={testIds.content ?? "avatar-select-content"}
          >
            {groupItems ? (
              <>
                {Object.keys(groupItems).map((key) => (
                  <SelectGroupBase
                    key={key}
                    data-testid={testIds.group ?? "avatar-select-group"}
                  >
                    <SelectLabelBase
                      className="ps-2"
                      data-testid={testIds.label ?? "avatar-select-label"}
                    >
                      {key}
                    </SelectLabelBase>
                    {groupItems[key].map((item) => (
                      <SelectItemBase
                        key={item.value}
                        value={item.value}
                        data-testid={
                          testIds.item?.(String(item.value)) ??
                          `avatar-select-item-${item.value}`
                        }
                      >
                        {renderItem(item)}
                      </SelectItemBase>
                    ))}
                  </SelectGroupBase>
                ))}
              </>
            ) : (
              <SelectGroupBase
                data-testid={testIds.group ?? "avatar-select-group"}
              >
                {items!.map((item) => (
                  <SelectItemBase
                    key={item.value}
                    value={item.value}
                    data-testid={
                      testIds.item?.(String(item.value)) ??
                      `avatar-select-item-${item.value}`
                    }
                  >
                    {renderItem(item)}
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
