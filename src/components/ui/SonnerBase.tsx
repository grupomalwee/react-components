"use client";

import {
  CheckCircle,
  XCircle,
  Info,
  Warning,
  Spinner,
} from "phosphor-react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const iconBaseClass = "w-5 h-auto";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
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
          `,
        },
      }}
      {...props}
    />
  );
};

const toast = {
  success: (message: string) =>
    sonnertoast.success(message, {
      icon: (
        <CheckCircle className={`${iconBaseClass} text-green-600`} weight="fill" />
      ),
    }),
  error: (message: string) =>
    sonnertoast.error(message, {
      icon: (
        <XCircle className={`${iconBaseClass} text-red-600`} weight="fill" />
      ),
    }),
  warning: (message: string) =>
    sonnertoast.warning(message, {
      icon: (
        <Warning className={`${iconBaseClass} text-yellow-600`} weight="fill" />
      ),
    }),
  info: (message: string) =>
    sonnertoast.info(message, {
      icon: (
        <Info className={`${iconBaseClass} text-blue-600`} weight="fill" />
      ),
    }),
  loading: (message: string) =>
    sonnertoast(message, {
      icon: (
        <Spinner
          className={`${iconBaseClass} animate-spin text-neutral-500`}
          weight="fill"
        />
      ),
    }),
};

export { Toaster, toast };
