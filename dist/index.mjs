"use client";
import './index.css';

// src/components/ui/AlertDialogBase.tsx
import * as React2 from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/ButtonBase.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { jsx } from "react/jsx-runtime";
var buttonVariantsBase = cva(
  `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-md text-sm
    transition-all duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    active:scale-[0.97]
    [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-transparent
  `,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:opacity-90 hover:shadow-md",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 hover:shadow-md",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground shadow-sm border border-transparent hover:opacity-80 hover:shadow-md",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "px-4 py-1.5",
        sm: "rounded-md px-3 text-xs",
        lg: "rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var ButtonBase = React.forwardRef(
  ({ className, variant, size, asChild = false, testid = `button-${variant ?? "default"}`, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariantsBase({ variant, size, className })),
        ref,
        "data-testid": testid ?? `button-${variant ?? "default"}`,
        ...props
      }
    );
  }
);
ButtonBase.displayName = "Button";
var ButtonGroupBase = React.forwardRef(
  ({ className, children, orientation = "horizontal", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: cn(
          "inline-flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          "rounded-md overflow-hidden isolate",
          className
        ),
        ...props,
        children: React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          const typedChild = child;
          return React.cloneElement(typedChild, {
            className: cn(
              typedChild.props.className,
              "rounded-none border-0",
              index === 0 && orientation === "horizontal" && "rounded-l-md",
              index === 0 && orientation === "vertical" && "rounded-t-md",
              index === React.Children.count(children) - 1 && orientation === "horizontal" && "rounded-r-md",
              index === React.Children.count(children) - 1 && orientation === "vertical" && "rounded-b-md"
            )
          });
        })
      }
    );
  }
);
ButtonGroupBase.displayName = "ButtonGroup";

// src/components/ui/AlertDialogBase.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var AlertDialogBase = AlertDialogPrimitive.Root;
var AlertDialogTriggerBase = AlertDialogPrimitive.Trigger;
var AlertDialogPortalBase = AlertDialogPrimitive.Portal;
var AlertDialogOverlayBase = React2.forwardRef(({ className, testid = "alertdialog-overlay", ...props }, ref) => /* @__PURE__ */ jsx2(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    "data-testid": testid,
    ...props,
    ref
  }
));
AlertDialogOverlayBase.displayName = AlertDialogPrimitive.Overlay.displayName;
var AlertDialogContentBase = React2.forwardRef(({ className, testid = "alertdialog-content", ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortalBase, { children: [
  /* @__PURE__ */ jsx2(AlertDialogOverlayBase, {}),
  /* @__PURE__ */ jsx2(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      "data-testid": testid,
      ...props
    }
  )
] }));
AlertDialogContentBase.displayName = AlertDialogPrimitive.Content.displayName;
var AlertDialogHeaderBase = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx2(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeaderBase.displayName = "AlertDialogHeaderBase";
var AlertDialogFooterBase = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx2(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooterBase.displayName = "AlertDialogFooterBase";
var AlertDialogTitleBase = React2.forwardRef(({ className, testid = "alertdialog-title", ...props }, ref) => /* @__PURE__ */ jsx2(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    "data-testid": testid,
    ...props
  }
));
AlertDialogTitleBase.displayName = AlertDialogPrimitive.Title.displayName;
var AlertDialogDescriptionBase = React2.forwardRef(({ className, testid = "alertdialog-description", ...props }, ref) => /* @__PURE__ */ jsx2(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    "data-testid": testid,
    ...props
  }
));
AlertDialogDescriptionBase.displayName = AlertDialogPrimitive.Description.displayName;
var AlertDialogActionBase = React2.forwardRef(({ className, testid = "alertdialog-action", ...props }, ref) => /* @__PURE__ */ jsx2(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariantsBase(), className),
    "data-testid": testid,
    ...props
  }
));
AlertDialogActionBase.displayName = AlertDialogPrimitive.Action.displayName;
var AlertDialogCancelBase = React2.forwardRef(({ className, testid = "alertdialog-cancel", ...props }, ref) => /* @__PURE__ */ jsx2(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariantsBase({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    "data-testid": testid,
    ...props
  }
));
AlertDialogCancelBase.displayName = AlertDialogPrimitive.Cancel.displayName;

// src/components/ui/AvatarBase.tsx
import * as React3 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx3 } from "react/jsx-runtime";
var AvatarBase = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
AvatarBase.displayName = AvatarPrimitive.Root.displayName;
var AvatarImageBase = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImageBase.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallbackBase = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallbackBase.displayName = AvatarPrimitive.Fallback.displayName;

// src/components/date-time-picker/DateTimePicker.tsx
import { add, format } from "date-fns";

// src/components/date-time-picker/calendar.tsx
import * as React5 from "react";
import { DayPicker } from "react-day-picker";
import { CaretLeft, CaretRight, X, Calendar } from "phosphor-react";
import { motion } from "framer-motion";

// src/components/ui/PopoverBase.tsx
import * as React4 from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { jsx as jsx4 } from "react/jsx-runtime";
var PopoverBase = PopoverPrimitive.Root;
var PopoverTriggerBase = PopoverPrimitive.Trigger;
var PopoverAnchorBase = PopoverPrimitive.Anchor;
var PopoverContentBase = React4.forwardRef(({ className, align = "center", sideOffset = 4, testid: dataTestId = "popover-content", ...props }, ref) => /* @__PURE__ */ jsx4(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx4(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
) }));
PopoverContentBase.displayName = PopoverPrimitive.Content.displayName;

// src/components/date-time-picker/calendar.tsx
import { jsx as jsx5, jsxs as jsxs2 } from "react/jsx-runtime";
var variants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 30 : -30
  }),
  center: {
    opacity: 1,
    x: 0
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -30 : 30
  })
};
function CalendarBase({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  const [month, setMonth] = React5.useState(
    props.month || props.defaultMonth || /* @__PURE__ */ new Date()
  );
  const [direction, setDirection] = React5.useState(1);
  const handleMonthChange = (newMonth) => {
    const isNext = newMonth > month ? 1 : -1;
    setDirection(isNext);
    setMonth(newMonth);
    props.onMonthChange?.(newMonth);
  };
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: cn(
        "rounded-xl border bg-background p-3 shadow-sm overflow-hidden",
        className
      ),
      children: /* @__PURE__ */ jsx5(
        motion.div,
        {
          variants,
          initial: "enter",
          animate: "center",
          exit: "exit",
          custom: direction,
          transition: { duration: 0.3, ease: "easeInOut" },
          style: { position: "relative" },
          children: /* @__PURE__ */ jsx5(
            DayPicker,
            {
              showOutsideDays,
              month,
              onMonthChange: handleMonthChange,
              className: "w-full",
              classNames: {
                months: "flex items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                  buttonVariantsBase({ variant: "outline" }),
                  "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: cn(
                  "h-9 w-9 text-center text-sm p-0 relative",
                  "[&:has([aria-selected].day-range-end)]:rounded-r-md",
                  "[&:has([aria-selected].day-range-start)]:rounded-l-md",
                  "[&:has([aria-selected].day-outside)]:bg-muted/50",
                  "[&:has([aria-selected])]:bg-muted",
                  "first:[&:has([aria-selected])]:rounded-l-md",
                  "last:[&:has([aria-selected])]:rounded-r-md",
                  "focus-within:relative focus-within:z-20"
                ),
                day: cn(
                  buttonVariantsBase({ variant: "ghost" }),
                  "h-9 w-9 p-0 font-normal rounded-md",
                  "aria-selected:opacity-100 hover:bg-muted"
                ),
                day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                day_today: "bg-muted text-foreground dark:bg-muted dark:text-foreground",
                day_outside: "day-outside text-gray-500 opacity-50 aria-selected:bg-muted/50 aria-selected:text-black",
                day_disabled: "text-gray-500",
                day_range_middle: "aria-selected:bg-muted aria-selected:text-foreground",
                day_hidden: "invisible",
                ...classNames
              },
              components: {
                IconLeft: () => /* @__PURE__ */ jsx5(CaretLeft, { className: "h-4 w-4" }),
                IconRight: () => /* @__PURE__ */ jsx5(CaretRight, { className: "h-4 w-4" })
              },
              ...props
            }
          )
        },
        month.toISOString()
      )
    }
  );
}
CalendarBase.displayName = "CalendarBase";

// src/components/date-time-picker/DateTimePicker.tsx
import { Calendar as Calendar2 } from "phosphor-react";
import { ptBR } from "date-fns/locale";
import { useEffect, useState as useState2 } from "react";

