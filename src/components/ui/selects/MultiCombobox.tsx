import React from "react";
import {
  MultiSelectBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
  MultiSelectContentBase,
  MultiSelectGroupBase,
  MultiSelectItemBase,
} from "./MultiSelectBase";
import LabelBase from "../form/LabelBase";
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/ui/shared/ErrorMessage";

export interface MultiComboboxTestIds {
  root?: string;
  base?: string;
  trigger?: string;
  value?: string;
  content?: string;
  group?: string;
  item?: (value: string) => string;
}

export interface MultiComboboxProps<
  T extends string,
> extends ErrorMessageProps {
  items: { label: string; value: T }[];
  selected: T[];
  onChange: (value: T[]) => void;
  label?: string;
  labelClassname?: string;
  testIds?: MultiComboboxTestIds;
  disabled?: boolean;
  placeholder?: string;
  empty?: string;
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
  pagination?: number;
  searchPlaceholder?: string;
  className?: string;
}
export function MultiCombobox<T extends string>({
  items,
  selected,
  onChange,
  label,
  labelClassname,
  testIds = {},
  disabled = false,
  placeholder = "Selecione...",
  empty = "Nenhuma opção encontrada.",
  error,
  search = true,
  clickToRemove = true,
  overflowBehavior = "wrap-when-open",
  searchPlaceholder = "Pesquisar...",
  className,
}: MultiComboboxProps<T>) {
  const contentSearch =
    typeof search === "object"
      ? { ...search, placeholder: searchPlaceholder ?? search.placeholder }
      : search
        ? { placeholder: searchPlaceholder }
        : false;
  return (
    <div
      className={"w-full min-w-[150px] " + (className ?? "")}
      data-testid={testIds.root ?? "multi-combobox-root"}
    >
      {label && (
        <LabelBase
          className={labelClassname}
          data-testid="multi-combobox-label"
        >
          {label}
        </LabelBase>
      )}
      <MultiSelectBase
        values={selected}
        onValuesChange={onChange as (values: string[]) => void}
        disabled={disabled}
        empty={empty}
        error={error}
        initialItems={items}
      >
        <MultiSelectTriggerBase
          data-testid={testIds.trigger ?? "multi-combobox-trigger"}
        >
          <MultiSelectValueBase
            placeholder={placeholder}
            clickToRemove={clickToRemove}
            overflowBehavior={overflowBehavior}
            data-testid={testIds.value ?? "multi-combobox-value"}
          />
        </MultiSelectTriggerBase>
        <MultiSelectContentBase
          search={contentSearch}
          data-testid={testIds.content ?? "multi-combobox-content"}
        >
          <MultiSelectGroupBase
            data-testid={testIds.group ?? "multi-combobox-group"}
          >
            {items.map((item) => (
              <MultiSelectItemBase
                key={item.value}
                value={item.value}
                data-testid={
                  testIds.item?.(String(item.value)) ??
                  `multi-combobox-item-${item.value}`
                }
              >
                {item.label}
              </MultiSelectItemBase>
            ))}
          </MultiSelectGroupBase>
        </MultiSelectContentBase>
      </MultiSelectBase>
      <ErrorMessage error={error} />
    </div>
  );
}
