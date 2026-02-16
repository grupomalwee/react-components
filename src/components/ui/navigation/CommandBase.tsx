"use client";

import * as React from "react";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../../lib/utils";
import {
  DialogBase,
  DialogContentBase,
} from "@/components/ui/feedback/DialogBase";

const CommandBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive> & { testid?: string }
>(({ className, testid: dataTestId = "command-base", ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-background text-popover-foreground border-border",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
CommandBase.displayName = CommandPrimitive.displayName;

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 },
};

const CommandDialogBase = ({ children, open, ...props }: DialogProps) => {
  return (
    <DialogBase open={open} {...props}>
      <AnimatePresence>
        {open && (
          <DialogContentBase asChild forceMount>
            <motion.div
              key="command-dialog"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dialogVariants}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="overflow-hidden p-0 "
            >
              <CommandBase className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                {children}
              </CommandBase>
            </motion.div>
          </DialogContentBase>
        )}
      </AnimatePresence>
    </DialogBase>
  );
};

const CommandInputBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    testid?: string;
  }
>(({ className, testid: dataTestId = "command-input", ...props }, ref) => (
  <div
    className="flex items-center border-b px-3  border-border"
    cmdk-input-wrapper=""
  >
    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none text-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-testid={dataTestId}
      {...props}
    />
  </div>
));
CommandInputBase.displayName = CommandPrimitive.Input.displayName;

const CommandDebouncedInputBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
    testid?: string;
  }
>(({ className, testid: dataTestId = "command-input", ...props }, ref) => (
  <div
    className="flex items-center border-b px-3  border-border"
    cmdk-input-wrapper=""
  >
    <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 text-primary" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none text-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      data-testid={dataTestId}
      {...props}
    />
  </div>
));
CommandDebouncedInputBase.displayName = CommandPrimitive.Input.displayName;

const CommandListBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
    testid?: string;
    onEndReached?: () => void;
  }
>(
  (
    { className, testid: dataTestId = "command-list", onEndReached, ...props },
    ref,
  ) => {
    const listRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const element = listRef.current;
      if (!element) return;

      const handleWheel = (e: WheelEvent) => {
        const target = e.currentTarget as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;

        const isScrollingDown = e.deltaY > 0;
        const isScrollingUp = e.deltaY < 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isAtTop = scrollTop <= 1;

        if (isScrollingDown && isAtBottom && onEndReached) {
          onEndReached();
        }

        if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
          e.stopPropagation();
        }
      };

      const handleScroll = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

        if (isAtBottom && onEndReached) {
          onEndReached();
        }
      };

      let touchStartY = 0;

      const handleTouchStart = (e: TouchEvent) => {
        touchStartY = e.touches[0].clientY;
        e.stopPropagation();
      };

      const handleTouchMove = (e: TouchEvent) => {
        const target = e.currentTarget as HTMLElement;
        const { scrollTop, scrollHeight, clientHeight } = target;
        const touchCurrentY = e.touches[0].clientY;
        const touchDeltaY = touchStartY - touchCurrentY;

        const isScrollingDown = touchDeltaY > 0;
        const isScrollingUp = touchDeltaY < 0;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
        const isAtTop = scrollTop <= 1;

        if (isScrollingDown && isAtBottom && onEndReached) {
          onEndReached();
        }

        if ((isScrollingDown && !isAtBottom) || (isScrollingUp && !isAtTop)) {
          e.stopPropagation();
        } else if (
          (isScrollingDown && isAtBottom) ||
          (isScrollingUp && isAtTop)
        ) {
          e.preventDefault();
        }
      };

      element.addEventListener("wheel", handleWheel, { passive: false });
      element.addEventListener("scroll", handleScroll);
      element.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });
      element.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });

      return () => {
        element.removeEventListener("wheel", handleWheel);
        element.removeEventListener("scroll", handleScroll);
        element.removeEventListener("touchmove", handleTouchMove);
        element.removeEventListener("touchstart", handleTouchStart);
      };
    }, [onEndReached]);

    const combinedRef = React.useCallback(
      (node: HTMLDivElement) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );

    return (
      <CommandPrimitive.List
        ref={combinedRef}
        className={cn(
          "max-h-[300px] overflow-y-auto overflow-x-hidden scroll-smooth [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/50",
          className,
        )}
        data-testid={dataTestId}
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
          scrollbarWidth: "thin",
          scrollbarColor: "hsl(var(--muted)) transparent",
          overflowY: "auto",
          willChange: "scroll-position",
          transform: "translateZ(0)",
        }}
        {...props}
      />
    );
  },
);
CommandListBase.displayName = CommandPrimitive.List.displayName;

const CommandEmptyBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
    testid?: string;
  }
>(({ testid: dataTestId = "command-empty", ...props }, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    data-testid={dataTestId}
    {...props}
  />
));
CommandEmptyBase.displayName = CommandPrimitive.Empty.displayName;

const CommandGroupBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
    testid?: string;
  }
>(({ className, testid: dataTestId = "command-group", ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
CommandGroupBase.displayName = CommandPrimitive.Group.displayName;

const CommandSeparatorBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
    testid?: string;
  }
>(({ className, testid: dataTestId = "command-separator", ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    data-testid={dataTestId}
    {...props}
  />
));
CommandSeparatorBase.displayName = CommandPrimitive.Separator.displayName;

const CommandItemBase = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
    testid?: string;
  }
>(({ className, testid: dataTestId = "command-item", ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-all data-[disabled=true]:pointer-events-none data-[selected=true]:bg-muted data-[selected=true]:text-primary data-[disabled=true]:opacity-50 aria-[selected=true]:bg-accent hover:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ",
      className,
    )}
    data-testid={dataTestId}
    {...props}
  />
));
CommandItemBase.displayName = CommandPrimitive.Item.displayName;

const CommandShortcutBase = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
CommandShortcutBase.displayName = "CommandShortcut";

export {
  CommandBase,
  CommandDialogBase,
  CommandInputBase,
  CommandListBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandSeparatorBase,
  CommandItemBase,
  CommandShortcutBase,
};
