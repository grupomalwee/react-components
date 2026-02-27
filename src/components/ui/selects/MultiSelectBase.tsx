"use client";

import { cn } from "@/lib/utils";
import { CaretUpDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ErrorMessageProps } from "@/components/ui/shared/ErrorMessage";
import {
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
} from "../overlays/PopoverBase";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonBase } from "../form/ButtonBase";
import { Badge } from "../data/Badge";
import LabelBase from "../form/LabelBase";
import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
} from "../navigation/CommandBase";
import {
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
} from "../feedback/TooltipBase";
import { Toaster } from "../feedback";

export type MultiSelectContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValues: Set<string>;
  toggleValue: (value: string) => void;
  items: Map<string, ReactNode>;
  onItemAdded: (value: string, label: ReactNode) => void;
  disabled?: boolean;
  emptyMessage?: ReactNode;
  error?: string;
};
const MultiSelectContext = createContext<MultiSelectContextType | null>(null);

export function MultiSelectBase({
  children,
  values,
  defaultValues,
  onValuesChange,
  disabled,
  empty,
  error,
  initialItems,
}: {
  children: ReactNode;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
  empty?: ReactNode;
  error?: string;
  initialItems?: Map<string, ReactNode> | { value: string; label: ReactNode }[];
}) {
  const [open, setOpen] = useState(false);
  const [internalValues, setInternalValues] = useState(
    new Set<string>(values ?? defaultValues),
  );
  const selectedValues = values ? new Set(values) : internalValues;
  const [items, setItems] = useState<Map<string, ReactNode>>(() => {
    if (!initialItems) return new Map();
    if (initialItems instanceof Map) return new Map(initialItems);
    return new Map(initialItems.map((it) => [it.value, it.label]));
  });

  function toggleValue(value: string) {
    if (disabled) return;
    const getNewSet = (prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    };
    setInternalValues(getNewSet);
    onValuesChange?.([...getNewSet(selectedValues)]);
  }

  const onItemAdded = useCallback((value: string, label: ReactNode) => {
    setItems((prev) => {
      if (prev.get(value) === label) return prev;
      return new Map(prev).set(value, label);
    });
  }, []);

  return (
    <MultiSelectContext.Provider
      value={{
        open,
        setOpen,
        selectedValues,
        toggleValue,
        items,
        onItemAdded,
        disabled,
        emptyMessage: empty,
        error,
      }}
    >
      <PopoverBase
        open={open}
        onOpenChange={(v) => !disabled && setOpen(v)}
        modal={true}
      >
        {children}
      </PopoverBase>
    </MultiSelectContext.Provider>
  );
}

export function MultiSelectTriggerBase({
  className,
  children,
  error: propError,
  label,
  labelClassname,
  ...props
}: {
  className?: string;
  children?: ReactNode;
  label?: string;
  labelClassname?: string;
} & ComponentPropsWithoutRef<typeof ButtonBase> &
  ErrorMessageProps) {
  const { open, disabled, error: contextError } = useMultiSelectContext();
  const error = propError ?? contextError;

  return (
    <div className={cn("w-full", error && "mb-0")}>
      {label && <LabelBase className={labelClassname}>{label}</LabelBase>}
      <PopoverTriggerBase asChild>
        <ButtonBase
          {...props}
          variant={props.variant ?? "outline"}
          role={props.role ?? "combobox"}
          aria-expanded={props["aria-expanded"] ?? open}
          aria-disabled={disabled || undefined}
          disabled={disabled}
          className={cn(
            "flex h-auto max-h-9 min-h-9 w-full items-center justify-between gap-2 overflow-hidden rounded-md border border-input bg-background px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground  dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground hover:text-primary",
            error
              ? "border-destructive focus:ring-1 focus:ring-destructive dark:border-red-500"
              : "border-border focus:ring-1 focus:ring-ring",
            className,
          )}
        >
          {children}
          <CaretUpDownIcon className="size-4 shrink-0 opacity-50" />
        </ButtonBase>
      </PopoverTriggerBase>
      {error ? <ErrorMessage error={error} /> : null}
    </div>
  );
}

