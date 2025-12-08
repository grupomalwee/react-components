"use client";

import { useCallback, useMemo } from "react";
import { ComboboxBase, ComboboxItem } from "./ComboboxBase";
import { ErrorMessageProps } from "@/components/ui/ErrorMessage";
import LabelBase from "../ui/form/LabelBase";
import { cn } from "@/lib/utils";

export interface ComboboxTestIds {
  root?: string;
  trigger?: string;
  popover?: string;
  command?: string;
  search?: string;
  list?: string;
  empty?: string;
  group?: string;
  option?: string;
  check?: string;
  selected?: string;
}

export interface ComboboxProps<T extends string> extends ErrorMessageProps {
  items: ComboboxItem<T>[];
  selected: ComboboxItem<T>["value"] | null;
  onChange: (value: ComboboxItem<T>["value"] | null) => void;
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  empty?: React.ReactNode;
  label?: string;
  labelClassname?: string;
  testIds?: ComboboxTestIds;
}

export function Combobox<T extends string>({
  items,
  selected,
  onChange,
  className,
  placeholder,
  searchPlaceholder,
  empty,
  label,
  labelClassname,
  testIds,
  error,
}: ComboboxProps<T>) {
  const selectedItem = items.find((item) => item.value === selected);

  const renderSelected = useMemo(() => {
    return (
      <span
        data-testid={testIds?.selected ?? "combobox-selected"}
        className={cn("truncate", !selectedItem && "text-gray-500")}
      >
        {selectedItem?.label ?? placeholder ?? "Selecione uma opção..."}
      </span>
    );
  }, [placeholder, selectedItem, testIds?.selected]);

  const checkIsSelected = useCallback(
    (value: T) => (selected == null ? false : selected == value),
    [selected]
  );

  const handleSelection = useCallback(
    (value: T) => {
      onChange(value === selected ? null : value);
    },
    [selected, onChange]
  );

  return (
    <div className={cn("flex flex-col w-full min-w-[150px]", className)}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

      <ComboboxBase
        items={items}
        renderSelected={renderSelected}
        handleSelection={handleSelection}
        checkIsSelected={checkIsSelected}
        searchPlaceholder={searchPlaceholder}
        empty={empty}
        error={error}
        testIds={testIds}
      />
    </div>
  );
}
