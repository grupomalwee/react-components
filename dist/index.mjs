"use client";
import './index.css';

// src/hooks/use-mobile.tsx
import * as React from "react";
var MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(void 0);
  React.useEffect(() => {
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

// src/components/ui/LabelBase.tsx
import * as React2 from "react";
import { Label as RadixLabel } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/LabelBase.tsx
import { jsx } from "react/jsx-runtime";
var LabelBase = React2.forwardRef(
  ({ className, asChild = false, testid = "label-base", ...props }, ref) => {
    const Comp = asChild ? Slot : "label";
    return /* @__PURE__ */ jsx(RadixLabel, { children: /* @__PURE__ */ jsx(
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
export {
  LabelBase_default as LabelBase,
  useIsMobile
};
