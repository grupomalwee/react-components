"use client";

import React, { useEffect, useMemo, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import {
  MultiSelectBase,
  MultiSelectContentBase,
  MultiSelectGroupBase,
  MultiSelectItemBase,
  MultiSelectSeparatorBase,
  MultiSelectTriggerBase,
  MultiSelectValueBase,
} from "./MultiSelectBase";
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/ui/shared/ErrorMessage";
import { cn } from "@/lib/utils";
import LabelBase from "../form/LabelBase";

export interface MultiSelectItem<T extends string> {
  label: string;
  value: T;
  badgeLabel?: string;
}

export interface MultiSelectTestIds {
  root?: string;
  base?: string;
  trigger?: string;
  value?: string;
  content?: string;
  group?: string;
  item?: (value: string) => string;
  paginationPrev?: string;
  paginationNext?: string;
  paginationPage?: (page: number) => string;
}

export interface DefaultMultiSelectProps<T extends string>
  extends ErrorMessageProps {
  selected?: T[];
  defaultSelected?: T[];
  onChange?: (values: T[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  labelClassname?: string;
  pagination?: number;
  empty?: string;
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
}

export interface MultiSelectPropsWithItems<T extends string>
  extends DefaultMultiSelectProps<T> {
  items: MultiSelectItem<T>[];
  groupItems?: never;
  testIds?: MultiSelectTestIds;
}

export interface MultiSelectPropsWithGroupItems<T extends string>
  extends DefaultMultiSelectProps<T> {
  items?: never;
  groupItems: {
    [key: string]: MultiSelectItem<T>[];
  };
  testIds?: MultiSelectTestIds;
}

export type MultiSelectProps<T extends string> =
  | MultiSelectPropsWithItems<T>
  | MultiSelectPropsWithGroupItems<T>;

export function MultiSelect<T extends string>({
  items,
  groupItems,
  placeholder = "Select items...",
  onChange,
  error,
  testIds = {},
  disabled,
  selected,
  defaultSelected,
  label,
  labelClassname,
  className,
  pagination,
  empty = "No items found.",
  search = true,
  clickToRemove = true,
  overflowBehavior = "wrap-when-open",
}: MultiSelectProps<T>) {
  const [page, setPage] = useState(1);
  const [animating, setAnimating] = useState(false);

  const groupCount = groupItems ? Object.keys(groupItems).length : 0;
  useEffect(() => {
    setPage(1);
  }, [items?.length, groupCount, pagination]);

  type PagedGrouped = {
    total: number;
    totalPages: number;
    grouped: Record<string, MultiSelectItem<T>[]>;
  };
  type PagedItems = {
    total: number;
    totalPages: number;
    pageItems: MultiSelectItem<T>[];
  };

  const paged = useMemo<PagedGrouped | PagedItems | null>(() => {
    if (!pagination || pagination <= 0) return null;

    if (groupItems) {
      type Flat = MultiSelectItem<T> & { group: string };
      const flattened: Flat[] = Object.keys(groupItems).flatMap((g) =>
        groupItems[g].map((it) => ({ ...it, group: g }))
      );
      const total = flattened.length;

      const pageSize = Math.max(1, Math.ceil(total / pagination));
      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      const start = (page - 1) * pageSize;
      const pageItems = flattened.slice(start, start + pageSize);
      const grouped: Record<string, MultiSelectItem<T>[]> = {};
      pageItems.forEach((it) => {
        if (!grouped[it.group]) grouped[it.group] = [];
        grouped[it.group].push({
          label: it.label,
          value: it.value,
          badgeLabel: it.badgeLabel,
        });
      });
      return { total, totalPages, grouped } as PagedGrouped;
    }

    const total = items!.length;
    const pageSize = Math.max(1, Math.ceil(total / pagination));
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const start = (page - 1) * pageSize;
    const pageItems = items!.slice(start, start + pageSize);
    return { total, totalPages, pageItems } as PagedItems;
  }, [items, groupItems, page, pagination]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () =>
    setPage((p) => (paged ? Math.min(paged.totalPages, p + 1) : p + 1));

  useEffect(() => {
    if (!pagination) return;
    setAnimating(true);
    const id = setTimeout(() => setAnimating(false), 220);
    return () => clearTimeout(id);
  }, [page, pagination]);

  return (
    <div data-testid={testIds.root ?? "multiselect-root"}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

      <MultiSelectBase
        values={selected}
        defaultValues={defaultSelected}
        onValuesChange={(values) => onChange?.(values as T[])}
        disabled={disabled}
        empty={empty}
        error={error}
      >
        <MultiSelectTriggerBase
          className={cn(
            "flex items-center gap-2 justify-between",
            error && "border-red-500",
            className
          )}
          data-testid={testIds.trigger ?? "multiselect-trigger"}
        >
          <MultiSelectValueBase
            placeholder={placeholder}
            clickToRemove={clickToRemove}
            overflowBehavior={overflowBehavior}
            data-testid={testIds.value ?? "multiselect-value"}
          />
        </MultiSelectTriggerBase>

        <MultiSelectContentBase
          search={search}
          data-testid={testIds.content ?? "multiselect-content"}
        >
          {pagination && pagination > 0 ? (
            <>
              <div
                className={`transition-all duration-200 ${
                  animating
                    ? "opacity-0 -translate-y-1"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {paged && "grouped" in paged ? (
                  Object.keys(paged.grouped).map((key, index) => (
                    <React.Fragment key={key}>
                      <MultiSelectGroupBase
                        heading={key}
                        data-testid={testIds.group ?? "multiselect-group"}
                      >
                        {paged.grouped[key].map((item: MultiSelectItem<T>) => (
                          <MultiSelectItemBase
                            key={item.value}
                            value={item.value}
                            badgeLabel={item.badgeLabel}
                            data-testid={
                              testIds.item?.(String(item.value)) ??
                              `multiselect-item-${item.value}`
                            }
                          >
                            {item.label}
                          </MultiSelectItemBase>
                        ))}
                      </MultiSelectGroupBase>
                      {index < Object.keys(paged.grouped).length - 1 && (
                        <MultiSelectSeparatorBase />
                      )}
                    </React.Fragment>
                  ))
                ) : paged ? (
                  <MultiSelectGroupBase
                    data-testid={testIds.group ?? "multiselect-group"}
                  >
                    {paged.pageItems.map((item: MultiSelectItem<T>) => (
                      <MultiSelectItemBase
                        key={item.value}
                        value={item.value}
                        badgeLabel={item.badgeLabel}
                        data-testid={
                          testIds.item?.(String(item.value)) ??
                          `multiselect-item-${item.value}`
                        }
                      >
                        {item.label}
                      </MultiSelectItemBase>
                    ))}
                  </MultiSelectGroupBase>
                ) : null}
              </div>

              {paged && paged.totalPages > 1 && (
                <>
                  <MultiSelectSeparatorBase />
                  <div className="px-2 py-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goPrev}
                      disabled={page <= 1}
                      data-testid={
                        testIds.paginationPrev ?? "multiselect-pagination-prev"
                      }
                      aria-label="Previous page"
                      className="text-xs px-2 py-1 rounded disabled:opacity-50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                    >
                      <CaretLeftIcon className="h-4 w-4 opacity-80" />
                    </button>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-xs">
                        {`${page} / ${paged.totalPages}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={goNext}
                      disabled={page >= paged.totalPages}
                      data-testid={
                        testIds.paginationNext ?? "multiselect-pagination-next"
                      }
                      aria-label="Next page"
                      className="text-xs px-2 py-1 rounded disabled:opacity-50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                    >
                      <CaretRightIcon className="h-4 w-4 opacity-80" />
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {groupItems ? (
                <>
                  {Object.keys(groupItems).map((key, index) => (
                    <React.Fragment key={key}>
                      <MultiSelectGroupBase
                        heading={key}
                        data-testid={testIds.group ?? "multiselect-group"}
                      >
                        {groupItems[key].map((item) => (
                          <MultiSelectItemBase
                            key={item.value}
                            value={item.value}
                            badgeLabel={item.badgeLabel}
                            data-testid={
                              testIds.item?.(String(item.value)) ??
                              `multiselect-item-${item.value}`
                            }
                          >
                            {item.label}
                          </MultiSelectItemBase>
                        ))}
                      </MultiSelectGroupBase>
                      {index < Object.keys(groupItems).length - 1 && (
                        <MultiSelectSeparatorBase />
                      )}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <MultiSelectGroupBase
                  data-testid={testIds.group ?? "multiselect-group"}
                >
                  {items!.map((item) => (
                    <MultiSelectItemBase
                      key={item.value}
                      value={item.value}
                      badgeLabel={item.badgeLabel}
                      data-testid={
                        testIds.item?.(String(item.value)) ??
                        `multiselect-item-${item.value}`
                      }
                    >
                      {item.label}
                    </MultiSelectItemBase>
                  ))}
                </MultiSelectGroupBase>
              )}
            </>
          )}
        </MultiSelectContentBase>
      </MultiSelectBase>

      <ErrorMessage error={error} />
    </div>
  );
}
