"use client";

import {
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  WarningIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  testId?: string;
};

const iconBaseClass = "w-5 h-5";

const Toaster = ({ testId, ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      duration={4000}
      toastOptions={{
        style: {
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        },
        classNames: {
          toast: `
            group toast
            bg-background/95
            text-foreground
            shadow-xl rounded-lg
            border-l-4
            border-border
            flex items-center gap-3
            transition-all duration-300
            hover:scale-[1.02] hover:shadow-2xl
            data-[type=success]:border-l-green-500 data-[type=success]:bg-green-50/95 data-[type=success]:text-green-800 data-[type=success]:border-green-500
            data-[type=error]:border-l-red-500 data-[type=error]:bg-red-50/95 data-[type=error]:text-red-800 data-[type=error]:border-red-500
            data-[type=warning]:border-l-yellow-500 data-[type=warning]:bg-yellow-50/95 data-[type=warning]:text-yellow-800 data-[type=warning]:border-yellow-500
            data-[type=info]:border-l-blue-500 data-[type=info]:bg-blue-50/95 data-[type=info]:text-blue-800 data-[type=info]:border-blue-500
          `,
          description: `
            text-xs
            font-semibold
            group-[.toast]:text-neutral-600
          `,
          actionButton: `
            ml-auto
            rounded-md px-3 py-1 text-sm font-semibold
            bg-neutral-800 text-white
            hover:bg-neutral-700 hover:scale-105
            transition-all duration-200
            active:scale-95
          `,
          cancelButton: `
            ml-2
            rounded-md px-3 py-1 text-sm font-semibold
            bg-neutral-100 text-neutral-700
            hover:bg-neutral-200 hover:scale-105
            transition-all duration-200
            active:scale-95
          `,
        },
      }}
      data-testid={testId}
      {...props}
    />
  );
};

const toast = {
  success: (message: string, description?: string) =>
    sonnertoast.success(message, {
      description,
      icon: (
        <CheckCircleIcon
          className={`${iconBaseClass} text-green-600`}
          weight="fill"
        />
      ),
      className: "sonner-success",
    }),
  error: (message: string, description?: string) =>
    sonnertoast.error(message, {
      description,
      icon: (
        <XCircleIcon
          className={`${iconBaseClass} text-red-600`}
          weight="fill"
        />
      ),
      className: "sonner-error",
    }),
  warning: (message: string, description?: string) =>
    sonnertoast.warning(message, {
      description,
      icon: (
        <WarningIcon
          className={`${iconBaseClass} text-yellow-600`}
          weight="fill"
        />
      ),
      className: "sonner-warning",
    }),
  info: (message: string, description?: string) =>
    sonnertoast.info(message, {
      description,
      icon: (
        <InfoIcon className={`${iconBaseClass} text-blue-600`} weight="fill" />
      ),
      className: "sonner-info",
    }),
  loading: (message: string, description?: string) =>
    sonnertoast(message, {
      description,
      icon: (
        <CircleNotchIcon
          className={`${iconBaseClass} animate-spin text-gray-600`}
        />
      ),
      className: "sonner-loading",
    }),
};

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, toast };
