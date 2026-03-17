"use client";

import {
  memo,
  RefObject,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  XIcon,
  CommandIcon,
  ArrowBendUpLeftIcon,
  ArrowElbowDownRightIcon,
} from "@phosphor-icons/react";
import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import { CommandPaletteProps, CommandItem, CommandGroup } from "./types";
import { GroupLabel } from "./GroupLabel";
import { CommandItemRow } from "./CommandItemRow";
import { DebouncedInput } from "../../form/DebouncedInput";
import { ButtonBase } from "../../form/ButtonBase";
import { Badge } from "../../data/Badge";

import { useCommandPalette } from "./use-command-palette";
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useIsMobile } from "@/hooks";

const ITEM_HEIGHT = 40;
const LABEL_HEIGHT = 28;
const LIST_MAX_HEIGHT = 460;

const ANIMATION = {
  overlay: { duration: 0.18 },
  panel: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
  mobilePanel: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
  empty: { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } },
} as const;

type VirtualRow =
  | { kind: "label"; group: CommandGroup }
  | { kind: "item"; item: CommandItem; globalIdx: number };

interface SearchBadgesProps {
  terms: string[];
}

const SearchBadges = memo(({ terms }: SearchBadgesProps) => {
  if (terms.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5 px-4 py-1.5 border-b border-border flex-wrap">
      {terms.map((term, i) => (
        <Badge key={i}>{term}</Badge>
      ))}
    </div>
  );
});
SearchBadges.displayName = "SearchBadges";

const EmptyState = memo(({ message }: { message: string }) => (
  <motion.div
    {...ANIMATION.empty}
    className="flex flex-col items-center justify-center py-14 text-center gap-3"
  >
    <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
      <MagnifyingGlassIcon className="w-6 h-6 text-muted-foreground" />
    </div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
      <p className="text-xs text-muted-foreground/60 mt-1">
        Try a different search term
      </p>
    </div>
  </motion.div>
));
EmptyState.displayName = "EmptyState";

interface VirtualResultListProps {
  listRef: RefObject<HTMLDivElement | null>;
  isEmpty: boolean;
  emptyMessage: string;
  displayedGroups: CommandGroup[];
  flatItems: CommandItem[];
  activeIndex: number;
  multiSelect?: boolean;
  selectedItemIds: Set<string>;
  onHover: (index: number) => void;
  onSelect: (item: CommandItem, event?: React.MouseEvent | React.KeyboardEvent) => void;
  onToggleSelection: (id: string, e: React.MouseEvent) => void;
  searchQuery?: string;
}

