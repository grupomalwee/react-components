"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
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
import ErrorMessage, {
  ErrorMessageProps,
} from "@/components/ui/shared/ErrorMessage";
import { cn } from "@/lib/utils";
import LabelBase from "../form/LabelBase";
import { motion } from "framer-motion";
import { ClearButton } from "../shared/ClearButton";
import { ButtonBase } from "../form/ButtonBase";

export interface SelectItem<T extends string> {
  label: string;
  value: T;
}

export interface SelectTestIds {
  root?: string;
  base?: string;
  trigger?: string;
  value?: string;
  scrollarea?: string;
  content?: string;
  group?: string;
  label?: string;
  item?: (value: string) => string;
  paginationPrev?: string;
  paginationNext?: string;
  paginationPage?: (page: number) => string;
  empty?:string
}

export interface DefaultSelectProps<T extends string>
  extends ErrorMessageProps {
  selected: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  labelClassname?: string;
  pagination?: number;
  hideClear?: boolean;
}

export interface SelectPropsWithItems<T extends string>
  extends DefaultSelectProps<T> {
  items: SelectItem<T>[];
  groupItems?: never;
  testIds?: SelectTestIds;
  empty?: React.ReactNode;
}

export interface SelectPropsWithGroupItems<T extends string>
extends DefaultSelectProps<T> {
  items?: never;
  groupItems: {
    [key: string]: SelectItem<T>[];
  };
  testIds?: SelectTestIds;
  empty?: React.ReactNode;
}

export type NewSelectProps<T extends string> =
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
  className,
  pagination,
  hideClear = false,
  empty
}: NewSelectProps<T>) {
  const [page, setPage] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [open, setOpen] = useState(false);

  const groupCount = groupItems ? Object.keys(groupItems).length : 0;
  useEffect(() => {
    setPage(1);
  }, [items?.length, groupCount, pagination]);

  type PagedGrouped = {
    total: number;
    totalPages: number;
    grouped: Record<string, SelectItem<T>[]>;
  };
  type PagedItems = {
    total: number;
    totalPages: number;
    pageItems: SelectItem<T>[];
  };

  const paged = useMemo<PagedGrouped | PagedItems | null>(() => {
    if (!pagination || pagination <= 0) return null;

    if (groupItems) {
      type Flat = SelectItem<T> & { group: string };
      const flattened: Flat[] = Object.keys(groupItems).flatMap((g) =>
        groupItems[g].map((it) => ({ ...it, group: g }))
      );
      const total = flattened.length;

      const pageSize = Math.max(1, Math.ceil(total / pagination));
      const totalPages = Math.max(1, Math.ceil(total / pageSize));

      const start = (page - 1) * pageSize;
      const pageItems = flattened.slice(start, start + pageSize);
      const grouped: Record<string, SelectItem<T>[]> = {};
      pageItems.forEach((it) => {
        if (!grouped[it.group]) grouped[it.group] = [];
        grouped[it.group].push({ label: it.label, value: it.value });
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
    <div data-testid={testIds.root ?? "select-root"}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}

      <SelectBase
        value={selected ?? undefined}
        onValueChange={(v: T) => onChange(v)}
        data-testid={testIds.base ?? "select-base"}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectTriggerBase
          className={cn(
            "flex items-center gap-2 justify-between [&>div]:line-clamp-1 [&>span]:line-clamp-1 relative",
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
          <motion.span className="flex items-center">
            <div className="flex flex-row gap-0 items-center ">
              {!hideClear && selected && (
                <ClearButton
                  onClick={() => {
                    onChange("" as T);
                  }}
                />
              )}
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <CaretDownIcon className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.span>
        </SelectTriggerBase>

        <ScrollAreaBase data-testid={testIds.scrollarea ?? "select-scrollarea"}>
          <SelectContentBase data-testid={testIds.content ?? "select-content"}>
            {empty ? (
              <div>
                {empty}
              </div>
            ) : (
              <>
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
                      Object.keys(paged.grouped).map((key) => (
                        <SelectGroupBase
                          key={key}
                          data-testid={testIds.group ?? "select-group"}
                        >
                          <SelectLabelBase
                            data-testid={testIds.label ?? "select-label"}
                          >
                            {key}
                          </SelectLabelBase>
                          {paged.grouped[key].map((item: SelectItem<T>) => (
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
                      ))
                    ) : paged ? (
                      <SelectGroupBase
                        data-testid={testIds.group ?? "select-group"}
                      >
                        {paged.pageItems.map((item: SelectItem<T>) => (
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
                    ) : null}
                  </div>

                  {paged && paged.totalPages > 1 && (
                    <div className="px-2 py-2 flex items-center justify-between">
                      <ButtonBase
                        variant="ghost"
                        tooltip="Previous page"
                        onClick={goPrev}
                        disabled={page <= 1}
                        data-testid={
                          testIds.paginationPrev ?? "select-pagination-prev"
                        }
                        aria-label="Previous page"
                        className="text-xs px-2 py-1 rounded disabled:opacity-50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                      >
                        <CaretLeftIcon className="h-4 w-4 opacity-80" />
                      </ButtonBase>

                      <div className=" flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-xs">
                          {`${page} / ${paged.totalPages}`}
                        </span>
                      </div>

                      <ButtonBase
                        variant="ghost"
                        tooltip="Next page"
                        onClick={goNext}
                        disabled={page >= paged.totalPages}
                        data-testid={
                          testIds.paginationNext ?? "select-pagination-next"
                        }
                        aria-label="Next page"
                        className="text-xs px-2 py-1 rounded disabled:opacity-50 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
                      >
                        <CaretRightIcon className="h-4 w-4 opacity-80" />
                      </ButtonBase>
                    </div>
                  )}
                </>
              ) : (
                <>
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
                    <SelectGroupBase
                      data-testid={testIds.group ?? "select-group"}
                    >
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
                </>
              )}</>)}
          </SelectContentBase>
        </ScrollAreaBase>
      </SelectBase>

      <ErrorMessage error={error} />
    </div>
  );
}