// src/components/ui/DialogBase.tsx
import * as React6 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X as X2 } from "phosphor-react";
import { jsx as jsx6, jsxs as jsxs3 } from "react/jsx-runtime";
var DialogBase = DialogPrimitive.Root;
var DialogTriggerBase = DialogPrimitive.Trigger;
var DialogPortalBase = DialogPrimitive.Portal;
var DialogCloseBase = DialogPrimitive.Close;
var DialogOverlayBase = React6.forwardRef(({ className, testid: dataTestId = "dialog-overlay", ...props }, ref) => /* @__PURE__ */ jsx6(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
));
DialogOverlayBase.displayName = DialogPrimitive.Overlay.displayName;
var DialogContentBase = React6.forwardRef(({ className, children, testid: dataTestId = "dialog-content", ...props }, ref) => /* @__PURE__ */ jsxs3(DialogPortalBase, { children: [
  /* @__PURE__ */ jsx6(DialogOverlayBase, {}),
  /* @__PURE__ */ jsxs3(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      "data-testid": dataTestId,
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs3(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx6(X2, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx6("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContentBase.displayName = DialogPrimitive.Content.displayName;
var DialogHeaderBase = React6.forwardRef(({ className, testid: dataTestId = "dialog-header", ...props }, ref) => /* @__PURE__ */ jsx6(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
    "data-testid": dataTestId,
    ...props
  }
));
DialogHeaderBase.displayName = "DialogHeader";
var DialogFooterBase = React6.forwardRef(({ className, testid: dataTestId = "dialog-footer", ...props }, ref) => /* @__PURE__ */ jsx6(
  "div",
  {
    ref,
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    "data-testid": dataTestId,
    ...props
  }
));
DialogFooterBase.displayName = "DialogFooter";
var DialogTitleBase = React6.forwardRef(({ className, testid: dataTestId = "dialog-title", ...props }, ref) => /* @__PURE__ */ jsx6(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    "data-testid": dataTestId,
    ...props
  }
));
DialogTitleBase.displayName = DialogPrimitive.Title.displayName;
var DialogDescriptionBase = React6.forwardRef(({ className, testid: dataTestId = "dialog-description", ...props }, ref) => /* @__PURE__ */ jsx6(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    "data-testid": dataTestId,
    ...props
  }
));
DialogDescriptionBase.displayName = DialogPrimitive.Description.displayName;

// src/components/ui/LabelBase.tsx
import * as React7 from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { Slot as Slot2 } from "@radix-ui/react-slot";
import { jsx as jsx7 } from "react/jsx-runtime";
var LabelBase = React7.forwardRef(
  ({ className, asChild = false, testid = "label-base", ...props }, ref) => {
    const Comp = asChild ? Slot2 : "label";
    return /* @__PURE__ */ jsx7(RadixLabel, { children: /* @__PURE__ */ jsx7(
      Comp,
      {
        ref,
        className: cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        ),
        "data-testid": testid,
        ...props
      }
    ) });
  }
);
LabelBase.displayName = "LabelBase";
var LabelBase_default = LabelBase;

// src/components/date-time-picker/TimePicker.tsx
import { Clock } from "phosphor-react";
import * as React10 from "react";

// src/components/ui/InputBase.tsx
import * as React8 from "react";
import { jsx as jsx8, jsxs as jsxs4 } from "react/jsx-runtime";
var InputBase = React8.forwardRef(
  ({
    className,
    type = "text",
    label,
    labelClassname,
    leftIcon,
    rightIcon,
    "data-testid": dataTestId,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs4("div", { className: "flex flex-col w-full min-w-[150px]", children: [
      label && /* @__PURE__ */ jsx8(LabelBase_default, { className: labelClassname, children: label }),
      /* @__PURE__ */ jsxs4(
        "div",
        {
          className: cn(
            "flex items-center rounded-md transition focus-within:ring-1 focus-within:ring-ring focus-within:border-ring bg-white dark:bg-[hsl(231,15%,19%)] overflow-hidden",
            type !== "file" && "border"
          ),
          children: [
            leftIcon && /* @__PURE__ */ jsx8("div", { className: "flex items-center justify-center px-2", children: leftIcon }),
            /* @__PURE__ */ jsx8(
              "input",
              {
                type,
                className: cn(
                  "w-full flex-1 text-sm py-1.5 px-3 focus:outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 bg-white dark:bg-[hsl(231,15%,19%)]",
                  className
                ),
                ref,
                "data-testid": dataTestId ?? "input-base",
                ...props
              }
            ),
            rightIcon && /* @__PURE__ */ jsx8("div", { className: "flex items-center justify-center px-2", children: rightIcon })
          ]
        }
      )
    ] });
  }
);
InputBase.displayName = "Input";

// src/components/date-time-picker/TimePickerInput.tsx
import React9 from "react";

// src/components/date-time-picker/time-picker-utils.ts
function isValidHour(value) {
  return /^(0[0-9]|1[0-9]|2[0-3])$/.test(value);
}
function isValid12Hour(value) {
  return /^(0[1-9]|1[0-2])$/.test(value);
}
function isValidMinuteOrSecond(value) {
  return /^[0-5][0-9]$/.test(value);
}
function getValidNumber(value, { max, min = 0, loop = false }) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    if (!loop) {
      if (numericValue > max) numericValue = max;
      if (numericValue < min) numericValue = min;
    } else {
      if (numericValue > max) numericValue = min;
      if (numericValue < min) numericValue = max;
    }
    return numericValue.toString().padStart(2, "0");
  }
  return "00";
}
function getValidHour(value) {
  if (isValidHour(value)) return value;
  return getValidNumber(value, { max: 23 });
}
function getValid12Hour(value) {
  if (isValid12Hour(value)) return value;
  return getValidNumber(value, { min: 1, max: 12 });
}
function getValidMinuteOrSecond(value) {
  if (isValidMinuteOrSecond(value)) return value;
  return getValidNumber(value, { max: 59 });
}
function getValidArrowNumber(value, { min, max, step }) {
  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    numericValue += step;
    return getValidNumber(String(numericValue), { min, max, loop: true });
  }
  return "00";
}
function getValidArrowHour(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 23, step });
}
function getValidArrow12Hour(value, step) {
  return getValidArrowNumber(value, { min: 1, max: 12, step });
}
function getValidArrowMinuteOrSecond(value, step) {
  return getValidArrowNumber(value, { min: 0, max: 59, step });
}
function setMinutes(date, value) {
  const minutes = getValidMinuteOrSecond(value);
  date.setMinutes(parseInt(minutes, 10));
  return date;
}
function setSeconds(date, value) {
  const seconds = getValidMinuteOrSecond(value);
  date.setSeconds(parseInt(seconds, 10));
  return date;
}
function setHours(date, value) {
  const hours = getValidHour(value);
  date.setHours(parseInt(hours, 10));
  return date;
}
function set12Hours(date, value, period) {
  const hours = parseInt(getValid12Hour(value), 10);
  const convertedHours = convert12HourTo24Hour(hours, period);
  date.setHours(convertedHours);
  return date;
}
function setDateByType(date, value, type, period) {
  switch (type) {
    case "minutes":
      return setMinutes(date, value);
    case "seconds":
      return setSeconds(date, value);
    case "hours":
      return setHours(date, value);
    case "12hours": {
      if (!period) return date;
      return set12Hours(date, value, period);
    }
    default:
      return date;
  }
}
function getDateByType(date, type) {
  switch (type) {
    case "minutes":
      return getValidMinuteOrSecond(String(date.getMinutes()));
    case "seconds":
      return getValidMinuteOrSecond(String(date.getSeconds()));
    case "hours":
      return getValidHour(String(date.getHours()));
    case "12hours":
      const hours = display12HourValue(date.getHours());
      return getValid12Hour(String(hours));
    default:
      return "00";
  }
}
function getArrowByType(value, step, type) {
  switch (type) {
    case "minutes":
      return getValidArrowMinuteOrSecond(value, step);
    case "seconds":
      return getValidArrowMinuteOrSecond(value, step);
    case "hours":
      return getValidArrowHour(value, step);
    case "12hours":
      return getValidArrow12Hour(value, step);
    default:
      return "00";
  }
}
function convert12HourTo24Hour(hour, period) {
  if (period === "PM") {
    if (hour <= 11) {
      return hour + 12;
    } else {
      return hour;
    }
  } else if (period === "AM") {
    if (hour === 12) return 0;
    return hour;
  }
  return hour;
}
function display12HourValue(hours) {
  if (hours === 0 || hours === 12) return "12";
  if (hours >= 22) return `${hours - 12}`;
  if (hours % 12 > 9) return `${hours}`;
  return `0${hours % 12}`;
}

// src/components/date-time-picker/TimePickerInput.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var TimePickerInput = React9.forwardRef(
  ({
    className,
    type = "tel",
    value,
    id,
    name,
    date = new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)),
    setDate,
    onChange,
    onKeyDown,
    picker,
    period,
    onLeftFocus,
    onRightFocus,
    ...props
  }, ref) => {
    const [flag, setFlag] = React9.useState(false);
    const [prevIntKey, setPrevIntKey] = React9.useState("0");
    React9.useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => {
          setFlag(false);
        }, 2e3);
        return () => clearTimeout(timer);
      }
    }, [flag]);
    const calculatedValue = React9.useMemo(() => {
      return getDateByType(date, picker);
    }, [date, picker]);
    const calculateNewValue = (key) => {
      if (picker === "12hours") {
        if (flag && calculatedValue.slice(1, 2) === "1" && prevIntKey === "0")
          return "0" + key;
      }
      return !flag ? "0" + key : calculatedValue.slice(1, 2) + key;
    };
    const handleKeyDown = (e) => {
      if (e.key === "Tab") return;
      e.preventDefault();
      if (e.key === "ArrowRight") onRightFocus?.();
      if (e.key === "ArrowLeft") onLeftFocus?.();
      if (["ArrowUp", "ArrowDown"].includes(e.key)) {
        const step = e.key === "ArrowUp" ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
      if (e.key >= "0" && e.key <= "9") {
        if (picker === "12hours") setPrevIntKey(e.key);
        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = new Date(date);
        setDate(setDateByType(tempDate, newValue, picker, period));
      }
    };
    return /* @__PURE__ */ jsx9(
      InputBase,
      {
        ref,
        id: id || picker,
        name: name || picker,
        className: cn(
          "focus:bg-accent focus:text-accent-foreground w-[48px] text-center font-mono text-base tabular-nums caret-transparent [&::-webkit-inner-spin-button]:appearance-none",
          className
        ),
        value: value || calculatedValue,
        onChange: (e) => {
          e.preventDefault();
          onChange?.(e);
        },
        type,
        inputMode: "decimal",
        onKeyDown: (e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        },
        ...props
      }
    );
  }
);
TimePickerInput.displayName = "TimePickerInput";