export function MultiSelectValueBase({
  placeholder,
  clickToRemove = true,
  className,
  overflowBehavior = "wrap-when-open",
  ...props
}: {
  placeholder?: string;
  clickToRemove?: boolean;
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff";
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
  const { selectedValues, toggleValue, items, open } = useMultiSelectContext();
  const [overflowAmount, setOverflowAmount] = useState(0);
  const valueRef = useRef<HTMLDivElement | null>(null);
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && open);

  const checkOverflow = useCallback(() => {
    if (valueRef.current == null) return;

    const containerElement = valueRef.current;
    const overflowElement = overflowRef.current;
    const badgeItems = containerElement.querySelectorAll<HTMLElement>(
      "[data-selected-item]",
    );

    if (overflowElement != null) overflowElement.style.display = "none";
    badgeItems.forEach((child) => child.style.removeProperty("display"));

    if (shouldWrap) {
      setOverflowAmount(0);
      return;
    }
    let amount = 0;
    for (let i = badgeItems.length - 1; i >= 0; i--) {
      if (containerElement.scrollWidth <= containerElement.clientWidth) break;

      const child = badgeItems[i]!;
      amount = badgeItems.length - i;
      child.style.display = "none";

      if (overflowElement != null) {
        overflowElement.style.removeProperty("display");
      }
    }

    setOverflowAmount(amount);
  }, [shouldWrap]);

  useEffect(() => {
    if (overflowRef.current) {
      overflowRef.current.style.display = "none";
    }
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [open, shouldWrap, checkOverflow]);

  const handleResize = useCallback(
    (node: HTMLDivElement | null) => {
      if (node == null) {
        valueRef.current = null;
        resizeObserverRef.current?.disconnect();
        resizeObserverRef.current = null;
        mutationObserverRef.current?.disconnect();
        mutationObserverRef.current = null;
        return;
      }

      valueRef.current = node;

      resizeObserverRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();

      const mo = new MutationObserver(checkOverflow);
      const ro = new ResizeObserver(debounce(checkOverflow, 100));

      mutationObserverRef.current = mo;
      resizeObserverRef.current = ro;

      mo.observe(node, {
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
      ro.observe(node);

      checkOverflow();
    },
    [checkOverflow],
  );

  const [overflowHovered, setOverflowHovered] = useState(false);

  const visibleSelected = [...selectedValues]
    .filter((value) => items.has(value))
    .sort((a, b) => {
      const aNode = items.get(a);
      const bNode = items.get(b);
      const aLabel = typeof aNode === "string" ? aNode : a;
      const bLabel = typeof bNode === "string" ? bNode : b;
      if (aLabel.length !== bLabel.length) return aLabel.length - bLabel.length;
      return String(aLabel).localeCompare(String(bLabel));
    });

  if (visibleSelected.length === 0 && placeholder) {
    return (
      <span className="min-w-0 overflow-hidden font-normal text-muted-foreground truncate">
        {placeholder}
      </span>
    );
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "flex w-full gap-1.5 overflow-hidden",
        shouldWrap && "h-full flex-wrap",
        className,
      )}
    >
      {visibleSelected.map((value) => (
        <Badge
          data-selected-item
          size="sm"
          className="group flex items-center gap-1 border-border shrink-0"
          key={value}
          onClick={
            clickToRemove
              ? (e) => {
                  e.stopPropagation();
                  toggleValue(value);
                }
              : undefined
          }
        >
          {items.get(value)}
          {clickToRemove && (
            <XIcon className="size-3 text-muted-foreground group-hover:text-destructive" />
          )}
        </Badge>
      ))}

      {overflowAmount > 0 && (
        <TooltipProviderBase>
          <TooltipBase open={overflowHovered}>
            <TooltipTriggerBase asChild>
              <div
                ref={overflowRef}
                className="inline-flex"
                onMouseEnter={() => setOverflowHovered(true)}
                onMouseLeave={() => setOverflowHovered(false)}
              >
                <Badge size="sm" className="shrink-0 cursor-default">
                  +{overflowAmount}
                </Badge>
              </div>
            </TooltipTriggerBase>
            <TooltipContentBase className="p-2 max-w-xs">
              <p className="text-xs font-medium text-primary-foreground/60 mb-1.5 px-1">
                {overflowAmount} item{overflowAmount > 1 ? "s" : ""} oculto
                {overflowAmount > 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap gap-1">
                {visibleSelected
                  .slice(visibleSelected.length - overflowAmount)
                  .map((value) => (
                    <span
                      key={value}
                      className="inline-flex items-center rounded-md bg-primary-foreground/15 px-2 py-0.5 text-xs font-medium text-primary-foreground"
                    >
                      {typeof items.get(value) === "string"
                        ? items.get(value)
                        : value}
                    </span>
                  ))}
              </div>
            </TooltipContentBase>
          </TooltipBase>
        </TooltipProviderBase>
      )}
    </div>
  );
}

export function MultiSelectContentBase({
  search = true,
  children,
  ...props
}: {
  search?: boolean | { placeholder?: string; emptyMessage?: string };
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof CommandBase>, "children">) {
  const canSearch = typeof search === "object" ? true : search;
  const { emptyMessage, items, open } = useMultiSelectContext();

  return (
    <>
      <PopoverContentBase
        forceMount
        className="w-[--radix-popover-trigger-width] relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md p-0 border-border"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.95 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: open ? "auto" : "none" }}
        >
          <div className={cn(" ")}>
            <CommandBase
              {...props}
              filter={(value, search) => {
                const labelNode = items.get(value);
                const label = typeof labelNode === "string" ? labelNode : value;
                if (label.toLowerCase().includes(search.toLowerCase()))
                  return 1;
                return 0;
              }}
            >
              {canSearch ? (
                <CommandInputBase
                  placeholder={
                    typeof search === "object" ? search.placeholder : undefined
                  }
                />
              ) : (
                <button autoFocus className="sr-only " />
              )}
              <CommandListBase className="border-border">
                {canSearch && (
                  <CommandEmptyBase>
                    {typeof search === "object"
                      ? (search.emptyMessage ?? emptyMessage)
                      : emptyMessage}
                  </CommandEmptyBase>
                )}
                {children}
              </CommandListBase>
            </CommandBase>
          </div>
        </motion.div>
      </PopoverContentBase>
    </>
  );
}

export function MultiSelectItemBase({
  value,
  children,
  badgeLabel,
  onSelect,
  ...props
}: {
  badgeLabel?: ReactNode;
  value: string;
} & Omit<ComponentPropsWithoutRef<typeof CommandItemBase>, "value">) {
  const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    onItemAdded(value, badgeLabel ?? children);
  }, [value, children, onItemAdded, badgeLabel]);

  return (
    <CommandItemBase
      {...props}
      onSelect={() => {
        toggleValue(value);
        onSelect?.(value);
      }}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <span className="min-w-0 truncate">{children}</span>

        <div
          className="relative flex h-4 w-4 shrink-0 items-center justify-center"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <AnimatePresence mode="wait">
            {selectedValues.has(value) &&
              (hovered ? (
                <motion.div
                  key="x"
                  initial={{ scale: 0, rotate: -90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.05, ease: "easeOut" }}
                >
                  <XIcon className="size-4 text-destructive" />
                </motion.div>
              ) : (
                <motion.div
                  key="check"
                  initial={{ scale: 0, rotate: 90, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.05, ease: "easeOut" }}
                >
                  <CheckIcon className="size-4" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </CommandItemBase>
  );
}

export function MultiSelectGroupBase(
  props: ComponentPropsWithoutRef<typeof CommandGroupBase>,
) {
  return <CommandGroupBase {...props} />;
}

export function MultiSelectSeparatorBase(
  props: ComponentPropsWithoutRef<typeof CommandSeparatorBase>,
) {
  return <CommandSeparatorBase {...props} />;
}

function useMultiSelectContext() {
  const context = useContext(MultiSelectContext);
  if (context == null) {
    throw new Error(
      "useMultiSelectContext must be used within a MultiSelectContext ",
    );
  }
  return context;
}

function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
