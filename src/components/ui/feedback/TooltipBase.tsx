"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "../../../lib/utils";
import { useIsMobile } from "@/hooks";

const TOOLTIP_DELAY_DURATION = 600;
const TOOLTIP_SIDE_OFFSET = 8;
const TOOLTIP_MOBILE_DELAY = Infinity;

const TooltipProviderBase = TooltipPrimitive.Provider;

type TooltipClickContextType = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile?: boolean;
};

const TooltipClickContext = React.createContext<TooltipClickContextType>({});

const TooltipBase: React.FC<
  React.ComponentProps<typeof TooltipPrimitive.Root>
> = ({ children, delayDuration = TOOLTIP_DELAY_DURATION, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    if (!open || !isMobile) return;

    const handleClickOutside = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (
        target.closest("[data-tooltip-trigger]") ||
        target.closest("[data-tooltip-content]")
      ) {
        return;
      }

      setOpen(false);
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [open, isMobile]);

  const contextValue = React.useMemo(() => ({ setOpen, isMobile }), [isMobile]);

  return (
    <TooltipClickContext.Provider value={contextValue}>
      <TooltipPrimitive.Root
        open={isMobile ? open : undefined}
        onOpenChange={isMobile ? setOpen : undefined}
        delayDuration={isMobile ? TOOLTIP_MOBILE_DELAY : delayDuration}
        {...props}
      >
        {children}
      </TooltipPrimitive.Root>
    </TooltipClickContext.Provider>
  );
};
TooltipBase.displayName = "TooltipBase";

type TooltipTriggerProps = React.ComponentPropsWithoutRef<
  typeof TooltipPrimitive.Trigger
> & {
  button?: boolean;
};

const TooltipTriggerBase = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ children, onPointerDown, onClick: propOnClick, ...props }, ref) => {
  const { setOpen, isMobile } = React.useContext(TooltipClickContext);

  const handlePointerDown = React.useCallback<
    React.PointerEventHandler<HTMLButtonElement | HTMLDivElement>
  >(
    (e) => {
      if (onPointerDown) {
        onPointerDown(e as React.PointerEvent<HTMLButtonElement>);
      }
    },
    [onPointerDown],
  );

  const onClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (propOnClick) {
        propOnClick(e as React.MouseEvent<HTMLButtonElement>);
      }
      if (onPointerDown) {
        onPointerDown(e as React.PointerEvent<HTMLButtonElement>);
      }
      if (isMobile && setOpen) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    },
    [onPointerDown, isMobile, setOpen, propOnClick],
  );

  const preventDefaultOnMobile = React.useCallback(
    (e: React.SyntheticEvent) => {
      if (isMobile) {
        e.preventDefault();
      }
    },
    [isMobile],
  );

  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      tabIndex={-1}
      onPointerDown={onPointerDown ? handlePointerDown : undefined}
      onClick={onClick}
      onFocus={preventDefaultOnMobile}
      onMouseEnter={preventDefaultOnMobile}
      onMouseLeave={preventDefaultOnMobile}
      data-tooltip-trigger
      aria-describedby="tooltip-content"
      {...props}
    >
      {children}
    </TooltipPrimitive.Trigger>
  );
});
TooltipTriggerBase.displayName = "TooltipTriggerBase";

const TooltipContentBase = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
  (
    { className, sideOffset = TOOLTIP_SIDE_OFFSET, onPointerDown, ...props },
    ref,
  ) => {
    return (
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          onPointerDown={onPointerDown}
          data-tooltip-content
          id="tooltip-content"
          role="tooltip"
          className={cn(
            "z-50 overflow-hidden rounded-lg bg-primary px-3 py-2 text-sm text-foreground",
            "shadow-lg border border-primary/20",
            "animate-in fade-in-0 zoom-in-95 duration-200 ease-out",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-150",
            "data-[side=bottom]:slide-in-from-top-2",
            "data-[side=left]:slide-in-from-right-2",
            "data-[side=right]:slide-in-from-left-2",
            "data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        >
          {props.children}
          <TooltipPrimitive.Arrow className="fill-primary h-1.5 w-3" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    );
  },
);
TooltipContentBase.displayName = "TooltipContentBase";

export {
  TooltipBase,
  TooltipTriggerBase,
  TooltipContentBase,
  TooltipProviderBase,
};
