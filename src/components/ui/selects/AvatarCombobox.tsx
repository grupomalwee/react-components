"use client";

import { useId, useState, ReactNode } from "react";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "@/components/ui/overlays/PopoverBase";
import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
} from "@/components/ui/navigation/CommandBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/ui/shared/ErrorMessage";
import { cn } from "@/lib/utils";
import logo from "../../../../public/pwa-512x512.png";

const DEFAULT_COLORS = [
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
];

const getColor = (value: string, colors: string[] = DEFAULT_COLORS) => {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

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
      "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded bg-muted font-medium text-muted-foreground leading-none overflow-hidden",
      className
    )}
    data-square
  >
    {children}
  </span>
);

export interface AvatarComboboxItem<T extends string> {
  label: string;
  value: T;
  avatar?: ReactNode;
  avatarClassName?: string;
  img?: string
}

export interface AvatarComboboxTestIds {
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

export interface DefaultAvatarComboboxProps extends ErrorMessageProps {
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  colors?: string[];
}

export interface AvatarComboboxPropsWithItems<T extends string>
  extends DefaultAvatarComboboxProps {
  items: AvatarComboboxItem<T>[];
  groupItems?: never;
  testIds?: AvatarComboboxTestIds;
}

export interface AvatarComboboxPropsWithGroupItems<T extends string>
  extends DefaultAvatarComboboxProps {
  items?: never;
  groupItems: {
    [key: string]: AvatarComboboxItem<T>[];
  };
  testIds?: AvatarComboboxTestIds;
}

export type AvatarComboboxProps<T extends string> =
  | AvatarComboboxPropsWithItems<T>
  | AvatarComboboxPropsWithGroupItems<T>;

export function AvatarCombobox<T extends string>({
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
  colors,
}: AvatarComboboxProps<T> & {
  selected?: T | null;
  label?: string;
  labelClassname?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  const allItems =
    items || (groupItems ? Object.values(groupItems).flat() : []);
  const selectedItem = allItems.find((item) => item.value === selected);

  const renderItem = (item: AvatarComboboxItem<T>) => {
    let avatarContent;
    let colorClass;

    if(!item.img){
      avatarContent = item.avatar ?? item.label.charAt(0).toUpperCase();
      colorClass = item.avatarClassName ?? getColor(item.value, colors);
    }

    return (
      <>
        <Square className={colorClass}>{!avatarContent ? <img src={logo}/> : avatarContent}</Square>
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

      <PopoverBase open={open} onOpenChange={setOpen}>
        <PopoverTriggerBase asChild>
          <ButtonBase
            id={id}
            variant="select"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between px-3 font-normal",
              error && "border-red-500",
              className
            )}
            disabled={disabled}
            data-testid={testIds.trigger ?? "avatar-select-trigger"}
          >
            {selectedItem ? (
              <span className="flex items-center gap-2 truncate">
                {renderItem(selectedItem)}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <CaretDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </ButtonBase>
        </PopoverTriggerBase>
        <PopoverContentBase
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
          data-testid={testIds.content ?? "avatar-select-content"}
        >
          <CommandBase
            filter={(value, search) => {
              if (value.toLowerCase().includes(search.toLowerCase())) return 1;
              return 0;
            }}
          >
            <CommandInputBase placeholder="Search..." />
            <CommandListBase>
              <CommandEmptyBase>No results found.</CommandEmptyBase>
              {groupItems ? (
                Object.keys(groupItems).map((key) => (
                  <CommandGroupBase key={key} heading={key}>
                    {groupItems[key].map((item) => (
                      <CommandItemBase
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          onChange(item.value);
                          setOpen(false);
                        }}
                        data-testid={
                          testIds.item?.(String(item.value)) ??
                          `avatar-select-item-${item.value}`
                        }
                      >
                        {renderItem(item)}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selected === item.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItemBase>
                    ))}
                  </CommandGroupBase>
                ))
              ) : (
                <CommandGroupBase>
                  {items!.map((item) => (
                    <CommandItemBase
                      key={item.value}
                      value={item.label}
                      onSelect={() => {
                        onChange(item.value);
                        setOpen(false);
                      }}
                      data-testid={
                        testIds.item?.(String(item.value)) ??
                        `avatar-select-item-${item.value}`
                      }
                    >
                      {renderItem(item)}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selected === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItemBase>
                  ))}
                </CommandGroupBase>
              )}
            </CommandListBase>
          </CommandBase>
        </PopoverContentBase>
      </PopoverBase>

      <ErrorMessage error={error} />
    </div>
  );
}