const VirtualResultList = memo(
  ({
    listRef,
    isEmpty,
    emptyMessage,
    displayedGroups,
    flatItems,
    activeIndex,
    multiSelect,
    selectedItemIds,
    onHover,
    onSelect,
    onToggleSelection,
    searchQuery,
  }: VirtualResultListProps) => {
    const rows = useMemo<VirtualRow[]>(() => {
      const acc: VirtualRow[] = [];
      for (const group of displayedGroups) {
        if (group.label) acc.push({ kind: "label", group });
        for (const item of group.items) {
          const globalIdx = flatItems.findIndex((f) => f.id === item.id);
          acc.push({ kind: "item", item, globalIdx });
        }
      }
      return acc;
    }, [displayedGroups, flatItems]);

    const virtualizer = useVirtualizer({
      count: rows.length,
      getScrollElement: () => listRef.current,
      estimateSize: (i: number) =>
        rows[i].kind === "label" ? LABEL_HEIGHT : ITEM_HEIGHT,
      overscan: 8,
    });

    const virtualItems = virtualizer.getVirtualItems();
    const totalSize = virtualizer.getTotalSize();

    if (isEmpty) {
      return (
        <div
          ref={listRef}
          className="overflow-y-auto overscroll-contain px-2 py-1"
          style={{ maxHeight: `min(${LIST_MAX_HEIGHT}px, 60vh)` }}
        >
          <EmptyState message={emptyMessage} />
        </div>
      );
    }

    return (
      <div
        ref={listRef}
        className="overflow-y-auto overscroll-contain px-2 py-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50 transition-colors"
        style={{ maxHeight: `min(${LIST_MAX_HEIGHT}px, 60vh)` }}
      >
        <div style={{ height: totalSize, position: "relative", width: "100%" }}>
          {virtualItems.map((vItem: VirtualItem) => {
            const row = rows[vItem.index];
            return (
              <div
                key={vItem.key}
                data-index={vItem.index}
                ref={virtualizer.measureElement}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${vItem.start}px)`,
                }}
              >
                {row.kind === "label" ? (
                  <GroupLabel group={row.group} />
                ) : (
                  <div data-active={row.globalIdx === activeIndex}>
                    <CommandItemRow
                      item={row.item}
                      isActive={row.globalIdx === activeIndex}
                      isSelected={selectedItemIds.has(row.item.id)}
                      multiSelect={multiSelect}
                      onHover={() => onHover(row.globalIdx)}
                      onSelect={(e) => onSelect(row.item, e)}
                      onToggleSelection={(e) => onToggleSelection(row.item.id, e)}
                      searchQuery={searchQuery}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
VirtualResultList.displayName = "VirtualResultList";

interface FooterBarProps {
  footer?: ReactNode;
  totalItems: number;
  selectedCount?: number;
  executeBulkAction?: () => void;
}

const FooterBar = memo(
  ({
    footer,
    totalItems,
    selectedCount = 0,
    executeBulkAction,
  }: FooterBarProps) => (
    <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
      {footer ?? (
        <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
          {selectedCount > 0 ? (
            <>
              <button
                onClick={executeBulkAction}
                className="flex items-center gap-1.5 text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
              >
                <CommandIcon className="w-3 h-3" /> Confirmar ({selectedCount})
              </button>
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-[10px] px-1 bg-muted rounded border">Ctrl+Enter</span>
                Finalizar seleção
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1.5">
                <ArrowElbowDownRightIcon className="w-3 h-3" />
                Selecionar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="font-mono">↑↓</span>
                Navegar
              </span>
              <span className="flex items-center gap-1.5">
                <ArrowBendUpLeftIcon className="w-3 h-3" />
                Fechar
              </span>
            </>
          )}
        </div>
      )}
      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <CommandIcon className="w-3 h-3" />
        <span>
          {totalItems} resultado{totalItems !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  ),
);
FooterBar.displayName = "FooterBar";

export function CommandPalette(props: CommandPaletteProps) {
  const {
    placeholder = "Buscar comandos…",
    open,
    onOpenChange,
    footer,
    debounceDelay = 300,
    multiSearch = false,
    multiSelect = false,
    emptyMessage = "Nenhum resultado encontrado.",
    shortcut = { key: "k", ctrl: true },
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const {
    query,
    setQuery,
    activeIndex,
    setActiveIndex,
    searchTerms,
    displayedGroups,
    flatItems,
    totalItems,
    handleSelect,
    selectedItemIds,
    toggleSelection,
    executeBulkAction,
    isEmpty,
    showList,
  } = useCommandPalette({
    ...props,
    open: props.open,
  });

  useKeyboardShortcut(shortcut.key, () => onOpenChange?.(!open), {
    ctrl: shortcut.ctrl,
    meta: shortcut.meta,
    shift: shortcut.shift,
    alt: shortcut.alt,
  });

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange?.(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const el = listRef.current?.querySelector(
      `[data-active="true"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleQueryChange = useCallback(
    (val: string) => {
      setQuery(val);
      setActiveIndex(0);
    },
    [setQuery, setActiveIndex],
  );

  const handleQueryChangeMobile = useCallback(
    (val: string) => {
      setQuery(val);
      setActiveIndex(0);
      if (!open && val.trim() !== "") onOpenChange?.(true);
    },
    [setQuery, setActiveIndex, open, onOpenChange],
  );

  const handleClose = useCallback(() => onOpenChange?.(false), [onOpenChange]);
  const handleClearQuery = useCallback(() => setQuery(""), [setQuery]);

  const searchPlaceholder = multiSearch
    ? "Buscar… (separe termos por vírgula)"
    : placeholder;

  const sharedListProps: VirtualResultListProps = {
    listRef,
    isEmpty,
    emptyMessage,
    displayedGroups,
    flatItems,
    activeIndex,
    multiSelect,
    selectedItemIds,
    onHover: setActiveIndex,
    onSelect: handleSelect,
    onToggleSelection: toggleSelection,
    searchQuery: query,
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-0 left-0 right-0 z-[100] px-4 py-3 bg-background border-b border-border shadow-sm flex items-center gap-3"
            >
              <MagnifyingGlassIcon className="w-5 h-5 text-muted-foreground" />
              <DebouncedInput
                ref={inputRef}
                value={query}
                debounce={debounceDelay}
                onChange={handleQueryChangeMobile}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0 p-0 text-base"
              />
              {query && (
                 <ButtonBase variant="ghost" size="icon" onClick={handleClearQuery} className="h-8 w-8">
                    <XIcon className="w-4 h-4" />
                 </ButtonBase>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={ANIMATION.overlay}
              className="fixed inset-0 z-[98] bg-background/80 backdrop-blur-md"
              onClick={handleClose}
            />

            {showList && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={ANIMATION.mobilePanel}
                className="fixed inset-x-0 bottom-0 top-[60px] z-[99] bg-background overflow-hidden flex flex-col"
              >
                <SearchBadges terms={searchTerms} />
                <div className="flex-1 overflow-hidden">
                   <VirtualResultList {...sharedListProps} />
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-black/40 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={ANIMATION.panel}
            className="fixed z-[100] top-4 w-full max-w-xl rounded-xl border border-border overflow-hidden shadow-2xl bg-popover/95 backdrop-blur-xl"
            style={{ maxHeight: "min(600px, 80vh)" }}
          >
            <div className="flex items-center gap-3 px-4 py-2 border-b border-border">
              <MagnifyingGlassIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" weight="bold" />
              <DebouncedInput
                ref={inputRef}
                value={query}
                debounce={debounceDelay}
                onChange={handleQueryChange}
                placeholder={searchPlaceholder}
                rightIcon={
                  query ? (
                    <ButtonBase
                      variant="ghost"
                      size="icon"
                      onClick={handleClearQuery}
                      className="text-muted-foreground hover:text-red-500 hover:bg-transparent transition-colors"
                    >
                      <XIcon className="w-4 h-4" />
                    </ButtonBase>
                  ) : undefined
                }
                className="flex-1 bg-transparent border-none focus-visible:ring-0 outline-none shadow-none px-0 h-7 text-sm caret-primary"
              />
            </div>

            <SearchBadges terms={searchTerms} />
            {showList && <VirtualResultList {...sharedListProps} />}

            <FooterBar
              footer={footer}
              totalItems={totalItems}
              selectedCount={selectedItemIds.size}
              executeBulkAction={executeBulkAction}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}