// src/components/date-time-picker/TimePicker.tsx
import { jsx as jsx10, jsxs as jsxs5 } from "react/jsx-runtime";
function TimePicker({ date, setDate, hideSeconds }) {
  const minuteRef = React10.useRef(null);
  const hourRef = React10.useRef(null);
  const secondRef = React10.useRef(null);
  return /* @__PURE__ */ jsxs5("div", { className: "flex items-end gap-2", children: [
    /* @__PURE__ */ jsxs5("div", { className: "grid gap-1 text-center", children: [
      /* @__PURE__ */ jsx10(LabelBase_default, { htmlFor: "hours", className: "text-xs", children: "Horas" }),
      /* @__PURE__ */ jsx10(
        TimePickerInput,
        {
          picker: "hours",
          date,
          setDate,
          ref: hourRef,
          onRightFocus: () => minuteRef.current?.focus()
        }
      )
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "grid gap-1 text-center", children: [
      /* @__PURE__ */ jsx10(LabelBase_default, { htmlFor: "minutes", className: "text-xs", children: "Minutos" }),
      /* @__PURE__ */ jsx10(
        TimePickerInput,
        {
          picker: "minutes",
          date,
          setDate,
          ref: minuteRef,
          onLeftFocus: () => hourRef.current?.focus(),
          onRightFocus: () => secondRef.current?.focus()
        }
      )
    ] }),
    !hideSeconds && /* @__PURE__ */ jsxs5("div", { className: "grid gap-1 text-center", children: [
      /* @__PURE__ */ jsx10(LabelBase_default, { htmlFor: "seconds", className: "text-xs", children: "Segundos" }),
      /* @__PURE__ */ jsx10(
        TimePickerInput,
        {
          picker: "seconds",
          date,
          setDate,
          ref: secondRef,
          onLeftFocus: () => minuteRef.current?.focus()
        }
      )
    ] }),
    /* @__PURE__ */ jsx10("div", { className: "flex h-10 items-center", children: /* @__PURE__ */ jsx10(Clock, { className: "ml-2 h-4 w-4" }) })
  ] });
}

// src/components/date-time-picker/DateTimePicker.tsx
import { Fragment, jsx as jsx11, jsxs as jsxs6 } from "react/jsx-runtime";
function DateTimePicker({
  label,
  date,
  onChange,
  hideSeconds,
  fromDate,
  toDate,
  disabled,
  dialogTitle
}) {
  const [internalDate, setInternalDate] = useState2(date);
  const handleSelect = (newDay) => {
    if (!newDay) return;
    if (!internalDate) {
      setInternalDate(newDay);
      return;
    }
    const diff = newDay.getTime() - internalDate.getTime();
    const diffInDays = diff / (1e3 * 60 * 60 * 24);
    const newDateFull = add(internalDate, { days: Math.ceil(diffInDays) });
    setInternalDate(newDateFull);
  };
  const [open, setOpen] = useState2(false);
  useEffect(() => {
    if (date) {
      setInternalDate(date);
    }
  }, [date, open]);
  return /* @__PURE__ */ jsxs6(Fragment, { children: [
    label && /* @__PURE__ */ jsx11(LabelBase_default, { className: "mb-[-1rem] pl-2", children: label }),
    /* @__PURE__ */ jsxs6(DialogBase, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsx11(DialogTriggerBase, { disabled, asChild: true, children: /* @__PURE__ */ jsxs6(
        ButtonBase,
        {
          variant: "default",
          size: "lg",
          className: cn(
            "w-full justify-start text-left font-normal text-zinc-950",
            !date && "text-muted-foreground"
          ),
          children: [
            date ? format(date, "PPP - HH:mm", { locale: ptBR }) : /* @__PURE__ */ jsx11("span", { className: "text-zinc-400", children: "Pick a date" }),
            /* @__PURE__ */ jsx11(Calendar2, { className: "ml-auto text-gray-500", size: 24 })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs6(DialogContentBase, { children: [
        /* @__PURE__ */ jsx11(DialogHeaderBase, { children: /* @__PURE__ */ jsx11(DialogTitleBase, { className: "text-xl font-semibold", children: dialogTitle ?? "Selecione a data" }) }),
        /* @__PURE__ */ jsx11(
          CalendarBase,
          {
            mode: "single",
            locale: ptBR,
            selected: internalDate,
            onSelect: (d) => handleSelect(d),
            initialFocus: true,
            fromDate,
            toDate
          }
        ),
        /* @__PURE__ */ jsx11("div", { className: "border-border flex justify-center border-t p-3", children: /* @__PURE__ */ jsx11(
          TimePicker,
          {
            setDate: setInternalDate,
            date: internalDate,
            hideSeconds
          }
        ) }),
        /* @__PURE__ */ jsx11(
          ButtonBase,
          {
            onClick: () => {
              onChange(internalDate);
              setOpen(false);
            },
            children: "Salvar"
          }
        )
      ] })
    ] })
  ] });
}

// src/hooks/use-mobile.tsx
import * as React11 from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React11.useState(void 0);
  React11.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}

// src/components/mode-toggle.tsx
import { Check as Check2, Moon, Sun } from "phosphor-react";

// src/components/ui/DropDownMenuBase.tsx
import * as React12 from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, CaretRight as CaretRight2, Circle } from "phosphor-react";
import { motion as motion2, AnimatePresence } from "framer-motion";
import { jsx as jsx12, jsxs as jsxs7 } from "react/jsx-runtime";
var DropDownMenuBase = DropdownMenuPrimitive.Root;
var DropDownMenuTriggerBase = DropdownMenuPrimitive.Trigger;
var DropDownMenuGroupBase = DropdownMenuPrimitive.Group;
var DropDownMenuPortalBase = DropdownMenuPrimitive.Portal;
var DropDownMenuSubBase = DropdownMenuPrimitive.Sub;
var DropDownMenuRadioGroupBase = DropdownMenuPrimitive.RadioGroup;
var DropDownMenuSubTriggerBase = React12.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs7(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx12(CaretRight2, { className: "ml-auto" })
    ]
  }
));
DropDownMenuSubTriggerBase.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
var DropDownMenuSubContentBase = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      " min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
));
var DropDownMenuContentBase = React12.forwardRef(({ className, sideOffset = 4, testid: dataTestId = "dropdown-content", ...props }, ref) => /* @__PURE__ */ jsx12(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx12(
  DropdownMenuPrimitive.Content,
  {
    sideOffset,
    forceMount: true,
    ref,
    className: cn("z-[9999] p-0", className),
    "data-testid": dataTestId,
    ...props,
    children: /* @__PURE__ */ jsx12(AnimatePresence, { children: /* @__PURE__ */ jsx12(
      motion2.div,
      {
        initial: { opacity: 0, scale: 0.95, y: 5 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.95, y: 5 },
        transition: { duration: 0.2, ease: "easeOut" },
        className: cn(
          "min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          className
        ),
        children: props.children
      }
    ) })
  }
) }));
DropDownMenuContentBase.displayName = DropdownMenuPrimitive.Content.displayName;
var DropDownMenuItemBase = React12.forwardRef(({ className, inset, leftIcon, rightIcon, children, ...props }, ref) => /* @__PURE__ */ jsxs7(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2", children: [
        leftIcon && /* @__PURE__ */ jsx12("span", { className: "[&>svg]:size-4", children: leftIcon }),
        children
      ] }),
      rightIcon && /* @__PURE__ */ jsx12("span", { className: "[&>svg]:size-4", children: rightIcon })
    ]
  }
));
DropDownMenuItemBase.displayName = DropdownMenuPrimitive.Item.displayName;
var DropDownMenuCheckboxItemBase = React12.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs7(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx12("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx12(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx12(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropDownMenuCheckboxItemBase.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
var DropDownMenuRadioItemBase = React12.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs7(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx12("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx12(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx12(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropDownMenuRadioItemBase.displayName = DropdownMenuPrimitive.RadioItem.displayName;
var DropDownMenuLabelBase = React12.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx12(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropDownMenuLabelBase.displayName = DropdownMenuPrimitive.Label.displayName;
var DropDownMenuSeparatorBase = React12.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx12(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropDownMenuSeparatorBase.displayName = DropdownMenuPrimitive.Separator.displayName;
var DropDownMenuShortcutBase = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx12(
    "span",
    {
      className: cn("ml-auto text-xs tracking-widest opacity-60", className),
      ...props
    }
  );
};
DropDownMenuShortcutBase.displayName = "DropDownMenuShortcutBase";

// src/components/theme-provider.tsx
import { createContext, useContext, useEffect as useEffect3, useState as useState4 } from "react";
import { jsx as jsx13 } from "react/jsx-runtime";
var initialState = {
  theme: "system",
  setTheme: () => null
};
var ThemeProviderContext = createContext(initialState);
function ThemeProviderBase({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState4(() => defaultTheme || defaultTheme);
  useEffect3(() => {
    const root = window.document.documentElement;
    root.classList.remove(
      "light",
      "light-purple",
      "light-green",
      "light-blue",
      "dark",
      "dark-purple",
      "dark-green",
      "dark-blue",
      "system"
    );
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }
    root.classList.add(theme);
  }, [theme]);
  const value = {
    theme,
    setTheme: (theme2) => {
      localStorage.setItem(storageKey, theme2);
      setTheme(theme2);
    }
  };
  return /* @__PURE__ */ jsx13(ThemeProviderContext.Provider, { ...props, value, children });
}
var useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === void 0)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

// src/components/mode-toggle.tsx
import { Fragment as Fragment2, jsx as jsx14, jsxs as jsxs8 } from "react/jsx-runtime";
var themeLabels = {
  light: "Light",
  dark: "Dark",
  system: "System",
  "light-purple": "Light Purple",
  "dark-purple": "Dark Purple",
  "light-blue": "Light Blue",
  "dark-blue": "Dark Blue",
  "light-green": "Light Green",
  "dark-green": "Dark Green"
};
function ModeToggleBase({
  themes = ["light", "dark", "system"]
}) {
  const { setTheme, theme: currentTheme } = useTheme();
  return /* @__PURE__ */ jsxs8(DropDownMenuBase, { children: [
    /* @__PURE__ */ jsx14(DropDownMenuTriggerBase, { asChild: true, children: /* @__PURE__ */ jsxs8(
      ButtonBase,
      {
        variant: "ghost",
        size: "icon",
        className: "relative overflow-hidden border-transparent",
        children: [
          /* @__PURE__ */ jsxs8(Fragment2, { children: [
            /* @__PURE__ */ jsx14(Sun, { className: "h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-0 scale-100" }),
            /* @__PURE__ */ jsx14(Moon, { className: "absolute top-0 left-0 h-[1.2rem] w-[1.2rem] transition-transform duration-300 rotate-90 scale-0" })
          ] }),
          /* @__PURE__ */ jsx14("span", { className: "sr-only", children: "Toggle theme" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx14(DropDownMenuContentBase, { align: "end", className: "dark:border-transparent", children: themes.map((theme) => /* @__PURE__ */ jsxs8(
      DropDownMenuItemBase,
      {
        onClick: () => setTheme(theme),
        className: "flex items-center justify-between",
        children: [
          themeLabels[theme],
          currentTheme === theme && /* @__PURE__ */ jsx14(Check2, { className: "h-4 w-4 opacity-100" })
        ]
      },
      theme
    )) })
  ] });
}

// src/components/selects/Combobox.tsx
import { useCallback, useMemo } from "react";

// src/components/ui/CommandBase.tsx
import * as React13 from "react";
import { Command as CommandPrimitive } from "cmdk";
import { MagnifyingGlass } from "phosphor-react";
import { motion as motion3, AnimatePresence as AnimatePresence2 } from "framer-motion";
import { jsx as jsx15, jsxs as jsxs9 } from "react/jsx-runtime";
var CommandBase = React13.forwardRef(({ className, testid: dataTestId = "command-base", ...props }, ref) => /* @__PURE__ */ jsx15(
  CommandPrimitive,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-background text-popover-foreground",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
));
CommandBase.displayName = CommandPrimitive.displayName;
var dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -20 }
};
var CommandDialogBase = ({ children, open, ...props }) => {
  return /* @__PURE__ */ jsx15(DialogBase, { open, ...props, children: /* @__PURE__ */ jsx15(AnimatePresence2, { children: open && /* @__PURE__ */ jsx15(DialogContentBase, { asChild: true, forceMount: true, children: /* @__PURE__ */ jsx15(
    motion3.div,
    {
      initial: "hidden",
      animate: "visible",
      exit: "exit",
      variants: dialogVariants,
      transition: { duration: 0.2, ease: "easeOut" },
      className: "overflow-hidden p-0",
      children: /* @__PURE__ */ jsx15(CommandBase, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children })
    },
    "command-dialog"
  ) }) }) });
};
var CommandInputBase = React13.forwardRef(({ className, testid: dataTestId = "command-input", ...props }, ref) => /* @__PURE__ */ jsxs9("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsx15(MagnifyingGlass, { className: "mr-2 h-4 w-4 shrink-0 text-primary" }),
  /* @__PURE__ */ jsx15(
    CommandPrimitive.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none text-primary placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      "data-testid": dataTestId,
      ...props
    }
  )
] }));
CommandInputBase.displayName = CommandPrimitive.Input.displayName;
var CommandListBase = React13.forwardRef(({ className, testid: dataTestId = "command-list", ...props }, ref) => /* @__PURE__ */ jsx15(
  CommandPrimitive.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    "data-testid": dataTestId,
    ...props
  }
));
CommandListBase.displayName = CommandPrimitive.List.displayName;
var CommandEmptyBase = React13.forwardRef(({ testid: dataTestId = "command-empty", ...props }, ref) => /* @__PURE__ */ jsx15(CommandPrimitive.Empty, { ref, className: "py-6 text-center text-sm", "data-testid": dataTestId, ...props }));
CommandEmptyBase.displayName = CommandPrimitive.Empty.displayName;
var CommandGroupBase = React13.forwardRef(({ className, testid: dataTestId = "command-group", ...props }, ref) => /* @__PURE__ */ jsx15(
  CommandPrimitive.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
));
CommandGroupBase.displayName = CommandPrimitive.Group.displayName;
var CommandSeparatorBase = React13.forwardRef(({ className, testid: dataTestId = "command-separator", ...props }, ref) => /* @__PURE__ */ jsx15(CommandPrimitive.Separator, { ref, className: cn("-mx-1 h-px bg-border", className), "data-testid": dataTestId, ...props }));
CommandSeparatorBase.displayName = CommandPrimitive.Separator.displayName;
var CommandItemBase = React13.forwardRef(({ className, testid: dataTestId = "command-item", ...props }, ref) => /* @__PURE__ */ jsx15(
  CommandPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-pointer gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-all data-[disabled=true]:pointer-events-none data-[selected=true]:bg-primary data-[selected=true]:text-background data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.02] active:scale-[0.98]",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
));
CommandItemBase.displayName = CommandPrimitive.Item.displayName;
var CommandShortcutBase = ({ className, ...props }) => {
  return /* @__PURE__ */ jsx15("span", { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props });
};
CommandShortcutBase.displayName = "CommandShortcut";

// src/components/selects/ComboboxBase.tsx
import { CaretDown, Check as Check3 } from "phosphor-react";
import { useState as useState5 } from "react";
import { jsx as jsx16, jsxs as jsxs10 } from "react/jsx-runtime";
function ComboboxBase({
  items,
  renderSelected,
  handleSelection,
  checkIsSelected,
  searchPlaceholder,
  errorMessage,
  testIds = {}
}) {
  const [open, setOpen] = useState5(false);
  return /* @__PURE__ */ jsx16(
    "div",
    {
      className: "col-span-1 w-full",
      "data-testid": testIds.root ?? "combobox-base-root",
      children: /* @__PURE__ */ jsxs10(PopoverBase, { open, onOpenChange: setOpen, modal: true, children: [
        /* @__PURE__ */ jsx16(
          PopoverTriggerBase,
          {
            asChild: true,
            className: "flex w-full justify-between dark:bg-[hsl(231,15%,19%)]",
            children: /* @__PURE__ */ jsxs10(
              ButtonBase,
              {
                variant: "outline",
                role: "combobox",
                "aria-expanded": open,
                className: cn(
                  "flex items-start gap-2 justify-between h-full",
                  errorMessage && "border-red-500"
                ),
                "data-testid": testIds.trigger ?? "combobox-trigger",
                children: [
                  renderSelected,
                  /* @__PURE__ */ jsx16(CaretDown, { size: 16, className: "mt-0.5" })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsx16(
          PopoverContentBase,
          {
            className: "max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0 border-none",
            "data-testid": testIds.popover ?? "combobox-popover",
            children: /* @__PURE__ */ jsxs10(
              CommandBase,
              {
                className: "dark:text-white",
                "data-testid": testIds.command ?? "combobox-command",
                children: [
                  /* @__PURE__ */ jsx16(
                    CommandInputBase,
                    {
                      tabIndex: -1,
                      placeholder: searchPlaceholder ?? "Busque uma op\xE7\xE3o...",
                      "data-testid": testIds.search ?? "combobox-search"
                    }
                  ),
                  /* @__PURE__ */ jsxs10(CommandListBase, { "data-testid": testIds.list ?? "combobox-list", children: [
                    /* @__PURE__ */ jsx16(CommandEmptyBase, { "data-testid": testIds.empty ?? "combobox-empty", children: "Nenhum dado encontrado" }),
                    /* @__PURE__ */ jsx16(CommandGroupBase, { "data-testid": testIds.group ?? "combobox-group", children: items.map((item) => {
                      const isSelected = checkIsSelected(item.value);
                      return /* @__PURE__ */ jsxs10(
                        CommandItemBase,
                        {
                          keywords: [item.label],
                          value: item.value,
                          onSelect: (value) => {
                            handleSelection(value);
                            setOpen(false);
                          },
                          "data-testid": testIds.option ?? "combobox-option",
                          children: [
                            item.label,
                            /* @__PURE__ */ jsx16(
                              Check3,
                              {
                                className: cn(
                                  "ml-auto",
                                  isSelected ? "opacity-100" : "opacity-0"
                                ),
                                "data-testid": isSelected ? testIds.check ?? "combobox-option-check" : void 0
                              }
                            )
                          ]
                        },
                        item.value
                      );
                    }) })
                  ] })
                ]
              }
            )
          }
        )
      ] })
    }
  );
}

// src/components/selects/Combobox.tsx
import { jsx as jsx17, jsxs as jsxs11 } from "react/jsx-runtime";
function Combobox({
  items,
  selected,
  onChange,
  className,
  placeholder,
  searchPlaceholder,
  label,
  labelClassname,
  testIds
}) {
  const selectedItem = items.find((item) => item.value === selected);
  const renderSelected = useMemo(() => {
    return /* @__PURE__ */ jsx17(
      "span",
      {
        "data-testid": testIds?.selected ?? "combobox-selected",
        className: cn("truncate", !selectedItem && "text-gray-500"),
        children: selectedItem?.label ?? placeholder ?? "Selecione uma op\xE7\xE3o..."
      }
    );
  }, [placeholder, selectedItem, testIds?.selected]);
  const checkIsSelected = useCallback(
    (value) => selected == null ? false : selected == value,
    [selected]
  );
  const handleSelection = useCallback(
    (value) => {
      onChange(value === selected ? null : value);
    },
    [selected, onChange]
  );
  return /* @__PURE__ */ jsxs11("div", { className: cn("flex flex-col gap-1 w-full min-w-[150px]", className), children: [
    label && /* @__PURE__ */ jsx17(LabelBase_default, { className: labelClassname, children: label }),
    /* @__PURE__ */ jsx17(
      ComboboxBase,
      {
        items,
        renderSelected,
        handleSelection,
        checkIsSelected,
        searchPlaceholder,
        testIds
      }
    )
  ] });
}

// src/components/selects/MultiCombobox.tsx
import { useCallback as useCallback2, useMemo as useMemo2 } from "react";
import { X as X3 } from "phosphor-react";
import { jsx as jsx18, jsxs as jsxs12 } from "react/jsx-runtime";
function MultiCombobox({
  items,
  selected,
  onChange,
  className,
  placeholder,
  searchPlaceholder,
  label,
  labelClassname,
  testIds = {}
}) {
  const selectedItems = items.filter((item) => selected.includes(item.value));
  const checkIsSelected = useCallback2(
    (value) => selected.includes(value),
    [selected]
  );
  const handleSelection = useCallback2(
    (value) => {
      const isSelected = selected.includes(value);
      if (isSelected) {
        onChange(selected.filter((item) => item !== value));
      } else {
        onChange([...selected, value]);
      }
    },
    [selected, onChange]
  );
  const renderSelected = useMemo2(() => {
    if (selectedItems.length === 0) {
      return /* @__PURE__ */ jsx18(
        "span",
        {
          "data-testid": testIds.emptyPlaceholder ?? "combobox-selected-empty",
          className: "text-gray-500",
          children: placeholder ?? "Selecione uma op\xE7\xE3o..."
        }
      );
    }
    return /* @__PURE__ */ jsx18(
      "div",
      {
        "data-testid": testIds.selectedWrapper ?? "combobox-selected-wrapper",
        className: "flex w-full flex-wrap gap-2",
        children: selectedItems.map((item) => /* @__PURE__ */ jsxs12(
          "div",
          {
            className: "flex items-center gap-1 rounded-md border p-1",
            "data-testid": testIds.selectedItem?.(item.value) ?? `combobox-selected-${item.value}`,
            children: [
              /* @__PURE__ */ jsx18("span", { className: "whitespace-break-spaces text-xs", children: item.label }),
              /* @__PURE__ */ jsx18(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  onClick: (e) => {
                    e.stopPropagation();
                    handleSelection(item.value);
                  },
                  className: "cursor-pointer p-0 m-0 text-xs flex items-center justify-center hover:text-red-500 hover:scale-110 transition-all",
                  children: /* @__PURE__ */ jsx18(X3, { size: 14 })
                }
              )
            ]
          },
          item.value
        ))
      }
    );
  }, [handleSelection, placeholder, selectedItems, testIds]);
  return /* @__PURE__ */ jsxs12(
    "div",
    {
      className: cn("flex flex-col gap-1 w-full min-w-[150px]", className),
      "data-testid": testIds.root ?? "multi-combobox-root",
      children: [
        label && /* @__PURE__ */ jsx18(
          LabelBase_default,
          {
            className: labelClassname,
            "data-testid": testIds.label ?? "multi-combobox-label",
            children: label
          }
        ),
        /* @__PURE__ */ jsx18(
          ComboboxBase,
          {
            items,
            renderSelected,
            handleSelection,
            checkIsSelected,
            searchPlaceholder
          }
        )
      ]
    }
  );
}

// src/components/ui/SelectBase.tsx
import * as React14 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check as Check4, CaretDown as CaretDown2, CaretUp } from "phosphor-react";
import { motion as motion4, AnimatePresence as AnimatePresence3 } from "framer-motion";
import { Fragment as Fragment3, jsx as jsx19, jsxs as jsxs13 } from "react/jsx-runtime";
var SelectBase = SelectPrimitive.Root;
var SelectGroupBase = SelectPrimitive.Group;
var SelectValueBase = SelectPrimitive.Value;
var SelectTriggerBase = React14.forwardRef(({ className, children, open, ...props }, ref) => /* @__PURE__ */ jsxs13(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx19(
        motion4.span,
        {
          animate: { rotate: open ? 180 : 0 },
          transition: { duration: 0.3 },
          className: "flex items-center",
          children: /* @__PURE__ */ jsx19(CaretDown2, { className: "h-4 w-4 opacity-50" })
        }
      )
    ]
  }
));
SelectTriggerBase.displayName = SelectPrimitive.Trigger.displayName;
var SelectScrollUpButtonBase = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx19(CaretUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButtonBase.displayName = SelectPrimitive.ScrollUpButton.displayName;
var SelectScrollDownButtonBase = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn(
      "flex cursor-default items-center justify-center py-1",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx19(CaretDown2, { className: "h-4 w-4" })
  }
));
SelectScrollDownButtonBase.displayName = SelectPrimitive.ScrollDownButton.displayName;
var SelectContentBase = React14.forwardRef(({ className, children, position = "popper", testid: dataTestId = "select-content", ...props }, ref) => /* @__PURE__ */ jsx19(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx19(AnimatePresence3, { children: /* @__PURE__ */ jsx19(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
      className
    ),
    position,
    "data-testid": dataTestId,
    ...props,
    asChild: true,
    children: /* @__PURE__ */ jsx19(
      motion4.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: { duration: 0.2 },
        children: /* @__PURE__ */ jsxs13(Fragment3, { children: [
          /* @__PURE__ */ jsx19(SelectScrollUpButtonBase, {}),
          /* @__PURE__ */ jsx19(
            SelectPrimitive.Viewport,
            {
              className: cn(
                "p-1",
                position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
              ),
              children
            }
          ),
          /* @__PURE__ */ jsx19(SelectScrollDownButtonBase, {})
        ] })
      }
    )
  }
) }) }));
SelectContentBase.displayName = SelectPrimitive.Content.displayName;
var SelectLabelBase = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabelBase.displayName = SelectPrimitive.Label.displayName;
var SelectItemBase = React14.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs13(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx19("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx19(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx19(Check4, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx19(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItemBase.displayName = SelectPrimitive.Item.displayName;
var SelectSeparatorBase = React14.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx19(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparatorBase.displayName = SelectPrimitive.Separator.displayName;

// src/components/ui/ScrollareaBase.tsx
import * as React15 from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { jsx as jsx20, jsxs as jsxs14 } from "react/jsx-runtime";
var ScrollAreaBase = React15.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs14(
  ScrollAreaPrimitive.Root,
  {
    ref,
    className: cn("relative overflow-hidden", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx20(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
      /* @__PURE__ */ jsx20(ScrollBarBase, {}),
      /* @__PURE__ */ jsx20(ScrollAreaPrimitive.Corner, {})
    ]
  }
));
ScrollAreaBase.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBarBase = React15.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx20(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx20(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBarBase.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

// src/components/selects/Select.tsx
import { Fragment as Fragment4, jsx as jsx21, jsxs as jsxs15 } from "react/jsx-runtime";
function Select({
  items,
  groupItems,
  placeholder,
  onChange,
  errorMessage,
  testIds = {}
}) {
  return /* @__PURE__ */ jsxs15("div", { "data-testid": testIds.root ?? "select-root", children: [
    /* @__PURE__ */ jsxs15(SelectBase, { onValueChange: onChange, "data-testid": testIds.base ?? "select-base", children: [
      /* @__PURE__ */ jsx21(
        SelectTriggerBase,
        {
          className: cn(
            "flex h-12 w-full content-start text-lg shadow-md",
            errorMessage && "border-red-500"
          ),
          "data-testid": testIds.trigger ?? "select-trigger",
          children: /* @__PURE__ */ jsx21(
            SelectValueBase,
            {
              placeholder,
              "data-testid": testIds.value ?? "select-value"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx21(ScrollAreaBase, { "data-testid": testIds.scrollarea ?? "select-scrollarea", children: /* @__PURE__ */ jsx21(SelectContentBase, { "data-testid": testIds.content ?? "select-content", children: groupItems ? /* @__PURE__ */ jsx21(Fragment4, { children: Object.keys(groupItems).map((key) => /* @__PURE__ */ jsxs15(SelectGroupBase, { "data-testid": testIds.group ?? "select-group", children: [
        /* @__PURE__ */ jsx21(SelectLabelBase, { "data-testid": testIds.label ?? "select-label", children: key }),
        groupItems[key].map((item) => /* @__PURE__ */ jsx21(
          SelectItemBase,
          {
            value: item.value,
            "data-testid": testIds.item?.(item.value) ?? `select-item-${item.value}`,
            children: item.label
          },
          item.value
        ))
      ] }, key)) }) : /* @__PURE__ */ jsx21(SelectGroupBase, { "data-testid": testIds.group ?? "select-group", children: items.map((item) => /* @__PURE__ */ jsx21(
        SelectItemBase,
        {
          value: item.value,
          "data-testid": testIds.item?.(item.value) ?? `select-item-${item.value}`,
          children: item.label
        },
        item.value
      )) }) }) })
    ] }),
    errorMessage && /* @__PURE__ */ jsx21(
      "p",
      {
        className: "text-sm text-red-500",
        "data-testid": testIds.error ?? "select-error",
        children: errorMessage
      }
    )
  ] });
}

// src/components/ui/CalendarBase.tsx
import { CaretLeft as CaretLeft2, CaretRight as CaretRight3 } from "phosphor-react";
import { DayPicker as DayPicker2 } from "react-day-picker";
import { jsx as jsx22 } from "react/jsx-runtime";
function CalendarBase2({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return /* @__PURE__ */ jsx22(
    DayPicker2,
    {
      showOutsideDays,
      className: cn("bg-background p-3", className),
      classNames: {
        months: "flex items-center flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariantsBase({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0  opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-slate-100/50 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-slate-800/50 dark:[&:has([aria-selected])]:bg-slate-800",
        day: cn(
          buttonVariantsBase({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-purple text-slate-50 hover:bg-primary hover:text-slate-50 focus:bg-purple-500 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900",
        day_today: "bg-slate-100 text-slate-900 dark:bg-primary dark:text-slate-50",
        day_outside: "day-outside text-slate-500 opacity-50 aria-selected:bg-slate-100/50 aria-selected:text-slate-500 aria-selected:opacity-30 dark:text-slate-400 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-400",
        day_disabled: "text-slate-500 opacity-50 dark:text-slate-400",
        day_range_middle: "aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-primary dark:aria-selected:text-primary",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        IconLeft: () => /* @__PURE__ */ jsx22(CaretLeft2, { className: "h-4 w-4" }),
        IconRight: () => /* @__PURE__ */ jsx22(CaretRight3, { className: "h-4 w-4" })
      },
      ...props
    }
  );
}
CalendarBase2.displayName = "Calendar";

// src/components/ui/CardBase.tsx
import * as React16 from "react";
import { jsx as jsx23 } from "react/jsx-runtime";
var CardBase = React16.forwardRef(({ className, testid: dataTestId = "card-base", ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    ),
    "data-testid": dataTestId,
    ...props
  }
));
CardBase.displayName = "Card";
var CardHeaderBase = React16.forwardRef(({ className, testid: dataTestId = "card-header", ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    "data-testid": dataTestId,
    ...props
  }
));
CardHeaderBase.displayName = "CardHeader";
var CardTitleBase = React16.forwardRef(({ className, testid: dataTestId = "card-title", ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    "data-testid": dataTestId,
    ...props
  }
));
CardTitleBase.displayName = "CardTitle";
var CardDescriptionBase = React16.forwardRef(({ className, testid: dataTestId = "card-description", ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    "data-testid": dataTestId,
    ...props
  }
));
CardDescriptionBase.displayName = "CardDescription";
var CardContentBase = React16.forwardRef(({ className, testid: dataTestId = "card-content", ...props }, ref) => /* @__PURE__ */ jsx23("div", { ref, className: cn("p-6 pt-0", className), "data-testid": dataTestId, ...props }));
CardContentBase.displayName = "CardContent";
var CardFooterBase = React16.forwardRef(({ className, testid: dataTestId = "card-footer", ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    "data-testid": dataTestId,
    ...props
  }
));
CardFooterBase.displayName = "CardFooter";

// src/components/ui/CheckBoxBase.tsx
import * as React17 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as Check5 } from "phosphor-react";
import { motion as motion5 } from "framer-motion";
import { jsx as jsx24 } from "react/jsx-runtime";
var CheckboxBase = React17.forwardRef(({ className, testid: dataTestId = "checkbox-base", ...props }, ref) => /* @__PURE__ */ jsx24(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-md border border-primary shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors",
      className
    ),
    "data-testid": dataTestId,
    ...props,
    children: /* @__PURE__ */ jsx24(CheckboxPrimitive.Indicator, { asChild: true, children: /* @__PURE__ */ jsx24(
      motion5.div,
      {
        initial: { scale: 0, opacity: 0, rotate: -90 },
        animate: { scale: 1, opacity: 1, rotate: 0 },
        exit: { scale: 0, opacity: 0, rotate: 90 },
        transition: { type: "spring", stiffness: 500, damping: 30 },
        className: "flex items-center justify-center text-current",
        children: /* @__PURE__ */ jsx24(Check5, { className: "h-4 w-4", weight: "bold" })
      }
    ) })
  }
));
CheckboxBase.displayName = CheckboxPrimitive.Root.displayName;

// src/components/ui/ProgressBase.tsx
import * as React18 from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { jsx as jsx25, jsxs as jsxs16 } from "react/jsx-runtime";
var ProgressBase = React18.forwardRef(({ className, value, label, leftIcon, rightIcon, ...props }, ref) => {
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1 w-full min-w-[150px]", children: [
    label && /* @__PURE__ */ jsx25(LabelBase_default, { className: "py-2", children: label }),
    /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-2", children: [
      leftIcon && /* @__PURE__ */ jsx25("div", { className: "flex items-center justify-center", children: leftIcon }),
      /* @__PURE__ */ jsx25(
        ProgressPrimitive.Root,
        {
          ref,
          className: cn(
            "relative h-3 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 shadow-inner transition-all",
            className
          ),
          value,
          ...props,
          children: /* @__PURE__ */ jsx25(
            ProgressPrimitive.Indicator,
            {
              className: "h-full w-full flex-1 bg-primary transition-all duration-500 ease-in-out",
              style: { transform: `translateX(-${100 - (value || 0)}%)` }
            }
          )
        }
      ),
      rightIcon && /* @__PURE__ */ jsx25("div", { className: "flex items-center justify-center", children: rightIcon })
    ] })
  ] });
});
ProgressBase.displayName = "ProgressBase";
var ProgressSegmentsBase = ({
  label,
  segments,
  value
}) => {
  const filled = Math.round(value / 100 * segments);
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1 w-full min-w-[150px]", children: [
    label && /* @__PURE__ */ jsx25(LabelBase_default, { className: "py-2", children: label }),
    /* @__PURE__ */ jsx25("div", { className: "flex gap-1 w-full", children: Array.from({ length: segments }).map((_, idx) => /* @__PURE__ */ jsx25(
      "div",
      {
        className: cn(
          "h-2 flex-1 rounded-full transition-all duration-300",
          idx < filled ? "bg-primary" : "bg-zinc-300 hover:bg-zinc-400"
        )
      },
      idx
    )) })
  ] });
};
var ArrowRightIcon = () => /* @__PURE__ */ jsx25(
  "svg",
  {
    className: "w-6 h-6 text-zinc-400 transition-transform duration-300 group-hover:translate-x-1",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg",
    children: /* @__PURE__ */ jsx25("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 5l7 7-7 7" })
  }
);
var ProgressPanelsBase = ({
  label,
  steps,
  currentStep
}) => {
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-1 w-full", children: [
    label && /* @__PURE__ */ jsx25(LabelBase_default, { className: "py-2", children: label }),
    /* @__PURE__ */ jsx25("div", { className: "flex w-full gap-1 rounded-lg overflow-hidden", children: steps.map((step, idx) => {
      const isActive = idx === currentStep;
      const isLast = idx === steps.length - 1;
      return /* @__PURE__ */ jsxs16(React18.Fragment, { children: [
        /* @__PURE__ */ jsxs16(
          "div",
          {
            className: cn(
              "relative flex items-center justify-center cursor-pointer select-none rounded-lg border transition-shadow duration-300 ease-in-out",
              "hover:shadow-md hover:z-10",
              "aspect-[5/1] min-w-[90px] px-4",
              isActive ? "bg-primary/20 border-2 border-primary shadow-lg font-semibold" : "border-zinc-300"
            ),
            style: { flex: "1 1 0" },
            children: [
              /* @__PURE__ */ jsx25("span", { className: "truncate", children: step }),
              isActive && /* @__PURE__ */ jsx25("div", { className: "absolute bottom-0 left-0 h-1 w-full animate-pulse rounded-b-lg" })
            ]
          }
        ),
        !isLast && /* @__PURE__ */ jsx25("div", { className: "flex items-center px-2 group", children: /* @__PURE__ */ jsx25(ArrowRightIcon, {}) })
      ] }, idx);
    }) })
  ] });
};
var ProgressCirclesBase = ({
  label,
  steps,
  currentStep
}) => {
  return /* @__PURE__ */ jsxs16("div", { className: "flex flex-col gap-2 w-full", children: [
    label && /* @__PURE__ */ jsx25("label", { className: "py-2 text-base font-semibold text-gray-700 dark:text-gray-300", children: label }),
    /* @__PURE__ */ jsxs16("div", { className: "relative flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsx25("div", { className: "absolute top-5 left-0 w-full h-1 bg-zinc-200 dark:bg-zinc-700" }),
      /* @__PURE__ */ jsx25(
        "div",
        {
          className: "absolute top-5 left-0 h-1 bg-primary transition-all duration-300",
          style: {
            width: `${currentStep / (steps.length - 1) * 100}%`
          }
        }
      ),
      steps.map((step, idx) => {
        const isActive = idx <= currentStep;
        return /* @__PURE__ */ jsxs16(
          "div",
          {
            className: "relative flex flex-col items-center w-10",
            style: { zIndex: isActive ? 10 : 1 },
            children: [
              /* @__PURE__ */ jsx25(
                "div",
                {
                  className: cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 cursor-pointer select-none",
                    isActive ? "bg-primary text-white dark:text-black shadow-md" : "bg-zinc-200 text-zinc-500 hover:bg-zinc-300 dark:bg-zinc-500 dark:text-black"
                  ),
                  children: idx + 1
                }
              ),
              /* @__PURE__ */ jsx25("span", { className: "text-xs text-center font-medium mt-1 max-w-[80px] break-words", children: step })
            ]
          },
          idx
        );
      })
    ] })
  ] });
};

