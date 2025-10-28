"use client";

import {
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  WarningIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  testId?: string; // só um data-testid no root do Toaster
};

const iconBaseClass = "w-5 h-auto";

const Toaster = ({ testId, ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            bg-background
            text-foreground
            shadow-lg rounded-md
            border-l-4
            border-border
            flex items-center gap-3
            data-[type=success]:border-l-green-500 data-[type=success]:bg-green-50 data-[type=success]:text-green-800 data-[type=success]:border-green-500
            data-[type=error]:border-l-red-500 data-[type=error]:bg-red-50 data-[type=error]:text-red-800 data-[type=error]:border-red-500
            data-[type=WarningIcon]:border-l-yellow-500 data-[type=WarningIcon]:bg-yellow-50 data-[type=WarningIcon]:text-yellow-800 data-[type=WarningIcon]:border-yellow-500
            data-[type=InfoIcon]:border-l-blue-500 data-[type=InfoIcon]:bg-blue-50 data-[type=InfoIcon]:text-blue-800 data-[type=InfoIcon]:border-blue-500
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
          `,
        },
      }}
      data-testid={testId}
      {...props}
    />
  );
};

const toast = {
  success: (message: string) =>
    sonnertoast.success(message, {
      icon: <CheckCircleIcon className={`${iconBaseClass} text-green-600`} weight="fill" />,
      className: "sonner-success",
    }),
  error: (message: string) =>
    sonnertoast.error(message, {
      icon: <XCircleIcon className={`${iconBaseClass} text-red-600`} weight="fill" />,
      className: "sonner-error",
    }),
  warning: (message: string) =>
    sonnertoast.warning(message, {
      icon: <WarningIcon className={`${iconBaseClass} text-yellow-600`} weight="fill" />,
      className: "sonner-WarningIcon",
    }),
  info: (message: string) =>
    sonnertoast.info(message, {
      icon: <InfoIcon className={`${iconBaseClass} text-blue-600`} weight="fill" />,
      className: "sonner-InfoIcon",
    }),
  loading: (message: string) =>
    sonnertoast(message, {
      icon: <SpinnerIcon className={`${iconBaseClass} animate-spin text-neutral-500`} weight="fill" />,
      className: "sonner-loading",
    }),
};

// eslint-disable-next-line react-refresh/only-export-components
export { Toaster, toast };
