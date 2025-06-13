"use client";

import { CheckCircle, XCircle, Info, Warning, Spinner } from "phosphor-react";
import { Toaster as Sonner, toast as sonnertoast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const iconBaseClass = "w-7 h-auto";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-center"
      toastOptions={{
        classNames: {
          toast: `
            group toast
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
            shadow-lg rounded-md
            border-l-8
            border-border
            flex items-center gap-3
            data-[type=success]:border-l-green-500 data-[type=success]:bg-green-50 dark:data-[type=success]:bg-green-900/30 dark:data-[type=success]:text-green-400
            data-[type=error]:border-l-red-500 data-[type=error]:bg-red-50 dark:data-[type=error]:bg-red-900/30 dark:data-[type=error]:text-red-400
            data-[type=warning]:border-l-yellow-500 data-[type=warning]:bg-yellow-50 dark:data-[type=warning]:bg-yellow-900/30 dark:data-[type=warning]:text-yellow-400
            data-[type=info]:border-l-blue-500 data-[type=info]:bg-blue-50 dark:data-[type=info]:bg-blue-900/30 dark:data-[type=info]:text-blue-400
          `,
          description: `
            text-sm
            group-[.toast]:text-muted-foreground
            dark:group-[.toast]:text-muted-foreground/80
          `,
          actionButton: `
            ml-auto
            rounded-md px-3 py-1 text-sm font-semibold
            bg-primary text-primary-foreground
            hover:bg-primary/80
            transition-colors duration-200
          `,
          cancelButton: `
            ml-2
            rounded-md px-3 py-1 text-sm font-semibold
            bg-muted text-muted-foreground
            hover:bg-muted/80
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
        <CheckCircle
          className={`${iconBaseClass} text-green-600 dark:text-green-400`}
          weight="fill"
        />
      ),
    }),
  error: (message: string) =>
    sonnertoast.error(message, {
      icon: (
        <XCircle
          className={`${iconBaseClass} text-red-600 dark:text-red-400`}
          weight="fill"
        />
      ),
    }),
  warning: (message: string) =>
    sonnertoast.warning(message, {
      icon: (
        <Warning
          className={`${iconBaseClass} text-yellow-600 dark:text-yellow-400`}
          weight="fill"
        />
      ),
    }),
  info: (message: string) =>
    sonnertoast.info(message, {
      icon: (
        <Info
          className={`${iconBaseClass} text-blue-600 dark:text-blue-400`}
          weight="fill"
        />
      ),
    }),
  loading: (message: string) =>
    sonnertoast(message, {
      icon: (
        <Spinner
          className={`${iconBaseClass} animate-spin text-zinc-500 dark:text-zinc-400`}
          weight="fill"
        />
      ),
    }),
};

export { Toaster, toast };