// src/components/ui/SeparatorBase.tsx
import * as React19 from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { motion as motion6 } from "framer-motion";
import { jsx as jsx26 } from "react/jsx-runtime";
var SeparatorBase = React19.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
    const isHorizontal = orientation === "horizontal";
    return /* @__PURE__ */ jsx26(
      SeparatorPrimitive.Root,
      {
        ref,
        decorative,
        orientation,
        asChild: true,
        ...props,
        children: /* @__PURE__ */ jsx26(
          motion6.div,
          {
            className: cn(
              "shrink-0 bg-border",
              isHorizontal ? "h-[1px] w-full" : "h-full w-[1px]",
              className
            ),
            initial: { scaleX: isHorizontal ? 0 : 1, scaleY: isHorizontal ? 1 : 0 },
            animate: { scaleX: 1, scaleY: 1 },
            transition: { duration: 0.2, ease: "easeInOut" }
          }
        )
      }
    );
  }
);
SeparatorBase.displayName = SeparatorPrimitive.Root.displayName;

// src/components/ui/SheetBase.tsx
import * as React20 from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva as cva2 } from "class-variance-authority";
import { X as X4 } from "phosphor-react";
import { jsx as jsx27, jsxs as jsxs17 } from "react/jsx-runtime";
var SheetBase = SheetPrimitive.Root;
var SheetTriggerBase = SheetPrimitive.Trigger;
var SheetCloseBase = SheetPrimitive.Close;
var SheetPortalBase = SheetPrimitive.Portal;
var SheetOverlayBase = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlayBase.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva2(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
var SheetContentBase = React20.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs17(SheetPortalBase, { children: [
  /* @__PURE__ */ jsx27(SheetOverlayBase, {}),
  /* @__PURE__ */ jsxs17(
    SheetPrimitive.Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxs17(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsx27(X4, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx27("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContentBase.displayName = SheetPrimitive.Content.displayName;
var SheetHeaderBase = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx27(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
SheetHeaderBase.displayName = "SheetHeaderBase";
var SheetFooterBase = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx27(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
SheetFooterBase.displayName = "SheetFooterBase";
var SheetTitleBase = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitleBase.displayName = SheetPrimitive.Title.displayName;
var SheetDescriptionBase = React20.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx27(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescriptionBase.displayName = SheetPrimitive.Description.displayName;

// src/components/ui/SidebarBase.tsx
import * as React22 from "react";
import { Slot as Slot3 } from "@radix-ui/react-slot";
import { cva as cva3 } from "class-variance-authority";

// src/components/ui/SkeletonBase.tsx
import { jsx as jsx28 } from "react/jsx-runtime";
function SkeletonBase({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx28(
    "div",
    {
      className: cn("animate-pulse  bg-primary/10", className),
      ...props
    }
  );
}

// src/components/ui/SidebarBase.tsx
import { SidebarSimple } from "phosphor-react";

// src/components/ui/TooltipBase.tsx
import * as React21 from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { jsx as jsx29 } from "react/jsx-runtime";
var TooltipProviderBase = TooltipPrimitive.Provider;
var TooltipBase = TooltipPrimitive.Root;
var TooltipTriggerBase = TooltipPrimitive.Trigger;
var TooltipContentBase = React21.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx29(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx29(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContentBase.displayName = TooltipPrimitive.Content.displayName;

// src/components/ui/SidebarBase.tsx
import { jsx as jsx30, jsxs as jsxs18 } from "react/jsx-runtime";
var SIDEBAR_COOKIE_NAME = "sidebar:state";
var SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
var SIDEBAR_WIDTH = "16rem";
var SIDEBAR_WIDTH_MOBILE = "18rem";
var SIDEBAR_WIDTH_ICON = "3rem";
var SIDEBAR_KEYBOARD_SHORTCUT = "b";
var SidebarContext = React22.createContext(null);
function UseSideBarBase() {
  const context = React22.useContext(SidebarContext);
  if (!context) {
    throw new Error(
      "UseSideBarBase must be used within a SidebarProviderBase."
    );
  }
  return context;
}
var SidebarProviderBase = React22.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React22.useState(false);
    const [_open, _setOpen] = React22.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React22.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = React22.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    React22.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = React22.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsx30(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx30(TooltipProviderBase, { delayDuration: 0, children: /* @__PURE__ */ jsx30(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProviderBase.displayName = "SidebarProviderBase";
var SidebarBase = React22.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = UseSideBarBase();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsx30(
        "div",
        {
          className: cn(
            "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsx30(SheetBase, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsx30(
        SheetContentBase,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: /* @__PURE__ */ jsx30("div", { className: "flex h-full w-full flex-col", children })
        }
      ) });
    }
    return /* @__PURE__ */ jsxs18(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsx30(
            "div",
            {
              className: cn(
                "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ jsx30(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsx30(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
SidebarBase.displayName = "SidebarBase";
var SidebarTriggerBase = React22.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = UseSideBarBase();
  return /* @__PURE__ */ jsx30("div", { children: /* @__PURE__ */ jsxs18(
    ButtonBase,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsx30("span", { className: "sr-only", children: "Toggle SidebarBase" }),
        /* @__PURE__ */ jsx30(SidebarSimple, {})
      ]
    }
  ) });
});
SidebarTriggerBase.displayName = "SidebarTriggerBase";
var SidebarRailBase = React22.forwardRef(({ className, ...props }, ref) => {
  const { toggleSidebar } = UseSideBarBase();
  return /* @__PURE__ */ jsx30(
    "button",
    {
      ref,
      "data-sidebar": "rail",
      "aria-label": "Toggle SidebarBase",
      tabIndex: -1,
      onClick: toggleSidebar,
      title: "Toggle SidebarBase",
      className: cn(
        "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      ),
      ...props
    }
  );
});
SidebarRailBase.displayName = "SidebarRailBase";
var SidebarInsetBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    "main",
    {
      ref,
      className: cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className
      ),
      ...props
    }
  );
});
SidebarInsetBase.displayName = "SidebarInsetBase";
var SidebarInputBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    InputBase,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInputBase.displayName = "SidebarInputBase";
var SidebarHeaderBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    "div",
    {
      ref,
      "data-sidebar": "header",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarHeaderBase.displayName = "SidebarHeaderBase";
var SidebarFooterBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    "div",
    {
      ref,
      "data-sidebar": "footer",
      className: cn("flex flex-col gap-2 p-2", className),
      ...props
    }
  );
});
SidebarFooterBase.displayName = "SidebarFooterBase";
var SidebarSeparatorBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    SeparatorBase,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparatorBase.displayName = "SidebarSeparatorBase";
var SidebarContentBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    "div",
    {
      ref,
      "data-sidebar": "content",
      className: cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      ),
      ...props
    }
  );
});
SidebarContentBase.displayName = "SidebarContentBase";
var SidebarGroupBase = React22.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx30(
    "div",
    {
      ref,
      "data-sidebar": "group",
      className: cn("relative flex w-full min-w-0 flex-col p-2", className),
      ...props
    }
  );
});
SidebarGroupBase.displayName = "SidebarGroupBase";
var SidebarGroupLabelBase = React22.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot3 : "div";
  return /* @__PURE__ */ jsx30(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabelBase.displayName = "SidebarGroupLabelBase";
var SidebarGroupActionBase = React22.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot3 : "button";
  return /* @__PURE__ */ jsx30(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupActionBase.displayName = "SidebarGroupActionBase";
var SidebarGroupContentBase = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "div",
  {
    ref,
    "data-sidebar": "group-content",
    className: cn("w-full text-sm", className),
    ...props
  }
));
SidebarGroupContentBase.displayName = "SidebarGroupContentBase";
var SidebarMenuBase = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "ul",
  {
    ref,
    "data-sidebar": "menu",
    className: cn("flex w-full min-w-0 flex-col gap-1", className),
    ...props
  }
));
SidebarMenuBase.displayName = "SidebarMenuBase";
var SidebarMenuItemBase = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "li",
  {
    ref,
    "data-sidebar": "menu-item",
    className: cn("group/menu-item relative", className),
    ...props
  }
));
SidebarMenuItemBase.displayName = "SidebarMenuItemBase";
var sidebarMenuButtonVariants = cva3(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var SidebarMenuButtonBase = React22.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot3 : "button";
    const { isMobile, state } = UseSideBarBase();
    const button = /* @__PURE__ */ jsx30(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxs18(TooltipBase, { children: [
      /* @__PURE__ */ jsx30(TooltipTriggerBase, { asChild: true, children: button }),
      /* @__PURE__ */ jsx30(
        TooltipContentBase,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButtonBase.displayName = "SidebarMenuButtonBase";
var SidebarMenuActionBase = React22.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot3 : "button";
  return /* @__PURE__ */ jsx30(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuActionBase.displayName = "SidebarMenuActionBase";
var SidebarMenuBadgeBase = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "div",
  {
    ref,
    "data-sidebar": "menu-badge",
    className: cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuBadgeBase.displayName = "SidebarMenuBadgeBase";
var SidebarMenuSkeletonBase = React22.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = React22.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsx30(
          SkeletonBase,
          {
            className: "size-4 rounded-md",
            "data-sidebar": "menu-skeleton-icon"
          }
        ),
        /* @__PURE__ */ jsx30(
          SkeletonBase,
          {
            className: "h-4 max-w-[--skeleton-width] flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeletonBase.displayName = "SidebarMenuSkeletonBase";
var SidebarMenuSubBase = React22.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "ul",
  {
    ref,
    "data-sidebar": "menu-sub",
    className: cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className
    ),
    ...props
  }
));
SidebarMenuSubBase.displayName = "SidebarMenuSubBase";
var SidebarMenuSubItemBase = React22.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx30("li", { ref, ...props }));
SidebarMenuSubItemBase.displayName = "SidebarMenuSubItemBase";
var SidebarMenuSubButtonBase = React22.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot3 : "a";
  return /* @__PURE__ */ jsx30(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButtonBase.displayName = "SidebarMenuSubButtonBase";

// src/components/ui/SliderBase.tsx
import * as React23 from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { jsx as jsx31, jsxs as jsxs19 } from "react/jsx-runtime";
var SlideBase = React23.forwardRef(
  ({
    className,
    orientation = "horizontal",
    label,
    leftIcon,
    rightIcon,
    ...props
  }, ref) => {
    const isVertical = orientation === "vertical";
    return /* @__PURE__ */ jsxs19(
      "div",
      {
        className: cn(
          "flex flex-col gap-1",
          isVertical ? "h-full " : "w-full"
        ),
        children: [
          label && /* @__PURE__ */ jsx31(LabelBase_default, { className: "py-2", children: label }),
          /* @__PURE__ */ jsxs19(
            "div",
            {
              className: cn(
                "flex gap-2",
                isVertical ? "flex-col  h-full" : "flex-row items-center w-full"
              ),
              children: [
                leftIcon && /* @__PURE__ */ jsx31("div", { className: "flex items-center justify-center", children: leftIcon }),
                /* @__PURE__ */ jsxs19(
                  SliderPrimitive.Root,
                  {
                    ref,
                    orientation,
                    className: cn(
                      "relative flex touch-none select-none items-center",
                      isVertical ? "flex-col h-full" : "flex-row w-full",
                      className
                    ),
                    ...props,
                    children: [
                      /* @__PURE__ */ jsx31(
                        SliderPrimitive.Track,
                        {
                          className: cn(
                            "relative overflow-hidden bg-primary/20 rounded-full",
                            isVertical ? "w-1.5 h-full" : "h-1.5 w-full"
                          ),
                          children: /* @__PURE__ */ jsx31(
                            SliderPrimitive.Range,
                            {
                              className: cn(
                                "absolute bg-primary",
                                isVertical ? "w-full" : "h-full"
                              )
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx31(
                        SliderPrimitive.Thumb,
                        {
                          className: cn(
                            "block h-4 w-4 rounded-full border border-primary/70 bg-background shadow-md transition-transform",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                            "hover:scale-125 active:scale-125"
                          )
                        }
                      )
                    ]
                  }
                ),
                rightIcon && /* @__PURE__ */ jsx31("div", { className: "flex items-center justify-center", children: rightIcon })
              ]
            }
          )
        ]
      }
    );
  }
);
SlideBase.displayName = "SlideBase";

// src/components/ui/SonnerBase.tsx
import {
  CheckCircle,
  XCircle,
  Info,
  Warning,
  Spinner
} from "phosphor-react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";
import { jsx as jsx32 } from "react/jsx-runtime";
var iconBaseClass = "w-5 h-auto";
var Toaster = ({ testId, ...props }) => {
  return /* @__PURE__ */ jsx32(
    Sonner,
    {
      className: "toaster group",
      position: "top-center",
      toastOptions: {
        classNames: {
          toast: `
            group toast
            bg-white
            text-neutral-800
            shadow-lg rounded-md
            border-l-4
            border-neutral-200
            flex items-center gap-3
            data-[type=success]:border-l-green-500 data-[type=success]:bg-green-50 data-[type=success]:text-green-800 data-[type=success]:border-green-500
            data-[type=error]:border-l-red-500 data-[type=error]:bg-red-50 data-[type=error]:text-red-800 data-[type=error]:border-red-500
            data-[type=warning]:border-l-yellow-500 data-[type=warning]:bg-yellow-50 data-[type=warning]:text-yellow-800 data-[type=warning]:border-yellow-500
            data-[type=info]:border-l-blue-500 data-[type=info]:bg-blue-50 data-[type=info]:text-blue-800 data-[type=info]:border-blue-500
          `,
          description: `
            text-sm
            group-[.toast]:text-neutral-600
          `,
          actionButton: `
            ml-auto
            rounded-md px-3 py-1 text-sm font-semibold
            bg-neutral-800 text-white
            hover:bg-neutral-700
            transition-colors duration-200
          `,
          cancelButton: `
            ml-2
            rounded-md px-3 py-1 text-sm font-semibold
            bg-neutral-100 text-neutral-700
            hover:bg-neutral-200
            transition-colors duration-200
          `
        }
      },
      "data-testid": testId,
      ...props
    }
  );
};
var toast = {
  success: (message) => sonnertoast.success(message, {
    icon: /* @__PURE__ */ jsx32(CheckCircle, { className: `${iconBaseClass} text-green-600`, weight: "fill" }),
    className: "sonner-success"
  }),
  error: (message) => sonnertoast.error(message, {
    icon: /* @__PURE__ */ jsx32(XCircle, { className: `${iconBaseClass} text-red-600`, weight: "fill" }),
    className: "sonner-error"
  }),
  warning: (message) => sonnertoast.warning(message, {
    icon: /* @__PURE__ */ jsx32(Warning, { className: `${iconBaseClass} text-yellow-600`, weight: "fill" }),
    className: "sonner-warning"
  }),
  info: (message) => sonnertoast.info(message, {
    icon: /* @__PURE__ */ jsx32(Info, { className: `${iconBaseClass} text-blue-600`, weight: "fill" }),
    className: "sonner-info"
  }),
  loading: (message) => sonnertoast(message, {
    icon: /* @__PURE__ */ jsx32(Spinner, { className: `${iconBaseClass} animate-spin text-neutral-500`, weight: "fill" }),
    className: "sonner-loading"
  })
};

// src/components/ui/SwitchBase.tsx
import * as React24 from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { jsx as jsx33 } from "react/jsx-runtime";
var SwitchBase = React24.forwardRef(({ className, testid: dataTestId = "switch-base", ...props }, ref) => {
  return /* @__PURE__ */ jsx33(
    SwitchPrimitives.Root,
    {
      ...props,
      ref,
      className: cn(
        "peer relative inline-flex w-12 cursor-pointer items-center rounded-full border-2 border-transparent shadow-md transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input data-[state=checked]:shadow-[0_0_15px_4px_var(--tw-shadow-color)] data-[state=checked]:shadow-primary/30",
        className
      ),
      "data-testid": dataTestId,
      children: /* @__PURE__ */ jsx33(
        SwitchPrimitives.Thumb,
        {
          className: cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-xl ring-0 transition-transform duration-350 ease-out peer-focus:shadow-lg peer-focus:ring-2 peer-focus:ring-primary/70 data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-7 data-[state=checked]:animate-bounce-thumb"
          ),
          style: {
            transformOrigin: "center",
            transition: "transform 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          }
        }
      )
    }
  );
});
SwitchBase.displayName = SwitchPrimitives.Root.displayName;

// src/components/ui/TableBase.tsx
import * as React25 from "react";
import { jsx as jsx34 } from "react/jsx-runtime";
var TableBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx34(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
TableBase.displayName = "TableBase";
var TableHeaderBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeaderBase.displayName = "TableHeaderBase";
var TableBodyBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBodyBase.displayName = "TableBodyBase";
var TableFooterBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooterBase.displayName = "TableFooterBase";
var TableRowBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRowBase.displayName = "TableRowBase";
var TableHeadBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHeadBase.displayName = "TableHeadBase";
var TableCellBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCellBase.displayName = "TableCellBase";
var TableCaptionBase = React25.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx34(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaptionBase.displayName = "TableCaptionBase";

// src/components/ui/TabsBase.tsx
import * as React26 from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { jsx as jsx35 } from "react/jsx-runtime";
var TabsBase = TabsPrimitive.Root;
var TabsListBase = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "relative flex w-full items-center justify-start gap-4 border-b-2 border-border",
      className
    ),
    ...props
  }
));
TabsListBase.displayName = TabsPrimitive.List.displayName;
var TabsTriggerBase = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "relative inline-flex items-center justify-center whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-3",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:text-primary",
      "after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full",
      "after:scale-x-0 after:bg-primary after:origin-left",
      "after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65,0,0.35,1)]",
      "data-[state=active]:after:scale-x-100",
      className
    ),
    ...props
  }
));
var TabsContentBase = React26.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx35(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "animate-fade-in",
      className
    ),
    ...props
  }
));
TabsContentBase.displayName = TabsPrimitive.Content.displayName;

// src/components/ui/TextAreaBase.tsx
import * as React27 from "react";
import { jsx as jsx36 } from "react/jsx-runtime";
var TextAreaBase = React27.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx36(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
TextAreaBase.displayName = "TextAreaBase";

// src/utils/stringHelpers.ts
var cleanString = (str) => str.toString().trim().replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
function includes(input, query) {
  return cleanString(input).includes(cleanString(query));
}

// src/components/filter/services/apply-filter.ts
function applyfilter({
  condition,
  filterValue,
  valueType,
  value
}) {
  if (!valueType || value === void 0) return true;
  if (valueType === "string") {
    if (!filterValue) return true;
    switch (condition) {
      case "$eq":
        return value === filterValue;
      case "$startsWith":
        return cleanString(value).startsWith(cleanString(filterValue));
      case "$endsWith":
        return cleanString(value).endsWith(cleanString(filterValue));
      case "$contains":
        return includes(value, String(filterValue));
      default:
        return false;
    }
  }
  if (valueType === "boolean") {
    switch (condition) {
      case "$exists":
        return Boolean(value) === true;
      case "$notExists":
        return Boolean(value) === false;
      default:
        return false;
    }
  }
  if (valueType === "select") {
    if (!filterValue) return true;
    switch (condition) {
      case "$eq":
        return cleanString(value) === cleanString(filterValue);
      case "$ne":
        return cleanString(value) !== cleanString(filterValue);
      default:
        return false;
    }
  }
  if (valueType === "multi-select") {
    if (!filterValue || !Array.isArray(filterValue)) return true;
    const filterValues = filterValue.map((value2) => cleanString(value2));
    switch (condition) {
      case "$eq":
        return filterValues.includes(cleanString(value));
      case "$ne":
        return !filterValues.includes(cleanString(value));
      default:
        return false;
    }
  }
}

// src/components/filter/services/default-conditions.ts
var defaultStringConditions = [
  {
    conditionId: "$contains",
    conditionName: "cont\xE9m",
    valueType: "string"
  },
  {
    conditionId: "$startsWith",
    conditionName: "come\xE7a com",
    valueType: "string"
  },
  {
    conditionId: "$endsWith",
    conditionName: "termina com",
    valueType: "string"
  },
  {
    conditionId: "$eq",
    conditionName: "\xE9 igual a",
    valueType: "string"
  },
  {
    conditionId: "$ne",
    conditionName: "n\xE3o \xE9 igual a",
    valueType: "string"
  }
];

// src/components/filter/utils/build-summary.ts
function buildFilterSummary(filter, availableFilters) {
  if (!filter) return null;
  const foundFilter = availableFilters.find((f) => f.filterId == filter.id);
  if (!foundFilter) return null;
  const foundCondition = foundFilter.conditions.find(
    (c) => c.conditionId == filter.conditionId
  );
  if (!foundCondition) return null;
  if (filter.conditionId === "$exists" || filter.conditionId === "$notExists") {
    return `${foundFilter.filterName} ${foundCondition.conditionName}`;
  }
  if (!filter.value) return null;
  let value = filter.value.toString();
  switch (foundCondition.valueType) {
    case "select": {
      const selected = foundCondition.selectValues?.find(
        (s) => s.value == filter.value
      );
      if (selected) {
        value = selected.label;
      }
      break;
    }
  }
  return `${foundFilter.filterName} ${foundCondition.conditionName} '${value}'`;
}
export {
  AlertDialogActionBase,
  AlertDialogBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogOverlayBase,
  AlertDialogPortalBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
  AvatarBase,
  AvatarFallbackBase,
  AvatarImageBase,
  ButtonBase,
  ButtonGroupBase,
  CalendarBase2 as CalendarBase,
  CardBase,
  CardContentBase,
  CardDescriptionBase,
  CardFooterBase,
  CardHeaderBase,
  CardTitleBase,
  CheckboxBase,
  Combobox,
  CommandBase,
  CommandDialogBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
  CommandShortcutBase,
  DateTimePicker,
  DialogBase,
  DialogCloseBase,
  DialogContentBase,
  DialogDescriptionBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogOverlayBase,
  DialogPortalBase,
  DialogTitleBase,
  DialogTriggerBase,
  DropDownMenuBase,
  DropDownMenuCheckboxItemBase,
  DropDownMenuContentBase,
  DropDownMenuGroupBase,
  DropDownMenuItemBase,
  DropDownMenuLabelBase,
  DropDownMenuPortalBase,
  DropDownMenuRadioGroupBase,
  DropDownMenuRadioItemBase,
  DropDownMenuSeparatorBase,
  DropDownMenuShortcutBase,
  DropDownMenuSubBase,
  DropDownMenuSubContentBase,
  DropDownMenuSubTriggerBase,
  DropDownMenuTriggerBase,
  InputBase,
  LabelBase_default as LabelBase,
  ModeToggleBase,
  MultiCombobox,
  PopoverAnchorBase,
  PopoverBase,
  PopoverContentBase,
  PopoverTriggerBase,
  ProgressBase,
  ProgressCirclesBase,
  ProgressPanelsBase,
  ProgressSegmentsBase,
  ScrollAreaBase,
  ScrollBarBase,
  Select,
  SelectBase,
  SelectContentBase,
  SelectGroupBase,
  SelectItemBase,
  SelectLabelBase,
  SelectScrollDownButtonBase,
  SelectScrollUpButtonBase,
  SelectSeparatorBase,
  SelectTriggerBase,
  SelectValueBase,
  SeparatorBase,
  SheetBase,
  SheetCloseBase,
  SheetContentBase,
  SheetDescriptionBase,
  SheetFooterBase,
  SheetHeaderBase,
  SheetOverlayBase,
  SheetPortalBase,
  SheetTitleBase,
  SheetTriggerBase,
  SidebarBase,
  SidebarContentBase,
  SidebarFooterBase,
  SidebarGroupActionBase,
  SidebarGroupBase,
  SidebarGroupContentBase,
  SidebarGroupLabelBase,
  SidebarHeaderBase,
  SidebarInputBase,
  SidebarInsetBase,
  SidebarMenuActionBase,
  SidebarMenuBadgeBase,
  SidebarMenuBase,
  SidebarMenuButtonBase,
  SidebarMenuItemBase,
  SidebarMenuSkeletonBase,
  SidebarMenuSubBase,
  SidebarMenuSubButtonBase,
  SidebarMenuSubItemBase,
  SidebarProviderBase,
  SidebarRailBase,
  SidebarSeparatorBase,
  SidebarTriggerBase,
  SkeletonBase,
  SlideBase,
  SwitchBase,
  TableBase,
  TableBodyBase,
  TableCaptionBase,
  TableCellBase,
  TableFooterBase,
  TableHeadBase,
  TableHeaderBase,
  TableRowBase,
  TabsBase,
  TabsContentBase,
  TabsListBase,
  TabsTriggerBase,
  TextAreaBase,
  ThemeProviderBase,
  TimePicker,
  TimePickerInput,
  Toaster,
  TooltipBase,
  TooltipContentBase,
  TooltipProviderBase,
  TooltipTriggerBase,
  UseSideBarBase,
  applyfilter,
  buildFilterSummary,
  buttonVariantsBase,
  defaultStringConditions,
  toast,
  useIsMobile,
  useTheme
};
