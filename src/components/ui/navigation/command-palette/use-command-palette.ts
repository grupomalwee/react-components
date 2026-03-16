import * as React from "react";
import { ClockCounterClockwiseIcon } from "@phosphor-icons/react";
import { CommandPaletteProps, CommandGroup, CommandItem } from "./types";
import { filterAndScore, normaliseGroups, unionGroups } from "./utils";
import { useEffect, useMemo } from "react";

const PAGE_SIZE = 8;

export function useCommandPalette({
  items = [],
  groups = [],
  open,
  onOpenChange,
  recentItems = [],
  onRecentItemsChange,
  maxRecentItems = 5,
  multiSearch = false,
  multiSelect = false,
  onSelectMultiple,
}: Partial<CommandPaletteProps>) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [selectedItemIds, setSelectedItemIds] = React.useState<Set<string>>(
    new Set(),
  );

  const toggleSelection = React.useCallback((id: string) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearSelection = React.useCallback(
    () => setSelectedItemIds(new Set()),
    [],
  );

  const baseGroups = React.useMemo(
    () => normaliseGroups(items, groups),
    [items, groups],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setPage(0);
      clearSelection();
    }
  }, [open, clearSelection]);

  const searchTerms = React.useMemo(() => {
    const parts = query.split(",");
    if (parts.length <= 1 && !multiSearch) return [];
    return parts.map((t) => t.trim().toLowerCase()).filter(Boolean);
  }, [query, multiSearch]);

  const allMatchedGroups = React.useMemo(() => {
    if (!query.trim()) {
      if (recentItems.length > 0) {
        return [
          {
            id: "__recent__",
            label: "Recent",
            icon: React.createElement(ClockCounterClockwiseIcon),
            items: recentItems,
            priority: 999,
          },
          ...baseGroups,
        ];
      }
      return baseGroups;
    }
    if (searchTerms.length > 1 || (multiSearch && searchTerms.length > 0)) {
      return unionGroups(baseGroups, searchTerms);
    }
    return filterAndScore(baseGroups, query);
  }, [query, baseGroups, recentItems, multiSearch, searchTerms]);

  const allFlatItems = useMemo(
    () => allMatchedGroups.flatMap((g) => g.items),
    [allMatchedGroups],
  );

  const totalItems = allFlatItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  useEffect(() => {
    setPage(0);
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [page]);

  const displayedGroups = useMemo(() => {
    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    let count = 0;
    const result: CommandGroup[] = [];

    for (const group of allMatchedGroups) {
      const slicedItems: CommandItem[] = [];
      for (const item of group.items) {
        if (count >= start && count < end) slicedItems.push(item);
        count++;
        if (count >= end) break;
      }
      if (slicedItems.length > 0) {
        result.push({ ...group, items: slicedItems });
      }
      if (count >= end) break;
    }

    return result;
  }, [allMatchedGroups, page]);

  const flatItems = useMemo(
    () => displayedGroups.flatMap((g) => g.items),
    [displayedGroups],
  );

  const selectedItems = useMemo(
    () => allFlatItems.filter((i) => selectedItemIds.has(i.id)),
    [allFlatItems, selectedItemIds],
  );

  const pageItemCount = flatItems.length;

  useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(pageItemCount - 1, 0)));
  }, [pageItemCount]);

  function executeBulkAction() {
    if (!onSelectMultiple || selectedItems.length === 0) return;
    onSelectMultiple(selectedItems);
    onOpenChange?.(false);
  }

  function handleSelect(item?: CommandItem, event?: any) {
    if (!item) return;

    if (multiSelect) {
      if (
        event &&
        ("ctrlKey" in event || "metaKey" in event || "shiftKey" in event) &&
        (event.ctrlKey || event.metaKey || event.shiftKey)
      ) {
        toggleSelection(item.id);
        return;
      }

      if (selectedItems.length > 0) {
        const itemsToSubmit = selectedItemIds.has(item.id)
          ? selectedItems
          : [...selectedItems, item];

        if (onSelectMultiple) {
          onSelectMultiple(itemsToSubmit);
        }
        onOpenChange?.(false);
        return;
      }
    }

    item.onSelect();
    onOpenChange?.(false);
    if (onRecentItemsChange) {
      const next = [item, ...recentItems.filter((r) => r.id !== item.id)].slice(
        0,
        maxRecentItems,
      );
      onRecentItemsChange(next);
    }
  }

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (activeIndex === pageItemCount - 1 && page < totalPages - 1) {
          setPage((p) => p + 1);
        } else {
          setActiveIndex((i) => (i + 1) % Math.max(pageItemCount, 1));
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (activeIndex === 0 && page > 0) {
          setPage((p) => p - 1);
          setActiveIndex(PAGE_SIZE - 1);
        } else {
          setActiveIndex(
            (i) =>
              (i - 1 + Math.max(pageItemCount, 1)) % Math.max(pageItemCount, 1),
          );
        }
      } else if (e.key === "Enter") {
        e.preventDefault();

        if (multiSelect && (e.ctrlKey || e.metaKey)) {
          executeBulkAction();
          return;
        }

        handleSelect(flatItems[activeIndex], e);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, flatItems, activeIndex, pageItemCount, page, totalPages]);

  return {
    query,
    setQuery,
    activeIndex,
    setActiveIndex,
    page,
    setPage,
    searchTerms,
    allMatchedGroups,
    allFlatItems,
    displayedGroups,
    flatItems,
    totalItems,
    totalPages,
    handleSelect,
    selectedItemIds,
    toggleSelection,
    selectedItems,
    executeBulkAction,
    isEmpty: totalItems === 0 && query.trim().length > 0,
    showList: query.trim() !== "" || recentItems.length > 0,
  };
}
